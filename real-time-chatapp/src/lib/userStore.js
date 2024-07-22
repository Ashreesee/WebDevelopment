import { create } from "zustand";
import { doc, getDoc } from "firebase/firestore";
import { firestore } from "./firebase";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true, // Initialize isLoading to true
  fetchUserInfo: async (uid) => {
    if (!uid) {
      set({ currentUser: null, isLoading: false });
      return;
    }

    try {
      const docRef = doc(firestore , "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: false });
      }
    } catch (err) {
      console.log(err);
      set({ currentUser: null, isLoading: false });
    }
  },
}));
