import * as Vue from 'nativescript-vue/dist/index';
import { View } from "tns-core-modules/ui/core/view";
import { topmost } from "tns-core-modules/ui/frame";

function getChildren(view: View): Array<View> {
    let children: Array<View> = [];
    (<any>view).eachChildView((child) => {
        children.push(child);
        return true;
    });
    return children;
}

function wsLvl(level: number): string {
    let res = "";
    for (let i = 0; i < level; i++) {
        res += "    ";
    }
    return res;
}

export function dumpView(view: View, level: number = 0): string {
    let nodeName = (<any>view).nodeName || view;
    let output = [ "(", nodeName ];
    console.log(wsLvl(level) + nodeName);

    // if (verbose) {
    //     if (view instanceof TextBase) {
    //         output.push("[text=", view.text, "]");
    //     }
    // }

    let children = getChildren(view).map((c) => dumpView(c, level + 1)).join(", ");
    if (children) {
        output.push(" ", children);
    }
    output.push(")");
    return output.join("");
}

export function dumpViewHierarchy(){
    dumpView(topmost());
}