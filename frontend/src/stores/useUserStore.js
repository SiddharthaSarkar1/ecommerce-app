import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });

    if (password != confirmPassword) {
      set({ loading: true });
      console.log("Password do not match.");
      return toast.error("Password do not match.");
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });
      set({ user: res.data.user, loading: false });
      toast.success(`User created successfully!`);
    } catch (error) {
      set({ loading: false });
      console.log(error.response.data.message || "An error occured");
      toast.error(error.response.data.message || "An error occured");
    }
  },
}));
