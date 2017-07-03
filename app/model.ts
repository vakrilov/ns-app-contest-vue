import * as firebase from "nativescript-plugin-firebase";

export interface AppEntry {
    id: string;
    name: string;
    author: string;
    isWinner?: boolean;
    mainImageUrl?: string;
    screenshots?: string[];
}

export interface Contest {
    id: string;
    name: string;
    hasEnded?: boolean;
    entries?: AppEntry[];
}

const appList: AppEntry[] = [
    { id: "1", name: "first app", author: "Alex Vakrilov" },
    { id: "2", name: "second app", author: "Igor" },
    { id: "3", name: "third app", author: "Brad" },
]

export function getApps(): AppEntry[] {
    return appList;
}

export function init() {
    console.log("[Firebase] Initalizing ...");
    firebase.init({
        // Optionally pass in properties for database, authentication and cloud messaging,
        // see their respective docs.
    }).then(
        (instance) => {
            console.log("[Firebase] Init done");
        },
        (error) => {
            console.log("[Firebase] Init error: " + error);
        });
}

export function getContests(): Promise<Contest[]> {
    console.log("[Firebase] getting contests ...");

    return firebase.query(() => { },
        "/contests",
        {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            }
        }
    ).then((result) => {
        if (result.error) {
            throw new Error(result.error);
        }

        const data = <firebase.FBData>result;
        const contests: Contest[] = [];
        for (let id in data.value) {
            contests.push({
                id,
                name: data.value[ id ].name,
                hasEnded: data.value[ id ].hasEnded
            })
        }
        return contests;
    }).catch((error) => { 
        console.log("[Firebase] getting contests error: " + error);
     });
}


