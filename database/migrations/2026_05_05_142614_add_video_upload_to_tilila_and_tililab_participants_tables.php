<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('tilila_contest_participants', function (Blueprint $table) {
            $table
                ->string('submission_video_path', 2048)
                ->nullable()
                ->after('submission_link');
        });

        Schema::table('tililab_participants', function (Blueprint $table) {
            $table
                ->string('original_video_path', 2048)
                ->nullable()
                ->after('original_video_link');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('tilila_contest_participants', function (Blueprint $table) {
            $table->dropColumn('submission_video_path');
        });

        Schema::table('tililab_participants', function (Blueprint $table) {
            $table->dropColumn('original_video_path');
        });
    }
};
