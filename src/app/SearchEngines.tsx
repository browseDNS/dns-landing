export type SearchEngineEnum = keyof typeof searchEngines;

export type SearchEngine = {
    url: string;
    icon: string;
    pattern: string;
};

export const searchEngines = {
    "Google": {
        url: 'https://www.google.com',
        icon: '',
        pattern: 'https://www.google.com/search?q=%s',
    },
    "DuckDuckGo": {
        url: 'https://www.duckduckgo.com',
        icon: '',
        pattern: 'https://www.duckduckgo.com/?q=%s',
    },
    "Bing": {
        url: 'https://www.bing.com',
        icon: '',
        pattern: 'https://www.bing.com/search?q=%s',
    },
    "Yahoo": {
        url: 'https://www.yahoo.com',
        icon: '',
        pattern: 'https://search.yahoo.com/search?p=%s',
    },
    "Brave Search": {
        url: 'https://search.brave.com',
        icon: '',
        pattern: 'https://search.brave.com/search?q=%s',
    },
    "Ecosia": {
        url: 'https://www.ecosia.org',
        icon: '',
        pattern: 'https://www.ecosia.org/search?q=%s',
    },
    "Qwant": {
        url: 'https://www.qwant.com',
        icon: '',
        pattern: 'https://www.qwant.com/?q=%s',
    },
    "Startpage": {
        url: 'https://www.startpage.com',
        icon: '',
        pattern: 'https://www.startpage.com/do/search?q=%s',
    },
    "Yandex": {
        url: 'https://www.yandex.com',
        icon: '',
        pattern: 'https://www.yandex.com/search/?text=%s',
    },
    "Baidu": {
        url: 'https://www.baidu.com',
        icon: '',
        pattern: 'https://www.baidu.com/s?wd=%s',
    },
};