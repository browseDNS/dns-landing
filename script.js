// (assumes they all use the same query format)
const engines = {
    'google-cse': { name: 'Google CSE', url: 'https://cse.google.com/cse?cx=a013d3bbc253f4f1c&q=' },
    'aol': { name: 'AOL', url: 'https://search.aol.com/aol/search?q=' },
    'ddg': { name: 'DuckDuckGo', url: 'https://html.duckduckgo.com/html/?q=' },
    'bing': { name: 'Bing', url: 'https://www.bing.com/search?q=' },
    'startpage': { name: 'StartPage', url: 'https://www.startpage.com/sp/search?query=' },
    'yahoo': { name: 'Yahoo', url: 'https://search.yahoo.com/search?p=' }
};

// folder and sub-folder layout for bookmarklet links
const config = [
    { id: 'forums', label: 'BrowseDNS Forums', icon: 'fas fa-comments', url: 'https://browsedns.net/', description: 'The official community forums for BrowseDNS news and support.' },
    { id: 'url', label: 'Enter URL Directly', icon: 'fas fa-keyboard', action: showUrlView, description: 'Type a website address directly to visit it.' },
    {
        id: 'knowledge', label: 'Knowledge', icon: 'fas fa-book', folder: [
            { type: 'header', label: 'Research & Learning' },
            { id: 'wiki', label: 'Wikipedia (Encyclopedia)', icon: 'fab fa-wikipedia-w', url: 'https://en.wikipedia.org/wiki/Main_Page', description: 'The free encyclopedia that anyone can edit.' },
            { label: 'Gutenberg (eBooks)', icon: 'fas fa-book-open', url: 'https://www.gutenberg.org', description: 'Over 70,000 free eBooks including the world\'s great literature.' },
            { label: "WolframAlpha (Math)", icon: "fas fa-calculator", url: "https://www.wolframalpha.com", description: 'Computational intelligence engine for math and facts.' },
            { label: "Ducksters (Educational)", icon: "fas fa-graduation-cap", url: "https://www.ducksters.com", description: 'Educational site for history, science, and geography.' },
            { label: "NASA Pic of the Day", icon: "fas fa-user-astronaut", url: "https://apod.nasa.gov", description: 'Discover the cosmos with a different image every day.' },

            // all work pretty well, but still too limited
            // { label: "Ology (Educational)", icon: "fas fa-graduation-cap", url: "https://www.amnh.org/explore/ology", description: 'Educational site for history, science, and geography.' },
            // { label: "Library of Congress", icon: "fas fa-book-open", url: "https://guides.loc.gov/main-reading-room", description: 'The largest library in the world.' },
            // { label: "OpenStax", icon: "fas fa-book", url: "https://openstax.org", description: 'Free, peer-reviewed, openly licensed textbooks.' },
            // { label: 'Internet Archive', icon: 'fas fa-archive', url: 'https://archive.org', description: 'A massive digital library of books, movies, software, and more.' },

            { type: 'header', label: 'News & Media' },
            { label: "NPR News (Text)", icon: "fas fa-align-left", url: "https://text.npr.org/", description: 'Lightweight text-only news from National Public Radio.' },
            { label: "Ground News", icon: "fas fa-balance-scale", url: "https://ground.news", description: 'Compare news coverage and bias from around the world.' },
            { label: 'CNN Lite', icon: 'fas fa-list', url: 'https://lite.cnn.com', description: 'Faster, text-based version of CNN news.' },
            { label: 'EFF Blog', icon: 'fas fa-gavel', url: 'https://www.eff.org/', description: 'Defending digital privacy, free speech, and innovation.' },
            { label: 'Reddit', icon: 'fab fa-reddit', url: 'https://old.reddit.com', description: 'The \'front page of the internet\' with a classic interface.' },
            { label: "SkimFeed", icon: "fas fa-rss", url: "https://skimfeed.com", description: 'Minimalist tech news aggregator for quick reading.' },

            { type: 'header', label: 'Gaming Guides' },
            { label: "GameFAQs", icon: "fas fa-gamepad", url: "https://gamefaqs.gamespot.com", description: 'Old-school gaming guides for many different platforms.' },
            { label: "Zelda Dungeon", icon: "fas fa-gamepad", url: "https://www.zeldadungeon.net", description: 'Comprehensive Zelda guides and walkthroughs.' },
            { label: "Bulbapedia", icon: "fas fa-gamepad", url: "https://bulbapedia.bulbagarden.net", description: 'Comprehensive Pokemon encyclopedia.' },
            { label: "Minecraft.net", icon: "fas fa-gamepad", url: "https://www.minecraft.net", description: 'The official website of Minecraft.' },
            { label: "IGN Guides", icon: "fas fa-gamepad", url: "https://www.ign.com/wikis", description: 'Game guides, walkthroughs, and more.' },
            { label: "Fandom Wikis", icon: "fas fa-gamepad", url: "https://fandom.com", description: 'Wikis for many different games and fandoms.' },
        ]
    },
    {
        id: 'entertainment', label: 'Entertainment', icon: 'fas fa-gamepad', folder: [
            { type: 'header', label: 'Creative & Social' },
            { label: 'Neocities', icon: 'fas fa-city', url: 'https://neocities.org', description: 'Browse and create personal websites for free.' },
            { label: 'SpaceHey', icon: 'fas fa-user-friends', url: 'https://spacehey.com', description: 'A retro social network inspired by early MySpace.' },
            { label: "Quotev (Quizzes)", icon: "fas fa-quote-left", url: "https://www.quotev.com/quizzes", description: 'Quizzes and stories curated by users.' },
            // none of the below sites run that well on switch
            // { label: 'FanFiction.net', icon: 'fas fa-book', url: 'https://www.fanfiction.net', description: 'One of the world\'s largest fanfiction archives.' },
            // { label: "Deviantart", icon: "fas fa-palette", url: "https://www.deviantart.com", description: 'Browse and share digital art.' },
            // { label: "Artstation", icon: "fas fa-palette", url: "https://www.artstation.com/?sort_by=community&dimension=all", description: 'Browse and share digital art.' },
            // { label: 'Artfol', icon: 'fas fa-palette', url: 'https://artfol.app/discover', description: 'A social network for artists to share their work.' },
            { label: 'Archive of Our Own (AO3)', icon: 'fas fa-bookmark', url: 'https://archiveofourown.org', description: 'A repository of fan-created fiction and transformative works.' },
            { label: 'Wattpad', icon: 'fas fa-pen-nib', url: 'https://www.wattpad.com', description: 'Discover and share original stories with a global audience.' },
            { label: "TV Tropes", icon: "fas fa-tv", url: "https://tvtropes.org", description: 'Facts and tropes in media with a humorous twist.' },

            { type: 'header', label: 'HTML5 Games' },
            { label: 'Google Pac-Man', icon: 'fas fa-ghost', url: 'https://www.google.com/logos/2010/pacman10-i.html', description: 'The classic arcade game in your browser.' },
            { label: '2048 Web', icon: 'fas fa-th-large', url: 'https://browsedns.github.io/2048/', description: 'A simple yet addictive number puzzle game.' },
            { label: 'Tetris Clone', icon: 'fas fa-shapes', url: 'https://realdekkia.github.io/switch-tetris/', description: 'A fan-made version of the classic block-stacking game.' },
            { label: 'Chrome Dino Game', icon: 'fas fa-dragon', url: 'https://browsedns.github.io/chrome-dino-gamepad/', description: 'The famous dinosaur runner game with controller support.' },
            { label: 'Slash Flash Games', icon: 'fas fa-gamepad', url: 'https://swordslasher.com/games/switch/', description: 'A collection of simple and fun web games.' },
            { label: 'Neal.fun', icon: 'fas fa-laugh-beam', url: 'https://neal.fun', description: 'A collection of quirky and fun web games/experiments.' },
            { label: 'Mini Newt Games', icon: 'fas fa-gamepad', url: 'https://mini.newt.games', description: 'A collection of simple and fun web games.' },
            { label: 'What beats rock?', icon: 'fas fa-gamepad', url: 'https://whatbeatsrock.com', description: 'Interactive game where you choose what beats rock.' },
            // { label: 'Google Snake Mods', icon: 'fas fa-gamepad', url: 'https://googlesnakemods.com/v/3/', description: 'Google snake with mods for ease of use.' },
            { label: '100Jumps', icon: 'fas fa-gamepad', url: 'https://boredzebra.com/100jumps/', description: 'A simple yet addictive jumping game.' },
            { label: 'Tic-Tac-Toe', icon: 'fas fa-gamepad', url: 'https://playtictactoe.org', description: 'Tic-Tac-Toe game with a simple interface.' },

            { type: 'header', label: 'Web Comics' },
            { label: "Webtoons", icon: "fas fa-book-reader", url: "https://www.webtoons.com", description: 'The most popular place to read digital comics.' },
            { label: "XKCD", icon: "fas fa-terminal", url: "https://www.xkcd.com", description: 'A webcomic of romance, sarcasm, math, and language.' },
            { label: "Awkward Zombie", icon: "fas fa-face-grin-beam-sweat", url: "https://www.awkwardzombie.com", description: 'Video game humor and web comics.' },
            { label: "Dinosaur Comics", icon: "fas fa-dragon", url: "https://www.qwantz.com", description: 'Philosophical musings through dinosaur dialogue.' },
            { label: "Poorly Drawn Lines", icon: "fas fa-pen-nib", url: "https://poorlydrawnlines.com", description: 'Absurdist humor and simple drawings.' },
            { label: "Garfield", icon: "fas fa-cat", url: "https://www.gocomics.com/garfield", description: 'The world\'s most famous orange fat cat.' },
            { label: "Calvin and Hobbes", icon: "fas fa-paw", url: "https://www.gocomics.com/calvinandhobbes", description: 'A boy and his tiger on grand adventures.' },
            { label: "Peanuts", icon: "fas fa-dog", url: "https://www.gocomics.com/peanuts", description: 'Charlie Brown and the gang.' },
            { label: "Foxtrot", icon: "fas fa-laptop-code", url: "https://www.gocomics.com/foxtrot", description: 'Family humor with a nerdy tech-loving son.' }
        ]
    },
    {
        id: 'utilities', label: 'Tools & Utilities', icon: 'fas fa-tools', folder: [
            { type: 'header', label: 'Daily Utility' },
            { label: 'WeatherIO', icon: 'fas fa-cloud-sun', url: 'http://browsedns.github.io/weatherio', description: 'Minimalist weather tracking for your location.' },
            { label: "Calculator", icon: "fas fa-calculator", url: "https://web2.0calc.com", description: 'Calculator with some advanced features.' },
            { label: 'Merciful.ai (AI Chat)', icon: 'fas fa-robot', url: 'https://merciful.ai', description: 'A simple, direct AI chat utility for questions and help.' },
            { label: "Bing Translate", icon: "fas fa-language", url: "https://www.bing.com/translator", description: 'Translate text and web pages between languages.' },
            { label: "Wiktionary", icon: "fas fa-book", url: "https://en.wiktionary.org/wiki/Wiktionary:Main_Page", description: 'Free dictionary similar to Wikipedia.' },
            { label: 'Time.is', icon: 'fas fa-clock', url: 'https://time.is', description: 'The exact time for any time zone.' },
            // { label: '3DSPaint', icon: 'fas fa-palette', url: 'https://3dspaint.com/paint/3dspaint.php', description: 'Simple web drawing app designed for the 3DS.' },

            { type: 'header', label: 'Network & Performance' },
            { label: 'UFO Test (FPS Check)', icon: 'fas fa-tachometer-alt', url: 'https://www.testufo.com', description: 'Check your monitor\'s refresh rate and motion clarity.' },
            { label: 'WebOS.js.org', icon: 'fas fa-gamepad', url: 'https://webos.js.org', description: 'Simulate differnet PC operating systems in your browser.' },
            { label: 'Fast.com (Speedtest)', icon: 'fas fa-tachometer-alt', url: 'https://fast.com', description: 'Simply see how fast your internet connection is.' },
            { label: 'IP.me (IP lookup)', icon: 'fas fa-info-circle', url: 'https://ip.me', description: 'Quickly find your public IP address and location info.' },
            { label: 'Pixel Unstucker', icon: 'fas fa-magic', url: 'https://www.jscreenfix.com/app/index.php', description: 'Cycles colors quickly to help fix stuck pixels on screens.' },

            { type: 'header', label: 'Email & Storage' },
            { label: 'Gmail', icon: 'fas fa-envelope', url: 'https://mail.google.com', description: 'Google\'s email service.' },
            { label: 'ProtonMail', icon: 'fas fa-envelope', url: 'https://protonmail.com', description: 'Secure, encrypted email service.' },
            { label: 'Eclipso.eu', icon: 'fas fa-envelope', url: 'https://www.eclipso.eu', description: 'Eclipso\'s email service.' },
            { label: "Google Drive", icon: "fas fa-folder", url: "https://drive.google.com", description: 'Google\'s cloud storage service.' },
            { label: "Dropbox", icon: "fas fa-folder", url: "https://www.dropbox.com", description: 'Dropbox\'s cloud storage service.' },
        ]
    },
    {
        id: 'resources', label: 'Resources & Dev', icon: 'fas fa-folder-open', folder: [
            { type: 'header', label: 'Community & Support' },
            { label: 'Internet Safety Info', icon: 'fas fa-user-shield', url: 'https://en.wikipedia.org/wiki/Internet_safety', description: 'Guidelines for staying safe and secure online.' },
            { label: 'Mental Health Resources', icon: 'fas fa-heartbeat', url: 'https://browsedns.net/topic/12331/mental-health-resources', description: 'Helpful links and support for mental well-being.' },
            { label: 'Switchbru Dashboard', icon: 'fas fa-desktop', url: 'https://dns.switchbru.com', description: 'The dashboard for BrowseDNS\'s predecessor service.' },
            { label: "Previous landing", icon: "fas fa-desktop", url: "./prev/index.html", description: 'The previous landing page for BrowseDNS with simple links.' },
            { label: "Sign the Petition!", icon: "fas fa-pen-to-square", url: "https://browsedns.net/topic/19/petition-to-nintendo-expose-the-switch-s-hidden-web-browser", description: 'The petition asking to enhance the Switch\'s web browser.' },
            { label: 'Leave Feedback', icon: 'fas fa-comment', url: 'https://docs.google.com/forms/d/e/1FAIpQLScE9QjXEl0vdOcAl7ixjyuNjgffYdp08ism16VlFPfoh_hKGA/viewform', description: 'Let us know your thoughts on the service, or submit URLs.' },

            { type: 'header', label: 'Web Development' },
            // { label: 'GitHub', icon: 'fab fa-github', url: 'https://github.com/browsedns', description: 'The source code for BrowseDNS.' },
            { label: 'Zdog', icon: 'fas fa-cube', url: 'https://zzz.dog', description: 'A 3D JavaScript engine for canvas and SVG with minimal requirements.' },
            { label: 'JPEG-XL', icon: 'fas fa-image', url: 'https://jpegxl.info/resources/jpeg-xl-test-page.html', description: 'A modern image format for the web, supports animations.' },
            { label: 'Eruda (Web console)', icon: 'fas fa-terminal', url: 'https://eruda.liriliri.io/docs/', description: 'Helps to inspect web pages on mobile devices.' },
            { label: 'GraphCoding', icon: 'fas fa-chart-line', url: 'https://vgmoose.dev/GraphCoding/', description: 'A web-based graphing calculator using javascript.' },
        ]
    }
];

