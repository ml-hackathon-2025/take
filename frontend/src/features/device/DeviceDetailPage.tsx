import React from 'react'
import { useParams } from 'react-router';
import { useBorrowReturn, useDevices, useUsers } from '../../hooks/useInventory';
import DeviceCard from '../../components/DeviceCard';
import BorrowModal from '../../components/BorrowModal';
import ReturnDialog from '../../components/ReturnDialog';

const DeviceDetailPage: React.FC = () => {
    const { id } = useParams();
    const { data: devices = [] } = useDevices();
    const { data: users = [] } = useUsers();
    const device = React.useMemo(() => devices.find(d => String(d.id) === id), [devices, id]);
    const borrower = users.find(u => String(u.id) === String(device?.userId));
    const { borrow, ret } = useBorrowReturn();
    const [openBorrow, setOpenBorrow] = React.useState(false);
    const [openReturn, setOpenReturn] = React.useState(false);

    if (!device) return <div>Device not found</div>;

    return (
        <>
            <DeviceCard
                device={device}
                borrower={borrower}
                onBorrow={() => setOpenBorrow(true)}
                onReturn={() => setOpenReturn(true)}
            />
            <BorrowModal
                open={openBorrow}
                onClose={() => setOpenBorrow(false)}
                users={users}
                maxWindowDays={14} // replace with deviceType.maxWindowDays
                onConfirm={({ userId, dueDate }) => {
                    borrow.mutate({ deviceId: device.id, userId, dueDate });
                    setOpenBorrow(false);
                }}
            />
            <ReturnDialog
                open={openReturn}
                onClose={() => setOpenReturn(false)}
                onConfirm={() => { ret.mutate(device.id); setOpenReturn(false); }}
            />
        </>
    );
}

export default DeviceDetailPage;