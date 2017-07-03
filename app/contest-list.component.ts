import { screen } from "tns-core-modules/platform";
import { AppEntry, getApps, getContests } from "./model";

export const ContestListComponent = {
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
