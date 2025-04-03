<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up(): void
    {
        Schema::create('events', function (Blueprint $table) {
            $table->id(); // Identifiant unique de l'événement
            $table->string('titre'); // Titre de l'événement
            $table->date('date'); // Date de l'événement
            $table->time('heure_debut'); // Heure de début de l'événement
            $table->time('heure_fin'); // Heure de fin de l'événement
            $table->string('lieu'); // Lieu de l'événement (adresse)
            $table->enum('type_evenement', [
                'Session de formation',
                'Action de visibilité',
                'Collecte',
                'Action SDE',
                'Action Plaidoyer',
                'Réunion interne',
                'Autre'
            ]); // Type d'événement
            $table->string('contact_nom'); // Nom de la personne de contact
            $table->string('contact_email'); // Email de la personne de contact
            $table->string('contact_telephone'); // Téléphone de la personne de contact
            $table->enum('coviturage_possible', ['oui', 'non'])->default('non'); // Co-voiturage possible
            $table->enum('dejeuner_prevu', ['oui', 'non'])->default('non'); // Déjeuner prévu
            $table->enum('type_public', [
                'Tout public',
                'Familles',
                'Enfants',
                'Etudiants',
                'Bénévoles',
                'JA'
            ]); // Type de public
            $table->text('information_supplementaire')->nullable(); // Informations supplémentaires
            $table->timestamps(); // Champs created_at et updated_at
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down(): void
    {
        Schema::dropIfExists('events');
    }
};