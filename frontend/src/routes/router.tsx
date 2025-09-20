import { createBrowserRouter } from "react-router";
import AppShell from "../components/AppShell";
import DashboardPage from "../features/dashboard/Dashboard";
import DeviceDetailPage from "../features/device/DeviceDetailPage";
import InventoryPage from "../features/inventory/InventoryPage";
import LoansPage from "../features/loans/LoansPage";
import NotFoundPage from "../features/notfound/NotFoundPage";
import ScanPage from "../features/scan/ScanPage";
import UserPage from "../features/user/UserPage";
import RouteErrorBoundary from "./RouteErrorBoundary";

export const router = createBrowserRouter(
    [
        {
            path: "/",
            element: <AppShell />,
            errorElement: <RouteErrorBoundary />,
            children: [
                { index: true, element: <DashboardPage /> },
                { path: "devices", element: <InventoryPage /> },
                { path: "devices/:id", element: <DeviceDetailPage /> },
                { path: "loans", element: <LoansPage /> },
                { path: "users", element: <UserPage /> },
                { path: "scan", element: <ScanPage /> },
                { path: "*", element: <NotFoundPage /> },
            ],
        },
    ],
    // If you deploy under a sub-path, set basename here or via Vite's base.
    // { basename: import.meta.env.BASE_URL }
);