let currentEngine = 'google-cse';
let isListView = false;
let currentFolderItems = []; // Store current folder items for re-rendering on toggle

function animateFadeIn(el, duration, cb) {
    el.style.opacity = '0';
    var start = null;
    function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        el.style.opacity = String(progress);
        if (progress < 1) {
            requestAnimationFrame(step);
        } else if (cb) {
            cb();
        }
    }
    requestAnimationFrame(step);
}

function animateFadeOut(el, duration, cb) {
    var startOpacity = parseFloat(el.style.opacity) || 1;
    var start = null;
    function step(ts) {
        if (!start) start = ts;
        var progress = Math.min((ts - start) / duration, 1);
        el.style.opacity = String(startOpacity * (1 - progress));
        if (progress < 1) {
            requestAnimationFrame(step);
        } else if (cb) {
            cb();
        }
    }
    requestAnimationFrame(step);
}

function init() {
    // Load preference
    const savedView = localStorage.getItem('isListView');
    if (savedView !== null) {
        isListView = (savedView === 'true');
    }

    renderGrid('main-grid', config);
    fetchStats();

    // Handle History navigation (Back/Forward buttons)
    window.onpopstate = function (e) {
        // If a modal was open and we hit back, close it
        const activeModal = document.querySelector('.modal-overlay.active');
        if (activeModal && (!e.state || !e.state.modal)) {
            closeModal(null, activeModal.id, true);
            return;
        }

        handleHashChange();
    };

    // Restore view from Hash on load
    handleHashChange();

    var mainView = document.getElementById('view-main');
    if (mainView && !window.location.hash) animateFadeIn(mainView, 300);

    setInterval(fetchStats, 300000);

    document.getElementById('search-query').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    document.getElementById('direct-url-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') visitUrl();
    });

    // if the referrer is one of the DNS landings, tag via ipnotes
    const dnses = ["http://45.55.142.122/", "http://45.55.112.11/", "http://46.101.65.164/"];
    const myReferrer = document.referrer;
    // const myReferrer = "http://45.55.112.11/"; // for debugging
    if (dnses.includes(myReferrer)) {
        // add iframe for the given dns's embed page to tag ipnotes
        const ipAddr = myReferrer.split("/")[2];
        const iframe = document.createElement('iframe');
        iframe.src = "https://ipnotes.page/direct/" + ipAddr;
        iframe.style.display = 'none';
        iframe.style.width = '1px';
        iframe.style.height = '1px';
        document.body.appendChild(iframe);
    }

    setTimeout(function () {
        document.getElementById('search-query').focus();
    }, 100);
}

