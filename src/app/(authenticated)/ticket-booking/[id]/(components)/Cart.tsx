import React, { useEffect } from "react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { useBooking } from "@/hooks/useBooking";
import { useUser } from "@/hooks/useUser";
import { useRouter } from "next/navigation";
import { Mail, Phone, User } from "lucide-react";
import Coupon from "./Coupon";
import { updateBuyList } from "@/redux/ticketSlice";
import { useDispatch } from "react-redux";
import { main_color } from "../../../../../../public/color";

const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
  currency: "VND",
  style: "currency",
});

export function formatCurrency(value: number) {
  return CURRENCY_FORMAT.format(value);
}

const Cart = ({
  websiteBooking,
  setWebsiteBooking,
  paymentMethod,
  EventDetail,
  session,
}) => {
  const [isDisabled, setIsDisabled] = React.useState(true);
  const [currentDateTime, setCurrentDateTime] = React.useState("");
  const [userInfo, setUserInfo] = React.useState([]);
  const [isCouponUsing, setIsCouponUsing] = React.useState(false);
  const [discountPrice, setDiscountPrice] = React.useState(0);
  const [orginalBuyList, setOrginalBuyList] = React.useState([]);
  const [couponId, setCouponId] = React.useState(null);
  const [allItemsMeetMinimumQuantity, setAllItemsMeetMinimumQuantity] =
    React.useState(true);
  var crypto = require("crypto");

  const dispatch = useDispatch();

  const buyList = useSelector((state: RootState) => state.ticket.buyList);

  const { fetchUserInfoById } = useUser();
  const { uploadPaymentInfo, uploadBillingInfo, uploadZaloPaymentInfo } = useBooking();
  const router = useRouter();

  const calculateTotalPrice = () => {
    return buyList.reduce((total, item) => {
      if (isCouponUsing === true) {
        let discountedPrice;

        if (item.discountPercentage) {
          // Apply discount based on percentage
          discountedPrice =
            item.price - (item.price * item.discountPercentage) / 100;
        } else if (item.discountMoney) {
          // Apply discount based on fixed amount
          discountedPrice = item.price - item.discountMoney;
        } else {
          // No discount applied
          discountedPrice = item.price;
        }

        return total + discountedPrice * item.quantity;
      } else {
        return total + item.totalPrice;
      }
    }, 0);
  };

  const isMinimumQuantityMet = (item) => {
    return item.minimumQuantity <= item.quantity;
  };

  useEffect(() => {
    const allItemsMeetMinimumQuantity = buyList.every(isMinimumQuantityMet);
    setAllItemsMeetMinimumQuantity(allItemsMeetMinimumQuantity);
    setIsDisabled(buyList.length === 0 || !allItemsMeetMinimumQuantity);
    if (websiteBooking === "payment") {
      setIsDisabled(paymentMethod === "");
      const orginalBuyLists = buyList.map((item) => {
        return item;
      });
      setOrginalBuyList(orginalBuyLists);
    }
  }, [buyList, paymentMethod]);

  useEffect(() => {
    const getUserInfo = async () => {
      const res = await fetchUserInfoById(session?.user?.id);
      setUserInfo(res);
    };
    getUserInfo();
  }, []);

  useEffect(() => {
    fetch("https://worldtimeapi.org/api/timezone/Asia/Bangkok")
      .then((response) => response.json())
      .then((data) => {
        setCurrentDateTime(data.utc_datetime);
      });
  }, []);

  useEffect(() => {
    console.log(orginalBuyList);
    dispatch(updateBuyList(orginalBuyList));
    if (isCouponUsing === false) {
      setCouponId(null);
    }
  }, [isCouponUsing]);

  const onPayment = async () => {
    const BillingInfo = {
      maDatCho: crypto.randomBytes(3).toString("hex").toUpperCase(),
      ngayDatHang: currentDateTime,
      userId: session?.user?.id,
      phuongThucThanhToan: "VNPAY",
      tinhTrang: "Chưa thanh toán",
      tongTien: calculateTotalPrice(),
      suKienId: EventDetail.id,
      maGiamGiaId: couponId,
      HoaDonVe: buyList.map((item) => ({
        veId: item.ticketId,
        soLuong: item.quantity,
        tongGia: item.totalPrice,
      })),
    };

    console.log(BillingInfo);
    const uploadBillinginfoSuccess = await uploadBillingInfo(BillingInfo);
    console.log(uploadBillinginfoSuccess);

    const VNPAY = {
      amount: calculateTotalPrice(),
      bankCode: "",
      language: "vn",
      orderId: uploadBillinginfoSuccess.hoaDon.id,
    };

    const uploadPaymentSuccess = await uploadPaymentInfo(VNPAY);
    router.push(uploadPaymentSuccess.data);
  };

  const onPaymentZaloPay = async () => {
    const BillingInfo = {
      maDatCho: crypto.randomBytes(3).toString("hex").toUpperCase(),
      ngayDatHang: currentDateTime,
      userId: session?.user?.id,
      phuongThucThanhToan: "ZaloPay",
      tinhTrang: "Chưa thanh toán",
      tongTien: calculateTotalPrice(),
      suKienId: EventDetail.id,
      maGiamGiaId: couponId,
      HoaDonVe: buyList.map((item) => ({
        veId: item.ticketId,
        soLuong: item.quantity,
        tongGia: item.totalPrice,
      })),
    };

    console.log(BillingInfo);
    const uploadBillinginfoSuccess = await uploadBillingInfo(BillingInfo);
    console.log(uploadBillinginfoSuccess);

    const ZaloPay = {
      amount: calculateTotalPrice(),
      orderId: uploadBillinginfoSuccess.hoaDon.id,
    };

    const uploadPaymentSuccess = await uploadZaloPaymentInfo(ZaloPay);
    router.push(uploadPaymentSuccess.data.response.order_url);
  }

  return (
    <div className="w-full p-4 md:w-2/4">
      <div className="h-auto min-h-[500px] bg-white border border-gray-200 shadow rounded-xl flex flex-col">
        <div className="bg-gray-100 mx-4 rounded-md h-[40px] mt-3 flex items-center justify-center">
          <p className="text-sm font-semibold text-foreground-500">
            THÔNG TIN ĐƠN HÀNG
          </p>
        </div>
        {websiteBooking === "payment" && (
          <div>
            <div className="mx-4 mt-5">
              <p className="font-bold">THÔNG TIN NGƯỜI NHẬN VÉ</p>
              <hr className="mt-2"></hr>
              <div className="flex flex-row justify-between p-4 text-small text-gray-500">
                <div className="flex flex-row">
                  <User className="mr-2" size={20} />
                  <p className="font-bold">Họ và tên</p>
                </div>
                <div className="flex flex-col items-end">
                  <p>{userInfo?.name}</p>
                </div>
              </div>
              <hr className="border-dashed"></hr>
              <div className="flex flex-row justify-between p-4 text-small text-gray-500">
                <div className="flex flex-row">
                  <Mail className="mr-2" size={20} />
                  <p className="font-bold">Email</p>
                </div>
                <div className="flex flex-col items-end">
                  <p>{userInfo?.email}</p>
                </div>
              </div>
              <hr className="border-dashed"></hr>
              <div className="flex flex-row justify-between p-4 text-small text-gray-500">
                <div className="flex flex-row">
                  <Phone className="mr-2" size={20} />
                  <p className="font-bold">Điện thoại</p>
                </div>
                <div className="flex flex-col items-end">
                  <p>{userInfo?.phoneNumber}</p>
                </div>
              </div>
            </div>
            <div className="mx-4 mt-5">
              <p className="font-bold">HÌNH THỨC THANH TOÁN</p>
              <hr className="mt-2"></hr>
              <div className="p-4">
                {!paymentMethod && (
                  <p className="text-gray-500 font-bold text-sm">
                    Vui lòng chọn hình thức thanh toán
                  </p>
                )}
                <p className="text-gray-500">{paymentMethod}</p>
              </div>
            </div>
            <div className="mx-4 mt-5">
              <p className="font-bold">MÃ GIẢM GIÁ</p>
              <hr className="mt-2"></hr>
              <div className="p-4">
                <Coupon
                  EventDetail={EventDetail}
                  buyList={buyList}
                  currentDateTime={currentDateTime}
                  setIsCouponUsing={setIsCouponUsing}
                  setDiscountPrice={setDiscountPrice}
                  setCouponId={setCouponId}
                />
              </div>
            </div>
          </div>
        )}

        <div className="mx-4 mt-3">
          <p className="font-bold">THÔNG TIN ĐẶT VÉ</p>
          <hr className="mt-2"></hr>
          <div className="flex flex-row justify-between p-4 text-gray-500 font-bold text-sm">
            <p>Loại vé</p>
            <p>Số lượng</p>
          </div>
          <hr></hr>
        </div>

        {buyList.length === 0 && (
          <div className="p-4 mx-4 text-gray-500 font-bold text-sm">
            <p>Vui lòng chọn vé</p>
          </div>
        )}
        {buyList.map((item) => (
          <div className="mx-4" key={item.ticketId}>
            <div className="flex flex-row justify-between p-4 text-small text-gray-500">
              <div className="flex flex-col">
                <p>{item.name}</p>
                <p>{formatCurrency(item.price)}</p>
              </div>
              <div className="flex flex-col items-end">
                <p>{item.quantity}</p>
                <p>{formatCurrency(item.totalPrice)}</p>
              </div>
            </div>
            {item.minimumQuantity && item.quantity < item.minimumQuantity && (
              <div className="mx-4 text-red-500 font-bold text-sm pb-3">
                <p>{`${item.name} không đáp ứng số lượng tối thiểu (${item.minimumQuantity} vé)`}</p>
              </div>
            )}
            <hr className="border-dashed"></hr>
          </div>
        ))}
        {isCouponUsing && (
          <div className="mx-4 mt-auto">
            <hr></hr>
            <div className="flex flex-row justify-between p-4 text-gray-500 font-bold text-sm">
              <p>Mã giảm giá</p>
              <p>-{formatCurrency(discountPrice)}</p>
            </div>
          </div>
        )}

        <div className="mx-4 mt-auto">
          <hr></hr>
          <div className="flex flex-row justify-between p-4 text-gray-500 font-bold text-sm">
            <p>Tổng cộng</p>
            <p>{formatCurrency(calculateTotalPrice())}</p>
          </div>
        </div>
      </div>
      <div>
        <Button
          className={`w-full mt-10 px-0 bg-[#3BE1AA] text-black hover:bg-[#2DD196]`}
          disabled={
            (isDisabled && websiteBooking === "choose-ticket") ||
            (paymentMethod === "" && websiteBooking === "payment")
          }
          onClick={() => {
            if (!isDisabled && websiteBooking === "choose-ticket") {
              setWebsiteBooking("payment");
            }
            if (websiteBooking === "payment" && paymentMethod === "VNPAY") {
              onPayment();
            }
            if (websiteBooking === "payment" && paymentMethod === "ZaloPay") {
              onPaymentZaloPay();
            }
          }}
        >
          {websiteBooking === "payment" ? "HOÀN TẤT ĐẶT VÉ" : "TIẾP TỤC"}
        </Button>
        {websiteBooking !== "choose-ticket" && (
          <Button
            className="w-full mt-8 px-0"
            onClick={() => {
              setWebsiteBooking("choose-ticket");
              setIsCouponUsing(false);
            }}
          >
            QUAY LẠI
          </Button>
        )}
      </div>
    </div>
  );
};

export default Cart;