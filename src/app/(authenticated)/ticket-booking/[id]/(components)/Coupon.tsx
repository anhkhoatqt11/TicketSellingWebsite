"use client";

import React from "react";
import { Input } from "@nextui-org/react";
import { TicketIcon, XIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/hooks/useBooking";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { updateBuyList } from "@/redux/ticketSlice";

interface Ticket {
  id: number;
  name: string;
  price: number;
  maxQuantity: number; // Maximum quantity allowed for this ticket
  quantityLeft: number; // Quantity left from the server
  // ... other ticket properties
}

const Coupon = ({
  EventDetail,
  buyList,
  currentDateTime,
  setIsCouponUsing,
  setDiscountPrice,
  setCouponId,
}) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [couponInput, setCouponInput] = React.useState("");
  const [couponUsed, setCouponUsed] = React.useState(false);

  const { fetchCoupon } = useBooking();
  const dispatch = useDispatch();

  const onSubmit = async () => {
    if (!couponInput) {
      toast.error("Vui lòng nhập mã giảm giá");
      return;
    }

    setIsLoading(true);
    const res = await fetchCoupon(couponInput);

    if (res.length === 0) {
      toast.error("Mã giảm giá không tồn tại");
    } else if (res[0].trangThai === false) {
      toast.error("Mã giảm giá đã bị vô hiệu hóa");
    } else if (res[0].SuKienId !== EventDetail.id) {
      toast.error("Mã giảm giá không áp dụng cho sự kiện này");
    } else if (Date.parse(res[0].ngayBatDau) > Date.parse(currentDateTime)) {
      toast.error("Mã giảm giá chưa đến ngày áp dụng");
    } else if (Date.parse(res[0].ngayKetThuc) < Date.parse(currentDateTime)) {
      toast.error("Mã giảm giá đã hết hạn");
    } else {
      const couponItemId = res[0].VeId;
      setCouponId(res[0].id);
      // Check if the couponId is in buyList
      const couponItem = buyList.find((item) => item.ticketId === couponItemId);
      if (couponItem) {
        // Update the item in the buyList with the coupon information
        const updatedBuyList = buyList.map((item) => {
          if (item.ticketId === couponItemId) {
            let discountedPrice;
            if (res[0].phanTramGiam) {
              discountedPrice =
                item.price - (item.price * (res[0].phanTramGiam || 0)) / 100;
            } else if (res[0].soTienGiam) {
              discountedPrice = item.price - (res[0].soTienGiam || 0);
            } else {
              discountedPrice = item.price;
            }

            setDiscountPrice((item.price - discountedPrice) * item.quantity);
            return {
              ...item,
              discountPercentage: res[0].phanTramGiam || 0,
              discountMoney: res[0].soTienGiam || 0,
              totalPrice: discountedPrice * item.quantity,
              // Update other properties as needed
            };
          }
          return item;
        });
        // Update the buyList in the Redux store or wherever it's managed
        console.log(updatedBuyList);
        dispatch(updateBuyList(updatedBuyList));

        // Set a state to indicate that the coupon is used
        setCouponUsed(true);
        setIsCouponUsing(true);
      } else {
        toast.error("Mã giảm giá không áp dụng cho những vé đã chọn");
      }
    }

    setIsLoading(false);
  };

  const removeCoupon = () => {
    setCouponUsed(false);
    setCouponInput("");
    console.log(buyList);
    setIsCouponUsing(false);
  };

  if (isLoading)
    return (
      <div className="flex flex-row">
        <Loader />
        <p className="mt-2">Đang áp dụng mã giảm giá</p>
      </div>
    );

  if (couponUsed === true)
    return (
      <div className="flex flex-row justify-between">
        <div className="flex flex-row">
          <TicketIcon
            className="text-2xl text-default-400 pointer-events-none flex-shrink-0 mt-1"
            size={20}
          />
          <p className="font-bold text-lg ml-2"> {couponInput}</p>
        </div>
        <div
          className="cursor-pointer"
          onClick={() => {
            removeCoupon();
          }}
        >
          <XIcon
            className="text-2xl text-default-400 pointer-events-none flex-shrink-0 mt-2"
            size={20}
          />
        </div>
      </div>
    );

  return (
    <div className="grid grid-cols-2 gap-3 items-center">
      <Input
        type="text"
        variant={"underlined"}
        placeholder="Mã giảm giá"
        value={couponInput}
        onChange={(e) => {
          setCouponInput(e.target.value);
        }}
        startContent={
          <TicketIcon
            className="text-2xl text-default-400 pointer-events-none flex-shrink-0"
            size={20}
          />
        }
      />
      <Button
        onClick={() => {
          onSubmit();
        }}
      >
        Áp dụng
      </Button>
    </div>
  );
};

export default Coupon;
