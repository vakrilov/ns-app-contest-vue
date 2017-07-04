import { getContests } from "./backend.service";

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
            <stack-layout>
                <grid-layout rows="auto auto" v-for="contest in items" key="app.id" @tap="$router.replace('/apps/' + contest.id)" class="contest-entry">
                    <label :text="contest.name" row="0" class="h2"></label>
                </grid-layout>
            </stack-layout>
            <activity-indicator busy="true" v-if="loading"></activity-indicator>
        </grid-layout>
    `,
    methods: {
    },
    created() {
        getContests().then((result) => {
            this.items = result;
            this.loading = false;
        });
    },
    mounted() {
        console.log("AppListComponent mounted: " + this.contestId);
    },
};
