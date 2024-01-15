import React, { useEffect, useState } from 'react';
import { useBooking } from '@/hooks/useBooking';
import Loader from '@/components/Loader';
import Logo from '@/components/logo';

const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
    currency: 'VND',
    style: 'currency',
});

export function formatCurrency(value: number) {
    return CURRENCY_FORMAT.format(value);
}


const BookingResult = ({ paymentStatus, setPaymentStatus }) => {
    const { fetchPaymentStatus, fetchOrderInfo, fetchZalopaymentStatus } = useBooking();
    const [isLoading, setIsLoading] = useState(true);
    const [order, setOrder] = useState([]);

    const handlePaymentStatus = (status) => {
        if (status === '00' || (status.data && status.data.return_code === 1)) {
            setPaymentStatus('completed');
        } else {
            setPaymentStatus('failed');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const paymentStatus = await fetchPaymentStatus();
                console.log('Payment Status:', paymentStatus);
                handlePaymentStatus(paymentStatus?.code);

                const fetchOrderData = async () => {
                    try {
                        const orderInfo = await fetchOrderInfo(paymentStatus?.orderId);
                        console.log('Order Info:', orderInfo);
                        setOrder(orderInfo);
                    } catch (error) {
                        console.error('Error fetching order info:', error);
                    }
                };
                fetchOrderData();
            } catch (error) {
                console.error('Error fetching payment status:', error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const paymentStatus = await fetchZalopaymentStatus();
                console.log('Payment Status:', paymentStatus);
                handlePaymentStatus(paymentStatus);
                const fetchOrderData = async () => {
                    try {
                        const orderInfo = await fetchOrderInfo(paymentStatus?.orderId);
                        console.log('Order Info:', orderInfo);
                        setOrder(orderInfo);
                    } catch (error) {
                        console.error('Error fetching order info:', error);
                    }
                };
                fetchOrderData();
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching payment status:', error);
            }
        }
        fetchData();
    }, []);


    return (
        <div className='bg-white w-2/3 min-h-[500px] mx-auto my-auto border rounded-lg p-4'>
            {isLoading && order ? (
                <div className='flex h-screen items-center justify-center'>
                    <Loader />
                </div>
            ) : (
                <div className='flex flex-col text-center mt-10'>
                    {paymentStatus === 'completed' && (
                        <div className='flex flex-col justify-center items-center'>
                            <Logo />
                            <p className='font-bold text-lg mt-1'>Đặt vé thành công</p>
                            <p>Kiểm tra vé đã đặt tại mục Vé của tôi</p>
                        </div>
                    )}
                    {paymentStatus === 'failed' && (
                        <div className='flex flex-col justify-center items-center'>
                            <Logo />
                            <p className='font-bold text-lg mt-1'>Đặt vé thất bại</p>
                            <p>Nếu bạn gặp vấn đề thanh toán, hãy thử lại sau.</p>
                        </div>
                    )}
                    {order.length > 0 && (
                        <div className='mt-5'>
                            <table className='min-w-full border'>
                                <tbody>
                                    <tr>
                                        <th className='text-left border p-2'>ID</th>
                                        <td className='text-left border p-2'>{order[0]?.id}</td>
                                    </tr>
                                    <tr>
                                        <th className='text-left border p-2'>Mã đặt chỗ</th>
                                        <td className='text-left border p-2'>{order[0]?.maDatCho}</td>
                                    </tr>
                                    <tr>
                                        <th className='text-left border p-2'>Ngày đặt hàng</th>
                                        <td className='text-left border p-2'>{convertUtcToGmtPlus7(order[0]?.ngayDatHang)}</td>
                                    </tr>
                                    <tr>
                                        <th className='text-left border p-2'>Phương thức thanh toán</th>
                                        <td className='text-left border p-2'>{order[0]?.phuongThucThanhToan}</td>
                                    </tr>
                                    <tr>
                                        <th className='text-left border p-2'>Tình trạng</th>
                                        <td className='text-left border p-2'>{order[0]?.tinhTrang}</td>
                                    </tr>
                                    <tr>
                                        <th className='text-left border p-2'>Tổng tiền</th>
                                        <td className='text-left border p-2'>{formatCurrency(order[0]?.tongTien)}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}

                    <div className='mt-5'>
                        <p className='text-center text-sm text-gray-500'>Cảm ơn đã đặt vé tại TicketNow</p>
                    </div>
                </div>
            )}
        </div>
    );
};

function convertUtcToGmtPlus7(utcString) {
    const utcDate = new Date(utcString);
    const gmtPlus7Offset = 7 * 60;
    const localDate = new Date(utcDate.getTime() + gmtPlus7Offset * 60 * 1000);
    const formattedDate = localDate.toISOString().replace('T', ' ').replace(/\.\d+Z$/, '');
    return formattedDate;
}


export default BookingResult;
