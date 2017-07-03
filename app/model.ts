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
    { id: "1", name: "first app", author: "Alex Vakrilov"},
    { id: "2", name: "second app", author: "Igor"},
    { id: "3", name: "third app", author: "Brad"},
]

const constestList: Contest[] = [
    { id: "1", name: "first contest"},
    { id: "2", name: "second contest"},
]

export function getApps(): AppEntry[] {
    return appList;
}

export function getContests(): Contest[] {
    return constestList;

}