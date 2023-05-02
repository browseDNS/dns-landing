import React, { useState } from 'react';

export default function Sidebar() {
    const [searchEngine, setSearchEngine] = useState('Google');
    const engines = {
        Google: 'https://www.google.com',
        DuckDuckGo: 'https://www.duckduckgo.com',
        Bing: 'https://www.bing.com',
        Yahoo: 'https://www.yahoo.com',
        "Brave Search": 'https://search.brave.com',
        Ecosia: 'https://www.ecosia.org'
    };
    const options = [
        [],
        [ "Web Search", engines[searchEngine], searchEngine ],
        [ "Enter URL", "/url" ],
        [ "Quick Links", "/links" ],
        [ "Community", "https://browsedns.net", "BrowseDNS" ],
        [ "Old Page", "https://dns.switchbru.com", "Switchbru" ],
        [ "Preferences", "/prefs" ],
    ];
    return (
        <div>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    {options.map((option) => {
                        const [ name, url, caption ] = option;
                        return (<li>
                        <a href={url} className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                        <svg aria-hidden="true" className="w-6 h-6 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path><path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path></svg>
                        <span className="flex-1 ml-3 whitespace-nowrap">{name}</span>
                        { caption && (<span className="inline-flex items-center justify-center px-2 ml-3 text-sm font-medium text-gray-800 bg-gray-200 rounded-full dark:bg-gray-700 dark:text-gray-300">{caption}</span>) }
                        </a>
                    </li>);
                })}
                </ul>
            </div>
            </aside>
        </div>
    )
}