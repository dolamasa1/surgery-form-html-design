// Medical diagnosis data
const diagnosticData = {
    cardiovascular: [
        {
            id: 1,
            name: "Myocardial Infarction",
            code: "I21.9",
            description: "Acute ST-elevation myocardial infarction of unspecified site",
            priority: "high",
            cases: 45,
            avgDuration: "7 days",
            costRange: "$15,000 - $45,000",
            hasConflict: false
        },
        {
            id: 2,
            name: "Atrial Fibrillation",
            code: "I48.91",
            description: "Unspecified atrial fibrillation with rapid ventricular response",
            priority: "medium",
            cases: 73,
            avgDuration: "Chronic",
            costRange: "$8,000 - $25,000",
            hasConflict: true
        },
        {
            id: 3,
            name: "Hypertensive Crisis",
            code: "I16.9",
            description: "Hypertensive crisis, unspecified",
            priority: "high",
            cases: 28,
            avgDuration: "3 days",
            costRange: "$5,000 - $15,000",
            hasConflict: false
        },
        {
            id: 4,
            name: "Heart Failure",
            code: "I50.9",
            description: "Heart failure, unspecified",
            priority: "medium",
            cases: 89,
            avgDuration: "14 days",
            costRange: "$12,000 - $35,000",
            hasConflict: false
        }
    ],
    respiratory: [
        {
            id: 5,
            name: "Acute Respiratory Failure",
            code: "J96.00",
            description: "Acute respiratory failure, unspecified whether with hypoxia or hypercapnia",
            priority: "high",
            cases: 52,
            avgDuration: "5 days",
            costRange: "$18,000 - $55,000",
            hasConflict: false
        },
        {
            id: 6,
            name: "Pneumonia",
            code: "J18.9",
            description: "Pneumonia, unspecified organism",
            priority: "medium",
            cases: 134,
            avgDuration: "7 days",
            costRange: "$8,000 - $22,000",
            hasConflict: false
        }
    ]
};

let currentCategory = 'cardiovascular';
let selectedDiagnosis = null;

// Initialize the application
function init() {
    renderDiagnosticCards();
    setupEventListeners();
    updateDetailPanel(diagnosticData.cardiovascular[0]);
}

// Render diagnostic cards
function renderDiagnosticCards() {
    const grid = document.getElementById('diagnosticGrid');
    const data = diagnosticData[currentCategory] || [];
    
    grid.innerHTML = data.map(diagnosis => `
        <div class="diagnostic-card ${diagnosis.priority}-priority" data-id="${diagnosis.id}">
            ${diagnosis.hasConflict ? '<div class="conflict-indicator">!</div>' : ''}
            <div class="card-header">
                <div>
                    <div class="diagnosis-name">${diagnosis.name}</div>
                    <div class="diagnosis-code">${diagnosis.code}</div>
                </div>
                <div class="priority-indicator priority-${diagnosis.priority}"></div>
            </div>
            <div class="diagnosis-description">${diagnosis.description}</div>
            <div class="diagnosis-stats">
                <div class="stat-item">
                    <div class="stat-label">Cases</div>
                    <div class="stat-value">${diagnosis.cases}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Avg Duration</div>
                    <div class="stat-value">${diagnosis.avgDuration}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Cost Range</div>
                    <div class="stat-value cost-range">${diagnosis.costRange}</div>
                </div>
            </div>
            <div class="card-actions">
                <button class="action-btn primary">View Details</button>
                <button class="action-btn">Edit</button>
                <button class="action-btn">Clone</button>
            </div>
        </div>
    `).join('');
}

// Update detail panel
function updateDetailPanel(diagnosis) {
    if (!diagnosis) return;
    
    document.getElementById('detailTitle').textContent = diagnosis.name;
    document.getElementById('detailSubtitle').textContent = `ICD-10: ${diagnosis.code}`;
    document.getElementById('clinicalOverview').textContent = diagnosis.description;
    selectedDiagnosis = diagnosis;
}

