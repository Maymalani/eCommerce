import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-hot-toast";

const initialState = {
    cart: localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [],
    total: localStorage.getItem("total") ? JSON.parse(localStorage.getItem("total")): 0,
    totalItems: localStorage.getItem("totalItems") ? JSON.parse(localStorage.getItem("totalItems")) : 0,
    wish: localStorage.getItem("wish") ? JSON.parse(localStorage.getItem("wish")) : [],
    wishTotalItems: localStorage.getItem("wishTotalItems") ? JSON.parse(localStorage.getItem("wishTotalItems")) : 0,
}

const Slice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addToCart: (state, action) => {
                action.payload['qty'] = 1;
                state.cart.push(action.payload);
                state.totalItems += 1;
                state.total = state.total + action.payload?.price;
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
                toast.success("Item added to cart")
        },
        removeToCart: (state, action) => {
            const itemId = action.payload
            const index = state.cart.findIndex((item, index) => index === itemId)

            if (index >= 0) {

                state.totalItems--
                state.total = state.total - (state.cart[index]?.price * state.cart[index]?.qty);
                state.cart.splice(index, 1)
                localStorage.setItem("cart", JSON.stringify(state.cart))

                localStorage.setItem("total", JSON.stringify(state.total))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            }
        },
        increment: (state, action) => {
            state.cart[action.payload].qty += 1;
            state.total = state.total + state.cart[action.payload]?.price;
            localStorage.setItem("total", JSON.stringify(state.total))
            console.log("Total", state.total, "Price", (state.cart[action.payload]?.price));
        },
        decrement: (state, action) => {
            let temp = action.payload;
            state.cart[temp].qty--;;
            state.total = state.total - (state.cart[temp].price);
            localStorage.setItem("total", JSON.stringify(state.total));
            if (state.cart[temp].qty === 0) {
                state.cart.splice(temp, 1)
                state.totalItems--;
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
            }
        },

        emptyCart: (state) => {
            state.cart = [];
            state.total = 0;
            state.totalItems = 0;
            localStorage.setItem('cart', JSON.stringify(state.cart))
            localStorage.setItem("total", JSON.stringify(state.total))
            localStorage.setItem("totalItems", JSON.stringify(state.totalItems))
        },
        addToWish: (state, action) => {
            state.wish.push(action.payload);
            state.wishTotalItems += 1;
            localStorage.setItem("wish", JSON.stringify(state.wish))
            localStorage.setItem("wishTotalItems", JSON.stringify(state.wishTotalItems))
            toast.success("Item added to wishlist")
        },
        removeToWish: (state, action) => {
            const itemId = action.payload
            const index = state.wish.findIndex((item, index) => index === itemId)

            if (index >= 0) {

                state.wishTotalItems--;
                state.wish.splice(index, 1)
                localStorage.setItem("wish", JSON.stringify(state.wish))
                localStorage.setItem("wishTotalItems", JSON.stringify(state.wishTotalItems))
            }
        },
        emptyWish: (state) => {
            state.wish = [];
            state.wishTotalItems = 0;
            localStorage.setItem('wish', JSON.stringify(state.wish))
            localStorage.setItem("wishTotalItems", JSON.stringify(state.wishTotalItems))
        }
    }
});

export default Slice.reducer;
export const { addToCart, removeToCart, increment, decrement, addToWish, removeToWish, emptyCart, emptyWish } = Slice.actions;