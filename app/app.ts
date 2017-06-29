import * as Vue from 'nativescript-vue/dist/index';
import { AppEntry, getApps } from "./model";
import { screen } from "tns-core-modules/platform";

screen.mainScreen.widthDIPs;

Vue.component('app-list', {
    props: [ 'items' ],

    data: () => {
        return {
            itemWidth: screen.mainScreen.widthDIPs / 2 
        }
    },

    template: `
        <wrap-layout>
            <scroll-view>
                <wrap-layout orientation="horizontal" :itemWidth="itemWidth">
                      <grid-layout rows="auto auto" v-for="app in items" key="app.id" @tap="appTapped(app)" backgroundColor="lightgreen" margin="8">
                        <label :text="app.name" row="0" class="h2"></label>
                        <label :text="'by ' + app.author" row="1" class="h2"></label>
                    </grid-layout>
                </wrap-layout>WS
            </scroll-view>
        </wrap-layout>
    `,
    methods: {
        appTapped(app: AppEntry) {
            alert('Tapped: ' + app.name);
        }
    }

})

new Vue({
    template: `
        <page>
            <stack-layout>
            <label :text="itemWidth"></label>
                            <button @tap="onTap">TAP HERE</button>
                <button @tap="textRed = !textRed" style="color: white; background-color: darkcyan;">TAP HERE</button>
                <label :style="{color: textRed ? 'red' : 'blue'}"
                        style="text-align: center; margin-top: 20; font-size: 40"
                        :text="showTrick ? 'Poof!' : 'Wait for it!'"></label>
                <button @tap="showTrick = !showTrick">Tap to see a trick!</button>
                
                <app-list :items="appList"></app-list>
            </stack-layout>
        </page>
    `,

    data: {
        textRed: false,
        showTrick: false,
        imgSrc: '~/images/apple.jpg',
        appList: getApps(),
        itemWidth: "123"

    },

    methods: {
        onTap() {
            alert('Nice Tap!')
        }
    }
}).$start()