function handleHashChange() {
    const hash = window.location.hash.substring(1);

    // close any open modals first for clean transition
    document.querySelectorAll('.modal-overlay').forEach(function (m) {
        if (m.classList.contains('active')) {
            closeModal(null, m.id, true);
        }
    });

    if (hash === 'url') {
        showUrlView(true);
    } else if (!hash || hash === 'main') {
        showMain(true);
    } else {
        const folder = findFolderById(config, hash);
        if (folder) {
            showFolder(hash, folder.label, folder.folder, true);
        } else {
            showMain(true);
        }
    }
}

function findFolderById(items, id) {
    for (const item of items) {
        if (item.id === id && item.folder) return item;
        if (item.folder) {
            const result = findFolderById(item.folder, id);
            if (result) return result;
        }
    }
    return null;
}

function renderGrid(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    container.className = 'icon-grid';

    items.forEach(item => {
        if (item.type === 'header') {
            const header = document.createElement('div');
            header.className = 'grid-header';
            header.innerText = item.label;
            container.appendChild(header);
            return;
        }

        const button = document.createElement('button');
        button.className = 'link-item';

        let iconHtml = "<div class=\"link-icon " + (item.folder ? 'folder-icon' : '') + "\"> "
            + "<i class=\"" + item.icon + "\"></i>"
            + (item.folder ? "<span class=\"folder-badge\">" + item.folder.length + "</span>" : '')
            + "</div>";

        button.innerHTML = iconHtml + "<div class=\"link-label\">" + item.label + "</div>";

        button.onclick = () => {
            if (item.folder) {
                showFolder(item.id, item.label, item.folder);
            } else if (item.action) {
                item.action();
            } else if (item.url) {
                window.location.href = item.url;
            }
        };

        container.appendChild(button);
    });
}

