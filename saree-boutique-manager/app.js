/* ==========================================
   AIMIT BOUTIQUE MANAGER - LOGIC CONTROLLER
   ========================================== */

// --- Constants & Saree Catalog Config ---
const SAREE_CATALOG = [
    {
        id: "cat-banarasi",
        name: "Banarasi Silk",
        fabric: "Banarasi Silk",
        code: "AIMIT-B01",
        price: 8500,
        image: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=600&auto=format&fit=crop&q=80",
        description: "Pure mulberry silk saree with intricate gold zari brocade work from Varanasi. Perfect for weddings."
    },
    {
        id: "cat-kanjeevaram",
        name: "Kanjeevaram Silk",
        fabric: "Kanjeevaram Silk",
        code: "AIMIT-K02",
        price: 12500,
        image: "https://images.unsplash.com/photo-1583391733981-8497fbc2b8ef?w=600&auto=format&fit=crop&q=80",
        description: "Traditional handwoven silk from Kanchipuram, featuring temple borders and rich, contrasting pallu."
    },
    {
        id: "cat-organza",
        name: "Organza Floral",
        fabric: "Organza Floral",
        code: "AIMIT-O03",
        price: 3200,
        image: "https://images.unsplash.com/photo-1594736797933-d0401ba2fe65?w=600&auto=format&fit=crop&q=80",
        description: "Lightweight, sheer organza saree with delicate pastel floral prints and scalloped embroidered borders."
    },
    {
        id: "cat-georgette",
        name: "Georgette Partywear",
        fabric: "Georgette Partywear",
        code: "AIMIT-G04",
        price: 4800,
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&auto=format&fit=crop&q=80",
        description: "Elegant faux georgette saree embellished with beautiful sequence embroidery, ideal for cocktail nights."
    },
    {
        id: "cat-cotton",
        name: "Cotton Daily",
        fabric: "Cotton Daily",
        code: "AIMIT-C05",
        price: 1500,
        image: "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?w=600&auto=format&fit=crop&q=80",
        description: "Soft, breathable mulmul cotton saree for daily office or casual wear. Easy to drape and maintain."
    },
    {
        id: "cat-chiffon",
        name: "Chiffon Designer",
        fabric: "Chiffon Designer",
        code: "AIMIT-CH06",
        price: 2800,
        image: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?w=600&auto=format&fit=crop&q=80",
        description: "Vibrant designer chiffon saree with high-quality lace trim and subtle stone detailing. Very lightweight."
    }
];

// --- Application State ---
let state = {
    purchases: [],
    isServerMode: false,
    storeInfo: {
        name: "AIMIT Boutique",
        phone: "+91 98765 43210",
        email: "sales@aimitboutique.com",
        address: "Gold Palace complex, Ground Floor, Mangaluru, Karnataka - 575001"
    }
};

// --- DOM elements cache ---
const DOM = {
    // Navigation & Layout
    navDashboard: document.getElementById('nav-dashboard'),
    navRecords: document.getElementById('nav-records'),
    navCatalog: document.getElementById('nav-catalog'),
    navSettings: document.getElementById('nav-settings'),
    secDashboard: document.getElementById('sec-dashboard'),
    secRecords: document.getElementById('sec-records'),
    secCatalog: document.getElementById('sec-catalog'),
    secSettings: document.getElementById('sec-settings'),
    linkViewAll: document.getElementById('link-view-all'),
    btnOpenForm: document.getElementById('btn-open-form'),
    currentTime: document.getElementById('current-date-time'),
    
    // Server status indicators
    statusDot: document.getElementById('status-dot'),
    statusText: document.getElementById('status-text'),
    statusSub: document.getElementById('status-sub'),
    
    // Metric cards values
    metricRevenue: document.getElementById('metric-revenue'),
    metricSareesCount: document.getElementById('metric-sarees-count'),
    metricAvgPrice: document.getElementById('metric-avg-price'),
    metricPending: document.getElementById('metric-pending'),
    
    // SVG Charts
    svgTrend: document.getElementById('svg-trend'),
    svgDonut: document.getElementById('svg-donut'),
    donutLegend: document.getElementById('donut-legend'),
    
    // Purchase Ledger list
    recentTbody: document.getElementById('recent-purchases-tbody'),
    fullTbody: document.getElementById('full-records-tbody'),
    
    // Filters & Sorting
    filterSearch: document.getElementById('filter-search'),
    filterFabric: document.getElementById('filter-fabric'),
    filterPayment: document.getElementById('filter-payment'),
    filterStatus: document.getElementById('filter-status'),
    sortBy: document.getElementById('sort-by'),
    
    // Exporters
    btnExportCsv: document.getElementById('btn-export-csv'),
    btnExportJson: document.getElementById('btn-export-json'),
    btnSetExportCsv: document.getElementById('btn-set-export-csv'),
    btnSetExportJson: document.getElementById('btn-set-export-json'),
    btnImportDb: document.getElementById('btn-import-db'),
    importFileInput: document.getElementById('import-file-input'),
    importFileName: document.getElementById('import-file-name'),
    btnClearDb: document.getElementById('btn-clear-db'),
    
    // Store configuration form
    storeForm: document.getElementById('store-settings-form'),
    setStoreName: document.getElementById('set-store-name'),
    setStorePhone: document.getElementById('set-store-phone'),
    setStoreEmail: document.getElementById('set-store-email'),
    setStoreAddress: document.getElementById('set-store-address'),
    
    // Modal Overlay and Form
    purchaseModal: document.getElementById('purchase-modal'),
    purchaseForm: document.getElementById('purchase-form'),
    formPurchaseId: document.getElementById('form-purchase-id'),
    modalTitle: document.getElementById('modal-title'),
    formCustomerName: document.getElementById('form-customer-name'),
    formCustomerPhone: document.getElementById('form-customer-phone'),
    formSareeFabric: document.getElementById('form-saree-fabric'),
    formSareeCode: document.getElementById('form-saree-code'),
    formPrice: document.getElementById('form-price'),
    formQty: document.getElementById('form-qty'),
    formDiscount: document.getElementById('form-discount'),
    formTotalDisplay: document.getElementById('form-total-display'),
    formDatetime: document.getElementById('form-datetime'),
    formPaymentMode: document.getElementById('form-payment-mode'),
    formStatus: document.getElementById('form-status'),
    formNotes: document.getElementById('form-notes'),
    btnSubmitForm: document.getElementById('btn-submit-form'),
    btnCloseModal: document.getElementById('btn-close-modal'),
    btnCancelForm: document.getElementById('btn-cancel-form'),
    
    // Showcase Catalog grid
    catalogGrid: document.getElementById('catalog-grid'),
    toastContainer: document.getElementById('toast-container')
};

