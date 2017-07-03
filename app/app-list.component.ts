import { screen } from "tns-core-modules/platform";
import { AppEntry, getApps, getContests } from "./model";

export const AppListComponent = {
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
