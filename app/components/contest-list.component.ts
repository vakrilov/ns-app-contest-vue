const Vue = require('nativescript-vue/dist/index')

import { getContests } from "../services/backend.service";

Vue.component('contest-component', {
    props: [ 'contest' ],
    template: `
    <grid-layout>
        <card-view class="contest-card">
            <grid-layout rows="auto auto auto" @tap="$emit('selected')">
                <image :src="contest.imageUrl" height="160" stretch="aspectFill"></image>
                <label :text="contest.name" row="1" class="h2" margin="24 16 0 16"></label>
                <label :text="contest.description" row="2" textWrap="true" margin="12 16 24 16"></label>
            </grid-layout>
        </card-view>
    </grid-layout>
    `
})

export const ContestListComponent = {
    props: [],
    data: () => {
        return {
            items: [],
            loading: true
        }
    },
    template: `
        <grid-layout>
            <list-view :items="items" separatorColor="transparent" backgroundColor="transparent">
                <template scope="item">
                    <contest-component :contest="item" @selected="$router.replace('/apps/' + item.id)"></contest-component>
                </template>
            </list-view>
            <activity-indicator busy="true" v-if="loading"></activity-indicator>
        </grid-layout>
    `,
    created() {
        getContests().then((result) => {
            this.items = result;
            this.loading = false;
        });
    }
};
