import axios from "axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useCartStore = create((set, get) => ({
    cart: [],
    coupon: null,
    total: 0,
    subtotal: 0,
    isCouponApplied: false,

    getCartItems: async () => {
        try {
            const res = await axios.get("/cart");
            set({cart: res.data});

        } catch (error) {
            set({cart: []});
            toast.error(error.response.data.message || "An error occurred");
        }
    }
}))