// --- Initialization ---
document.addEventListener('DOMContentLoaded', async () => {
    initClock();
    initNavigation();
    initFormListeners();
    initFilterListeners();
    initBackupListeners();
    renderCatalog();
    
    // Check Backend Server and Load Data
    await checkServerConnectivity();
});

// --- Real-time Clock ---
function initClock() {
    const updateTime = () => {
        const now = new Date();
        const options = { 
            weekday: 'long', 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit', 
            minute: '2-digit', 
            second: '2-digit',
            hour12: true 
        };
        DOM.currentTime.innerText = now.toLocaleDateString('en-IN', options);
    };
    updateTime();
    setInterval(updateTime, 1000);
}

// --- Navigation Controller ---
function initNavigation() {
    const navs = [
        { btn: DOM.navDashboard, sec: DOM.secDashboard },
        { btn: DOM.navRecords, sec: DOM.secRecords },
        { btn: DOM.navCatalog, sec: DOM.secCatalog },
        { btn: DOM.navSettings, sec: DOM.secSettings }
    ];

    navs.forEach(nav => {
        if(nav.btn && nav.sec) {
            nav.btn.addEventListener('click', (e) => {
                e.preventDefault();
                navs.forEach(n => {
                    n.btn.classList.remove('active');
                    n.sec.classList.remove('active-section');
                });
                nav.btn.classList.add('active');
                nav.sec.classList.add('active-section');
                
                // Trigger chart re-render if switching to dashboard
                if (nav.sec === DOM.secDashboard) {
                    renderCharts();
                }
            });
        }
    });

    if (DOM.linkViewAll) {
        DOM.linkViewAll.addEventListener('click', (e) => {
            e.preventDefault();
            DOM.navRecords.click();
        });
    }
}

// --- Toast Notification System ---
function showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    let iconClass = 'fa-info-circle';
    if (type === 'success') iconClass = 'fa-check-circle';
    if (type === 'error') iconClass = 'fa-exclamation-triangle';
    
    toast.innerHTML = `
        <i class="fa-solid ${iconClass}"></i>
        <div class="toast-content">${message}</div>
    `;
    
    DOM.toastContainer.appendChild(toast);
    
    setTimeout(() => {
        toast.classList.add('toast-out');
        toast.addEventListener('animationend', () => toast.remove());
    }, 4000);
}

// --- Server Connectivity & Data Hydration ---
async function checkServerConnectivity() {
    try {
        // Try calling the Node/PowerShell REST API endpoint
        const response = await fetch('/api/purchases', { 
            method: 'GET',
            headers: { 'Accept': 'application/json' },
            cache: 'no-store'
        });
        
        if (response.ok) {
            state.isServerMode = true;
            DOM.statusDot.className = 'status-dot online';
            DOM.statusText.innerText = 'Server Connected';
            DOM.statusSub.innerText = 'Syncing: Local File System';
            showToast('Connected to Localhost Database Server', 'success');
        } else {
            throw new Error('Server returned non-200 status');
        }
    } catch (e) {
        state.isServerMode = false;
        DOM.statusDot.className = 'status-dot offline';
        DOM.statusText.innerText = 'Local Storage Mode';
        DOM.statusSub.innerText = 'Offline: Saving to Browser cache';
        showToast('Running in standalone Local Storage mode.', 'info');
    }
    
    await loadPurchasesData();
    loadStoreDetails();
}

