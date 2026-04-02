import React from 'react';
import { Facebook, Link as LinkIcon, Linkedin, Twitter } from 'lucide-react';

export default function MediaShareRail() {
    const shareButtons = [
        { id: 'copy', icon: LinkIcon, label: 'Copy link' },
        { id: 'twitter', icon: Twitter, label: 'Share on X' },
        { id: 'linkedin', icon: Linkedin, label: 'Share on LinkedIn' },
        { id: 'facebook', icon: Facebook, label: 'Share on Facebook' },
    ];

    return (
        <div className="sticky top-24 hidden h-fit flex-col items-center gap-2 lg:flex">
            {shareButtons.map((item) => {
                const Icon = item.icon;
                return (
                    <button
                        key={item.id}
                        type="button"
                        aria-label={item.label}
                        className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-card text-muted-foreground shadow-sm ring-1 ring-border transition hover:bg-secondary hover:text-foreground"
                    >
                        <Icon className="h-4 w-4" />
                    </button>
                );
            })}
        </div>
    );
}