// Setup event listeners
function setupEventListeners() {
    // Category navigation
    document.querySelectorAll('[data-category]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Update active state
            document.querySelectorAll('.taxonomy-link').forEach(l => l.classList.remove('active'));
            e.currentTarget.classList.add('active');
            
            // Update current category
            const category = e.currentTarget.dataset.category;
            if (category !== currentCategory) {
                currentCategory = category;
                renderDiagnosticCards();
                
                // Update breadcrumb
                const breadcrumb = document.querySelector('.breadcrumb');
                breadcrumb.innerHTML = `
                    <span class="breadcrumb-item">Medical Conditions</span>
                    <span class="breadcrumb-separator">›</span>
                    <span class="breadcrumb-item">${category.charAt(0).toUpperCase() + category.slice(1)}</span>
                `;
            }
        });
    });

    // Diagnostic card clicks
    document.addEventListener('click', (e) => {
        const card = e.target.closest('.diagnostic-card');
        if (card) {
            const id = parseInt(card.dataset.id);
            const allData = [...diagnosticData.cardiovascular, ...diagnosticData.respiratory];
            const diagnosis = allData.find(d => d.id === id);
            if (diagnosis) {
                updateDetailPanel(diagnosis);
                
                // Visual feedback
                document.querySelectorAll('.diagnostic-card').forEach(c => c.style.transform = '');
                card.style.transform = 'scale(0.98)';
                setTimeout(() => card.style.transform = '', 200);
            }
        }
    });

    // Search functionality
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        if (query) {
            filterDiagnostics(query);
        } else {
            renderDiagnosticCards();
        }
    });

    // Floating action buttons
    document.getElementById('addCase').addEventListener('click', () => {
        showNotification('Add New Case feature would open here');
    });

    document.getElementById('exportData').addEventListener('click', () => {
        showNotification('Export functionality would initiate here');
    });

    // Quick actions
    document.getElementById('recentCases').addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Recent Cases view would load here');
    });

    document.getElementById('conflictResolution').addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Conflict Resolution interface would open here');
    });

    document.getElementById('auditTrail').addEventListener('click', (e) => {
        e.preventDefault();
        showNotification('Audit Trail would display here');
    });
}

// Filter diagnostics based on search
function filterDiagnostics(query) {
    const grid = document.getElementById('diagnosticGrid');
    const allData = [...diagnosticData.cardiovascular, ...diagnosticData.respiratory];
    
    const filtered = allData.filter(d => 
        d.name.toLowerCase().includes(query) ||
        d.code.toLowerCase().includes(query) ||
        d.description.toLowerCase().includes(query)
    );

    grid.innerHTML = filtered.map(diagnosis => `
        <div class="diagnostic-card ${diagnosis.priority}-priority" data-id="${diagnosis.id}">
            ${diagnosis.hasConflict ? '<div class="conflict-indicator">!</div>' : ''}
            <div class="card-header">
                <div>
                    <div class="diagnosis-name">${diagnosis.name}</div>
                    <div class="diagnosis-code">${diagnosis.code}</div>
                </div>
                <div class="priority-indicator priority-${diagnosis.priority}"></div>
            </div>
            <div class="diagnosis-description">${diagnosis.description}</div>
            <div class="diagnosis-stats">
                <div class="stat-item">
                    <div class="stat-label">Cases</div>
                    <div class="stat-value">${diagnosis.cases}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Avg Duration</div>
                    <div class="stat-value">${diagnosis.avgDuration}</div>
                </div>
                <div class="stat-item">
                    <div class="stat-label">Cost Range</div>
                    <div class="stat-value cost-range">${diagnosis.costRange}</div>
                </div>
            </div>
            <div class="card-actions">
                <button class="action-btn primary">View Details</button>
                <button class="action-btn">Edit</button>
                <button class="action-btn">Clone</button>
            </div>
        </div>
    `).join('');
}

// Show notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 32px;
        background: linear-gradient(135deg, #00d4ff 0%, #0066ff 100%);
        color: #000;
        padding: 16px 24px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        box-shadow: 0 4px 16px rgba(0, 212, 255, 0.3);
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Simulate real-time updates
function simulateRealTimeUpdates() {
    setInterval(() => {
        // Update status bar timestamps
        const statusItems = document.querySelectorAll('.status-item');
        const syncItem = Array.from(statusItems).find(item => 
            item.textContent.includes('Last Sync')
        );
        if (syncItem) {
            const minutes = Math.floor(Math.random() * 5) + 1;
            syncItem.textContent = `Last Sync: ${minutes} minute${minutes > 1 ? 's' : ''} ago`;
        }
        
        // Randomly update case counts
        const caseCountElements = document.querySelectorAll('.case-count');
        caseCountElements.forEach(element => {
            if (Math.random() < 0.1) { // 10% chance to update
                const currentCount = parseInt(element.textContent);
                const change = Math.random() < 0.5 ? -1 : 1;
                element.textContent = Math.max(0, currentCount + change);
            }
        });
    }, 30000); // Update every 30 seconds
}

// Advanced search with autocomplete
function setupAdvancedSearch() {
    const searchInput = document.getElementById('searchInput');
    const allData = [...diagnosticData.cardiovascular, ...diagnosticData.respiratory];
    
    // Create autocomplete suggestions
    const suggestions = [];
    allData.forEach(d => {
        suggestions.push(d.name, d.code, ...d.description.split(' ').filter(word => word.length > 3));
    });
    
    const uniqueSuggestions = [...new Set(suggestions)].sort();
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd + K to focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            searchInput.focus();
            searchInput.select();
        }
        
        // Escape to clear search
        if (e.key === 'Escape' && document.activeElement === searchInput) {
            searchInput.value = '';
            renderDiagnosticCards();
        }
    });
}