async function loadPurchasesData() {
    if (state.isServerMode) {
        try {
            const response = await fetch('/api/purchases');
            if (response.ok) {
                state.purchases = await response.json();
            }
        } catch (e) {
            showToast('Failed to fetch records from backend server', 'error');
            console.error(e);
        }
    } else {
        const localData = localStorage.getItem('aimit_purchases');
        state.purchases = localData ? JSON.parse(localData) : [];
    }
    
    updateDashboard();
}

// --- Store Configuration Persistence ---
function loadStoreDetails() {
    const localStore = localStorage.getItem('aimit_store_info');
    if (localStore) {
        state.storeInfo = JSON.parse(localStore);
    }
    // Update inputs
    DOM.setStoreName.value = state.storeInfo.name;
    DOM.setStorePhone.value = state.storeInfo.phone;
    DOM.setStoreEmail.value = state.storeInfo.email;
    DOM.setStoreAddress.value = state.storeInfo.address;
    
    // Update sidebar name
    const sidebarTitle = document.querySelector('.brand h2');
    if (sidebarTitle) sidebarTitle.innerText = state.storeInfo.name.split(' ')[0] || "AIMIT";
    const sidebarSub = document.querySelector('.brand span');
    if (sidebarSub) sidebarSub.innerText = state.storeInfo.name.split(' ').slice(1).join(' ') || "Boutique Manager";
}

DOM.storeForm.addEventListener('submit', (e) => {
    e.preventDefault();
    state.storeInfo = {
        name: DOM.setStoreName.value.trim(),
        phone: DOM.setStorePhone.value.trim(),
        email: DOM.setStoreEmail.value.trim(),
        address: DOM.setStoreAddress.value.trim()
    };
    localStorage.setItem('aimit_store_info', JSON.stringify(state.storeInfo));
    loadStoreDetails();
    showToast('Store settings updated successfully', 'success');
});

// --- Dashboard & Analytical Calculator ---
function updateDashboard() {
    calculateMetrics();
    renderTables();
    renderCharts();
}

function calculateMetrics() {
    let totalRevenue = 0;
    let totalSarees = 0;
    let totalPaidRevenue = 0;
    let totalPending = 0;
    
    state.purchases.forEach(p => {
        // Calculate only if purchase status is not returned
        if (p.status !== 'Returned') {
            const val = parseFloat(p.totalAmount) || 0;
            totalRevenue += val;
            totalSarees += parseInt(p.qty) || 0;
            
            if (p.paymentMode === 'Pending') {
                totalPending += val;
            } else {
                totalPaidRevenue += val;
            }
        }
    });

    const avgPrice = totalSarees > 0 ? (totalRevenue / totalSarees) : 0;
    
    // Format values to Indian Currency standard
    DOM.metricRevenue.innerText = formatCurrency(totalRevenue);
    DOM.metricSareesCount.innerText = totalSarees.toString();
    DOM.metricAvgPrice.innerText = formatCurrency(avgPrice);
    DOM.metricPending.innerText = formatCurrency(totalPending);
}

function formatCurrency(number) {
    return new Intl.NumberFormat('en-IN', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 0
    }).format(number);
}

