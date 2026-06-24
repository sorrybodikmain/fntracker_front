import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CookieConsentStore {
  accepted: boolean;
  accept: () => void;
}

export const useCookieConsentStore = create<CookieConsentStore>()(
  persist(
    (set) => ({
      accepted: false,
      accept: () => set({ accepted: true }),
    }),
    { name: "fntracker-allow-cookie" },
  ),
);
