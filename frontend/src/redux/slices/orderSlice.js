import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch all orders
export const fetchUserOrders = createAsyncThunk('orders/fetchUserOrders', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/my-orders`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})

// Fetch order details
export const fetchOrderDetails = createAsyncThunk('orders/fetchOrderDetails', async (orderId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('userToken')}`
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }
})

// Order Slice
const OrderSlice = createSlice({
    name: 'orders',
    initialState: {
        orders: [],
        totalOrders: 0,
        orderDetails: null,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.

            addCase(fetchUserOrders.pending, (state) => {
                state.loading = true;
                state.error = null
            })
        .addCase(fetchUserOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.orders = action.payload
        })
        .addCase(fetchUserOrders.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        })
        .addCase(fetchOrderDetails.pending, (state) => {
            state.loading = true;
            state.error = null
        })
        .addCase(fetchOrderDetails.fulfilled, (state, action) => {
            state.loading = false;
            state.orderDetails = action.payload
        })
        .addCase(fetchOrderDetails.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload.message
        })
    }
})

export default OrderSlice.reducer