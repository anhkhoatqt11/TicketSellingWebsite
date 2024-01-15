import React from 'react'
import { Label } from "@/components/ui/label"
import { RadioGroup, Radio, cn } from "@nextui-org/react";

export const CustomRadio = (props) => {
  const { children, ...otherProps } = props;

  return (
    <Radio
      {...otherProps}
      classNames={{
        base: cn(
          "inline-flex m-0 bg-content1 hover:bg-content2 items-center justify-between",
          "flex-row-reverse max-w-[550px] cursor-pointer rounded-lg gap-4 p-4 border-2 border-transparent",
          "data-[selected=true]:border-primary"
        ),
      }}
    >
      {children}
    </Radio>
  );
};



const PaymentChoose = ({ paymentMethod, setPaymentMethod }) => {

  return (
    <div className='w-full p-4 md:w-2/4 mr-0 md:mr-10'>
      <div className='h-auto min-h-[500px] bg-white border border-gray-200 shadow rounded-xl flex flex-col'>
        <div className='bg-gray-100 mx-4 rounded-md h-[40px] mt-3 flex items-center justify-center'>
          <p className='text-sm font-semibold text-foreground-500'>LỰA CHỌN HÌNH THỨC THANH TOÁN</p>
        </div>
        <RadioGroup className='p-4' description="Chọn hình thực thanh toán của bạn. Bạn sẽ được điều hướng đến trang thanh toán của đối tác cung cấp dịch vụ." value={paymentMethod} onValueChange={setPaymentMethod}>
          <CustomRadio className="max-w-[650px]" description="Thanh toán với VNPAY" value="VNPAY">
            VNPAY
          </CustomRadio>
          <CustomRadio className="max-w-[650px]" description="Thanh toán với ZaloPay" value="ZaloPay">
            ZaloPay
          </CustomRadio>
        </RadioGroup>
      </div>
    </div>
  )
}

export default PaymentChoose