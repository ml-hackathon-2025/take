import React from 'react'

import { NavLink, Outlet } from "react-router";
import { useEffect, useState } from "react";

const AppShell: React.FC = () => {
    const [darkMode, setDarkMode] = useState(() => {
        if (typeof window !== "undefined") {
            return document.documentElement.classList.contains("dark");
        }
        return false;
    });

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [darkMode]);
    return (
            <div className="min-h-dvh grid grid-cols-12 bg-gray-50 dark:bg-gray-900">
                <aside className="col-span-2 border-r bg-white dark:bg-gray-950 p-6 flex flex-col items-stretch shadow-sm">
                    <h1 className="font-bold text-xl mb-6 tracking-tight text-blue-700 dark:text-blue-300">AssetCheck</h1>
                    <button
                        className="mb-6 px-3 py-2 rounded bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors font-medium"
                        onClick={() => setDarkMode((d) => !d)}
                        aria-label="Toggle dark mode"
                    >
                        {darkMode ? '🌙 Dark Mode' : '☀️ Light Mode'}
                    </button>
                    <nav className="flex flex-col gap-2">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded transition-colors font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-700 dark:hover:text-blue-300 ${isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 shadow' : ''}`
                            }
                        >
                            Dashboard
                        </NavLink>
                        <NavLink
                            to="/devices"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded transition-colors font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-700 dark:hover:text-blue-300 ${isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 shadow' : ''}`
                            }
                        >
                            Inventory
                        </NavLink>
                        <NavLink
                            to="/loans"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded transition-colors font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-700 dark:hover:text-blue-300 ${isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 shadow' : ''}`
                            }
                        >
                            Loans
                        </NavLink>
                        <NavLink
                            to="/users"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded transition-colors font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-700 dark:hover:text-blue-300 ${isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 shadow' : ''}`
                            }
                        >
                            Users
                        </NavLink>
                        <NavLink
                            to="/scan"
                            className={({ isActive }) =>
                                `px-4 py-2 rounded transition-colors font-medium text-gray-700 dark:text-gray-200 hover:bg-blue-50 dark:hover:bg-blue-950 hover:text-blue-700 dark:hover:text-blue-300 ${isActive ? 'bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 shadow' : ''}`
                            }
                        >
                            Scan
                        </NavLink>
                    </nav>
                </aside>
                <main className="col-span-10 p-8 dark:bg-gray-900">
                    <Outlet />
                </main>
            </div>
    );
}

export default AppShell;