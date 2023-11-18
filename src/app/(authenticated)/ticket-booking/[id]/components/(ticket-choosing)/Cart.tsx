import React, { useEffect } from 'react';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';
import { Button } from '@/components/ui/button';

const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
    currency: 'VND',
    style: 'currency',
});

export function formatCurrency(value: number) {
    return CURRENCY_FORMAT.format(value);
}


const Cart = ({ setWebsiteBooking }) => {

    const [isDisabled, setIsDisabled] = React.useState(true);

    const buyList = useSelector((state: RootState) => state.ticket.buyList);

    const calculateTotalPrice = () => {
        return buyList.reduce((total, item) => total + item.totalPrice, 0);
    };

    useEffect(() => {
        if (buyList.length === 0) {
            setIsDisabled(true);
        } else {
            setIsDisabled(false);
        }
    }, [buyList]);


    return (
        <div className='w-2/4'>
            <div className='h-auto min-h-[500px] border border-gray-200 shadow rounded-xl flex flex-col'>
                <div className='bg-gray-100 mx-4 rounded-md h-[40px] mt-3 flex items-center justify-center'>
                    <p className='text-sm font-semibold text-foreground-500'>THÔNG TIN ĐẶT VÉ</p>
                </div>
                <div className='mx-4'>
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
            {isDisabled === true ? (
                <div>
                    <Button className='w-full mt-10 px-0' disabled>TIẾP TỤC</Button>
                </div>
            ) : (
                <div>
                    <Button className='w-full mt-10 px-0' onClick={() => {
                        setWebsiteBooking("payment");
                    }}>TIẾP TỤC</Button>
                </div>
            )}

        </div>
    );
}

export default Cart;
