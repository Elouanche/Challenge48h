<?php

namespace Database\Seeders;

use App\Models\Event;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class EventSeeder extends Seeder
{
    public function run()
    {
        DB::table('events')->insert([
            [
                'titre' => 'Session de formation aux premiers secours',
                'date' => now()->addDays(7)->format('Y-m-d'),
                'heure_debut' => '09:00:00',
                'heure_fin' => '12:00:00',
                'lieu' => 'Centre de secours de Paris',
                'type_evenement' => 'Session de formation',
                'contact_nom' => 'Jean Dupont',
                'contact_email' => 'jean.dupont@example.com',
                'contact_telephone' => '0612345678',
                'coviturage_possible' => 'oui',
                'dejeuner_prevu' => 'non',
                'type_public' => 'Tout public',
                'information_supplementaire' => 'Apportez votre propre matériel si possible.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titre' => 'Collecte de vêtements pour réfugiés',
                'date' => now()->addDays(14)->format('Y-m-d'),
                'heure_debut' => '10:00:00',
                'heure_fin' => '16:00:00',
                'lieu' => 'Maison des associations, Lyon',
                'type_evenement' => 'Collecte',
                'contact_nom' => 'Marie Curie',
                'contact_email' => 'marie.curie@example.com',
                'contact_telephone' => '0623456789',
                'coviturage_possible' => 'non',
                'dejeuner_prevu' => 'oui',
                'type_public' => 'Bénévoles',
                'information_supplementaire' => 'Venez avec des vêtements propres et en bon état.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
            [
                'titre' => 'Action de visibilité pour la protection des océans',
                'date' => now()->addDays(21)->format('Y-m-d'),
                'heure_debut' => '14:00:00',
                'heure_fin' => '18:00:00',
                'lieu' => 'Plage de Biarritz',
                'type_evenement' => 'Action de visibilité',
                'contact_nom' => 'Paul Rousseau',
                'contact_email' => 'paul.rousseau@example.com',
                'contact_telephone' => '0634567890',
                'coviturage_possible' => 'oui',
                'dejeuner_prevu' => 'non',
                'type_public' => 'Etudiants',
                'information_supplementaire' => 'Événement ouvert aux jeunes engagés pour l\'environnement.',
                'created_at' => now(),
                'updated_at' => now(),
            ],
        ]);
    }
}
