// (assumes they all use the same query format)
const engines = {
    'google-cse': { name: 'Google CSE', url: 'https://cse.google.com/cse?cx=a013d3bbc253f4f1c&q=' },
    'google': { name: 'Google', url: 'https://www.google.com/search?q=' },
    'ddg': { name: 'DuckDuckGo', url: 'https://duckduckgo.com/?q=' },
    'bing': { name: 'Bing', url: 'https://www.bing.com/search?q=' },
    'startpage': { name: 'StartPage', url: 'https://www.startpage.com/sp/search?query=' },
    'yahoo': { name: 'Yahoo', url: 'https://search.yahoo.com/search?p=' }
};

// folder and sub-folder layout for bookmarklet links
const config = [
    { id: 'forums', label: 'BDNS Forums', icon: 'fas fa-comments', url: 'https://browsedns.net/' },
    { id: 'url', label: 'Enter URL', icon: 'fas fa-keyboard', action: showUrlView },
    { id: 'wiki', label: 'Wikipedia (Free Encyclopedia)', icon: 'fab fa-wikipedia-w', url: 'https://www.wikipedia.org' },
    {
        id: 'games', label: 'Games', icon: 'fas fa-gamepad', folder: [
            { label: 'Google Pac-Man', icon: 'fas fa-ghost', url: 'https://www.google.com/logos/2010/pacman10-i.html' },
            { label: '2048', icon: 'fas fa-th-large', url: 'https://browsedns.github.io/2048/' },
            { label: 'Tetris', icon: 'fas fa-shapes', url: 'https://realdekkia.github.io/switch-tetris/' },
            { label: 'Chrome Dino Game', icon: 'fas fa-dragon', url: 'https://browsedns.github.io/chrome-dino-gamepad/' }
        ]
    },
    {
        id: 'resources', label: 'Resources', icon: 'fas fa-folder-open', folder: [
            { label: 'Archive of Our Own (AO3)', icon: 'fas fa-bookmark', url: 'https://archiveofourown.org' },
            { label: 'Project Gutenberg (eBooks)', icon: 'fas fa-book-open', url: 'https://www.gutenberg.org' },
            { label: 'EFF (Electronic Frontier Foundation)', icon: 'fas fa-gavel', url: 'https://www.eff.org/' },
            { label: 'Internet Safety Info', icon: 'fas fa-user-shield', url: 'https://en.wikipedia.org/wiki/Internet_safety' },
            { label: 'Mental Health Resources', icon: 'fas fa-heartbeat', url: 'https://browsedns.net/topic/12331/mental-health-resources' }
        ]
    },
    {
        id: 'legacy', label: 'Legacy', icon: 'fas fa-history', folder: [
            { label: 'Switchbru', icon: 'fas fa-desktop', url: 'https://dns.switchbru.com' },
            { label: 'Old Landing', icon: 'fas fa-file-alt', url: 'prev/index.html' }
        ]
    }
];

let currentEngine = 'google-cse';

function init() {
    renderGrid('main-grid', config);
    setupTheme();

    // Hook up enter keys
    document.getElementById('search-query').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    document.getElementById('direct-url-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') visitUrl();
    });

    // Focus on search bar on page load after delay
    setTimeout(function () {
        document.getElementById('search-query').focus();
    }, 100);
}

function renderGrid(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    items.forEach(item => {
        const button = document.createElement('button');
        button.className = 'link-item';

        let iconHtml = "<div class=\"link-icon " + (item.folder ? 'folder-icon' : '') + "\"> "
            + "<i class=\"" + item.icon + "\"></i>"
            + (item.folder ? "<span class=\"folder-badge\">" + item.folder.length + "</span>" : '')
            + "</div>";

        button.innerHTML = iconHtml + "<div class=\"link-label\">" + item.label + "</div>";

        button.onclick = () => {
            if (item.folder) {
                showFolder(item.label, item.folder);
            } else if (item.action) {
                item.action();
            } else if (item.url) {
                window.location.href = item.url;
            }
        };

        container.appendChild(button);
    });
}

function showFolder(title, items) {
    document.getElementById('folder-title').innerText = title;
    renderGrid('folder-grid', items);
    switchView('view-folder');
}

function showUrlView() {
    switchView('view-url');
    setTimeout(() => document.getElementById('direct-url-input').focus(), 100);
}

function showMain() {
    switchView('view-main');
}

function switchView(id) {
    document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
    document.getElementById(id).classList.add('active');

    // Hide search if in URL view to clean up
    const searchSection = document.getElementById('search-container');
    if (id === 'view-url') {
        searchSection.style.opacity = '0';
        searchSection.style.pointerEvents = 'none';
        searchSection.style.marginTop = '-100px';
    } else {
        searchSection.style.opacity = '1';
        searchSection.style.pointerEvents = 'all';
        searchSection.style.marginTop = '0';
    }
}

function performSearch() {
    const query = document.getElementById('search-query').value;
    if (query.trim() !== "") {
        window.location.href = engines[currentEngine].url + encodeURIComponent(query);
    }
}

function visitUrl() {
    let url = document.getElementById('direct-url-input').value.trim();
    if (url !== "") {
        if (!url.toLowerCase().startsWith('http://') && !url.toLowerCase().startsWith('https://')) {
            url = 'http://' + url;
        }
        window.location.href = url;
    }
}

function setEngine(id) {
    currentEngine = id;
    document.getElementById('current-engine-name').innerText = engines[id].name;
    document.querySelectorAll('.engine-btn').forEach(btn => {
        btn.classList.toggle('active', btn.innerText.includes(engines[id].name));
    });
    document.getElementById('advanced-tray').classList.remove('active');
}

function toggleAdvanced(e) {
    e.stopPropagation();
    document.getElementById('advanced-tray').classList.toggle('active');
}

function setupTheme() {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    setTheme(prefersDark.matches ? 'dark' : 'light');

    prefersDark.addEventListener('change', e => {
        setTheme(e.matches ? 'dark' : 'light');
    });
}

function setTheme(theme) {
    document.body.setAttribute('data-theme', theme);
    document.querySelectorAll('.engine-btn').forEach(btn => {
        if (btn.innerText.toLowerCase() === theme) btn.classList.add('active');
        else if (['light', 'dark'].includes(btn.innerText.toLowerCase())) btn.classList.remove('active');
    });
}

function openModal(id) {
    document.getElementById(id).classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal(e, id) {
    if (!e || e.target === document.getElementById(id)) {
        document.getElementById(id).classList.remove('active');
        document.body.style.overflow = 'auto';
    }
}

// Close tray on click outside
window.onclick = () => {
    document.getElementById('advanced-tray').classList.remove('active');
};

init();