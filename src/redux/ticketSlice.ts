// ticketSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TicketState {
  tickets: Ticket[];
  buyList: BuyListItem[];
}

interface Ticket {
  id: number;
  name: string;
  price: number;
  // ... other ticket properties
}

interface BuyListItem {
  ticketId: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number; // Added property for total price of each item
}

const initialState: TicketState = {
  tickets: [],
  buyList: [],
};

const ticketSlice = createSlice({
  name: 'ticket',
  initialState,
  reducers: {
    setTickets: (state, action: PayloadAction<Ticket[]>) => {
      state.tickets = action.payload;
    },
    addToBuyList: (state, action: PayloadAction<BuyListItem>) => {
      const { ticketId, name, price, quantity } = action.payload;
      const existingItem = state.buyList.find((item) => item.ticketId === ticketId);

      if (existingItem) {
        // If the item is already in the buy list, update the quantity, price, and total price
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
      } else {
        // If the item is not in the buy list, add it with the specified quantity and total price
        state.buyList.push({ ticketId, name, price, quantity, totalPrice: price * quantity });
      }
    },
    removeFromBuyList: (state, action: PayloadAction<number>) => {
      const ticketId = action.payload;
      state.buyList = state.buyList.filter((item) => item.ticketId !== ticketId);
    },
    clearBuyList: (state) => {
      state.buyList = [];
    },
  },
});

export const { setTickets, addToBuyList, removeFromBuyList, clearBuyList } = ticketSlice.actions;
export default ticketSlice.reducer;
