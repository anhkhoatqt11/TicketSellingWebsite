"use client";

import React, { useEffect } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  setTickets,
  addToBuyList,
  removeFromBuyList,
} from "@/redux/ticketSlice";
import { RootState } from "@/redux/store";
import { main_color } from "../../../../../../../public/color";

const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
  currency: "VND",
  style: "currency",
});

export function formatCurrency(value: number) {
  return CURRENCY_FORMAT.format(value);
}



const TicketChoose = ({ EventDetail }) => {
  const dispatch = useDispatch();
  const [currentDateTime, setCurrentDateTime] = React.useState("");

  useEffect(() => {
    dispatch(setTickets(EventDetail.ves));
  }, []);

  useEffect(() => {
    fetch("https://worldtimeapi.org/api/timezone/Asia/Bangkok")
      .then((response) => response.json())
      .then((data) => {
        setCurrentDateTime(data.utc_datetime);
      });
  }, []);

  const handleAddToBuyList = (
    ticketId: number,
    name: string,
    price: number,
    maxQuantity: number,
    minimumQuantity: number,
    quantityLeft: number
  ) => {
    const existingItem = buyList.find((item) => item.ticketId === ticketId);

    if (
      quantityLeft > 0 &&
      (!existingItem ||
        existingItem.quantity < Math.min(maxQuantity, quantityLeft))
    ) {
      dispatch(
        addToBuyList({
          ticketId,
          name,
          price,
          quantity: 1,
          maxQuantity,
          minimumQuantity,
          quantityLeft,
        })
      );
    }
  };

  const handleRemoveFromBuyList = (ticketId: number) => {
    const existingItem = buyList.find((item) => item.ticketId === ticketId);

    if (existingItem) {
      const newQuantity = existingItem.quantity - 1;

      if (newQuantity > 0) {
        const newPrice =
          (existingItem.price / existingItem.quantity) * newQuantity;
        dispatch(
          addToBuyList({
            ticketId,
            name: existingItem.name,
            price: newPrice,
            quantity: -1,
          })
        );
      } else {
        dispatch(removeFromBuyList(ticketId));
      }
    }
  };

  const buyList = useSelector((state: RootState) => state.ticket.buyList);

  return (
    <Table
      className="w-full p-4 md:w-2/4 mr-0 md:mr-10"
      aria-label="Lựa chọn vé của bạn"
    >
      <TableHeader>
        <TableColumn>MÀU VÉ</TableColumn>
        <TableColumn>LOẠI VÉ</TableColumn>
        <TableColumn>GIÁ VÉ</TableColumn>
        <TableColumn>SỐ LƯỢNG / TÌNH TRẠNG</TableColumn>
      </TableHeader>
      <TableBody emptyContent={"Vé sự kiện hiện không có sẵn."}>
        {EventDetail?.ves?.map((ticket) => (
          <TableRow
            className="h-[80px] border-b-2 border-gray-50"
            key={ticket.id}
          >
            <TableCell>
              <div
                className={`rounded-full h-[20px] w-[20px] items-center justify-center`}
                style={{ backgroundColor: ticket.mau }}
              ></div>
            </TableCell>
            <TableCell>{ticket.name}</TableCell>
            <TableCell>{formatCurrency(ticket.gia)}</TableCell>
            <TableCell>
              {ticket.soLuong > 0 ? (
                <div className="flex flex-row gap-5">
                  {Date.parse(ticket.ngayBan) > Date.parse(currentDateTime) && (
                    <p className="font-bold">Vé chưa mở bán</p>
                  )}
                  {Date.parse(ticket.ngayKetThuc) <
                    Date.parse(currentDateTime) && (
                    <p className="font-bold">Vé hết thời hạn</p>
                  )}
                  {!(
                    Date.parse(ticket.ngayBan) > Date.parse(currentDateTime) ||
                    Date.parse(ticket.ngayKetThuc) < Date.parse(currentDateTime)
                  ) && (
                    <>
                      <Button
                        className="rounded-md bg-transparent text-black border border-solid border-red-400 h-[20px] hover:bg-red-400 hover:text-white"
                        onClick={() => handleRemoveFromBuyList(ticket.id)}
                      >
                        -
                      </Button>
                      <p className="text-center items-center mt-2 font-bold">
                        {buyList.find((item) => item.ticketId === ticket.id)
                          ?.quantity || 0}
                      </p>
                      <Button
                        className={`rounded-md bg-transparent text-black border border-solid border-emerald-400 h-[20px] hover:bg-emerald-400 hover:text-white`}
                        onClick={() =>
                          handleAddToBuyList(
                            ticket.id,
                            ticket.name,
                            ticket.gia,
                            ticket.soLuongToiDa,
                            ticket.soLuongToiThieu,
                            ticket.soLuong
                          )
                        }
                        disabled={
                          (buyList.find((item) => item.ticketId === ticket.id)
                            ?.quantity || 0) >=
                          Math.min(ticket.soLuongToiDa, ticket.soLuong)
                        }
                      >
                        +
                      </Button>
                    </>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-center font-bold">Hết vé</p>
                </div>
              )}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default TicketChoose;
