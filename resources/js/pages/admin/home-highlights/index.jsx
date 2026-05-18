import { Head, Link, router } from '@inertiajs/react';
import { Pencil, Plus, Trash2 } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';

function typeLabel(t) {
    switch (t) {
        case 'event':
            return 'Événement';
        case 'press_release':
            return 'Communiqué';
        case 'expert_spotlight':
            return 'Experte à la une';
        case 'partner_initiative':
            return 'Initiative partenaire';
        default:
            return t;
    }
}

export default function AdminHomeHighlightsIndex({
    highlights = [],
    maxActive = 3,
}) {
    const activeCount = highlights.filter((h) => h.is_active).length;

    const destroy = (id) => {
        if (
            !confirm(
                'Delete this home highlight? This cannot be undone.',
            )
        ) {
            return;
        }
        router.delete(`/admin/home-highlights/${id}`, {
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Home highlights" />

            <div className="mx-auto flex w-full max-w-[min(100%,90rem)] flex-col gap-6 px-4 py-6 sm:gap-8 sm:px-6 sm:py-8 lg:px-10 lg:pb-10">
                <div className="flex flex-col gap-4 border-b border-border/60 pb-6 sm:flex-row sm:items-start sm:justify-between sm:pb-8">
                    <div>
                        <p className="text-sm font-medium text-tgray">
                            CMS · Homepage Zone B
                        </p>
                        <h1 className="text-2xl font-bold tracking-tight text-tblack">
                            Actualités (max {maxActive} active)
                        </h1>
                        <p className="mt-1 max-w-2xl text-sm text-tgray">
                            Active cards shown on the home page: {activeCount} /{' '}
                            {maxActive}.
                        </p>
                    </div>
                    <Button asChild>
                        <Link
                            href="/admin/home-highlights/create"
                            className="gap-2"
                        >
                            <Plus className="size-4" />
                            New highlight
                        </Link>
                    </Button>
                </div>

                <div className="rounded-xl border border-border bg-card shadow-sm">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Title (EN)</TableHead>
                                <TableHead>Type</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead>Active</TableHead>
                                <TableHead className="text-end">
                                    Actions
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {highlights.length === 0 ? (
                                <TableRow>
                                    <TableCell
                                        colSpan={5}
                                        className="py-10 text-center text-sm text-tgray"
                                    >
                                        No highlights yet. Create one to
                                        populate the home page news band.
                                    </TableCell>
                                </TableRow>
                            ) : (
                                highlights.map((h) => (
                                    <TableRow key={h.id}>
                                        <TableCell className="max-w-xs truncate font-medium">
                                            {h.title?.en ||
                                                h.title?.fr ||
                                                h.title?.ar ||
                                                '—'}
                                        </TableCell>
                                        <TableCell>
                                            <Badge variant="outline">
                                                {typeLabel(h.card_type)}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-sm text-tgray">
                                            {h.highlight_date}
                                        </TableCell>
                                        <TableCell>
                                            {h.is_active ? (
                                                <Badge className="bg-beta-green/15 text-alpha-green">
                                                    Active
                                                </Badge>
                                            ) : (
                                                <span className="text-sm text-tgray">
                                                    Off
                                                </span>
                                            )}
                                        </TableCell>
                                        <TableCell className="text-end">
                                            <div className="flex justify-end gap-2">
                                                <Button
                                                    asChild
                                                    variant="outline"
                                                    size="sm"
                                                >
                                                    <Link
                                                        href={`/admin/home-highlights/${h.id}/edit`}
                                                    >
                                                        <Pencil className="size-4" />
                                                    </Link>
                                                </Button>
                                                <Button
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={() =>
                                                        destroy(h.id)
                                                    }
                                                >
                                                    <Trash2 className="size-4 text-destructive" />
                                                </Button>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </>
    );
}

AdminHomeHighlightsIndex.layout = (page) => (
    <AppLayout>{page}</AppLayout>
);
