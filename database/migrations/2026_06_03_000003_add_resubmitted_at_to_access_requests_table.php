<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (Schema::hasColumn('access_requests', 'resubmitted_at')) {
            return;
        }

        Schema::table('access_requests', function (Blueprint $table) {
            $table->timestamp('resubmitted_at')->nullable()->after('reviewed_by');
        });
    }

    public function down(): void
    {
        if (! Schema::hasColumn('access_requests', 'resubmitted_at')) {
            return;
        }

        Schema::table('access_requests', function (Blueprint $table) {
            $table->dropColumn('resubmitted_at');
        });
    }
};
