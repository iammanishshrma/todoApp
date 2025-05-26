import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";
const initialState = {
    isAuthenticated: false,
    accessToken: null,
    refreshToken: null,
    user: null,
};

const useAuthStore = create<AuthStore>()(
    devtools(
        persist(
            (set) => ({
                ...initialState,
                setUserData: (userData: LoginResponse) => {
                    return set({ ...userData, isAuthenticated: true });
                },
                logout: () => set(initialState),
            }),
            { name: "authStore" }
        )
    )
);

export default useAuthStore;
