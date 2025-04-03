<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run(): void
    {
       
        // Ajouter un utilisateur bénévole par défaut
        User::create([
            'name' => 'Bénévole',
            'email' => 'benevole@exemple.com',
            'phone' => '0123456789',
            'password' => bcrypt('password'), // Assurez-vous d'utiliser un mot de passe crypté
            'role' => 0, // Bénévole
        ]);

        // Ajouter un utilisateur admin par défaut
        User::create([
            'name' => 'Admin',
            'email' => 'admin@exemple.com',
            'phone' => '0987654321',
            'password' => bcrypt('password'), // Assurez-vous d'utiliser un mot de passe crypté
            'role' => 1, // Admin
        ]);
    }
}
