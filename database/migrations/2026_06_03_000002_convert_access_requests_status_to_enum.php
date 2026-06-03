<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::getConnection()->getDriverName() !== 'mysql') {
            return;
        }

        if (! Schema::hasTable('access_requests')) {
            return;
        }

        $column = collect(DB::select("SHOW COLUMNS FROM access_requests WHERE Field = 'status'"))->first();

        if ($column && ! str_contains(strtolower((string) ($column->Type ?? '')), 'enum')) {
            DB::statement(
                "ALTER TABLE access_requests MODIFY COLUMN status ENUM('pending', 'approved', 'rejected', 'revoked') NOT NULL DEFAULT 'pending'",
            );
        }
    }

    public function down(): void
    {
        if (Schema::getConnection()->getDriverName() !== 'mysql') {
            return;
        }

        if (! Schema::hasTable('access_requests')) {
            return;
        }

        DB::statement(
            "ALTER TABLE access_requests MODIFY COLUMN status VARCHAR(255) NOT NULL DEFAULT 'pending'",
        );
    }
};
