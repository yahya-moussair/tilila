<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('tilila_connect_requests', function (Blueprint $table) {
            $table->id();
            $table->string('request_type', 32);
            $table->string('full_name');
            $table->string('email');
            $table->string('phone', 64)->nullable();
            $table->string('organization')->nullable();
            $table->text('message');
            $table->string('locale', 8)->nullable();
            $table->string('ip', 45)->nullable();
            $table->text('user_agent')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('tilila_connect_requests');
    }
};
