<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ParticipationController;
use Illuminate\Foundation\Application;
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
        Route::get('/{event}/edit', [\App\Http\Controllers\EventController::class, 'edit'])->name('events.edit');
        Route::put('/{event}', [\App\Http\Controllers\EventController::class, 'update'])->name('events.update');
    });
    Route::prefix('users')->group(function () {
        Route::get('/', [\App\Http\Controllers\UserController::class, 'index'])->name('users.index');
        Route::get('/{user}', [\App\Http\Controllers\UserController::class, 'show'])->name('users.index');
        Route::get('/create', [\App\Http\Controllers\UserController::class, 'create'])->name('users.create');
        Route::post('/', [\App\Http\Controllers\UserController::class, 'store'])->name('users.store');
        Route::put('/{user}/role', [\App\Http\Controllers\UserController::class, 'updateRole'])->name('users.updateRole');
    });
    Route::get('participations', [ParticipationController::class, 'index']);
    Route::post('participations', [ParticipationController::class, 'store']);
    Route::delete('participations/{participation}', [ParticipationController::class, 'destroy']);


    
    
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