function renderList(containerId, items) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    container.className = 'list-grid';

    items.forEach(item => {
        if (item.type === 'header') {
            const header = document.createElement('div');
            header.className = 'list-header';
            header.innerText = item.label;
            container.appendChild(header);
            return;
        }

        const button = document.createElement('button');
        button.className = 'list-link-item';

        button.innerHTML = `
            <div class="list-link-icon"><i class="${item.icon}"></i></div>
            <div class="list-link-info">
                <div class="list-link-label">${item.label}</div>
                <div class="list-link-desc">${item.description || ''}</div>
            </div>
            <div class="list-link-arrow"><i class="fas fa-chevron-right"></i></div>
        `;

        button.onclick = () => {
            if (item.folder) {
                showFolder(item.id, item.label, item.folder);
            } else if (item.action) {
                item.action();
            } else if (item.url) {
                window.location.href = item.url;
            }
        };

        container.appendChild(button);
    });
}

function showFolder(id, title, items, skipHash) {
    document.getElementById('folder-title').innerText = title;
    currentFolderItems = items;

    if (!skipHash) {
        // if already in a folder/url, replace state
        const currentHash = window.location.hash;
        if (currentHash && currentHash !== '#') {
            window.location.replace('#' + id);
        } else {
            window.location.hash = id;
        }
    }

    renderFolder();
    switchView('view-folder');
}

