import * as firebase from "nativescript-plugin-firebase";

export const currentUser = {
    email: "",
    id: ""
}

const listener: firebase.AuthStateChangeListener = {
    onAuthStateChanged: (data) => {
        console.log(data.loggedIn ? "[Firebase] Logged in to firebase" : "[Firebase] Logged out from firebase");
        if (data.loggedIn) {
            console.log("User info", data.user);
            currentUser.email = data.user.email;
            currentUser.id = data.user.uid;
        } else {
            currentUser.email = "";
            currentUser.id = "";
        }
    },
};

// add the listener:
firebase.addAuthStateListener(listener);

export function login(email: string, password: string): Promise<firebase.User> {
    return firebase.login({
        type: firebase.LoginType.PASSWORD,
        passwordOptions: { email, password }
    })
}

export function signup(email: string, password: string): Promise<firebase.CreateUserResult> {
    return firebase.createUser({ email, password })
}

export function logout(): Promise<any> {
    return firebase.logout();
}

