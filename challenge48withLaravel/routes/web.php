<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use App\Http\Controllers\EventController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard', [
            'events' => \App\Models\Event::orderBy('date', 'desc')->get()
        ]);
    })->name('dashboard');

    Route::prefix('events')->group(function () {
        Route::get('/', [\App\Http\Controllers\EventController::class, 'index'])->name('events.index');
        Route::get('/create', [\App\Http\Controllers\EventController::class, 'create'])->name('events.create');
        Route::post('/', [\App\Http\Controllers\EventController::class, 'store'])->name('events.store');
    });

    Route::prefix('users')->group(function () {
        Route::get('/users', function () {
            return Inertia::render('Users/Index');
        })->name('users.index');
    });

    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    Route::put('/events/{event}', [EventController::class, 'update'])->middleware('auth');
    Route::delete('/events/{event}', [EventController::class, 'destroy'])->middleware('auth');
});

require __DIR__ . '/auth.php';