function renderFolder() {
    const containerId = 'folder-grid';
    if (isListView) {
        renderList(containerId, currentFolderItems);
    } else {
        renderGrid(containerId, currentFolderItems);
    }
    // Update toggle icon
    const toggleBtn = document.getElementById('view-toggle');
    if (toggleBtn) {
        toggleBtn.innerHTML = isListView ? '<i class="fas fa-th"></i>' : '<i class="fas fa-list"></i>';
    }
}

function toggleViewMode() {
    isListView = !isListView;
    localStorage.setItem('isListView', isListView);
    renderFolder();
}

function showUrlView(skipHash) {
    if (!skipHash) {
        const currentHash = window.location.hash;
        if (currentHash && currentHash !== '#') {
            window.location.replace('#url');
        } else {
            window.location.hash = 'url';
        }
    }
    switchView('view-url');
    setTimeout(() => document.getElementById('direct-url-input').focus(), 100);
}

function showMain(skipHash) {
    if (!skipHash) {
        // UI Back button: If we have a hash, go back in history
        if (window.location.hash && window.location.hash !== '#') {
            history.back();
        } else {
            showMain(true);
        }
        return;
    }

    // Internal switch to main
    if (window.location.hash !== '') {
        // If we were forced here by skipHash but still have a hash, 
        // we might need to clear it, but usually this is called via handleHashChange
    }

    switchView('view-main');
}

