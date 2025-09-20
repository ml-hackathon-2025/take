import { http, HttpResponse } from "msw";
import { categories, devices, deviceTypeAvailability, findDevice, findDeviceType, findUser, listActiveLoans, users } from "./data";
import type { ID } from "../types";

const BASE = "/api";

export const handlers = [

    // Categories
    http.get(`${BASE}/categories`, () => HttpResponse.json(categories)),

    // Device types with availability rollup
    http.get(`${BASE}/device-types`, () => HttpResponse.json(deviceTypeAvailability())),

    // Devices
    http.get(`${BASE}/devices`, () => HttpResponse.json(devices)),

    http.get(`${BASE}/devices/:id`, ({ params }) => {
        try {
            const d = findDevice(params.id as ID);
            return HttpResponse.json(d);
        } catch {
            return new HttpResponse("Not found", { status: 404 });
        }
    }),

    // Users
    http.get(`${BASE}/users`, () => HttpResponse.json(users)),

    // Loans listing (active/overdue)
    http.get(`${BASE}/loans`, ({ request }) => {
        const url = new URL(request.url);
        const status = url.searchParams.get("status"); // active|overdue|all
        const loans = listActiveLoans();
        let result = loans;
        if (status === "overdue") {
            const now = Date.now();
            result = loans.filter(l => new Date(l.dueDate).getTime() < now);
        }
        return HttpResponse.json(result);
    }),

    // Borrow
    http.post(`${BASE}/loans/borrow`, async ({ request }) => {
        type Payload = { deviceId: ID; userId: ID; dueDate: string; };
        const body = (await request.json()) as Payload;

        // validations
        try {
            const device = findDevice(body.deviceId);
            if (!device.available) return HttpResponse.json({ message: "Device already borrowed" }, { status: 409 });

            const user = findUser(body.userId);
            const dt = findDeviceType(device.deviceTypeId);

            const due = new Date(body.dueDate);
            if (Number.isNaN(due.getTime())) return HttpResponse.json({ message: "Invalid dueDate" }, { status: 400 });

            const borrowed = new Date();
            const maxDue = new Date(borrowed);
            maxDue.setDate(maxDue.getDate() + dt.maxWindowDays);
            if (due.getTime() > maxDue.getTime()) {
                return HttpResponse.json({ message: `Due date exceeds max window (${dt.maxWindowDays} days)` }, { status: 409 });
            }

            // mutate
            device.available = false;
            device.borrowedDate = borrowed.toISOString();
            device.dueDate = due.toISOString();
            device.userId = user.id;

            return HttpResponse.json({ ok: true });
        } catch (e: any) {
            return HttpResponse.json({ message: e?.message ?? "Borrow failed" }, { status: 400 });
        }
    }),

    // Return
    http.post(`${BASE}/loans/return`, async ({ request }) => {
        type Payload = { deviceId: ID };
        const body = (await request.json()) as Payload;

        try {
            const device = findDevice(body.deviceId);
            if (device.available) return HttpResponse.json({ message: "Device already available" }, { status: 409 });

            // mutate
            device.available = true;
            device.borrowedDate = undefined;
            device.dueDate = undefined;
            device.userId = undefined;

            return HttpResponse.json({ ok: true });
        } catch (e: any) {
            return HttpResponse.json({ message: e?.message ?? "Return failed" }, { status: 400 });
        }
    }),
];
