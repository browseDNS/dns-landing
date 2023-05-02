export default function Navbar() {
    return (
        <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                <div className="flex items-center justify-start">
                    <a href="https://landing.browsedns.net" className="flex ml-2 md:mr-24">
                    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8 mr-3" alt="BrowseDNS Logo" />
                    <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">BrowseDNS</span>
                    </a>
                </div>
                {/* <div className="flex items-center">
                    <div className="flex items-center ml-3">
                        <div className="z-50 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600" id="dropdown-user">
                        <div className="px-4 py-3" role="none">
                            <p className="text-sm text-gray-900 dark:text-white" role="none">
                            BrowseDNS (US)
                            </p>
                            <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300" role="none">
                            45.55.142.122
                            </p>
                        </div>
                        </div>
                    </div>
                    </div> */}
                </div>
            </div>
            </nav>
    )
}