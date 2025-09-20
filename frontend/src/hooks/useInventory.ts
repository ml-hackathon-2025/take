import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { Device, ID, User } from "../types";

const api = {
    listDevices: async (): Promise<Device[]> => fetch('/api/devices').then(resp => resp.json()),
    listUsers: async (): Promise<User[]> => fetch('/api/users').then(resp => resp.json()),
    borrow: async (payload: { deviceId: ID; userId: ID; dueDate: string }) =>
        fetch('/api/loans/borrow', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
        }).then(resp => {
            if (!resp.ok) throw new Error('Borrow failed');
            return resp.json();
        }),
    returnDevice: async (deviceId: ID) =>
        fetch('/api/loans/return', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ deviceId })
        }).then(resp => {
            if (!resp.ok) throw new Error('Return failed');
            return resp.json();
        }),
};

export function useDevices() {
    return useQuery({ queryKey: ['devices'], queryFn: api.listDevices });
}
export function useUsers() {
    return useQuery({ queryKey: ['users'], queryFn: api.listUsers });
}

export function useBorrowReturn() {
    const qc = useQueryClient();
    const borrow = useMutation({
        mutationFn: api.borrow,
        onSuccess: () => qc.invalidateQueries({ queryKey: ['devices'] }),
    });
    const ret = useMutation({
        mutationFn: api.returnDevice,
        onSuccess: () => qc.invalidateQueries({ queryKey: ['devices'] }),
    });
    return { borrow, ret };
}