function switchView(id) {
    var currentActive = document.querySelector('.view.active');
    var nextView = document.getElementById(id);

    function showNext() {
        document.querySelectorAll('.view').forEach(function (v) {
            v.classList.remove('active');
            v.style.opacity = '0';
        });
        nextView.classList.add('active');
        animateFadeIn(nextView, 150);

        var searchSection = document.getElementById('search-container');
        var branding = document.querySelector('.branding');

        // Hide search bar and branding for URL view AND folders
        if (id === 'view-url' || id === 'view-folder') {
            if (searchSection) {
                searchSection.style.opacity = '0';
                searchSection.style.pointerEvents = 'none';
                searchSection.style.marginTop = '-100px';
            }
            if (branding) {
                branding.style.display = 'none';
            }
        } else {
            if (searchSection) {
                searchSection.style.opacity = '1';
                searchSection.style.pointerEvents = 'all';
                searchSection.style.marginTop = '0';
            }
            if (branding) {
                branding.style.display = 'block';
            }
        }
    }

    if (currentActive && currentActive.id !== id) {
        animateFadeOut(currentActive, 80, showNext);
    } else {
        showNext();
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

function openModal(id) {
    var overlay = document.getElementById(id);
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    animateFadeIn(overlay, 150);

    // push a state so "Back" will close the modal
    history.pushState({ modal: id }, null, window.location.hash);
}

function closeModal(e, id, skipHistory) {
    var overlay = document.getElementById(id);
    if (!e || e.target === overlay || skipHistory) {
        animateFadeOut(overlay, 120, function () {
            overlay.classList.remove('active');
            overlay.style.opacity = '0';
            document.body.style.overflow = 'auto';
        });

        // if closed manually (e.g. click "X"), and we added a state, go back
        if (!skipHistory) {
            history.back();
        }
    }
}

// Stats Fetching Logic
async function fetchStats() {
    const servers = [
        { id: 'east', ip: '45.55.142.122', label: 'US East' },
        { id: 'west', ip: '45.55.112.11', label: 'US West' },
        { id: 'uk', ip: '46.101.65.164', label: 'Europe' }
    ];

    for (const server of servers) {
        try {
            const response = await fetch(`https://ipnotes.page/stats?domain=${server.ip}`);
            const data = await response.json();
            const count = data.count || 0;
            updateStatUI(server.id, server.label, count);
        } catch (error) {
            console.error(`Status error for ${server.ip}:`, error);
            updateStatUI(server.id, server.label, 0, true);
        }
    }
}

function updateStatUI(id, label, count, error = false) {
    const tickerItem = document.getElementById(`stat-${id}`);
    const tableItem = document.getElementById(`table-stat-${id}`);
    const dot = tickerItem.querySelector('.status-dot');
    const text = tickerItem.querySelector('span');

    dot.className = 'status-dot';
    if (error) {
        dot.classList.add('inactive');
        text.innerText = `${label}: Offline`;
        if (tableItem) tableItem.innerHTML = '<span style="color: var(--accent-red)">N/A</span>';
    } else if (count > 0) {
        dot.classList.add('active');
        text.innerText = `${label}: ${count}`;
        if (tableItem) tableItem.innerHTML = `<span style="color: #4ade80">${count}</span>`;
    } else {
        dot.classList.add('inactive');
        text.innerText = `${label}: 0`;
        if (tableItem) tableItem.innerHTML = '<span style="color: var(--accent-red)">0</span>';
    }
}

// Close tray on click outside
window.onclick = (e) => {
    if (!e.target.closest('.search-engine-label')) {
        document.getElementById('advanced-tray').classList.remove('active');
    }
};

init();