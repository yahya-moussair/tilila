import React, { useMemo, useState } from 'react';

const WEEKDAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function pad2(n) {
    return String(n).padStart(2, '0');
}

function toIsoDate(date) {
    return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}-${pad2(date.getDate())}`;
}

function startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
}

function addMonths(date, delta) {
    return new Date(date.getFullYear(), date.getMonth() + delta, 1);
}

function monthLabel(date) {
    try {
        return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' });
    } catch {
        return `${date.getFullYear()}-${pad2(date.getMonth() + 1)}`;
    }
}

function CategoryCheckbox({ id, label, checked, onChange }) {
    return (
        <label className="flex items-center gap-3 text-sm text-muted-foreground">
            <input
                id={id}
                type="checkbox"
                checked={checked}
                onChange={(e) => onChange(e.target.checked)}
                className="h-4 w-4 rounded border-border text-beta-blue focus:ring-ring"
            />
            <span className="font-semibold text-foreground">{label}</span>
        </label>
    );
}

function Calendar({
    monthDate,
    setMonthDate,
    selectedDayIso,
    setSelectedDayIso,
    daysWithEvents,
}) {
    const grid = useMemo(() => {
        const first = startOfMonth(monthDate);
        const firstWeekday = first.getDay();
        const start = new Date(first);
        start.setDate(first.getDate() - firstWeekday);

        const days = Array.from({ length: 42 }).map((_, idx) => {
            const d = new Date(start);
            d.setDate(start.getDate() + idx);
            const iso = toIsoDate(d);
            return {
                iso,
                day: d.getDate(),
                isInMonth: d.getMonth() === monthDate.getMonth(),
                isToday: iso === toIsoDate(new Date()),
                hasEvent: daysWithEvents.has(iso),
            };
        });

        return { days, month: monthLabel(monthDate) };
    }, [daysWithEvents, monthDate]);

    return (
        <div className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
            <div className="flex items-center justify-between gap-3">
                <div className="text-sm font-extrabold text-foreground">{grid.month}</div>

                <div className="flex items-center gap-2">
                    <button
                        type="button"
                        onClick={() => setMonthDate((d) => addMonths(d, -1))}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-background text-muted-foreground ring-1 ring-border hover:text-foreground"
                        aria-label="Previous month"
                    >
                        ‹
                    </button>
                    <button
                        type="button"
                        onClick={() => setMonthDate((d) => addMonths(d, 1))}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-background text-muted-foreground ring-1 ring-border hover:text-foreground"
                        aria-label="Next month"
                    >
                        ›
                    </button>
                </div>
            </div>

            <div className="mt-4 grid grid-cols-7 gap-1 text-[11px] font-semibold text-muted-foreground">
                {WEEKDAY_LABELS.map((w) => (
                    <div key={w} className="py-1 text-center">
                        {w}
                    </div>
                ))}
            </div>

            <div className="mt-1 grid grid-cols-7 gap-1">
                {grid.days.map((d) => {
                    const isSelected = selectedDayIso === d.iso;
                    const isDisabled = !d.isInMonth;

                    return (
                        <button
                            key={d.iso}
                            type="button"
                            onClick={() =>
                                setSelectedDayIso((cur) => (cur === d.iso ? null : d.iso))
                            }
                            disabled={isDisabled}
                            className={[
                                'relative inline-flex h-9 w-9 items-center justify-center rounded-md text-xs font-semibold transition',
                                isDisabled
                                    ? 'text-muted-foreground/40'
                                    : 'text-foreground hover:bg-secondary',
                                isSelected
                                    ? 'bg-beta-blue text-white hover:bg-beta-blue'
                                    : 'bg-transparent',
                                d.isToday && !isSelected ? 'ring-1 ring-beta-blue/30' : '',
                            ].join(' ')}
                            aria-label={`Select ${d.iso}`}
                            aria-pressed={isSelected}
                        >
                            {d.day}
                            {d.hasEvent ? (
                                <span
                                    className={[
                                        'absolute bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full',
                                        isSelected ? 'bg-white' : 'bg-beta-blue',
                                    ].join(' ')}
                                    aria-hidden="true"
                                />
                            ) : null}
                        </button>
                    );
                })}
            </div>

            <div className="mt-4 flex items-center justify-between gap-3">
                <button
                    type="button"
                    onClick={() => setSelectedDayIso(null)}
                    className="text-xs font-semibold text-muted-foreground hover:text-foreground hover:underline"
                >
                    Clear date
                </button>
                <button
                    type="button"
                    onClick={() => {
                        const todayIso = toIsoDate(new Date());
                        setMonthDate(startOfMonth(new Date()));
                        setSelectedDayIso(todayIso);
                    }}
                    className="text-xs font-semibold text-beta-blue hover:underline"
                >
                    Today
                </button>
            </div>
        </div>
    );
}

export default function EventsSidebar({
    categories,
    setCategories,
    selectedDayIso,
    setSelectedDayIso,
    events = [],
}) {
    const initialMonth = useMemo(() => startOfMonth(new Date()), []);
    const [monthDate, setMonthDate] = useState(initialMonth);

    const daysWithEvents = useMemo(() => {
        const s = new Set();
        (events ?? []).forEach((e) => {
            if (e?.dateIso) s.add(e.dateIso);
        });
        return s;
    }, [events]);

    return (
        <div className="space-y-4">
            <Calendar
                monthDate={monthDate}
                setMonthDate={setMonthDate}
                selectedDayIso={selectedDayIso}
                setSelectedDayIso={setSelectedDayIso}
                daysWithEvents={daysWithEvents}
            />

            <div className="rounded-2xl bg-card p-5 shadow-sm ring-1 ring-border">
                <div className="text-xs font-extrabold uppercase tracking-wide text-muted-foreground">
                    Categories
                </div>

                <div className="mt-4 space-y-3">
                    <CategoryCheckbox
                        id="cat-talk"
                        label="TiliTalks"
                        checked={Boolean(categories?.talk)}
                        onChange={(checked) =>
                            setCategories((c) => ({ ...c, talk: checked }))
                        }
                    />
                    <CategoryCheckbox
                        id="cat-webinar"
                        label="Webinars"
                        checked={Boolean(categories?.webinar)}
                        onChange={(checked) =>
                            setCategories((c) => ({ ...c, webinar: checked }))
                        }
                    />
                    <CategoryCheckbox
                        id="cat-workshop"
                        label="Workshops"
                        checked={Boolean(categories?.workshop)}
                        onChange={(checked) =>
                            setCategories((c) => ({ ...c, workshop: checked }))
                        }
                    />
                </div>
            </div>
        </div>
    );
}

