<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('tilila_contest_participants', function (Blueprint $table) {
            if (Schema::hasColumn('tilila_contest_participants', 'organization')) {
                $table->dropColumn('organization');
            }
            if (Schema::hasColumn('tilila_contest_participants', 'job_title')) {
                $table->dropColumn('job_title');
            }
        });
    }

    public function down(): void
    {
        Schema::table('tilila_contest_participants', function (Blueprint $table) {
            if (! Schema::hasColumn('tilila_contest_participants', 'organization')) {
                $table->string('organization', 255)->nullable()->after('phone');
            }
            if (! Schema::hasColumn('tilila_contest_participants', 'job_title')) {
                $table->string('job_title', 255)->nullable()->after('organization');
            }
        });
    }
};

