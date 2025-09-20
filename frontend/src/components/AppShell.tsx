import React from 'react'

import { NavLink, Outlet } from "react-router";

const AppShell: React.FC = () => {
    return (
        <div className="min-h-dvh grid grid-cols-12">
            <aside className="col-span-2 border-r p-4 space-y-4">
                <h1 className="font-semibold">EquipFlow</h1>
                <nav className="flex flex-col gap-2">
                    <NavLink to="/" className="hover:underline">Dashboard</NavLink>
                    <NavLink to="/devices" className="hover:underline">Inventory</NavLink>
                    <NavLink to="/loans" className="hover:underline">Loans</NavLink>
                    <NavLink to="/users" className="hover:underline">Users</NavLink>
                    <NavLink to="/scan" className="hover:underline">Scan</NavLink>
                </nav>
            </aside>
            <main className="col-span-10 p-6">
                <Outlet />
            </main>
        </div>
    );
}

export default AppShell;