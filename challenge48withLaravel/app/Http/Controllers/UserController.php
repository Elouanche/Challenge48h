<?php
namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index()
    {
        // Affichage de la liste des utilisateurs
        return Inertia::render('Users/Index', [
            'users' => User::select('id', 'name', 'email', 'role')->get()
        ]);
    }

    public function create()
    {
        // Affichage du formulaire de création d'un utilisateur
        return Inertia::render('Users/Create');
    }

    public function store(Request $request)
    {
        // Validation des données de l'utilisateur
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // Création du nouvel utilisateur
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);

        return redirect()->route('users.index');
    }

    public function show(User $user)
    {
        // Affichage du profil d'un utilisateur spécifique
        return Inertia::render('Users/Show', [
            'user' => $user
        ]);
    }

    public function updateRole(Request $request, User $user)
    {
        // Mise à jour du rôle de l'utilisateur
        $request->validate([
            'role' => 'required|in:admin,bénévole'
        ]);

        $user->update([
            'role' => $request->role,
        ]);

        return redirect()->route('users.index');
    }
}
