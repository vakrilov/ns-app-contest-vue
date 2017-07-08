import { screen } from "tns-core-modules/platform";
import { AppEntry, getApps, toggleVote, startAppListeners, stopAppListeners } from "../services/backend.service";
import { currentUser } from "../services/user.service";

export const AppListComponent = {
    props: [ "contestId" ],
    data: () => {
        return {
            itemWidth: screen.mainScreen.widthDIPs / 2,
            items: [],
            loading: true,
            currentUser: currentUser
        }
    },
    template: `
    <grid-layout>
        <scroll-view>
            <wrap-layout orientation="horizontal" :itemWidth="itemWidth">
                <stack-layout rows="auto auto auto" v-for="app in items" key="app.id" backgroundColor="lightgreen" margin="8">
                    <label :text="app.name" row="0" class="h2" textWrap="true"></label>
                    <label :text="'by ' + app.author" ></label>
                    <label :text="'votes: ' + app.votes" row="1" ></label>
                    <label :text="'userVoted: ' + app.userVoted" ></label>
                    <button text="vote" @tap="vote(app)" row="2"></button>
                </stack-layout>
            </wrap-layout>
        </scroll-view>
        <activity-indicator busy="true" v-if="loading"></activity-indicator>
    </grid-layout>
    `,
    methods: {
        vote(app: AppEntry) {
            if (currentUser.id) {
                toggleVote(app);
            } else {
                alert("Cannot vot if you are not logged in");
            }
        },

    },
    created() {
        console.log("AppListComponent created: " + this.contestId);
        this.items = getApps(this.contestId).then((apps) => {
            this.items = apps;
            this.loading = false;
            startAppListeners(this.items);
        });
    },
    mounted() {
        console.log("AppListComponent mounted: " + this.contestId);
    },
    beforeDestroy() {
        console.log("AppListComponent beforeDestroy: " + this.contestId);
        stopAppListeners(this.items);
    }
};
