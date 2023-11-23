import React, { useEffect } from 'react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';
import { useBooking } from '@/hooks/useBooking';
import { useUser } from '@/hooks/useUser';
import { useRouter } from 'next/navigation';
import { Mail, Phone, User } from 'lucide-react';


const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
    currency: 'VND',
    style: 'currency',
});

export function formatCurrency(value: number) {
    return CURRENCY_FORMAT.format(value);
}


const Cart = ({ websiteBooking, setWebsiteBooking, paymentMethod, session }) => {

    const [isDisabled, setIsDisabled] = React.useState(true);
    const [currentDateTime, setCurrentDateTime] = React.useState("");
    const [userInfo, setUserInfo] = React.useState([]);

    const buyList = useSelector((state: RootState) => state.ticket.buyList);

    const { fetchUserInfoById } = useUser();
    const { uploadPaymentInfo, uploadBillingInfo } = useBooking();
    const router = useRouter();


    const calculateTotalPrice = () => {
        return buyList.reduce((total, item) => total + item.totalPrice, 0);
    };


    useEffect(() => {
        setIsDisabled(buyList.length === 0);
        if (websiteBooking === "payment") {
            setIsDisabled(paymentMethod === "");
        }
    }, [buyList, paymentMethod]);

    useEffect(() => {
        const getUserInfo = async () => {
            const res = await fetchUserInfoById(session?.user?.id);
            setUserInfo(res);
        }
        getUserInfo();
    }, []);

    useEffect(() => {
        fetch("http://worldtimeapi.org/api/timezone/Asia/Bangkok")
            .then(response => response.json())
            .then(data => {
                setCurrentDateTime(data.utc_datetime);
            });
    }, []);


    const onPayment = async () => {

        const BillingInfo = {
            ngayDatHang: currentDateTime,
            userId: session?.user?.id,
            phuongThucThanhToan: "VNPAY",
            tinhTrang: "Chưa thanh toán",
            tongTien: calculateTotalPrice(),
            HoaDonVe: buyList.map((item) => ({
                veId: item.ticketId,
                soLuong: item.quantity,
                tongGia: item.totalPrice,
            }))
        }

        console.log(BillingInfo);
        const uploadBillinginfoSuccess = await uploadBillingInfo(BillingInfo);
        console.log(uploadBillinginfoSuccess);


        const VNPAY = {
            amount: calculateTotalPrice(),
            bankCode: "",
            language: "vn",
            orderId: uploadBillinginfoSuccess.hoaDon.id,
        }

        const uploadPaymentSuccess = await uploadPaymentInfo(VNPAY);
        router.push(uploadPaymentSuccess.data);
    }



    return (
        <div className='w-2/4'>
            <div className='h-auto min-h-[500px] bg-white border border-gray-200 shadow rounded-xl flex flex-col'>
                <div className='bg-gray-100 mx-4 rounded-md h-[40px] mt-3 flex items-center justify-center'>
                    <p className='text-sm font-semibold text-foreground-500'>THÔNG TIN ĐƠN HÀNG</p>
                </div>
                {websiteBooking === "payment" && (
                    <div>
                        <div className='mx-4 mt-5'>
                            <p className='font-bold'>THÔNG TIN NGƯỜI NHẬN VÉ</p>
                            <hr className='mt-2'></hr>
                            <div className='flex flex-row justify-between p-4 text-small text-gray-500'>
                                <div className='flex flex-row'>
                                    <User className='mr-2' size={20} />
                                    <p className='font-bold'>Họ và tên</p>
                                </div>
                                <div className='flex flex-col items-end'>
                                    <p>{userInfo?.name}</p>
                                </div>
                            </div>
                            <hr className='border-dashed'></hr>
                            <div className='flex flex-row justify-between p-4 text-small text-gray-500'>
                                <div className='flex flex-row'>
                                    <Mail className='mr-2' size={20} />
                                    <p className='font-bold'>Email</p>
                                </div>
                                <div className='flex flex-col items-end'>
                                    <p>{userInfo?.email}</p>
                                </div>
                            </div>
                            <hr className='border-dashed'></hr>
                            <div className='flex flex-row justify-between p-4 text-small text-gray-500'>
                                <div className='flex flex-row'>
                                    <Phone className='mr-2' size={20} />
                                    <p className='font-bold'>Điện thoại</p>
                                </div>
                                <div className='flex flex-col items-end'>
                                    <p>{userInfo?.phoneNumber}</p>
                                </div>
                            </div>
                        </div>
                        <div className='mx-4 mt-5'>
                            <p className='font-bold'>HÌNH THỨC THANH TOÁN</p>
                            <hr className='mt-2'></hr>
                            <div className='p-4'>
                                {!paymentMethod && (
                                    <p className='text-gray-500 font-bold text-sm'>Vui lòng chọn hình thức thanh toán</p>)}
                                <p className='font-bold'>{paymentMethod}</p>
                            </div>
                        </div>
                    </div>
                )}


                <div className='mx-4 mt-3'>
                    <p className='font-bold'>THÔNG TIN ĐẶT VÉ</p>
                    <hr className='mt-2'></hr>
                    <div className='flex flex-row justify-between p-4 text-gray-500 font-bold text-sm'>
                        <p>Loại vé</p>
                        <p>Số lượng</p>
                    </div>
                    <hr></hr>
                </div>

                {buyList.length === 0 && (
                    <div className='p-4 mx-4 text-gray-500 font-bold text-sm'>
                        <p>Vui lòng chọn vé</p>
                    </div>
                )}
                {buyList.map((item) => (
                    <div className='mx-4' key={item.ticketId}>
                        <div className='flex flex-row justify-between p-4 text-small text-gray-500'>
                            <div className='flex flex-col'>
                                <p>{item.name}</p>
                                <p>{formatCurrency(item.price)}</p>
                            </div>
                            <div className='flex flex-col items-end'>
                                <p>{item.quantity}</p>
                                <p>{formatCurrency(item.totalPrice)}</p>
                            </div>
                        </div>
                        <hr className='border-dashed'></hr>
                    </div>
                ))}

                <div className='mx-4 mt-auto'>
                    <hr></hr>
                    <div className='flex flex-row justify-between p-4 text-gray-500 font-bold text-sm'>
                        <p>Tổng cộng</p>
                        <p>{formatCurrency(calculateTotalPrice())}</p>
                    </div>
                </div>
            </div>
            <div>
                <Button
                    className='w-full mt-10 px-0 bg-emerald-500'
                    disabled={isDisabled && websiteBooking === "choose-ticket" || paymentMethod === "" && websiteBooking === "payment"}
                    onClick={() => {
                        if (!isDisabled && websiteBooking === "choose-ticket") {
                            setWebsiteBooking("payment");
                        }
                        if (websiteBooking === "payment") {
                            onPayment();
                        }
                    }}
                >
                    {websiteBooking === "payment" ? "HOÀN TẤT ĐẶT VÉ" : "TIẾP TỤC"}
                </Button>
                {websiteBooking !== 'choose-ticket' && (
                    <Button className="w-full mt-10 px-0" onClick={() => setWebsiteBooking('choose-ticket')}>
                        QUAY LẠI
                    </Button>
                )}
            </div>

        </div>
    );
}

export default Cart;
