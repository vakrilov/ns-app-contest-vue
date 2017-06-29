"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vue = require("nativescript-vue/dist/index");
var model_1 = require("./model");
var platform_1 = require("tns-core-modules/platform");
platform_1.screen.mainScreen.widthDIPs;
Vue.component('app-list', {
    props: ['items'],
    data: function () {
        return {
            itemWidth: platform_1.screen.mainScreen.widthDIPs / 2
        };
    },
    template: "\n        <wrap-layout>\n            <scroll-view>\n                <wrap-layout orientation=\"horizontal\" :itemWidth=\"itemWidth\">\n                      <grid-layout rows=\"auto auto\" v-for=\"app in items\" key=\"app.id\" @tap=\"appTapped(app)\" backgroundColor=\"lightgreen\" margin=\"8\">\n                        <label :text=\"app.name\" row=\"0\" class=\"h2\"></label>\n                        <label :text=\"'by ' + app.author\" row=\"1\" class=\"h2\"></label>\n                    </grid-layout>\n                </wrap-layout>WS\n            </scroll-view>\n        </wrap-layout>\n    ",
    methods: {
        appTapped: function (app) {
            alert('Tapped: ' + app.name);
        }
    }
});
new Vue({
    template: "\n        <page>\n            <stack-layout>\n            <label :text=\"itemWidth\"></label>\n                            <button @tap=\"onTap\">TAP HERE</button>\n                <button @tap=\"textRed = !textRed\" style=\"color: white; background-color: darkcyan;\">TAP HERE</button>\n                <label :style=\"{color: textRed ? 'red' : 'blue'}\"\n                        style=\"text-align: center; margin-top: 20; font-size: 40\"\n                        :text=\"showTrick ? 'Poof!' : 'Wait for it!'\"></label>\n                <button @tap=\"showTrick = !showTrick\">Tap to see a trick!</button>\n                \n                <app-list :items=\"appList\"></app-list>\n            </stack-layout>\n        </page>\n    ",
    data: {
        textRed: false,
        showTrick: false,
        imgSrc: '~/images/apple.jpg',
        appList: model_1.getApps(),
        itemWidth: "123"
    },
    methods: {
        onTap: function () {
            alert('Nice Tap!');
        }
    }
}).$start();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBwLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsaURBQW1EO0FBQ25ELGlDQUE0QztBQUM1QyxzREFBbUQ7QUFFbkQsaUJBQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO0FBRTVCLEdBQUcsQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFO0lBQ3RCLEtBQUssRUFBRSxDQUFFLE9BQU8sQ0FBRTtJQUVsQixJQUFJLEVBQUU7UUFDRixNQUFNLENBQUM7WUFDSCxTQUFTLEVBQUUsaUJBQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxHQUFHLENBQUM7U0FDN0MsQ0FBQTtJQUNMLENBQUM7SUFFRCxRQUFRLEVBQUUseWxCQVdUO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsU0FBUyxZQUFDLEdBQWE7WUFDbkIsS0FBSyxDQUFDLFVBQVUsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDakMsQ0FBQztLQUNKO0NBRUosQ0FBQyxDQUFBO0FBRUYsSUFBSSxHQUFHLENBQUM7SUFDSixRQUFRLEVBQUUsaXVCQWNUO0lBRUQsSUFBSSxFQUFFO1FBQ0YsT0FBTyxFQUFFLEtBQUs7UUFDZCxTQUFTLEVBQUUsS0FBSztRQUNoQixNQUFNLEVBQUUsb0JBQW9CO1FBQzVCLE9BQU8sRUFBRSxlQUFPLEVBQUU7UUFDbEIsU0FBUyxFQUFFLEtBQUs7S0FFbkI7SUFFRCxPQUFPLEVBQUU7UUFDTCxLQUFLO1lBQ0QsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ3RCLENBQUM7S0FDSjtDQUNKLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIFZ1ZSBmcm9tICduYXRpdmVzY3JpcHQtdnVlL2Rpc3QvaW5kZXgnO1xuaW1wb3J0IHsgQXBwRW50cnksIGdldEFwcHMgfSBmcm9tIFwiLi9tb2RlbFwiO1xuaW1wb3J0IHsgc2NyZWVuIH0gZnJvbSBcInRucy1jb3JlLW1vZHVsZXMvcGxhdGZvcm1cIjtcblxuc2NyZWVuLm1haW5TY3JlZW4ud2lkdGhESVBzO1xuXG5WdWUuY29tcG9uZW50KCdhcHAtbGlzdCcsIHtcbiAgICBwcm9wczogWyAnaXRlbXMnIF0sXG5cbiAgICBkYXRhOiAoKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBpdGVtV2lkdGg6IHNjcmVlbi5tYWluU2NyZWVuLndpZHRoRElQcyAvIDIgXG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHdyYXAtbGF5b3V0PlxuICAgICAgICAgICAgPHNjcm9sbC12aWV3PlxuICAgICAgICAgICAgICAgIDx3cmFwLWxheW91dCBvcmllbnRhdGlvbj1cImhvcml6b250YWxcIiA6aXRlbVdpZHRoPVwiaXRlbVdpZHRoXCI+XG4gICAgICAgICAgICAgICAgICAgICAgPGdyaWQtbGF5b3V0IHJvd3M9XCJhdXRvIGF1dG9cIiB2LWZvcj1cImFwcCBpbiBpdGVtc1wiIGtleT1cImFwcC5pZFwiIEB0YXA9XCJhcHBUYXBwZWQoYXBwKVwiIGJhY2tncm91bmRDb2xvcj1cImxpZ2h0Z3JlZW5cIiBtYXJnaW49XCI4XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGFiZWwgOnRleHQ9XCJhcHAubmFtZVwiIHJvdz1cIjBcIiBjbGFzcz1cImgyXCI+PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsYWJlbCA6dGV4dD1cIidieSAnICsgYXBwLmF1dGhvclwiIHJvdz1cIjFcIiBjbGFzcz1cImgyXCI+PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgPC9ncmlkLWxheW91dD5cbiAgICAgICAgICAgICAgICA8L3dyYXAtbGF5b3V0PldTXG4gICAgICAgICAgICA8L3Njcm9sbC12aWV3PlxuICAgICAgICA8L3dyYXAtbGF5b3V0PlxuICAgIGAsXG4gICAgbWV0aG9kczoge1xuICAgICAgICBhcHBUYXBwZWQoYXBwOiBBcHBFbnRyeSkge1xuICAgICAgICAgICAgYWxlcnQoJ1RhcHBlZDogJyArIGFwcC5uYW1lKTtcbiAgICAgICAgfVxuICAgIH1cblxufSlcblxubmV3IFZ1ZSh7XG4gICAgdGVtcGxhdGU6IGBcbiAgICAgICAgPHBhZ2U+XG4gICAgICAgICAgICA8c3RhY2stbGF5b3V0PlxuICAgICAgICAgICAgPGxhYmVsIDp0ZXh0PVwiaXRlbVdpZHRoXCI+PC9sYWJlbD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIEB0YXA9XCJvblRhcFwiPlRBUCBIRVJFPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGJ1dHRvbiBAdGFwPVwidGV4dFJlZCA9ICF0ZXh0UmVkXCIgc3R5bGU9XCJjb2xvcjogd2hpdGU7IGJhY2tncm91bmQtY29sb3I6IGRhcmtjeWFuO1wiPlRBUCBIRVJFPC9idXR0b24+XG4gICAgICAgICAgICAgICAgPGxhYmVsIDpzdHlsZT1cIntjb2xvcjogdGV4dFJlZCA/ICdyZWQnIDogJ2JsdWUnfVwiXG4gICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cInRleHQtYWxpZ246IGNlbnRlcjsgbWFyZ2luLXRvcDogMjA7IGZvbnQtc2l6ZTogNDBcIlxuICAgICAgICAgICAgICAgICAgICAgICAgOnRleHQ9XCJzaG93VHJpY2sgPyAnUG9vZiEnIDogJ1dhaXQgZm9yIGl0ISdcIj48L2xhYmVsPlxuICAgICAgICAgICAgICAgIDxidXR0b24gQHRhcD1cInNob3dUcmljayA9ICFzaG93VHJpY2tcIj5UYXAgdG8gc2VlIGEgdHJpY2shPC9idXR0b24+XG4gICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgPGFwcC1saXN0IDppdGVtcz1cImFwcExpc3RcIj48L2FwcC1saXN0PlxuICAgICAgICAgICAgPC9zdGFjay1sYXlvdXQ+XG4gICAgICAgIDwvcGFnZT5cbiAgICBgLFxuXG4gICAgZGF0YToge1xuICAgICAgICB0ZXh0UmVkOiBmYWxzZSxcbiAgICAgICAgc2hvd1RyaWNrOiBmYWxzZSxcbiAgICAgICAgaW1nU3JjOiAnfi9pbWFnZXMvYXBwbGUuanBnJyxcbiAgICAgICAgYXBwTGlzdDogZ2V0QXBwcygpLFxuICAgICAgICBpdGVtV2lkdGg6IFwiMTIzXCJcblxuICAgIH0sXG5cbiAgICBtZXRob2RzOiB7XG4gICAgICAgIG9uVGFwKCkge1xuICAgICAgICAgICAgYWxlcnQoJ05pY2UgVGFwIScpXG4gICAgICAgIH1cbiAgICB9XG59KS4kc3RhcnQoKSJdfQ==