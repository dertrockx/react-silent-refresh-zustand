import create from "zustand";
import { ISuccessfulAuthResponse } from "./types";
import { login, refresh } from "./services";
interface IAuthStore {
  accessToken: string;
  accessTokenExpiry: number | null;
  timerId: number | null;
  clearTimer: () => void;
  login: () => Promise<void>;
  refreshInterval: (interval: number) => void;
}

export const useAuthStore = create<IAuthStore>((set, get) => ({
  accessToken: "",
  accessTokenExpiry: null,
  timerId: null,
  clearTimer: () => {
    const { timerId } = get();
    console.log(">Timer ID", timerId);
    if (timerId === null) return;
    clearInterval(timerId);
  },
  login: async () => {
    const payload = {
      email: "admin@admin.com",
      password: "password123"
    };
    const res = await login(payload);
    if (res === undefined) return;
    const {
      data: { tokens, token_expiry }
    } = res;
    const { access, refresh } = tokens;
    set(() => ({ accessToken: access }));
    get().refreshInterval(token_expiry);
  },
  refreshInterval: (interval) => {
    console.log(get().timerId);
    console.log(get().accessToken);
    const timerId = setInterval(async () => {
      // console.log("Called every 3 seconds");
      const data = await refresh();
      console.log("> Refreshed data", data);
    }, 3000);
    set(() => ({ timerId }));
  }
}));
