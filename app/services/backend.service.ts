import * as firebase from "nativescript-plugin-firebase";
import { currentUser } from "./user.service";

export interface AppEntry {
    id: string;
    contestId: string;
    name: string;
    author: string;
    description: string;
    isWinner: boolean;
    mainImageUrl?: string;

    votes?: number;
    userVoted?: boolean;
}

export interface Contest {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    hasEnded: boolean;
}

let contestsCache: Contest[];
const appCache = new Map<string, AppEntry>();
const appListeners = new Map<string, { path: string, listeners: any[] }>();

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

export function getContests(useCache = true): Promise<Contest[]> {
    if (useCache && contestsCache) {
        console.log(`[Firebase] returning contests from cache`);
        return Promise.resolve(contestsCache);
    }

    console.log("[Firebase] getting contests ...");
    return getValueOnce("/contests")
        .then((result) => {
            if (result.error) {
                throw new Error(result.error);
            }

            const data = <firebase.FBData>result;
            const contests: Contest[] = [];
            for (let id in data.value) {
                const fbContest = data.value[ id ];
                contests.push({
                    id,
                    name: fbContest.name,
                    description: fbContest.description,
                    imageUrl: fbContest.imageUrl,
                    hasEnded: fbContest.hasEnded,
                })
            }
            contestsCache = contests;
            return contests;
        }).catch((error) => {
            console.log("[Firebase] getting contests error: " + error);
        });
}


function createApp(id: string, contestId: string, fbApp: any): AppEntry {
    const app = {
        id,
        contestId,
        name: fbApp.name,
        author: fbApp.author,
        isWinner: fbApp.isWinner,
        description: fbApp.description,
        mainImageUrl: fbApp.mainImageUrl
    };

    updateVotes(app, fbApp.votes);
    appCache.set(id, app);
    return app;
}

export function getApps(contestId: string, useCache = true): Promise<AppEntry[]> {
    if (useCache) {
        let cachedApps = [];
        appCache.forEach((app) => {
            if (app.contestId === contestId) {
                cachedApps.push(app);
            }
        });

        if (cachedApps.length) {
            console.log(`[Firebase] returning apps from cache for ${contestId}`);

            return Promise.resolve(cachedApps);
        }
    }

    console.log(`[Firebase] getting apps for ${contestId} ...`);

    return getValueOnce("/apps/" + contestId)
        .then((result) => {
            if (result.error) {
                throw new Error(result.error);
            }

            const data = <firebase.FBData>result;
            const apps: AppEntry[] = [];
            for (let id in data.value) {
                let app = appCache.get(id);
                if (!app) {
                    app = createApp(id, contestId, data.value[ id ]);
                }
                apps.push(app);
            }
            return apps;
        }).catch((error) => {
            console.log(`[Firebase] getting apps for ${contestId} error: ${error}`);
        });
}


export function toggleVote(app: AppEntry) {
    if (!currentUser) {
        throw new Error("Cannot vote if note logged in");
    }

    const path = "/apps/" + app.contestId + "/" + app.id + "/votes/" + currentUser.id;

    if (app.userVoted) {
        console.log(`[Firebase] Voting for app [${path}] - OFF`);
        return firebase.remove(path);
    } else {
        console.log(`[Firebase] Voting for app [${path}] - ON`);
        return firebase.setValue(path, true);
    }
}

function updateVotes(app: AppEntry, fbVotes: object) {
    console.log("Updating votes for: " + app.id);
    console.dir(fbVotes);

    let votesCount = 0;
    let userVoted = false;

    for (let key in fbVotes) {
        votesCount++;
        if (currentUser && currentUser.id === key) {
            userVoted = true;
        }
    }

    app.votes = votesCount;
    app.userVoted = userVoted;
}

export function startAppListeners(apps: AppEntry[]) {
    apps.forEach(addAppListener);
}

export function stopAppListeners(apps: AppEntry[]) {
    apps.forEach(app => removeAppListeners);
}

function removeAppListeners(app) {
    console.log("[Firebase] Clearing listeners for app: " + app.id);
    const listenerInfo = appListeners.get(app.id);
    if (listenerInfo) {
        firebase.removeEventListeners(listenerInfo.listeners, listenerInfo.path);
        appListeners.delete(app.id);
    }
}

function addAppListener(app: AppEntry) {
    if (appListeners.has(app.id)) {
        console.log("[Firebase] Listeners already attached for: " + app.id);
        return;
    }

    const path = "/apps/" + app.contestId + "/" + app.id + "/votes";

    // Set a key placeholder to avoid double attaching
    appListeners.set(app.id, { path, listeners: [] });
    const onVoteChanges = (result) => {
        updateVotes(app, result.value);
    };

    firebase.addValueEventListener(onVoteChanges, path).then(
        (listenerWrapper) => {
            console.log("[Firebase] addChildEventListener success: " + path);
            appListeners.set(app.id, {
                path: listenerWrapper.path,
                listeners: listenerWrapper.listeners
            });
        }
    ).catch((error) => {
        console.log("[Firebase] addChildEventListener failed: " + path);
        appListeners.delete(app.id);
    });
}