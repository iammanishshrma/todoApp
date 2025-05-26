type LoginEmailPayload = {
    email: string;
    password: string;
};
type LoginUsernamePayload = {
    username: string;
    password: string;
};
type User = {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
type LoginResponse = {
    user: User;
    accessToken: string;
    refreshToken: string;
};
