export type ChangeType = "feature" | "fix" | "improvement" | "announcement";

export interface ChangelogEntry {
    version: string;
    date: string;
    title: string;
    description: string;
    changes: {
        type: ChangeType;
        text: string;
    }[];
}

export const changelogData: ChangelogEntry[] = [
    {
        version: "1.0.0",
        date: "2024-03-15",
        title: "The Official Release",
        description: "After months of beta testing, Lokus v1.0 is finally here. We've completely overhauled the sync engine, added a new graph view, and polished the UI to perfection.",
        changes: [
            { type: "announcement", text: "Public release of Lokus for macOS, Windows, and Linux." },
            { type: "feature", text: "New 'Spark Ideas' canvas for infinite brainstorming." },
            { type: "feature", text: "End-to-end encrypted sync with zero-knowledge architecture." },
            { type: "improvement", text: "Performance boost: Opening large vaults is now 3x faster." },
            { type: "fix", text: "Fixed an issue where nested tags weren't rendering correctly in the graph." }
        ]
    },
    {
        version: "0.9.5",
        date: "2024-02-28",
        title: "The Performance Update",
        description: "We focused purely on speed and reliability in this update. The editor is now snappier, and search is instant.",
        changes: [
            { type: "improvement", text: "Instant search results with fuzzy matching." },
            { type: "improvement", text: "Reduced memory usage by 40%." },
            { type: "fix", text: "Fixed a crash when pasting large images." }
        ]
    },
    {
        version: "0.9.0",
        date: "2024-02-10",
        title: "Introducing Plugins",
        description: "Lokus is now extensible. Build your own workflows with our new Plugin API.",
        changes: [
            { type: "feature", text: "Plugin API beta release." },
            { type: "feature", text: "Added 'Marketplace' to browse community plugins." },
            { type: "improvement", text: "Updated UI for settings menu." }
        ]
    }
];
