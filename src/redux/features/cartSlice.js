import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {},
  reducers: {
    addProduct: (state, action) => {
      const { userId, product } = action.payload;
      if (!userId) return;

      // Initialize the cart for the user if it doesn't exist
      if (!Array.isArray(state[userId])) {
        state[userId] = [];
      }

      // Check if the product already exists in the user's cart
      const productExists = state[userId].some((item) => item.id === product.id);
      
      if (productExists) {
        console.log(`Product with ID ${product.id} is already in the cart for user ${userId}`);
        // Optionally: You could set an error state or notify the user in the UI that the item is already added
        return;
      }

      // Add the product to the user's cart
      state[userId].push(product);
    },
    removeProduct: (state, action) => {
      const { userId, productId } = action.payload;
      if (state[userId]) {
        state[userId] = state[userId].filter((item) => item.id !== productId);
      }
    },
    clearCart: (state, action) => {
      const { userId } = action.payload;
      if (state[userId]) {
        delete state[userId];
      }
    },
  },
});

export const { addProduct, removeProduct, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