// --- Render Table Records ---
function renderTables() {
    // 1. Recent Purchases Table (Limit to 5)
    // Sort by dateTime descending
    const sorted = [...state.purchases].sort((a, b) => new Date(b.dateTime) - new Date(a.dateTime));
    const recent = sorted.slice(0, 5);
    
    DOM.recentTbody.innerHTML = '';
    if (recent.length === 0) {
        DOM.recentTbody.innerHTML = `<tr><td colspan="8" class="text-center">No purchases recorded yet. Click "Record New Purchase"!</td></tr>`;
    } else {
        recent.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${formatDate(p.dateTime)}</strong><br><small>${formatTime(p.dateTime)}</small></td>
                <td>${escapeHTML(p.customerName)}</td>
                <td><span class="catalog-tag-sm">${escapeHTML(p.sareeFabric)}</span></td>
                <td><code>${escapeHTML(p.sareeCode)}</code></td>
                <td>${p.qty}</td>
                <td><strong>${formatCurrency(p.totalAmount)}</strong></td>
                <td><span class="badge badge-${p.paymentMode.toLowerCase().replace('/','')}">${p.paymentMode}</span></td>
                <td><span class="badge badge-${p.status.toLowerCase().split('/')[0]}">${p.status}</span></td>
            `;
            DOM.recentTbody.appendChild(tr);
        });
    }

    // 2. Full Ledger Table (Filtered & Sorted)
    renderFullTable();
}

function renderFullTable() {
    const query = DOM.filterSearch.value.toLowerCase().trim();
    const fabric = DOM.filterFabric.value;
    const payment = DOM.filterPayment.value;
    const status = DOM.filterStatus.value;
    const sortVal = DOM.sortBy.value.split('-'); // e.g. ["dateTime", "desc"]
    
    // Filter
    let filtered = state.purchases.filter(p => {
        const matchesSearch = 
            p.customerName.toLowerCase().includes(query) || 
            (p.customerPhone && p.customerPhone.includes(query)) ||
            p.sareeCode.toLowerCase().includes(query) ||
            p.sareeFabric.toLowerCase().includes(query);
            
        const matchesFabric = !fabric || p.sareeFabric === fabric;
        const matchesPayment = !payment || p.paymentMode === payment;
        const matchesStatus = !status || p.status === status;
        
        return matchesSearch && matchesFabric && matchesPayment && matchesStatus;
    });
    
    // Sort
    const field = sortVal[0];
    const order = sortVal[1];
    filtered.sort((a, b) => {
        let valA = a[field];
        let valB = b[field];
        
        // Handle dates
        if (field === 'dateTime') {
            valA = new Date(valA);
            valB = new Date(valB);
        } else if (field === 'totalAmount' || field === 'qty') {
            valA = parseFloat(valA);
            valB = parseFloat(valB);
        } else {
            valA = valA.toString().toLowerCase();
            valB = valB.toString().toLowerCase();
        }
        
        if (valA < valB) return order === 'asc' ? -1 : 1;
        if (valA > valB) return order === 'asc' ? 1 : -1;
        return 0;
    });

    DOM.fullTbody.innerHTML = '';
    if (filtered.length === 0) {
        DOM.fullTbody.innerHTML = `<tr><td colspan="9" class="text-center">No matching records found.</td></tr>`;
    } else {
        filtered.forEach(p => {
            const discountText = parseFloat(p.discount) > 0 ? `<br><small style="color:var(--accent-crimson)">-${p.discount}% off</small>` : '';
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td><strong>${formatDate(p.dateTime)}</strong><br><small>${formatTime(p.dateTime)}</small></td>
                <td><strong>${escapeHTML(p.customerName)}</strong><br><small><i class="fa-solid fa-phone"></i> ${escapeHTML(p.customerPhone)}</small></td>
                <td><span class="catalog-tag-sm">${escapeHTML(p.sareeFabric)}</span><br><code>${escapeHTML(p.sareeCode)}</code></td>
                <td>${p.qty}</td>
                <td>₹${parseFloat(p.price).toFixed(0)}${discountText}</td>
                <td><strong>${formatCurrency(p.totalAmount)}</strong></td>
                <td><span class="badge badge-${p.paymentMode.toLowerCase().replace('/','')}">${p.paymentMode}</span></td>
                <td><span class="badge badge-${p.status.toLowerCase().split('/')[0]}">${p.status}</span></td>
                <td>
                    <div class="action-btn-row">
                        <button class="table-action-btn edit-btn" data-id="${p.id}" title="Edit Record"><i class="fa-solid fa-pen-to-square"></i></button>
                        <button class="table-action-btn delete-btn" data-id="${p.id}" title="Delete Record"><i class="fa-solid fa-trash-can"></i></button>
                    </div>
                </td>
            `;
            DOM.fullTbody.appendChild(tr);
        });
        
        // Attach event listeners to buttons
        DOM.fullTbody.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => editPurchaseRecord(btn.getAttribute('data-id')));
        });
        DOM.fullTbody.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => deletePurchaseRecord(btn.getAttribute('data-id')));
        });
    }
}

// --- Dynamic SVG Charts Renderer ---
function renderCharts() {
    renderTrendChart();
    renderDonutChart();
}

