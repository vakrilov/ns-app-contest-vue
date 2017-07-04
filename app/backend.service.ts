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


function getValueOnce(path: string): Promise<any> {
    return firebase.query(() => { },
        path,
        {
            singleEvent: true,
            orderBy: {
                type: firebase.QueryOrderByType.CHILD,
                value: 'since' // mandatory when type is 'child'
            }
        }
    )
}

export function getContests(): Promise<Contest[]> {
    console.log("[Firebase] getting contests ...");

    return getValueOnce("/contests")
        .then((result) => {
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

export function getApps(contest: string): Promise<AppEntry[]> {
    console.log(`[Firebase] getting apps for ${contest} ...`);

    return getValueOnce("/apps/" + contest)
        .then((result) => {
            if (result.error) {
                throw new Error(result.error);
            }

            const data = <firebase.FBData>result;
            const apps: AppEntry[] = [];
            for (let id in data.value) {
                const app = data.value[ id ];
                apps.push({
                    id,
                    name: app.name,
                    author: app.author
                })
            }
            return apps;
        }).catch((error) => {
            console.log(`[Firebase] getting apps for ${contest} error: ${error}`);
        });
}


export function toggleVote(contestId: string, appId: string, user: string) {
    const votePath = "/apps/" + contestId + "/" + appId + "/votes/" + user;
    console.log(`[Firebase] Voting for app [${votePath}] `);

    return getValueOnce(votePath)
        .then((result) => {
            if (result.error) {
                throw new Error(result.error);
            }

            if (result.value) {
                console.log("Already voted - toggle off");
                return firebase.remove(votePath);
            } else {
                console.log("Not voted - toggle on");
                return firebase.setValue(votePath, true);
            }
        })
        .then((voteResult) => {
            console.log("Voting done!");
        })
        .catch((error) => {
            console.log(`[Firebase] error voting for ${appId}`);
        });

}


setTimeout(() => {
    var onChildEvent = function (result) {
    console.log("onChildEvent Event type: " + result.type);
    console.log("onChildEvent Key: " + result.key);
    console.log("onChildEvent Value: " + JSON.stringify(result.value));
};

// listen to changes in the /users path
firebase.addChildEventListener(onChildEvent, "/apps").then(
    function (listenerWrapper) {
        console.log("addChildEventListener done");
        
        var path = listenerWrapper.path;
        var listeners = listenerWrapper.listeners; // an Array of listeners added
        // you can store the wrapper somewhere to later call 'removeEventListeners'
    }
);
});