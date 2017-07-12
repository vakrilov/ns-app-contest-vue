import * as Vue from 'nativescript-vue/dist/index';
import * as VueRouter from 'vue-router';
Vue.use(VueRouter);
(<any>global).process = { env: {} } // hack! a build process should replace process.env's with static strings.

Vue.registerElement("CardView", () => require("nativescript-cardview").CardView);

import * as firebase from "nativescript-plugin-firebase";

import { screen } from "tns-core-modules/platform";
import { View } from "tns-core-modules/ui/core/view";
import { Page } from "tns-core-modules/ui/page";
import { Button } from "tns-core-modules/ui/button";
import { ActionItem } from "tns-core-modules/ui/action-bar";

import { LoginComponent } from "./components/login.component";
import { AppListComponent } from "./components/app-list.component";
import { ContestListComponent } from "./components/contest-list.component";
import { currentUser, logout } from "./services/user.service";


import { dumpView, dumpViewHierarchy } from "./debug";
// import * as trace from "trace";
// trace.setCategories("NativeLifecycle, ViewHierarchy");
// trace.enable();
let rootPage: Page;

const router = new VueRouter({
    routes: [
        { path: '/login', component: LoginComponent, meta: { title: "Login", hideLogin: true } },
        { path: '/contests', component: ContestListComponent, meta: { title: "Contests" } },
        { path: '/apps/:contestId', component: AppListComponent, props: true, meta: { title: "Apps" } },
        { path: '*', redirect: '/login' }
    ]
})


router.afterEach((to, from) => {
    console.log("router.afterEach to: " + to.meta.title);
    rootPage.actionBar.title = to.meta.title;
})

const app = new Vue({
    router,
    data: {
        currentUser
    },
    template: `
        <page class="page" ref="page">
            <stack-layout>
                <grid-layout columns="* *" rows="auto">
                    <button col="0" margin="4 8" class="btn btn-primary" @tap="$router.replace('/contests')" >home</button>
                    <button col="1" margin="4 8" class="btn btn-primary" @tap="loginTapped()">{{ currentUser.id ? 'logout' : 'login' }}</button>
                </grid-layout>
                
                <label style="text-align: center" margin="0 0 10 0">Current user: {{ currentUser.email }}</label>
                
                <StackLayout class="hr-light"></StackLayout>

                <router-view></router-view>
            </stack-layout>
        </page>
    `,
    methods: {
        dump() {
            dumpViewHierarchy();
        },
        loginTapped() {
            if (!currentUser.id) {
                this.$router.replace('/login');
            } else {
                console.log("logging out... ");
                logout().then(
                    (result) => {
                        console.log("[Firebase] logout success: " + JSON.stringify(result));
                        console.log("currentUser: " + JSON.stringify(currentUser))
                        return result;
                    },
                    (errorMessage) => {
                        console.log("[Firebase] logout error: " + errorMessage);
                    });
            }
        }
    },

    mounted: function () {
        rootPage = <Page>this.$refs.page.nativeView;
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