// Initialize conflict detection system
function initConflictDetection() {
    const conflictCards = document.querySelectorAll('.diagnostic-card');
    
    conflictCards.forEach(card => {
        const conflictIndicator = card.querySelector('.conflict-indicator');
        if (conflictIndicator) {
            card.addEventListener('mouseenter', () => {
                // Show conflict tooltip
                const tooltip = document.createElement('div');
                tooltip.style.cssText = `
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: #ff4757;
                    color: white;
                    padding: 8px 12px;
                    border-radius: 4px;
                    font-size: 12px;
                    white-space: nowrap;
                    z-index: 10;
                `;
                tooltip.textContent = 'Diagnostic conflict detected';
                
                card.style.position = 'relative';
                card.appendChild(tooltip);
            });
            
            card.addEventListener('mouseleave', () => {
                const tooltip = card.querySelector('div[style*="position: absolute"]');
                if (tooltip) {
                    card.removeChild(tooltip);
                }
            });
        }
    });
}

// Performance monitoring
function initPerformanceMonitoring() {
    let interactionCount = 0;
    let startTime = Date.now();
    
    document.addEventListener('click', () => {
        interactionCount++;
    });
    
    // Update performance stats every minute
    setInterval(() => {
        const uptime = Math.floor((Date.now() - startTime) / 60000);
        const interactionsPerMinute = uptime > 0 ? Math.floor(interactionCount / uptime) : 0;
        
        // Could display this in status bar or send to analytics
        console.log(`Uptime: ${uptime}m, Interactions/min: ${interactionsPerMinute}`);
    }, 60000);
}

// Data validation and integrity checks
function validateDataIntegrity() {
    const allData = [...diagnosticData.cardiovascular, ...diagnosticData.respiratory];
    const issues = [];
    
    allData.forEach(diagnosis => {
        // Check for required fields
        if (!diagnosis.name || !diagnosis.code) {
            issues.push(`Missing required fields for diagnosis ID: ${diagnosis.id}`);
        }
        
        // Validate ICD codes format
        if (diagnosis.code && !/^[A-Z]\d{2}(\.\d{1,2})?$/.test(diagnosis.code)) {
            issues.push(`Invalid ICD-10 code format: ${diagnosis.code}`);
        }
        
        // Check for duplicate codes
        const duplicates = allData.filter(d => d.code === diagnosis.code && d.id !== diagnosis.id);
        if (duplicates.length > 0) {
            issues.push(`Duplicate ICD code detected: ${diagnosis.code}`);
        }
    });
    
    if (issues.length > 0) {
        console.warn('Data integrity issues found:', issues);
        // In a real application, this would trigger alerts or logging
    }
}

// Accessibility enhancements
function enhanceAccessibility() {
    // Add ARIA labels and roles
    document.querySelectorAll('.diagnostic-card').forEach((card, index) => {
        card.setAttribute('role', 'button');
        card.setAttribute('tabindex', '0');
        card.setAttribute('aria-label', `Diagnostic card ${index + 1}`);
        
        // Add keyboard navigation
        card.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });
    
    // Announce dynamic content changes to screen readers
    const announcer = document.createElement('div');
    announcer.setAttribute('aria-live', 'polite');
    announcer.setAttribute('aria-atomic', 'true');
    announcer.style.cssText = `
        position: absolute;
        left: -9999px;
        width: 1px;
        height: 1px;
        overflow: hidden;
    `;
    document.body.appendChild(announcer);
    
    // Function to announce changes
    window.announceChange = function(message) {
        announcer.textContent = message;
    };
}

// Initialize all systems
document.addEventListener('DOMContentLoaded', () => {
    init();
    setupAdvancedSearch();
    simulateRealTimeUpdates();
    validateDataIntegrity();
    enhanceAccessibility();
    
    // Initialize conflict detection after cards are rendered
    setTimeout(initConflictDetection, 100);
    
    // Initialize performance monitoring
    initPerformanceMonitoring();
    
    // Show welcome notification
    setTimeout(() => {
        showNotification('Medical Diagnosis Management System Ready');
    }, 1000);
});