function renderTrendChart() {
    if (!DOM.svgTrend) return;
    
    // Get last 7 days list
    const dates = [];
    for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setDate(d.getDate() - i);
        dates.push(d.toISOString().split('T')[0]); // YYYY-MM-DD
    }

    // Group sales by day
    const dailyRev = {};
    dates.forEach(date => dailyRev[date] = 0);
    
    state.purchases.forEach(p => {
        if (p.status !== 'Returned') {
            const pDate = p.dateTime.split('T')[0];
            if (dailyRev[pDate] !== undefined) {
                dailyRev[pDate] += parseFloat(p.totalAmount) || 0;
            }
        }
    });

    const values = dates.map(date => dailyRev[date]);
    const maxVal = Math.max(...values, 5000); // Scale chart with min 5000 ceiling

    // Chart Dimensions: 500 x 220
    const paddingLeft = 60;
    const paddingRight = 30;
    const paddingTop = 20;
    const paddingBottom = 40;
    const chartWidth = 500 - paddingLeft - paddingRight;
    const chartHeight = 220 - paddingTop - paddingBottom;
    
    let svgContent = `
        <defs>
            <linearGradient id="trend-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="var(--accent-gold)" stop-opacity="0.3"/>
                <stop offset="100%" stop-color="var(--accent-gold)" stop-opacity="0.0"/>
            </linearGradient>
        </defs>
    `;

    // Draw Y gridlines and axis labels (4 divisions)
    for (let i = 0; i <= 4; i++) {
        const yVal = (maxVal / 4) * i;
        const yPos = paddingTop + chartHeight - (chartHeight * (i / 4));
        svgContent += `
            <line x1="${paddingLeft}" y1="${yPos}" x2="${500 - paddingRight}" y2="${yPos}" class="grid-line" />
            <text x="${paddingLeft - 8}" y="${yPos + 4}" text-anchor="end" class="axis-label">₹${yVal >= 1000 ? (yVal/1000).toFixed(0) + 'k' : yVal}</text>
        `;
    }

    // Generate line points
    const points = [];
    dates.forEach((date, index) => {
        const xPos = paddingLeft + (chartWidth * (index / 6));
        const yPos = paddingTop + chartHeight - (chartHeight * (values[index] / maxVal));
        points.push({ x: xPos, y: yPos, date, val: values[index] });
    });

    // Draw filled trend area
    let pathArea = `M ${points[0].x} ${paddingTop + chartHeight} `;
    points.forEach(pt => {
        pathArea += `L ${pt.x} ${pt.y} `;
    });
    pathArea += `L ${points[points.length - 1].x} ${paddingTop + chartHeight} Z`;
    svgContent += `<path d="${pathArea}" class="trend-area" />`;

    // Draw trend line
    let pathLine = `M ${points[0].x} ${points[0].y} `;
    for (let i = 1; i < points.length; i++) {
        pathLine += `L ${points[i].x} ${points[i].y} `;
    }
    svgContent += `<path d="${pathLine}" class="trend-line" />`;

    // Draw nodes and X labels
    points.forEach((pt, idx) => {
        const formattedDate = formatDateStringShort(pt.date);
        svgContent += `
            <circle cx="${pt.x}" cy="${pt.y}" r="5" class="chart-node">
                <title>${formattedDate}: ₹${pt.val.toFixed(0)}</title>
            </circle>
            <text x="${pt.x}" y="${220 - paddingBottom + 20}" text-anchor="middle" class="axis-label">${formattedDate}</text>
        `;
    });

    DOM.svgTrend.innerHTML = svgContent;
}

