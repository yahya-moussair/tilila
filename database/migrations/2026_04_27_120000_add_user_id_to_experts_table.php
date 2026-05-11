<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('experts', function (Blueprint $table): void {
            $table->foreignId('user_id')->nullable()->unique()->after('id')->constrained('users')->nullOnDelete();
        });
    }

    public function down(): void
    {
        if (! Schema::hasColumn('experts', 'user_id')) {
            return;
        }

        try {
            Schema::table('experts', function (Blueprint $table): void {
                $table->dropForeign(['user_id']);
            });
        } catch (\Throwable) {
            // SQLite may not retain FK names consistently during table rebuilds.
        }

        try {
            Schema::table('experts', function (Blueprint $table): void {
                $table->dropUnique('experts_user_id_unique');
            });
        } catch (\Throwable) {
            // Unique index may already be gone on some drivers.
        }

        if (DB::getDriverName() === 'sqlite') {
            // SQLite table-rebuild path is more reliable than dropConstrainedForeignId.
            Schema::table('experts', function (Blueprint $table): void {
                $table->dropColumn('user_id');
            });

            return;
        }

        Schema::table('experts', function (Blueprint $table): void {
            $table->dropColumn('user_id');
        });
    }
};
