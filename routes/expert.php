<?php

use App\Http\Controllers\Expert\DashboardController;
use App\Http\Controllers\Expert\ProfileController;
use Illuminate\Support\Facades\Route;

Route::get('dashboard', [DashboardController::class, 'index'])->name('dashboard');
Route::get('network', [DashboardController::class, 'network'])->name('network');
Route::get('profile', [ProfileController::class, 'edit'])->name('profile.edit');
Route::patch('profile', [ProfileController::class, 'update'])->name('profile.update');
