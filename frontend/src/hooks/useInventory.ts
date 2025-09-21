import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getDevices } from "../services/deviceService";
import { getUsers } from "../services/userService";
import { borrowDevice, returnDevice } from "../services/loanService";

export function useDevices() {
    return useQuery({ 
        queryKey: ['devices'], 
        queryFn: getDevices 
    });
}

export function useUsers() {
    return useQuery({ 
        queryKey: ['users'], 
        queryFn: getUsers 
    });
}

export function useBorrowReturn() {
    const qc = useQueryClient();
    const borrow = useMutation({
        mutationFn: (payload: { deviceId: number; userId: string; dueDate: string }) => 
            borrowDevice(payload),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['devices'] });
            qc.invalidateQueries({ queryKey: ['loans'] });
        },
    });
    const ret = useMutation({
        mutationFn: (deviceId: number) => 
            returnDevice({ deviceId }),
        onSuccess: () => {
            qc.invalidateQueries({ queryKey: ['devices'] });
            qc.invalidateQueries({ queryKey: ['loans'] });
        },
    });
    return { borrow, ret };
}