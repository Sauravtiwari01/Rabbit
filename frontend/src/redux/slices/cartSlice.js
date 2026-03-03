import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// load cart from localStorage
const loadCartFromStorage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : { products: [] }

// save cart to localStorage
const saveCartToStorage = (cart) => {
    localStorage.setItem('cart', JSON.stringify(cart))
}

// fetch user or guest cart
export const fetchCart = createAsyncThunk('cart/fetchCart', async ({ userId, guestId }, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
            params: { userId, guestId }
        })
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }

})

// Add an item to cart for user or guest
export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity, size, color, userId, guestId }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
            productId, quantity, size, color, userId, guestId
        })
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})

// update an item to cart for user or guest
export const updateCartItemQuantity = createAsyncThunk('cart/updateCartItemQuantity', async ({ productId, quantity, size, color, userId, guestId }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BACKEND_URL}/api/cart`, {
            productId, quantity, size, color, userId, guestId
        })
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})

// Remove an item from cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async ({ productId, quantity, size, color, userId, guestId }, { rejectWithValue }) => {
    try {
        const response = await axios({
            method: "DELETE",
            url: `${import.meta.env.VITE_BACKEND_URL}/api/cart`,
            data: { productId, quantity, size, color, userId, guestId }
        })
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})

// Merge guest cart into logged in user cart
export const mergeCart = createAsyncThunk('cart/mergeCart', async ({ guestId, user }, { rejectWithValue }) => {
    try {
        const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/cart/merge`, { guestId, user }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            },
        })
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})

// Cart Slice
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        cart: loadCartFromStorage,
        loading: false,
        error: null
    },
    reducers: {
        clearCart: (state) => {
            state.cart = { products: [] }
            localStorage.removeItem("cart")
        }
    },
    extraReducers: (builder) => {
        builder
            // handle fetch Cart
            .addCase(fetchCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload;
                saveCartToStorage(action.payload)
            })
            .addCase(fetchCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload.message || "Failed to fetch cart"
            })
            // handle Add to Cart
            .addCase(addToCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(addToCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload
                saveCartToStorage(action.payload)
            })
            .addCase(addToCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to add to cart"
            })
            // handle update quantity to Cart
            .addCase(updateCartItemQuantity.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItemQuantity.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload
                saveCartToStorage(action.payload)
            })
            .addCase(updateCartItemQuantity.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to update item in cart"
            })
            // handle remove item from Cart
            .addCase(removeFromCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeFromCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload
                saveCartToStorage(action.payload)
            })
            .addCase(removeFromCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to remove item from cart"
            })
            // handle merge Cart
            .addCase(mergeCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(mergeCart.fulfilled, (state, action) => {
                state.loading = false;
                state.cart = action.payload
                saveCartToStorage(action.payload)
            })
            .addCase(mergeCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || "Failed to Merge cart"
            })
    }
})

export const { clearCart } = cartSlice.actions
export default cartSlice.reducer