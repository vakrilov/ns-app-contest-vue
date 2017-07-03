
export const LoginComponent = {
    data: () => {
        return {
            email: "test@test.com",
            password: "123456"
        }
    },
    template: `
        <stack-layout>
            <text-field hint="email" v-model="email"></text-field>
            <text-field hint="password" v-model="password" secure="true"></text-field>
            <button @tap="login()">LOGIN</button>
            <button @tap="signup()">SIGNUP</button>
        </stack-layout>
    `,
    methods: {
        login() {
            console.log(`logging in... [${this.email} | ${this.password}]`);
        },
        signup() {
            console.log(`signing up... [${this.email} | ${this.password}]`);
        }
    }
};
