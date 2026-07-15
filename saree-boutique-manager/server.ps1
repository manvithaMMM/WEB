# ========================================================
# AIMIT BOUTIQUE MANAGER - POWERSHELL LOCAL WEB SERVER
# ========================================================
# This script starts a local HTTP listener on http://localhost:8000
# and acts as a REST backend to save/load purchase records to purchases.json

$port = 8000
$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add("http://localhost:$port/")

$dbFile = Join-Path $PSScriptRoot "purchases.json"

# Create purchases.json if not present
if (-not (Test-Path $dbFile)) {
    "[]" | Out-File -FilePath $dbFile -Encoding utf8
}

function Get-MimeType ($extension) {
    switch ($extension) {
        ".html" { return "text/html; charset=utf-8" }
        ".css"  { return "text/css; charset=utf-8" }
        ".js"   { return "application/javascript; charset=utf-8" }
        ".json" { return "application/json; charset=utf-8" }
        ".png"  { return "image/png" }
        ".jpg"  { return "image/jpeg" }
        ".jpeg" { return "image/jpeg" }
        ".svg"  { return "image/svg+xml; charset=utf-8" }
        ".ico"  { return "image/x-icon" }
        default { return "application/octet-stream" }
    }
}

try {
    $listener.Start()
    Write-Host "==========================================================" -ForegroundColor Yellow
    Write-Host " AIMIT Saree Boutique Manager Server is Running!" -ForegroundColor Green
    Write-Host " Localhost Address: http://localhost:$port/" -ForegroundColor Cyan
    Write-Host " Database Location: $dbFile" -ForegroundColor Yellow
    Write-Host "==========================================================" -ForegroundColor Yellow
    Write-Host "Press Ctrl+C in this terminal window to stop the server." -ForegroundColor White
    Write-Host ""
} catch {
    Write-Host "CRITICAL ERROR: Failed to start the local web server." -ForegroundColor Red
    Write-Host "Make sure port $port is not occupied by another app." -ForegroundColor Red
    Write-Host "Details: $_" -ForegroundColor Red
    Exit
}

