import * as Vue from 'nativescript-vue/dist/index';
import * as VueRouter from 'vue-router';
Vue.use(VueRouter);
(<any>global).process = { env: {} } // hack! a build process should replace process.env's with static strings.

Vue.registerElement("CardView", () => require("nativescript-cardview").CardView);

import * as firebase from "nativescript-plugin-firebase";

import { screen } from "tns-core-modules/platform";
import { View } from "tns-core-modules/ui/core/view";
import { Page } from "tns-core-modules/ui/page";
import { ActionItem } from "tns-core-modules/ui/action-bar";

import { LoginComponent } from "./components/login.component";
import { AppListComponent } from "./components/app-list.component";
import { ContestListComponent } from "./components/contest-list.component";
import { currentUser } from "./services/user.service";


import { dumpView, dumpViewHierarchy } from "./debug";
// import * as trace from "trace";
// trace.setCategories("NativeLifecycle, ViewHierarchy");
// trace.enable();
let rootPage: Page;
let loginAction: ActionItem;

const router = new VueRouter({
    routes: [
        { path: '/login', component: LoginComponent, meta: { title: "LOGIN", hideLogin: true } },
        { path: '/contests', component: ContestListComponent, meta: { title: "Contests" } },
        { path: '/apps/:contestId', component: AppListComponent, props: true, meta: { title: "Apps" } },
        { path: '*', redirect: '/login' }
    ]
})


router.afterEach((to, from) => {
    console.log("router.afterEach to: " + to.meta.title);
    const meta = to.meta;
    rootPage.actionBar.title = meta.title;
    if (meta.hideLogin) {
        loginAction.visibility = "collapsed";
    } else {
        loginAction.visibility = "visible";
        loginAction.text = currentUser.id ? "LOGOUT" : "LOGIN";
    }

})

const app = new Vue({
    router,
    template: `
        <page ref="page">
            <stack-layout>
                <stack-layout orientation="horizontal" horizontalAlignment="center" margin="8">
                    <button margin="0 2" @tap="$router.replace('/login')">login</button>
                    <button margin="0 2" @tap="$router.replace('/contests')">home</button>
                    <button margin="0 2" @tap="dump()">dump</button>
                </stack-layout>
                
                <label style="text-align: center" margin="0 0 10 0">Current route: {{ $route.fullPath }}</label>
                <label style="text-align: center" margin="0 0 10 0">Current user: {{ currentUser.email }}</label>
                
                <router-view></router-view>
            </stack-layout>
        </page>
    `,

    methods: {
        dump() {
            dumpViewHierarchy();
        }
    },
    data: {
        currentUser
    },
    mounted: function () {
        rootPage = <Page>this.$refs.page.nativeView;

        loginAction = new ActionItem();
        loginAction.text = "LOGIN";
        loginAction.on("tap", () => {
            this.$router.replace('/login');
        });
        rootPage.actionBar.actionItems.addItem(loginAction);
    }
});
app.$start();


console.log("[Firebase] Initalizing ...");
firebase.init().then(
    (instance) => {
        console.log("[Firebase] Init done -> starting app");
        router.replace('/contests');
    },
    (error) => {
        console.log("[Firebase] Init error: " + error);
    });




