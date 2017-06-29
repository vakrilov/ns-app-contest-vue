export interface AppEntry {
    id: string;
    name: string;
    author: string;
    mainImageUrl?: string;
    screenshots?: string[];
}

const appList: AppEntry[] = [
    { id: "1", name: "first app", author: "Alex Vakrilov"},
    { id: "2", name: "second app", author: "Igor"},
    { id: "3", name: "third app", author: "Brad"},
]

export function getApps(): AppEntry[] {
    return appList;
}