import React from 'react';
import InfoCard from '@/pages/opportunities/Partials/Details/InfoCard';

export default function DeadlineCard({ label, dateLabel }) {
    return (
        <InfoCard title={label}>
            <div className="flex items-center justify-between gap-4 rounded-xl bg-background p-4 ring-1 ring-border">
                <div className="text-sm text-muted-foreground">
                    Please submit your application before
                </div>
                <div className="rounded-lg bg-alpha-blue px-3 py-2 text-sm font-extrabold text-beta-blue ring-1 ring-border">
                    {dateLabel}
                </div>
            </div>
        </InfoCard>
    );
}

