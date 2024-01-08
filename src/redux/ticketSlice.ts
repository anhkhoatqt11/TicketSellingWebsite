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
  maxQuantity: number;
  minimumQuantity: number; // Minimum quantity required for this ticket
  quantityLeft: number;
  // ... other ticket properties
}

interface BuyListItem {
  ticketId: number;
  name: string;
  price: number;
  quantity: number;
  totalPrice: number;
  minimumQuantity: number;
  maxQuantity: number;
  quantityLeft: number;
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
      const { ticketId, name, price, quantity, maxQuantity, minimumQuantity, quantityLeft } = action.payload;
      const existingItem = state.buyList.find((item) => item.ticketId === ticketId);

      if (existingItem) {
        // If the item is already in the buy list, update the quantity, total price, and quantity left
        existingItem.quantity += quantity;
        existingItem.totalPrice = existingItem.price * existingItem.quantity;
        existingItem.quantityLeft -= quantity;
      } else {
        // If the item is not in the buy list, add it with the specified quantity, total price, max quantity, and quantity left
        state.buyList.push({
          ticketId,
          name,
          price,
          quantity,
          totalPrice: price * quantity,
          maxQuantity,
          minimumQuantity,
          quantityLeft,
        });
      }
    },
    removeFromBuyList: (state, action: PayloadAction<number>) => {
      const ticketId = action.payload;
      const removedItem = state.buyList.find((item) => item.ticketId === ticketId);

      if (removedItem) {
        // If the item is in the buy list, update the quantity left
        const quantityToRemove = removedItem.quantity;
        removedItem.quantityLeft += quantityToRemove;
      }

      state.buyList = state.buyList.filter((item) => item.ticketId !== ticketId);
    },
    clearBuyList: (state) => {
      state.buyList = [];
    },
    updateBuyList: (state, action: PayloadAction<BuyListItem[]>) => {
      const updatedItems = action.payload;

      updatedItems.forEach((updatedItem) => {
        const existingItemIndex = state.buyList.findIndex(
          (item) => item.ticketId === updatedItem.ticketId
        );

        if (existingItemIndex !== -1) {
          // If the item is in the buy list, update the quantity, total price, and quantity left
          state.buyList[existingItemIndex] = {
            ...state.buyList[existingItemIndex],
            ...updatedItem,
            totalPrice: updatedItem.price * updatedItem.quantity,
          };
        }
      });
    },
  },
});

export const { setTickets, addToBuyList, removeFromBuyList, clearBuyList, updateBuyList } = ticketSlice.actions;
export default ticketSlice.reducer;
