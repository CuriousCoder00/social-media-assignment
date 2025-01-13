import { atom } from "recoil";

export const authState = atom({
    key: "authState",
    default: {
        isLoggedIn: false,
        token: "",
    },
});

export const sessionState = atom({
    key: "sessionState",
    default: {
        isLoggedIn: false,
        token: null,
        user: {
            id: "",
            email: "",
            name: "",
            username: "",
        },
    }
})

export const userState = atom({
    key: "userState",
    default: {
        id: "",
        email: "",
        name: "",
    },
})