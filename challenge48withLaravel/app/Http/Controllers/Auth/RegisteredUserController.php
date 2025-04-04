<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Invitation;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }
    
    /**
     * Display the registration view with invitation token.
     */
    public function createWithInvitation(string $token): Response
    {
        $invitation = Invitation::where('token', $token)->first();
        
        if (!$invitation || !$invitation->isValid()) {
            return Inertia::render('Auth/InvalidInvitation');
        }
        
        return Inertia::render('Auth/Register', [
            'email' => $invitation->email,
            'invitation_token' => $token
        ]);
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:'.User::class,
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'invitation_token' => 'nullable|string',
        ]);

        // Vérifier si un token d'invitation a été fourni
        if ($request->invitation_token) {
            $invitation = Invitation::where('token', $request->invitation_token)
                ->where('email', $request->email)
                ->first();

            if (!$invitation || !$invitation->isValid()) {
                return redirect()->back()->withErrors([
                    'invitation_token' => 'Le token d\'invitation est invalide ou a expiré.'
                ]);
            }
        }

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Marquer l'invitation comme utilisée si elle existe
        if (isset($invitation)) {
            $invitation->used = true;
            $invitation->save();
        }

        event(new Registered($user));

        Auth::login($user);

        return redirect(route('dashboard', absolute: false));
    }
}
