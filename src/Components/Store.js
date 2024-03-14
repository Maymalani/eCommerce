import { configureStore } from "@reduxjs/toolkit";
import Slice from "./Slice";

const Store = configureStore({
    reducer:{
        cart:Slice,
    }
});

export default Store;