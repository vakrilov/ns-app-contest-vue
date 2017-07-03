"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vue = require("nativescript-vue/dist/index");
var VueRouter = require("vue-router");
Vue.use(VueRouter);
global.process = { env: {} }; // hack! a build process should replace process.env's with static strings.
var model_1 = require("./model");
var platform_1 = require("tns-core-modules/platform");
var debug_1 = require("./debug");
// import * as trace from "trace";
// trace.setCategories("NativeLifecycle, ViewHierarchy");
// trace.enable();
var AppListComponent = {
    props: ["contestId"],
    data: function () {
        return {
            itemWidth: platform_1.screen.mainScreen.widthDIPs / 2,
            items: [],
            loading: true
        };
    },
    template: "\n        <scroll-view>\n            <wrap-layout orientation=\"horizontal\" :itemWidth=\"itemWidth\">\n                <label :text=\"'Showing id:' + contestId\"></label>\n                <label :text=\"'Loading:' + loading\"></label>\n                \n                <grid-layout rows=\"auto auto\" v-for=\"app in items\" key=\"app.id\" @tap=\"appTapped(app)\" backgroundColor=\"lightgreen\" margin=\"8\">\n                    <label :text=\"app.name\" row=\"0\" class=\"h2\"></label>\n                    <label :text=\"'by ' + app.author\" row=\"1\" class=\"h2\"></label>\n                </grid-layout>\n            </wrap-layout>\n        </scroll-view>\n    ",
    methods: {
        appTapped: function (app) {
            alert('Tapped: ' + app.name);
        }
    },
    created: function () {
        var _this = this;
        console.log("AppListComponent created: " + this.contestId);
        setTimeout(function () {
            _this.items = model_1.getApps();
            _this.loading = false;
        }, 500);
    },
    mounted: function () {
        console.log("AppListComponent mounted: " + this.contestId);
    },
};
var ContestListComponent = {
    props: [],
    data: function () {
        return {
            itemWidth: platform_1.screen.mainScreen.widthDIPs / 2,
            items: [],
            loading: true
        };
    },
    template: "\n        <scroll-view>\n            <wrap-layout orientation=\"horizontal\" :itemWidth=\"itemWidth\">\n                <label :text=\"'Loading:' + loading\"></label>\n                \n                <grid-layout rows=\"auto auto\" v-for=\"contest in items\" key=\"app.id\" @tap=\"$router.replace('/apps/' + contest.id)\" backgroundColor=\"lightgreen\" margin=\"8\">\n                    <label :text=\"contest.name\" row=\"0\" class=\"h2\"></label>\n                </grid-layout>\n            </wrap-layout>\n        </scroll-view>\n    ",
    methods: {},
    created: function () {
        var _this = this;
        console.log("AppListComponent created: " + this.contestId);
        setTimeout(function () {
            _this.items = model_1.getContests();
            _this.loading = false;
        }, 500);
    },
    mounted: function () {
        console.log("AppListComponent mounted: " + this.contestId);
    },
};
var LoginComponent = {
    data: function () {
        return {
            itemWidth: platform_1.screen.mainScreen.widthDIPs / 2,
            email: "test@test.com",
            password: "123456"
        };
    },
    template: "\n        <stack-layout>\n            <text-field hint=\"email\" v-model=\"email\"></text-field>\n            <text-field hint=\"password\" v-model=\"password\" secure=\"true\"></text-field>\n            <button @tap=\"login()\">LOGIN</button>\n            <button @tap=\"signup()\">SIGNUP</button>\n        </stack-layout>\n    ",
    methods: {
        login: function () {
            console.log("logging in... [" + this.email + " | " + this.password + "]");
        },
        signup: function () {
            console.log("signing up... [" + this.email + " | " + this.password + "]");
        }
    }
};
var router = new VueRouter({
    routes: [
        { path: '/login', component: LoginComponent },
        { path: '/contests', component: ContestListComponent },
        { path: '/apps/:contestId', component: AppListComponent, props: true },
        { path: '*', redirect: '/login' }
    ]
});
router.replace('/login');
var app = new Vue({
    router: router,
    template: "\n        <page>\n            <stack-layout>\n                <stack-layout orientation=\"horizontal\">\n                    <button @tap=\"$router.replace('/login')\">login</button>\n                    <button @tap=\"$router.replace('/contests')\">contests</button>\n                    <button @tap=\"$router.replace('/apps/1')\">apps</button>\n                </stack-layout>\n                \n                <label style=\"text-align: center\">Current route: {{ $route.fullPath }}</label>\n                \n                <router-view></router-view>\n            </stack-layout>\n        </page>\n    ",
    data: {
        textRed: false,
        showTrick: false,
        appList: model_1.getApps()
    },
    methods: {
        onTap: function () {
            // alert('Nice Tap!')
            debug_1.dumpViewHierarchy();
        }
    }
});
app.$start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQW1EO0FBQ25ELHNDQUF5QztBQUN6QyxHQUFHLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQ2IsTUFBTyxDQUFDLE9BQU8sR0FBRyxFQUFFLEdBQUcsRUFBRSxFQUFFLEVBQUUsQ0FBQSxDQUFDLDBFQUEwRTtBQUU5RyxpQ0FBeUQ7QUFDekQsc0RBQW1EO0FBR25ELGlDQUFzRDtBQUN0RCxrQ0FBa0M7QUFDbEMseURBQXlEO0FBQ3pELGtCQUFrQjtBQUVsQixJQUFNLGdCQUFnQixHQUFHO0lBQ3JCLEtBQUssRUFBRSxDQUFFLFdBQVcsQ0FBRTtJQUN0QixJQUFJLEVBQUU7UUFDRixNQUFNLENBQUM7WUFDSCxTQUFTLEVBQUUsaUJBQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLENBQUM7WUFDMUMsS0FBSyxFQUFFLEVBQUU7WUFDVCxPQUFPLEVBQUUsSUFBSTtTQUNoQixDQUFBO0lBQ0wsQ0FBQztJQUNELFFBQVEsRUFBRSw2cEJBWVQ7SUFDRCxPQUFPLEVBQUU7UUFDTCxTQUFTLFlBQUMsR0FBYTtZQUNuQixLQUFLLENBQUMsVUFBVSxHQUFHLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNqQyxDQUFDO0tBQ0o7SUFDRCxPQUFPO1FBQVAsaUJBTUM7UUFMRyxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzRCxVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsS0FBSyxHQUFHLGVBQU8sRUFBRSxDQUFDO1lBQ3ZCLEtBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztJQUNaLENBQUM7SUFDRCxPQUFPO1FBQ0gsT0FBTyxDQUFDLEdBQUcsQ0FBQyw0QkFBNEIsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDL0QsQ0FBQztDQUNKLENBQUM7QUFFRixJQUFNLG9CQUFvQixHQUFHO0lBQ3pCLEtBQUssRUFBRSxFQUFFO0lBQ1QsSUFBSSxFQUFFO1FBQ0YsTUFBTSxDQUFDO1lBQ0gsU0FBUyxFQUFFLGlCQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxDQUFDO1lBQzFDLEtBQUssRUFBRSxFQUFFO1lBQ1QsT0FBTyxFQUFFLElBQUk7U0FDaEIsQ0FBQTtJQUNMLENBQUM7SUFDRCxRQUFRLEVBQUUsK2hCQVVUO0lBQ0QsT0FBTyxFQUFFLEVBQ1I7SUFDRCxPQUFPO1FBQVAsaUJBTUM7UUFMRyxPQUFPLENBQUMsR0FBRyxDQUFDLDRCQUE0QixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzRCxVQUFVLENBQUM7WUFDUCxLQUFJLENBQUMsS0FBSyxHQUFHLG1CQUFXLEVBQUUsQ0FBQztZQUMzQixLQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUN6QixDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDWixDQUFDO0lBQ0QsT0FBTztRQUNILE9BQU8sQ0FBQyxHQUFHLENBQUMsNEJBQTRCLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQy9ELENBQUM7Q0FDSixDQUFDO0FBR0YsSUFBTSxjQUFjLEdBQUc7SUFDbkIsSUFBSSxFQUFFO1FBQ0YsTUFBTSxDQUFDO1lBQ0gsU0FBUyxFQUFFLGlCQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsR0FBRyxDQUFDO1lBQzFDLEtBQUssRUFBRSxlQUFlO1lBQ3RCLFFBQVEsRUFBRSxRQUFRO1NBQ3JCLENBQUE7SUFDTCxDQUFDO0lBQ0QsUUFBUSxFQUFFLDJVQU9UO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsS0FBSztZQUNELE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQWtCLElBQUksQ0FBQyxLQUFLLFdBQU0sSUFBSSxDQUFDLFFBQVEsTUFBRyxDQUFDLENBQUM7UUFDcEUsQ0FBQztRQUNELE1BQU07WUFDRixPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFrQixJQUFJLENBQUMsS0FBSyxXQUFNLElBQUksQ0FBQyxRQUFRLE1BQUcsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7S0FDSjtDQUNKLENBQUM7QUFHRixJQUFNLE1BQU0sR0FBRyxJQUFJLFNBQVMsQ0FBQztJQUN6QixNQUFNLEVBQUU7UUFDSixFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRTtRQUM3QyxFQUFFLElBQUksRUFBRSxXQUFXLEVBQUUsU0FBUyxFQUFFLG9CQUFvQixFQUFFO1FBQ3RELEVBQUUsSUFBSSxFQUFFLGtCQUFrQixFQUFFLFNBQVMsRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFO1FBQ3RFLEVBQUUsSUFBSSxFQUFFLEdBQUcsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFO0tBQ3BDO0NBQ0osQ0FBQyxDQUFBO0FBRUYsTUFBTSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQTtBQUV4QixJQUFNLEdBQUcsR0FBRyxJQUFJLEdBQUcsQ0FBQztJQUNoQixNQUFNLFFBQUE7SUFDTixRQUFRLEVBQUUsb21CQWNUO0lBRUQsSUFBSSxFQUFFO1FBQ0YsT0FBTyxFQUFFLEtBQUs7UUFDZCxTQUFTLEVBQUUsS0FBSztRQUNoQixPQUFPLEVBQUUsZUFBTyxFQUFFO0tBQ3JCO0lBRUQsT0FBTyxFQUFFO1FBQ0wsS0FBSztZQUNELHFCQUFxQjtZQUNyQix5QkFBaUIsRUFBRSxDQUFDO1FBQ3hCLENBQUM7S0FDSjtDQUNKLENBQUMsQ0FBQztBQUNILEdBQUcsQ0FBQyxNQUFNLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFZ1ZSBmcm9tICduYXRpdmVzY3JpcHQtdnVlL2Rpc3QvaW5kZXgnO1xuaW1wb3J0ICogYXMgIFZ1ZVJvdXRlciBmcm9tICd2dWUtcm91dGVyJztcblZ1ZS51c2UoVnVlUm91dGVyKTtcbig8YW55Pmdsb2JhbCkucHJvY2VzcyA9IHsgZW52OiB7fSB9IC8vIGhhY2shIGEgYnVpbGQgcHJvY2VzcyBzaG91bGQgcmVwbGFjZSBwcm9jZXNzLmVudidzIHdpdGggc3RhdGljIHN0cmluZ3MuXG5cbmltcG9ydCB7IEFwcEVudHJ5LCBnZXRBcHBzLCBnZXRDb250ZXN0cyB9IGZyb20gXCIuL21vZGVsXCI7XG5pbXBvcnQgeyBzY3JlZW4gfSBmcm9tIFwidG5zLWNvcmUtbW9kdWxlcy9wbGF0Zm9ybVwiO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gXCJ0bnMtY29yZS1tb2R1bGVzL3VpL2NvcmUvdmlld1wiO1xuXG5pbXBvcnQgeyBkdW1wVmlldywgZHVtcFZpZXdIaWVyYXJjaHkgfSBmcm9tIFwiLi9kZWJ1Z1wiO1xuLy8gaW1wb3J0ICogYXMgdHJhY2UgZnJvbSBcInRyYWNlXCI7XG4vLyB0cmFjZS5zZXRDYXRlZ29yaWVzKFwiTmF0aXZlTGlmZWN5Y2xlLCBWaWV3SGllcmFyY2h5XCIpO1xuLy8gdHJhY2UuZW5hYmxlKCk7XG5cbmNvbnN0IEFwcExpc3RDb21wb25lbnQgPSB7XG4gICAgcHJvcHM6IFsgXCJjb250ZXN0SWRcIiBdLFxuICAgIGRhdGE6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGl0ZW1XaWR0aDogc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzIC8gMixcbiAgICAgICAgICAgIGl0ZW1zOiBbXSxcbiAgICAgICAgICAgIGxvYWRpbmc6IHRydWVcbiAgICAgICAgfVxuICAgIH0sXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHNjcm9sbC12aWV3PlxuICAgICAgICAgICAgPHdyYXAtbGF5b3V0IG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiIDppdGVtV2lkdGg9XCJpdGVtV2lkdGhcIj5cbiAgICAgICAgICAgICAgICA8bGFiZWwgOnRleHQ9XCInU2hvd2luZyBpZDonICsgY29udGVzdElkXCI+PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8bGFiZWwgOnRleHQ9XCInTG9hZGluZzonICsgbG9hZGluZ1wiPjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGdyaWQtbGF5b3V0IHJvd3M9XCJhdXRvIGF1dG9cIiB2LWZvcj1cImFwcCBpbiBpdGVtc1wiIGtleT1cImFwcC5pZFwiIEB0YXA9XCJhcHBUYXBwZWQoYXBwKVwiIGJhY2tncm91bmRDb2xvcj1cImxpZ2h0Z3JlZW5cIiBtYXJnaW49XCI4XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCA6dGV4dD1cImFwcC5uYW1lXCIgcm93PVwiMFwiIGNsYXNzPVwiaDJcIj48L2xhYmVsPlxuICAgICAgICAgICAgICAgICAgICA8bGFiZWwgOnRleHQ9XCInYnkgJyArIGFwcC5hdXRob3JcIiByb3c9XCIxXCIgY2xhc3M9XCJoMlwiPjwvbGFiZWw+XG4gICAgICAgICAgICAgICAgPC9ncmlkLWxheW91dD5cbiAgICAgICAgICAgIDwvd3JhcC1sYXlvdXQ+XG4gICAgICAgIDwvc2Nyb2xsLXZpZXc+XG4gICAgYCxcbiAgICBtZXRob2RzOiB7XG4gICAgICAgIGFwcFRhcHBlZChhcHA6IEFwcEVudHJ5KSB7XG4gICAgICAgICAgICBhbGVydCgnVGFwcGVkOiAnICsgYXBwLm5hbWUpO1xuICAgICAgICB9XG4gICAgfSxcbiAgICBjcmVhdGVkKCkge1xuICAgICAgICBjb25zb2xlLmxvZyhcIkFwcExpc3RDb21wb25lbnQgY3JlYXRlZDogXCIgKyB0aGlzLmNvbnRlc3RJZCk7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IGdldEFwcHMoKTtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9LCA1MDApO1xuICAgIH0sXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBcHBMaXN0Q29tcG9uZW50IG1vdW50ZWQ6IFwiICsgdGhpcy5jb250ZXN0SWQpO1xuICAgIH0sXG59O1xuXG5jb25zdCBDb250ZXN0TGlzdENvbXBvbmVudCA9IHtcbiAgICBwcm9wczogW10sXG4gICAgZGF0YTogKCkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgaXRlbVdpZHRoOiBzY3JlZW4ubWFpblNjcmVlbi53aWR0aERJUHMgLyAyLFxuICAgICAgICAgICAgaXRlbXM6IFtdLFxuICAgICAgICAgICAgbG9hZGluZzogdHJ1ZVxuICAgICAgICB9XG4gICAgfSxcbiAgICB0ZW1wbGF0ZTogYFxuICAgICAgICA8c2Nyb2xsLXZpZXc+XG4gICAgICAgICAgICA8d3JhcC1sYXlvdXQgb3JpZW50YXRpb249XCJob3Jpem9udGFsXCIgOml0ZW1XaWR0aD1cIml0ZW1XaWR0aFwiPlxuICAgICAgICAgICAgICAgIDxsYWJlbCA6dGV4dD1cIidMb2FkaW5nOicgKyBsb2FkaW5nXCI+PC9sYWJlbD5cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICA8Z3JpZC1sYXlvdXQgcm93cz1cImF1dG8gYXV0b1wiIHYtZm9yPVwiY29udGVzdCBpbiBpdGVtc1wiIGtleT1cImFwcC5pZFwiIEB0YXA9XCIkcm91dGVyLnJlcGxhY2UoJy9hcHBzLycgKyBjb250ZXN0LmlkKVwiIGJhY2tncm91bmRDb2xvcj1cImxpZ2h0Z3JlZW5cIiBtYXJnaW49XCI4XCI+XG4gICAgICAgICAgICAgICAgICAgIDxsYWJlbCA6dGV4dD1cImNvbnRlc3QubmFtZVwiIHJvdz1cIjBcIiBjbGFzcz1cImgyXCI+PC9sYWJlbD5cbiAgICAgICAgICAgICAgICA8L2dyaWQtbGF5b3V0PlxuICAgICAgICAgICAgPC93cmFwLWxheW91dD5cbiAgICAgICAgPC9zY3JvbGwtdmlldz5cbiAgICBgLFxuICAgIG1ldGhvZHM6IHtcbiAgICB9LFxuICAgIGNyZWF0ZWQoKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKFwiQXBwTGlzdENvbXBvbmVudCBjcmVhdGVkOiBcIiArIHRoaXMuY29udGVzdElkKTtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gZ2V0Q29udGVzdHMoKTtcbiAgICAgICAgICAgIHRoaXMubG9hZGluZyA9IGZhbHNlO1xuICAgICAgICB9LCA1MDApO1xuICAgIH0sXG4gICAgbW91bnRlZCgpIHtcbiAgICAgICAgY29uc29sZS5sb2coXCJBcHBMaXN0Q29tcG9uZW50IG1vdW50ZWQ6IFwiICsgdGhpcy5jb250ZXN0SWQpO1xuICAgIH0sXG59O1xuXG5cbmNvbnN0IExvZ2luQ29tcG9uZW50ID0ge1xuICAgIGRhdGE6ICgpID0+IHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGl0ZW1XaWR0aDogc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzIC8gMixcbiAgICAgICAgICAgIGVtYWlsOiBcInRlc3RAdGVzdC5jb21cIixcbiAgICAgICAgICAgIHBhc3N3b3JkOiBcIjEyMzQ1NlwiXG4gICAgICAgIH1cbiAgICB9LFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxzdGFjay1sYXlvdXQ+XG4gICAgICAgICAgICA8dGV4dC1maWVsZCBoaW50PVwiZW1haWxcIiB2LW1vZGVsPVwiZW1haWxcIj48L3RleHQtZmllbGQ+XG4gICAgICAgICAgICA8dGV4dC1maWVsZCBoaW50PVwicGFzc3dvcmRcIiB2LW1vZGVsPVwicGFzc3dvcmRcIiBzZWN1cmU9XCJ0cnVlXCI+PC90ZXh0LWZpZWxkPlxuICAgICAgICAgICAgPGJ1dHRvbiBAdGFwPVwibG9naW4oKVwiPkxPR0lOPC9idXR0b24+XG4gICAgICAgICAgICA8YnV0dG9uIEB0YXA9XCJzaWdudXAoKVwiPlNJR05VUDwvYnV0dG9uPlxuICAgICAgICA8L3N0YWNrLWxheW91dD5cbiAgICBgLFxuICAgIG1ldGhvZHM6IHtcbiAgICAgICAgbG9naW4oKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhgbG9nZ2luZyBpbi4uLiBbJHt0aGlzLmVtYWlsfSB8ICR7dGhpcy5wYXNzd29yZH1dYCk7XG4gICAgICAgIH0sXG4gICAgICAgIHNpZ251cCgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKGBzaWduaW5nIHVwLi4uIFske3RoaXMuZW1haWx9IHwgJHt0aGlzLnBhc3N3b3JkfV1gKTtcbiAgICAgICAgfVxuICAgIH1cbn07XG5cblxuY29uc3Qgcm91dGVyID0gbmV3IFZ1ZVJvdXRlcih7XG4gICAgcm91dGVzOiBbXG4gICAgICAgIHsgcGF0aDogJy9sb2dpbicsIGNvbXBvbmVudDogTG9naW5Db21wb25lbnQgfSxcbiAgICAgICAgeyBwYXRoOiAnL2NvbnRlc3RzJywgY29tcG9uZW50OiBDb250ZXN0TGlzdENvbXBvbmVudCB9LFxuICAgICAgICB7IHBhdGg6ICcvYXBwcy86Y29udGVzdElkJywgY29tcG9uZW50OiBBcHBMaXN0Q29tcG9uZW50LCBwcm9wczogdHJ1ZSB9LFxuICAgICAgICB7IHBhdGg6ICcqJywgcmVkaXJlY3Q6ICcvbG9naW4nIH1cbiAgICBdXG59KVxuXG5yb3V0ZXIucmVwbGFjZSgnL2xvZ2luJylcblxuY29uc3QgYXBwID0gbmV3IFZ1ZSh7XG4gICAgcm91dGVyLFxuICAgIHRlbXBsYXRlOiBgXG4gICAgICAgIDxwYWdlPlxuICAgICAgICAgICAgPHN0YWNrLWxheW91dD5cbiAgICAgICAgICAgICAgICA8c3RhY2stbGF5b3V0IG9yaWVudGF0aW9uPVwiaG9yaXpvbnRhbFwiPlxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIEB0YXA9XCIkcm91dGVyLnJlcGxhY2UoJy9sb2dpbicpXCI+bG9naW48L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBAdGFwPVwiJHJvdXRlci5yZXBsYWNlKCcvY29udGVzdHMnKVwiPmNvbnRlc3RzPC9idXR0b24+XG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gQHRhcD1cIiRyb3V0ZXIucmVwbGFjZSgnL2FwcHMvMScpXCI+YXBwczwvYnV0dG9uPlxuICAgICAgICAgICAgICAgIDwvc3RhY2stbGF5b3V0PlxuICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgIDxsYWJlbCBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlclwiPkN1cnJlbnQgcm91dGU6IHt7ICRyb3V0ZS5mdWxsUGF0aCB9fTwvbGFiZWw+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPHJvdXRlci12aWV3Pjwvcm91dGVyLXZpZXc+XG4gICAgICAgICAgICA8L3N0YWNrLWxheW91dD5cbiAgICAgICAgPC9wYWdlPlxuICAgIGAsXG5cbiAgICBkYXRhOiB7XG4gICAgICAgIHRleHRSZWQ6IGZhbHNlLFxuICAgICAgICBzaG93VHJpY2s6IGZhbHNlLFxuICAgICAgICBhcHBMaXN0OiBnZXRBcHBzKClcbiAgICB9LFxuXG4gICAgbWV0aG9kczoge1xuICAgICAgICBvblRhcCgpIHtcbiAgICAgICAgICAgIC8vIGFsZXJ0KCdOaWNlIFRhcCEnKVxuICAgICAgICAgICAgZHVtcFZpZXdIaWVyYXJjaHkoKTtcbiAgICAgICAgfVxuICAgIH1cbn0pO1xuYXBwLiRzdGFydCgpXG5cblxuIl19