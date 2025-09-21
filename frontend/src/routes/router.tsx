import { createBrowserRouter } from "react-router";
import AppShell from "../components/AppShell";
import { RequireAuth } from "../auth/RequireAuth";
import DashboardPage from "../features/dashboard/Dashboard";
import DeviceDetailPage from "../features/device/DeviceDetailPage";
import InventoryPage from "../features/inventory/InventoryPage";
import LoansPage from "../features/loans/LoansPage";
import NotFoundPage from "../features/notfound/NotFoundPage";
import ScanPage from "../features/scan/ScanPage";
import UserPage from "../features/user/UserPage";
import RouteErrorBoundary from "./RouteErrorBoundary";
import DeviceList from "../components/DeviceList";
import DeviceForm from "../components/DeviceForm";
import UserList from "../components/UserList";
import UserForm from "../components/UserForm";
import LoanList from "../components/LoanList";
import LoanForm from "../components/LoanForm";
import ReturnForm from "../components/ReturnForm";
import UserLoans from "../components/UserLoans";
import DeviceTypeList from "../components/DeviceTypeList";
import AuthCallback from "../auth/AuthCallback";

export const router = createBrowserRouter(
    [
        {
            path: "/auth/callback",
            element: <AuthCallback />,
        },
        {
            path: "/",
            element: (
                <RequireAuth>
                    <AppShell />
                </RequireAuth>
            ),
            errorElement: <RouteErrorBoundary />,
            children: [
                { index: true, element: <DashboardPage /> },
                { path: "devices", element: <InventoryPage /> },
                { path: "devices/:id", element: <DeviceDetailPage /> },
                { path: "loans", element: <LoansPage /> },
                { path: "users", element: <UserPage /> },
                { path: "scan", element: <ScanPage /> },
                { path: "*", element: <NotFoundPage /> },
                { path: "/devices", element: <DeviceList /> },
                { path: "/devices/new", element: <DeviceForm /> },
                { path: "/users", element: <UserList /> },
                { path: "/users/new", element: <UserForm /> },
                { path: "/loans", element: <LoanList /> },
                { path: "/loans/new", element: <LoanForm /> },
                { path: "/device-types", element: <DeviceTypeList /> },
                { path: "/users/:id/loans", element: <UserLoans /> },
                { path: "/loans/return", element: <ReturnForm /> }
            ],
        },
    ],
    // If you deploy under a sub-path, set basename here or via Vite's base.
    // { basename: import.meta.env.BASE_URL }
);