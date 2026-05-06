<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('experts', function (Blueprint $table) {
            $table->string('region_scope', 32)->nullable()->after('country');
        });

        if (Schema::hasColumn('experts', 'region_scope')) {
            DB::table('experts')->where('country', 'Morocco')->update(['region_scope' => 'morocco']);
            DB::table('experts')->where('country', 'Senegal')->update(['region_scope' => 'africa']);
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('experts', function (Blueprint $table) {
            $table->dropColumn('region_scope');
        });
    }
};
