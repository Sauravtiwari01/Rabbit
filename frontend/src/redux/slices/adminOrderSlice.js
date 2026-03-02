import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = `${import.meta.env.VITE_BACKEND_URL}`
const USER_TOKEN = `Bearer ${localStorage.getItem('userToken')}`

// Fetch all orders
export const fetchAllOrders = createAsyncThunk('adminOrders/fetchAllOrders', async (_, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${API_URL}/api/admin/orders`, {
            headers: {
                Authorization: USER_TOKEN
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }

})


// Update an existing order
export const updateOrderStatus = createAsyncThunk('adminOrders/updateOrderStatus', async ({ id, status }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${API_URL}/api/admin/orders/${id}`, { status }, {
            headers: {
                Authorization: USER_TOKEN
            }
        })
        return response.data
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }

})



// Delete an existing order
export const deleteOrder = createAsyncThunk('adminOrders/deleteOrder', async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/api/admin/orders/${id}`, {
            headers: {
                Authorization: USER_TOKEN
            }
        })
        return id
    } catch (error) {
        console.log(error);
        return rejectWithValue(error.response.data)
    }

})


const adminOrderSlice = createSlice({
    name: 'adminOrders',
    initialState: {
        orders: [],
        totalOrders: 0,
        totalSales: 0,
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.
            addCase(fetchAllOrders.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(fetchAllOrders.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = action.payload
                state.totalOrders = action.payload.length

                // Calculate total sales
                const totalSales = action.payload.reduce((acc, order) => { return acc + order.totalPrice }, 0)
                state.totalSales = totalSales
            })

            .addCase(fetchAllOrders.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            .addCase(updateOrderStatus.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(updateOrderStatus.fulfilled, (state, action) => {
                state.loading = false;
                const updatedOrder = action.payload.Order
                const index = state.orders.findIndex((order) => order._id === updatedOrder._id)
                if (index !== -1) {
                    state.orders[index] = updatedOrder
                }
            })
            .addCase(updateOrderStatus.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
            .addCase(deleteOrder.pending, (state) => {
                state.loading = true;
                state.error = null
            })
            .addCase(deleteOrder.fulfilled, (state, action) => {
                state.loading = false;
                state.orders = state.orders.filter((product) => product._id !== action.payload)

            })
            .addCase(deleteOrder.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message
            })
    }
})

export default adminOrderSlice.reducer