# Serve requests in an active listener loop
while ($listener.IsListening) {
    try {
        $context = $listener.GetContext()
        $request = $context.Request
        $response = $context.Response

        # Add CORS and Cash-control headers
        $response.Headers.Add("Access-Control-Allow-Origin", "*")
        $response.Headers.Add("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS")
        $response.Headers.Add("Access-Control-Allow-Headers", "Content-Type")
        $response.Headers.Add("Cache-Control", "no-store, no-cache, must-revalidate")

        # Handle Preflight OPTIONS request
        if ($request.HttpMethod -eq "OPTIONS") {
            $response.StatusCode = 200
            $response.Close()
            continue
        }

        # Route matching
        $rawUrl = $request.RawUrl
        $cleanUrl = $rawUrl.Split('?')[0] # Stripping query parameters
        $method = $request.HttpMethod

        Write-Host "[$((Get-Date).ToString('HH:mm:ss'))] $method $cleanUrl" -ForegroundColor Gray

        # Route: API GET Purchases
        if ($cleanUrl -eq "/api/purchases" -and $method -eq "GET") {
            $response.ContentType = "application/json; charset=utf-8"
            
            # Read from purchases.json
            if (Test-Path $dbFile) {
                $data = [System.IO.File]::ReadAllText($dbFile)
            } else {
                $data = "[]"
            }
            
            # Ensure it is parsed and returned as a JSON array
            $parsed = $data | ConvertFrom-Json
            if ($null -eq $parsed) {
                $data = "[]"
            } elseif ($parsed -isnot [System.Array]) {
                $data = ConvertTo-Json -InputObject @($parsed) -Depth 100
            }
            
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($data)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        # Route: API POST Purchase (Insert or Update)
        elseif ($cleanUrl -eq "/api/purchases" -and $method -eq "POST") {
            $response.ContentType = "application/json; charset=utf-8"
            
            # Read incoming JSON stream
            $reader = New-Object System.IO.StreamReader($request.InputStream)
            $body = $reader.ReadToEnd()
            $reader.Close()

            $newRecord = $body | ConvertFrom-Json
            
            # Read database
            $dbContent = [System.IO.File]::ReadAllText($dbFile)
            $recordsList = $dbContent | ConvertFrom-Json
            
            if ($null -eq $recordsList) {
                $recordsList = @()
            } elseif ($recordsList -isnot [System.Array]) {
                $recordsList = @($recordsList)
            }
            
            # Check if record already exists (Edit Mode)
            $isUpdated = $false
            if ($recordsList.Count -gt 0) {
                for ($i = 0; $i -lt $recordsList.Count; $i++) {
                    if ($recordsList[$i].id -eq $newRecord.id) {
                        $recordsList[$i] = $newRecord
                        $isUpdated = $true
                        break
                    }
                }
            }
            
            # If not editing, append new record
            if (-not $isUpdated) {
                $recordsList += $newRecord
            }
            
            # Save database as an array
            $jsonData = ConvertTo-Json -InputObject @($recordsList) -Depth 100
            $jsonData | Out-File -FilePath $dbFile -Encoding utf8
            
            $respStr = '{"status":"success","id":"' + $newRecord.id + '"}'
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($respStr)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        # Route: API DELETE Purchase
        elseif ($cleanUrl.StartsWith("/api/purchases/") -and $method -eq "DELETE") {
            $response.ContentType = "application/json; charset=utf-8"
            $idToDelete = $cleanUrl.Substring("/api/purchases/".Length)
            
            # Read database
            $dbContent = [System.IO.File]::ReadAllText($dbFile)
            $recordsList = $dbContent | ConvertFrom-Json
            
            if ($null -eq $recordsList) {
                $recordsList = @()
            } elseif ($recordsList -isnot [System.Array]) {
                $recordsList = @($recordsList)
            }
            
            # Filter array
            $newRecordsList = @()
            foreach ($r in $recordsList) {
                if ($r.id -ne $idToDelete) {
                    $newRecordsList += $r
                }
            }
            
            # Save database
            $jsonData = ConvertTo-Json -InputObject @($newRecordsList) -Depth 100
            $jsonData | Out-File -FilePath $dbFile -Encoding utf8
            
            $respStr = '{"status":"success","deleted":"' + $idToDelete + '"}'
            $buffer = [System.Text.Encoding]::UTF8.GetBytes($respStr)
            $response.ContentLength64 = $buffer.Length
            $response.OutputStream.Write($buffer, 0, $buffer.Length)
        }
        # Route: Static Files serving
        else {
            # Normalize path
            $urlPath = $cleanUrl
            if ($urlPath -eq "/") {
                $urlPath = "/index.html"
            }
            
            # Check if requested file is under the project folder
            # Replace forward slashes with Windows backslashes
            $localRelativePath = $urlPath.Replace("/", "\").TrimStart("\")
            $localFilePath = Join-Path $PSScriptRoot $localRelativePath
            
            if (Test-Path $localFilePath -PathType Leaf) {
                $ext = [System.IO.Path]::GetExtension($localFilePath)
                $response.ContentType = Get-MimeType $ext
                
                # Write file content stream
                $fileBytes = [System.IO.File]::ReadAllBytes($localFilePath)
                $response.ContentLength64 = $fileBytes.Length
                $response.OutputStream.Write($fileBytes, 0, $fileBytes.Length)
            } else {
                # File not found
                $response.StatusCode = 404
                $response.ContentType = "text/plain"
                $respStr = "404 Not Found: The file $cleanUrl does not exist on this server."
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($respStr)
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
            }
        }
        $response.Close()
    } catch {
        Write-Host "Error processing request: $_" -ForegroundColor Red
        if ($null -ne $response) {
            try { 
                $response.StatusCode = 500
                $response.ContentType = "text/plain"
                $respStr = "500 Internal Server Error: $_"
                $buffer = [System.Text.Encoding]::UTF8.GetBytes($respStr)
                $response.ContentLength64 = $buffer.Length
                $response.OutputStream.Write($buffer, 0, $buffer.Length)
                $response.Close() 
            } catch {}
        }
    }
}
