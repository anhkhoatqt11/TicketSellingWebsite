'use client';

import React, { useEffect } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { Button } from '@/components/ui/button';
import { useDispatch, useSelector } from 'react-redux';
import { setTickets, addToBuyList, removeFromBuyList } from '@/redux/ticketSlice';
import { RootState } from '@/redux/store';


const CURRENCY_FORMAT = new Intl.NumberFormat(undefined, {
    currency: 'VND',
    style: 'currency',
});

export function formatCurrency(value: number) {
    return CURRENCY_FORMAT.format(value);
}

const TicketChoose = ({ EventDetail }) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setTickets(EventDetail.ves));
    }, [])



    const handleAddToBuyList = (ticketId: number, name: string, price: number) => {
        dispatch(addToBuyList({ ticketId, name, price, quantity: 1 }));
    };

    const handleRemoveFromBuyList = (ticketId: number) => {
        const existingItem = buyList.find((item) => item.ticketId === ticketId);

        if (existingItem) {
            const newQuantity = existingItem.quantity - 1;

            if (newQuantity > 0) {
                // If quantity is greater than 0, update the quantity and price
                const newPrice = existingItem.price / existingItem.quantity * newQuantity;
                dispatch(addToBuyList({ ticketId, name: existingItem.name, price: newPrice, quantity: -1 }));
            } else {
                // If quantity is 0, remove the item from the buy list
                dispatch(removeFromBuyList(ticketId));
            }
        }
    };
    const tickets = useSelector((state: RootState) => state.ticket.tickets);
    const buyList = useSelector((state: RootState) => state.ticket.buyList);

    const calculateTotalPrice = () => {
        return buyList.reduce((total, item) => total + item.totalPrice, 0);
    };
    return (
        <Table className='w-2/4 mr-10' aria-label='Lựa chọn vé của bạn'>
            <TableHeader>
                <TableColumn>LOẠI VÉ</TableColumn>
                <TableColumn>GIÁ VÉ</TableColumn>
                <TableColumn>SỐ LƯỢNG</TableColumn>
            </TableHeader>
            <TableBody>
                {EventDetail?.ves?.map((ticket) =>
                    <TableRow key={ticket.id}>
                        <TableCell>{ticket.name}</TableCell>
                        <TableCell>{formatCurrency(ticket.gia)}</TableCell>
                        <TableCell><div className='flex flex-row gap-5'>
                            <Button onClick={() => handleRemoveFromBuyList(ticket.id)}>-</Button>
                            <p className='text-center items-center mt-4'> {buyList.find((item) => item.ticketId === ticket.id)?.quantity || 0}</p>
                            <Button onClick={() => handleAddToBuyList(ticket.id, ticket.name, ticket.gia)}>+</Button>
                        </div></TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default TicketChoose