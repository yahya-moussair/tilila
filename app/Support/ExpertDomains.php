<?php

namespace App\Support;

final class ExpertDomains
{
    /**
     * @param  list<array{en?: string, fr?: string, ar?: string}>  $items
     * @return list<array{en: string, fr: string, ar: string}>
     */
    public static function normalizeSelection(array $items): array
    {
        $rows = [];

        foreach ($items as $item) {
            if (! is_array($item)) {
                continue;
            }

            $en = trim((string) ($item['en'] ?? ''));
            $fr = trim((string) ($item['fr'] ?? ''));
            $ar = trim((string) ($item['ar'] ?? ''));

            if ($fr === '' && $en === '' && $ar === '') {
                continue;
            }

            if ($fr === '') {
                $fr = $en;
            }
            if ($en === '') {
                $en = $fr;
            }
            if ($ar === '') {
                $ar = $fr;
            }

            $rows[] = [
                'en' => $en,
                'fr' => $fr,
                'ar' => $ar,
            ];
        }

        return array_slice($rows, 0, 6);
    }

    /**
     * @param  array<string, mixed>|null  $stored
     * @return list<array{en: string, fr: string, ar: string}>
     */
    public static function fromStored(?array $stored): array
    {
        if (! is_array($stored) || $stored === []) {
            return [];
        }

        if (array_is_list($stored)) {
            return self::normalizeSelection($stored);
        }

        if (isset($stored['en']) || isset($stored['fr']) || isset($stored['ar'])) {
            $en = trim((string) ($stored['en'] ?? ''));
            $fr = trim((string) ($stored['fr'] ?? ''));
            $ar = trim((string) ($stored['ar'] ?? ''));

            if ($en === '' && $fr === '' && $ar === '') {
                return [];
            }

            $topicsByLocale = [
                'en' => self::extractTopics($en),
                'fr' => self::extractTopics($fr !== '' ? $fr : $en),
                'ar' => self::extractTopics($ar !== '' ? $ar : $en),
            ];

            return self::buildLocalizedTopics($topicsByLocale);
        }

        return [];
    }

    /**
     * @return list<string>
     */
    private static function extractTopics(string $raw): array
    {
        $items = preg_split('/[,;\n]+/', $raw) ?: [];

        $topics = [];
        foreach ($items as $item) {
            $topic = trim($item);
            if ($topic === '') {
                continue;
            }

            $topics[] = mb_substr($topic, 0, 64);
        }

        return array_values(array_unique($topics));
    }

    /**
     * @param  array{en: list<string>, fr: list<string>, ar: list<string>}  $topicsByLocale
     * @return list<array{en: string, fr: string, ar: string}>
     */
    private static function buildLocalizedTopics(array $topicsByLocale): array
    {
        $rows = [];
        $max = max(
            count($topicsByLocale['en']),
            count($topicsByLocale['fr']),
            count($topicsByLocale['ar']),
        );

        for ($i = 0; $i < $max; $i++) {
            $en = trim((string) ($topicsByLocale['en'][$i] ?? ''));
            if ($en === '') {
                continue;
            }

            $rows[] = [
                'en' => $en,
                'fr' => trim((string) ($topicsByLocale['fr'][$i] ?? $en)),
                'ar' => trim((string) ($topicsByLocale['ar'][$i] ?? $en)),
            ];
        }

        return $rows;
    }
}
