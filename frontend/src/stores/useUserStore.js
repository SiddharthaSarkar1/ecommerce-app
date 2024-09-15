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
      set({ user: res.data, loading: false });
      toast.success(`User created successfully!`);
    } catch (error) {
      set({ loading: false });
      console.log(error.response.data.message || "An error occured");
      toast.error(error.response.data.message || "An error occured");
    }
  },
  login: async (email, password) => {
    set({ loading: true });

    try {
      const res = await axios.post("/auth/login", { email, password });
      toast.success("User logged in successfully.");
      set({ user: res.data, loading: false });
    } catch (error) {
      set({ loading: false });
      console.log(error.response.data.message || "An error occured.");
      toast.error(error.response.data.message || "An error occured.");
    }
  },
  logout: async () => {
    try {
      await axios.post("/auth/logout");
      set({ user: null });
      toast.success("User logged out successfully.");
    } catch (error) {
      console.log(error.response.data.message || "An error occured.");
      toast.error(error.response.data.message || "An error occured.");
    }
  },
  checkAuth: async () => {
    set({ checkingAuth: true });
    try {
      const response = await axios.get("/auth/profile");
      set({ user: response.data, checkingAuth: false });
    } catch (error) {
      console.log(error.message);
      set({ checkingAuth: false, user: null });
    }
  },
}));

//Implementing Axios Interceptors for accrss token refreshing logic
