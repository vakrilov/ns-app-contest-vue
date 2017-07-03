import * as Vue from 'nativescript-vue/dist/index';
import * as  VueRouter from 'vue-router';
Vue.use(VueRouter);
(<any>global).process = { env: {} } // hack! a build process should replace process.env's with static strings.

import { AppEntry, getApps, getContests, init } from "./model";
import { screen } from "tns-core-modules/platform";
import { View } from "tns-core-modules/ui/core/view";

import { LoginComponent } from "./login.component";
import { AppListComponent } from "./app-list.component";
import { ContestListComponent } from "./contest-list.component";

import { dumpView, dumpViewHierarchy } from "./debug";
// import * as trace from "trace";
// trace.setCategories("NativeLifecycle, ViewHierarchy");
// trace.enable();

const router = new VueRouter({
    routes: [
        { path: '/login', component: LoginComponent },
        { path: '/contests', component: ContestListComponent },
        { path: '/apps/:contestId', component: AppListComponent, props: true },
        { path: '*', redirect: '/login' }
    ]
})

router.replace('/login');

const app = new Vue({
    router,
    template: `
        <page actionBarHidden="true">
            <stack-layout>
                <stack-layout orientation="horizontal">
                    <button margin="0 2" @tap="$router.replace('/login')">login</button>
                    <button margin="0 2" @tap="$router.replace('/contests')">home</button>
                    <button margin="0 2" @tap="$router.replace('/apps/vue2017')">apps</button>
                    <button margin="0 2" @tap="dump()">dump</button>
                </stack-layout>
                
                <label style="text-align: center" margin="0 0 10 0">Current route: {{ $route.fullPath }}</label>
                
                <router-view></router-view>
            </stack-layout>
        </page>
    `,

    data: {
    },

    methods: {
        dump() {
            dumpViewHierarchy();
        }
    },
    mounted() {
        console.log("App mounted ...");
        init();
    }
});
app.$start()


