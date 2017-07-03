import * as Vue from 'nativescript-vue/dist/index';
import * as  VueRouter from 'vue-router';
Vue.use(VueRouter);
(<any>global).process = { env: {} } // hack! a build process should replace process.env's with static strings.

import { AppEntry, getApps, getContests } from "./model";
import { screen } from "tns-core-modules/platform";
import { View } from "tns-core-modules/ui/core/view";

import { dumpView, dumpViewHierarchy } from "./debug";
// import * as trace from "trace";
// trace.setCategories("NativeLifecycle, ViewHierarchy");
// trace.enable();

const AppListComponent = {
    props: [ "contestId" ],
    data: () => {
        return {
            itemWidth: screen.mainScreen.widthDIPs / 2,
            items: [],
            loading: true
        }
    },
    template: `
        <scroll-view>
            <wrap-layout orientation="horizontal" :itemWidth="itemWidth">
                <label :text="'Showing id:' + contestId"></label>
                <label :text="'Loading:' + loading"></label>
                
                <grid-layout rows="auto auto" v-for="app in items" key="app.id" @tap="appTapped(app)" backgroundColor="lightgreen" margin="8">
                    <label :text="app.name" row="0" class="h2"></label>
                    <label :text="'by ' + app.author" row="1" class="h2"></label>
                </grid-layout>
            </wrap-layout>
        </scroll-view>
    `,
    methods: {
        appTapped(app: AppEntry) {
            alert('Tapped: ' + app.name);
        }
    },
    created() {
        console.log("AppListComponent created: " + this.contestId);
        setTimeout(() => {
            this.items = getApps();
            this.loading = false;
        }, 500);
    },
    mounted() {
        console.log("AppListComponent mounted: " + this.contestId);
    },
};

const ContestListComponent = {
    props: [],
    data: () => {
        return {
            itemWidth: screen.mainScreen.widthDIPs / 2,
            items: [],
            loading: true
        }
    },
    template: `
        <scroll-view>
            <wrap-layout orientation="horizontal" :itemWidth="itemWidth">
                <label :text="'Loading:' + loading"></label>
                
                <grid-layout rows="auto auto" v-for="contest in items" key="app.id" @tap="$router.replace('/apps/' + contest.id)" backgroundColor="lightgreen" margin="8">
                    <label :text="contest.name" row="0" class="h2"></label>
                </grid-layout>
            </wrap-layout>
        </scroll-view>
    `,
    methods: {
    },
    created() {
        console.log("AppListComponent created: " + this.contestId);
        setTimeout(() => {
            this.items = getContests();
            this.loading = false;
        }, 500);
    },
    mounted() {
        console.log("AppListComponent mounted: " + this.contestId);
    },
};


const LoginComponent = {
    data: () => {
        return {
            itemWidth: screen.mainScreen.widthDIPs / 2,
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


const router = new VueRouter({
    routes: [
        { path: '/login', component: LoginComponent },
        { path: '/contests', component: ContestListComponent },
        { path: '/apps/:contestId', component: AppListComponent, props: true },
        { path: '*', redirect: '/login' }
    ]
})

router.replace('/login')

const app = new Vue({
    router,
    template: `
        <page>
            <stack-layout>
                <stack-layout orientation="horizontal">
                    <button @tap="$router.replace('/login')">login</button>
                    <button @tap="$router.replace('/contests')">contests</button>
                    <button @tap="$router.replace('/apps/1')">apps</button>
                </stack-layout>
                
                <label style="text-align: center">Current route: {{ $route.fullPath }}</label>
                
                <router-view></router-view>
            </stack-layout>
        </page>
    `,

    data: {
        textRed: false,
        showTrick: false,
        appList: getApps()
    },

    methods: {
        onTap() {
            // alert('Nice Tap!')
            dumpViewHierarchy();
        }
    }
});
app.$start()


