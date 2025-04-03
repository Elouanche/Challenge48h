<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    use HasFactory;

    protected $fillable = [
        'titre',
        'date',
        'heure_debut',
        'heure_fin',
        'lieu',
        'type_evenement',
        'contact_nom',
        'contact_email',
        'contact_telephone',
        'coviturage_possible',
        'dejeuner_prevu',
        'type_public',
        'information_supplementaire',
    ];
}


/*
use App\Models\Evenement;

$evenements = Evenement::all();
*/
/*
$evenement = new Evenement();
$evenement->titre = "Concert de Jazz";
$evenement->date = '2025-04-15';
$evenement->heure_debut = '19:00:00';
$evenement->heure_fin = '22:00:00';
$evenement->lieu = 'Salle des Fêtes';
$evenement->contact_nom = 'Jean Dupont';
$evenement->contact_email = 'jean@example.com';
$evenement->contact_telephone = '0123456789';
$evenement->save(); // Sauvegarder l'enregistrement dans la base de données

*/