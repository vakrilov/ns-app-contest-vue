const Vue = require('nativescript-vue/dist/index')

import { screen } from "tns-core-modules/platform";
import { AppEntry, getApps, toggleVote, startAppListeners, stopAppListeners } from "../services/backend.service";
import { currentUser } from "../services/user.service";


Vue.component('app-component', {
    props: [ 'app' ],
    computed: {
        // a computed getter
        voteImageSrc: function () {
            if (currentUser.id) {
                if (this.app.userVoted) {
                    return "res://heart_filled";
                } else {
                    return "res://heart_empty";
                }
            } else {
                return "res://heart_inactive"
            }
        }
    },
    template: `
    <grid-layout>
        <card-view class="card">
            <grid-layout rows="auto auto auto auto auto auto" columns="* auto" @tap="$emit('selected')">
                <image :src="'https://d2odgkulk9w7if.cloudfront.net/images/default-source/default-album/screen696x6961046632a7b776b26a649ff04000922f2.jpeg'" height="160" stretch="aspectFill" colSpan="2"></image>
                <label :text="app.name" row="1" class="h2" margin="24 16 0 16" textWrap="true"></label>
                <label row="1" col="1" class="font-weight-bold pull-right current"
                    margin="32 16 0 0" :text="app.isWinner ? 'WINNER' : ''"></label>

                <label :text="'by ' + app.author" row="2" textWrap="true" margin="12 16 24 16" colSpan="2"></label>

                <stack-layout row="3" horizontalAlignment="right" orientation="horizontal">
                    <image src="res://fullscreen" class="icon"></image>
                
                    <grid-layout columns="auto auto" @tap="$emit('vote')">
                        <image :src="voteImageSrc" class="icon"></image>
                        <label :text="app.votes" col="1" :class="app.userVoted ? 'voted' : 'not-voted'"></label>
                    </grid-layout>
                </stack-layout>
            </grid-layout>
        </card-view>
    </grid-layout>
    `
})

// <list-view :items="items" separatorColor="transparent" backgroundColor="transparent">
//     <template scope="item">
//         <app-component :app="item" @vote="vote(item)"></app-component>
//     </template>
// </list-view>
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
            <stack-layout>
                <app-component v-for="item in items" key="item.id" :app="item" @vote="vote(item)"></app-component>
            </stack-layout>
        </scroll-view>
        <activity-indicator busy="true" v-if="loading" class="activity-indicator"></activity-indicator>
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