function renderDonutChart() {
    if (!DOM.svgDonut || !DOM.donutLegend) return;
    
    // Group sales by Saree Fabric type
    const groups = {};
    let totalSales = 0;
    
    state.purchases.forEach(p => {
        if (p.status !== 'Returned') {
            const fab = p.sareeFabric || "Other";
            groups[fab] = (groups[fab] || 0) + (parseFloat(p.totalAmount) || 0);
            totalSales += parseFloat(p.totalAmount) || 0;
        }
    });

    const colors = ["#4d0022", "#c73866", "#d4af37", "#2196f3", "#4caf50", "#9c27b0", "#ff9800"];
    
    DOM.svgDonut.innerHTML = '';
    DOM.donutLegend.innerHTML = '';
    
    const sortedGroups = Object.keys(groups)
        .map(key => ({ key, value: groups[key] }))
        .sort((a,b) => b.value - a.value);
        
    if (sortedGroups.length === 0 || totalSales === 0) {
        DOM.svgDonut.innerHTML = `
            <circle cx="100" cy="100" r="70" fill="none" stroke="#f0e2e7" stroke-width="25"></circle>
            <text x="100" y="105" text-anchor="middle" font-size="12" fill="var(--text-muted)">No Sales Data</text>
        `;
        DOM.donutLegend.innerHTML = '<div class="legend-item"><span class="legend-color" style="background-color:#f0e2e7"></span> No records yet</div>';
        return;
    }

    const radius = 60;
    const circumference = 2 * Math.PI * radius; // ~376.99
    
    let accumulatedPercent = 0;
    let donutSvg = '';

    sortedGroups.forEach((item, index) => {
        const color = colors[index % colors.length];
        const percent = item.value / totalSales;
        const strokeDash = percent * circumference;
        const strokeOffset = circumference - strokeDash + (accumulatedPercent * circumference);
        
        donutSvg += `
            <circle class="donut-segment" cx="100" cy="100" r="${radius}" 
                    stroke="${color}" stroke-dasharray="${strokeDash} ${circumference - strokeDash}" 
                    stroke-dashoffset="${strokeOffset}">
                <title>${item.key}: ₹${item.value.toFixed(0)} (${(percent*100).toFixed(1)}%)</title>
            </circle>
        `;
        
        accumulatedPercent -= percent; // Clockwise offset accumulation (negative value shifts segment clockwise)
        
        // Add legend element
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <span class="legend-color" style="background-color:${color}"></span>
            <span><strong>${item.key}</strong>: ₹${item.value >= 1000 ? (item.value/1000).toFixed(1) + 'k' : item.value.toFixed(0)} (${(percent*100).toFixed(0)}%)</span>
        `;
        DOM.donutLegend.appendChild(legendItem);
    });

    // Add center summary text
    donutSvg += `
        <circle cx="100" cy="100" r="45" fill="var(--bg-card)"></circle>
        <text x="100" y="98" text-anchor="middle" font-size="10" font-weight="600" fill="var(--text-muted)">TOTAL REVENUE</text>
        <text x="100" y="114" text-anchor="middle" font-size="14" font-weight="700" fill="var(--primary-burgundy)">₹${totalSales >= 100000 ? (totalSales/100000).toFixed(1) + 'L' : (totalSales/1000).toFixed(1) + 'k'}</text>
    `;
    
    DOM.svgDonut.innerHTML = donutSvg;
}

// --- Render Quick Saree Showcase Catalog ---
function renderCatalog() {
    DOM.catalogGrid.innerHTML = '';
    SAREE_CATALOG.forEach(saree => {
        const card = document.createElement('div');
        card.className = 'catalog-card';
        card.innerHTML = `
            <div class="catalog-img-container">
                <img src="${saree.image}" alt="${escapeHTML(saree.name)}">
                <span class="catalog-tag">${escapeHTML(saree.fabric)}</span>
            </div>
            <div class="catalog-body">
                <h3>${escapeHTML(saree.name)}</h3>
                <p class="catalog-desc">${escapeHTML(saree.description)}</p>
                <div class="catalog-price-row">
                    <span class="catalog-price">₹${saree.price.toLocaleString('en-IN')}</span>
                    <button class="btn btn-primary btn-sm btn-select-catalog" data-id="${saree.id}">
                        <i class="fa-solid fa-cart-plus"></i> Select & Bill
                    </button>
                </div>
            </div>
        `;
        DOM.catalogGrid.appendChild(card);
    });

    // Attach event listeners to "Select & Bill" buttons
    DOM.catalogGrid.querySelectorAll('.btn-select-catalog').forEach(btn => {
        btn.addEventListener('click', () => {
            const catId = btn.getAttribute('data-id');
            const item = SAREE_CATALOG.find(s => s.id === catId);
            if (item) {
                // Populate form and open modal
                openPurchaseForm({
                    sareeFabric: item.fabric,
                    sareeCode: item.code,
                    price: item.price,
                    qty: 1,
                    discount: 0
                });
            }
        });
    });
}

// --- Form & Modal Control Dialogs ---
function initFormListeners() {
    DOM.btnOpenForm.addEventListener('click', () => openPurchaseForm());
    DOM.btnCloseModal.addEventListener('click', closeModal);
    DOM.btnCancelForm.addEventListener('click', closeModal);
    
    // Auto-calculate Total when inputs change
    const recalc = () => {
        const price = parseFloat(DOM.formPrice.value) || 0;
        const qty = parseInt(DOM.formQty.value) || 1;
        const disc = parseFloat(DOM.formDiscount.value) || 0;
        
        const sub = price * qty;
        const total = sub - (sub * (disc / 100));
        
        DOM.formTotalDisplay.innerText = formatCurrency(total);
    };
    
    DOM.formPrice.addEventListener('input', recalc);
    DOM.formQty.addEventListener('input', recalc);
    DOM.formDiscount.addEventListener('input', recalc);
    
    // Form Submit Handler
    DOM.purchaseForm.addEventListener('submit', handleFormSubmit);
}

function openPurchaseForm(initialData = null) {
    DOM.purchaseForm.reset();
    DOM.formPurchaseId.value = '';
    DOM.modalTitle.innerHTML = `<i class="fa-solid fa-receipt gold-text"></i> Record Saree Purchase`;
    DOM.btnSubmitForm.innerHTML = `<i class="fa-solid fa-save"></i> Save Purchase`;
    
    // Pre-set Date & Time to current local time in ISO format compatible with datetime-local
    const now = new Date();
    // Offset local timezone
    const tzOffset = now.getTimezoneOffset() * 60000;
    const localISOTime = (new Date(now.getTime() - tzOffset)).toISOString().slice(0, 16);
    DOM.formDatetime.value = localISOTime;

    if (initialData) {
        if (initialData.id) {
            // Edit Mode
            DOM.formPurchaseId.value = initialData.id;
            DOM.modalTitle.innerHTML = `<i class="fa-solid fa-pen-to-square gold-text"></i> Edit Purchase Record`;
            DOM.btnSubmitForm.innerHTML = `<i class="fa-solid fa-check"></i> Update Record`;
            
            DOM.formCustomerName.value = initialData.customerName;
            DOM.formCustomerPhone.value = initialData.customerPhone || '';
            DOM.formSareeFabric.value = initialData.sareeFabric;
            DOM.formSareeCode.value = initialData.sareeCode;
            DOM.formPrice.value = initialData.price;
            DOM.formQty.value = initialData.qty;
            DOM.formDiscount.value = initialData.discount || 0;
            DOM.formDatetime.value = initialData.dateTime.slice(0,16); // format to datetime-local
            DOM.formPaymentMode.value = initialData.paymentMode;
            DOM.formStatus.value = initialData.status;
            DOM.formNotes.value = initialData.notes || '';
        } else {
            // Catalog Quick selection mode
            DOM.formSareeFabric.value = initialData.sareeFabric;
            DOM.formSareeCode.value = initialData.sareeCode;
            DOM.formPrice.value = initialData.price;
            DOM.formQty.value = initialData.qty;
            DOM.formDiscount.value = initialData.discount;
        }
    }
    
    // Update total amount display
    DOM.formPrice.dispatchEvent(new Event('input'));
    DOM.purchaseModal.classList.add('active');
}

function closeModal() {
    DOM.purchaseModal.classList.remove('active');
}

// --- Submit form data (Insert or Update) ---
async function handleFormSubmit(e) {
    e.preventDefault();
    
    const id = DOM.formPurchaseId.value;
    const name = DOM.formCustomerName.value.trim();
    const phone = DOM.formCustomerPhone.value.trim();
    const fabric = DOM.formSareeFabric.value;
    const code = DOM.formSareeCode.value.toUpperCase().trim();
    const price = parseFloat(DOM.formPrice.value) || 0;
    const qty = parseInt(DOM.formQty.value) || 1;
    const discount = parseFloat(DOM.formDiscount.value) || 0;
    const dateTime = new Date(DOM.formDatetime.value).toISOString();
    const payment = DOM.formPaymentMode.value;
    const status = DOM.formStatus.value;
    const notes = DOM.formNotes.value.trim();
    
    // Validation
    if (!name || !phone || !fabric || !code || price < 0 || qty < 1) {
        showToast('Please fill out all required fields correctly.', 'error');
        return;
    }
    
    const sub = price * qty;
    const totalAmount = sub - (sub * (discount / 100));
    
    const record = {
        id: id || generateUUID(),
        customerName: name,
        customerPhone: phone,
        sareeFabric: fabric,
        sareeCode: code,
        price,
        qty,
        discount,
        totalAmount,
        dateTime,
        paymentMode: payment,
        status,
        notes
    };
    
    if (state.isServerMode) {
        try {
            const response = await fetch('/api/purchases', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(record)
            });
            
            if (response.ok) {
                showToast(id ? 'Purchase record updated!' : 'Purchase record saved!', 'success');
            } else {
                throw new Error('API save returned error');
            }
        } catch (err) {
            showToast('Failed to save to localhost database files. Saving locally instead.', 'error');
            console.error(err);
            saveLocalRecord(record, id);
        }
    } else {
        saveLocalRecord(record, id);
    }
    
    closeModal();
    await loadPurchasesData();
}

function saveLocalRecord(record, isEdit) {
    if (isEdit) {
        const index = state.purchases.findIndex(p => p.id === isEdit);
        if (index !== -1) {
            state.purchases[index] = record;
        }
    } else {
        state.purchases.push(record);
    }
    localStorage.setItem('aimit_purchases', JSON.stringify(state.purchases));
    showToast(isEdit ? 'Record updated (Cache)' : 'Record saved (Cache)', 'success');
}

// --- Edit/Delete Triggers ---
function editPurchaseRecord(id) {
    const record = state.purchases.find(p => p.id === id);
    if (record) {
        openPurchaseForm(record);
    }
}

async function deletePurchaseRecord(id) {
    if (confirm('Are you sure you want to permanently delete this purchase record?')) {
        if (state.isServerMode) {
            try {
                const response = await fetch(`/api/purchases/${id}`, { method: 'DELETE' });
                if (response.ok) {
                    showToast('Record deleted successfully', 'success');
                } else {
                    throw new Error('API delete returned error');
                }
            } catch (err) {
                showToast('Failed to delete from server database. Deleting from local cache.', 'error');
                console.error(err);
                deleteLocalRecord(id);
            }
        } else {
            deleteLocalRecord(id);
        }
        await loadPurchasesData();
    }
}

function deleteLocalRecord(id) {
    state.purchases = state.purchases.filter(p => p.id !== id);
    localStorage.setItem('aimit_purchases', JSON.stringify(state.purchases));
    showToast('Record removed (Cache)', 'success');
}

// --- Filter and Search Event Listeners ---
function initFilterListeners() {
    DOM.filterSearch.addEventListener('input', renderFullTable);
    DOM.filterFabric.addEventListener('change', renderFullTable);
    DOM.filterPayment.addEventListener('change', renderFullTable);
    DOM.filterStatus.addEventListener('change', renderFullTable);
    DOM.sortBy.addEventListener('change', renderFullTable);
}

// --- Backup & Settings Listeners ---
function initBackupListeners() {
    // 1. Export CSV
    const exportCsvHandler = () => {
        if (state.purchases.length === 0) {
            showToast('No records available to export', 'error');
            return;
        }
        
        let csvContent = "data:text/csv;charset=utf-8,";
        // Header
        csvContent += "Purchase ID,Purchase Date,Purchase Time,Customer Name,Customer Phone,Fabric Type,Item Code,Price Per Saree,Qty,Discount %,Total Amount,Payment Mode,Status,Notes\r\n";
        
        state.purchases.forEach(p => {
            const dateStr = p.dateTime.split('T')[0];
            const timeStr = formatTime(p.dateTime);
            const notesClean = p.notes ? p.notes.replace(/"/g, '""').replace(/\n/g, ' ') : '';
            
            const row = [
                `"${p.id}"`,
                `"${dateStr}"`,
                `"${timeStr}"`,
                `"${p.customerName.replace(/"/g, '""')}"`,
                `"${p.customerPhone || ''}"`,
                `"${p.sareeFabric}"`,
                `"${p.sareeCode}"`,
                p.price,
                p.qty,
                p.discount || 0,
                p.totalAmount,
                `"${p.paymentMode}"`,
                `"${p.status}"`,
                `"${notesClean}"`
            ].join(",");
            csvContent += row + "\r\n";
        });
        
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `aimit_sales_ledger_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('CSV export downloaded successfully', 'success');
    };

    DOM.btnExportCsv.addEventListener('click', exportCsvHandler);
    DOM.btnSetExportCsv.addEventListener('click', exportCsvHandler);

    // 2. Export JSON Backup
    const exportJsonHandler = () => {
        if (state.purchases.length === 0) {
            showToast('No records available to export', 'error');
            return;
        }
        
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state.purchases, null, 2));
        const link = document.createElement("a");
        link.setAttribute("href", dataStr);
        link.setAttribute("download", `aimit_db_backup_${new Date().toISOString().split('T')[0]}.json`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showToast('JSON Backup downloaded successfully', 'success');
    };

    DOM.btnExportJson.addEventListener('click', exportJsonHandler);
    DOM.btnSetExportJson.addEventListener('click', exportJsonHandler);

    // 3. Import JSON Database
    DOM.importFileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            DOM.importFileName.innerText = file.name;
            DOM.btnImportDb.removeAttribute('disabled');
        } else {
            DOM.importFileName.innerText = 'No file selected';
            DOM.btnImportDb.setAttribute('disabled', 'true');
        }
    });

    DOM.btnImportDb.addEventListener('click', async () => {
        const file = DOM.importFileInput.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                const importedData = JSON.parse(event.target.result);
                
                // Basic structural validation
                if (!Array.isArray(importedData)) {
                    throw new Error('Imported file must contain a JSON array of records');
                }
                
                if (importedData.length > 0 && (!importedData[0].customerName || !importedData[0].totalAmount)) {
                    throw new Error('Invalid record properties. Verification failed.');
                }
                
                if (confirm(`Are you sure you want to restore database? This will merge ${importedData.length} records into your existing database.`)) {
                    // Merge records avoiding exact ID duplicates
                    const existingIds = new Set(state.purchases.map(p => p.id));
                    let mergedCount = 0;
                    
                    for (const item of importedData) {
                        if (!existingIds.has(item.id)) {
                            state.purchases.push(item);
                            
                            // If connected to server, write to it
                            if (state.isServerMode) {
                                await fetch('/api/purchases', {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify(item)
                                });
                            }
                            mergedCount++;
                        }
                    }
                    
                    if (!state.isServerMode) {
                        localStorage.setItem('aimit_purchases', JSON.stringify(state.purchases));
                    }
                    
                    showToast(`Restored database! Merged ${mergedCount} new records.`, 'success');
                    
                    // Reset input
                    DOM.importFileInput.value = '';
                    DOM.importFileName.innerText = 'No file selected';
                    DOM.btnImportDb.setAttribute('disabled', 'true');
                    
                    await loadPurchasesData();
                }
            } catch (err) {
                showToast(`Restore failed: ${err.message}`, 'error');
            }
        };
        reader.readAsText(file);
    });

    // 4. Factory Reset / Clear DB
    DOM.btnClearDb.addEventListener('click', async () => {
        const securityPhrase = "DELETE ALL";
        const promptVal = prompt(`DANGER ZONE: This will wipe out all customer billing ledger records! To confirm, type: "${securityPhrase}"`);
        
        if (promptVal === securityPhrase) {
            if (state.isServerMode) {
                try {
                    // Call server reset
                    // We can delete records one by one or expose a direct clear endpoint
                    // For safety and compatibility with server.ps1, let's delete them by looping
                    showToast('Purging records on localhost server...', 'info');
                    for (const item of state.purchases) {
                        await fetch(`/api/purchases/${item.id}`, { method: 'DELETE' });
                    }
                    showToast('Server ledger cleared!', 'success');
                } catch (e) {
                    showToast('Clear failed on server database.', 'error');
                }
            } else {
                localStorage.removeItem('aimit_purchases');
                showToast('Browser cache ledger cleared!', 'success');
            }
            await loadPurchasesData();
        } else if (promptVal !== null) {
            showToast('Factory reset cancelled. Incorrect confirmation phrase.', 'info');
        }
    });
}

// --- Helper Functions ---
function generateUUID() {
    return 'xxxx-xxxx-4xxx-yxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function formatDate(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function formatTime(isoString) {
    if (!isoString) return '';
    const date = new Date(isoString);
    return date.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

function formatDateStringShort(dateStr) {
    // Input: YYYY-MM-DD -> Output: DD MMM
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const parts = dateStr.split('-');
    if (parts.length !== 3) return dateStr;
    const day = parseInt(parts[2]);
    const month = months[parseInt(parts[1]) - 1];
    return `${day} ${month}`;
}

function escapeHTML(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
