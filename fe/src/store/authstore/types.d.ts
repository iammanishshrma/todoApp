type AuthStoreState = {
    isAuthenticated: boolean;
    accessToken: string | null;
    refreshToken: string | null;
    user: User | null;
};

type AuthStoreActions = {
    setUserData: (userData: LoginResponse) => void;
    logout: () => void;
};
type AuthStore = AuthStoreState & AuthStoreActions;
