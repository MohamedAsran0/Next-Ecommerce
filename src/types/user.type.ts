export type RegisterUserType = {
    name: string;
    email: string;
    password: string;
    rePassword: string;
    phone: string;
}

export type LoginUserType = {
    email: string;
    password: string;
}

export type CheckoutUserType = {
    details: string,
    phone: string,
    city: string
}