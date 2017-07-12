import { login, signup } from "../services/user.service";
export const LoginComponent = {
    data: () => {
        return {
            email: "test@test.com",
            password: "123456",
            message: "",
            loading: false
        }
    },
    template: `
        <stack-layout margin="16">
            <text-field hint="email" v-model="email"></text-field>
            <text-field hint="password" v-model="password" secure="true"></text-field>
            <button @tap="login()" class="btn btn-primary">LOGIN</button>
            <button @tap="signup()" class="btn btn-outline">SIGNUP</button>
            <label :text="message" textWrap="true"></label> 
        </stack-layout>
    `,
    methods: {
        login() {
            console.log(`logging in... [${this.email} | ${this.password}]`);

            this.message = "";
            this.loading = true;

            login(this.email, this.password).then(
                (result) => {
                    console.log("[Firebase] login success: " + JSON.stringify(result));
                    this.loading = false;

                    console.log("Redirecting to contests ...");
                    
                    this.$router.replace("/contests");
                    return result;
                },
                (errorMessage) => {
                    console.log("[Firebase] login error: " + errorMessage);
                    this.message = errorMessage;
                    this.loading = false;
                });
        },
        signup() {
            console.log(`signing up... [${this.email} | ${this.password}]`);

            this.message = "";
            this.loading = true;

            signup(this.email, this.password).then(
                (result) => {
                    console.log("[Firebase] signup success: " + JSON.stringify(result));
                    return result;
                },
                (errorMessage) => {
                    console.log("[Firebase] signup error: " + errorMessage);
                    this.message = errorMessage;
                    this.loading = false;
                });
        }
    }
};
