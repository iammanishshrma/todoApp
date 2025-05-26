type SignupPayload = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
};
type SignupResponse = {
    _id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
};
