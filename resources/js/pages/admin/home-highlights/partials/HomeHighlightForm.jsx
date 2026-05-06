import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

const TYPE_LABELS = {
    event: 'Événement',
    press_release: 'Communiqué',
    expert_spotlight: 'Experte à la une',
    partner_initiative: 'Initiative partenaire',
};

export default function HomeHighlightForm({
    data,
    setData,
    errors = {},
    cardTypes = [],
    submitLabel,
    processing,
    onSubmit,
}) {
    return (
        <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="title-en">Title · English</Label>
                    <Input
                        id="title-en"
                        value={data.title?.en ?? ''}
                        onChange={(e) =>
                            setData('title', {
                                ...data.title,
                                en: e.target.value,
                            })
                        }
                    />
                    {errors['title.en'] ? (
                        <p className="text-xs text-destructive">
                            {errors['title.en']}
                        </p>
                    ) : null}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="title-fr">Title · Français</Label>
                    <Input
                        id="title-fr"
                        value={data.title?.fr ?? ''}
                        onChange={(e) =>
                            setData('title', {
                                ...data.title,
                                fr: e.target.value,
                            })
                        }
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="title-ar">Title · العربية</Label>
                    <Input
                        id="title-ar"
                        dir="rtl"
                        value={data.title?.ar ?? ''}
                        onChange={(e) =>
                            setData('title', {
                                ...data.title,
                                ar: e.target.value,
                            })
                        }
                    />
                </div>
            </div>

            {errors.title ? (
                <p className="text-sm text-destructive">{errors.title}</p>
            ) : null}

            <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                    <Label>Type</Label>
                    <Select
                        value={data.card_type}
                        onValueChange={(v) => setData('card_type', v)}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                            {(cardTypes.length
                                ? cardTypes
                                : Object.keys(TYPE_LABELS)
                            ).map((t) => (
                                <SelectItem key={t} value={t}>
                                    {TYPE_LABELS[t] ?? t}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    {errors.card_type ? (
                        <p className="text-xs text-destructive">
                            {errors.card_type}
                        </p>
                    ) : null}
                </div>
                <div className="space-y-2">
                    <Label htmlFor="highlight_date">Highlight date</Label>
                    <Input
                        id="highlight_date"
                        type="date"
                        value={data.highlight_date}
                        onChange={(e) =>
                            setData('highlight_date', e.target.value)
                        }
                    />
                    {errors.highlight_date ? (
                        <p className="text-xs text-destructive">
                            {errors.highlight_date}
                        </p>
                    ) : null}
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="link_url">Link URL</Label>
                <Input
                    id="link_url"
                    type="text"
                    placeholder="https://… or /path"
                    value={data.link_url}
                    onChange={(e) => setData('link_url', e.target.value)}
                />
                {errors.link_url ? (
                    <p className="text-xs text-destructive">
                        {errors.link_url}
                    </p>
                ) : null}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <div className="flex items-center gap-3">
                    <input
                        id="is_active"
                        type="checkbox"
                        className="size-4 rounded border-border"
                        checked={Boolean(data.is_active)}
                        onChange={(e) =>
                            setData('is_active', e.target.checked)
                        }
                    />
                    <Label htmlFor="is_active" className="cursor-pointer">
                        Active on homepage (max 3)
                    </Label>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="sort_order">Sort order</Label>
                    <Input
                        id="sort_order"
                        type="number"
                        min={0}
                        value={data.sort_order}
                        onChange={(e) =>
                            setData(
                                'sort_order',
                                parseInt(e.target.value, 10) || 0,
                            )
                        }
                    />
                </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-border pt-6">
                <Button type="submit" disabled={processing}>
                    {submitLabel}
                </Button>
            </div>
        </form>
    );
}
