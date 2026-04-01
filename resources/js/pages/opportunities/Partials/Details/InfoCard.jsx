import React from 'react';

export default function InfoCard({ title, children, right }) {
    return (
        <section className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
            <div className="flex items-center justify-between gap-3">
                <h2 className="text-sm font-extrabold text-foreground">{title}</h2>
                {right}
            </div>
            <div className="mt-4">{children}</div>
        </section>
    );
}

