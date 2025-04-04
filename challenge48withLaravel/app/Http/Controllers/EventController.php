<?php

namespace App\Http\Controllers;

use App\Models\Event;
use App\Models\Participation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class EventController extends Controller
{
    /**
     * Afficher tous les événements.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return Inertia::render('Events/Index', [
            'events' => Event::orderBy('date', 'desc')->get()
        ]);
    }

    /**
     * Afficher le formulaire de création d'un événement.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        // Vérifier que l'utilisateur est un administrateur
        if (Auth::user()->role !== 'admin') {
            return redirect()->route('dashboard')->withErrors([
                'error' => 'Vous n\'êtes pas autorisé à créer un événement.'
            ]);
        }
        
        return Inertia::render('Events/Create');
    }

    /**
     * Enregistrer un nouvel événement.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        // Vérifier que l'utilisateur est un administrateur
        if (Auth::user()->role !== 'admin') {
            return redirect()->route('dashboard')->withErrors([
                'error' => 'Vous n\'êtes pas autorisé à créer un événement.'
            ]);
        }
        
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'date' => 'required|date',
            'heure_debut' => 'required|date_format:H:i',
            'heure_fin' => 'required|date_format:H:i|after:heure_debut',
            'lieu' => 'required|string|max:255',
            'type_evenement' => 'required|in:Session de formation,Action de visibilité,Collecte,Action SDE,Action Plaidoyer,Réunion interne,Autre',
            'contact_nom' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'contact_telephone' => 'required|string|max:20',
            'coviturage_possible' => 'required|in:oui,non',
            'dejeuner_prevu' => 'required|in:oui,non',
            'type_public' => 'required|in:Tout public,Familles,Enfants,Etudiants,Bénévoles,JA',
            'information_supplementaire' => 'nullable|string',
        ]);

        Event::create($validated);

        return redirect()->route('events.index')->with('success', 'Événement créé avec succès.');
    }
    
    /**
     * Afficher les détails d'un événement.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function show(Event $event)
    {
        // Vérifier si l'utilisateur participe déjà à cet événement
        $isParticipating = false;
        if (Auth::check()) {
            $isParticipating = Participation::where('user_id', Auth::id())
                ->where('event_id', $event->id)
                ->exists();
        }
        
        return Inertia::render('Events/Show', [
            'event' => $event,
            'isParticipating' => $isParticipating
        ]);
    }
    
    /**
     * Afficher le formulaire de modification d'un événement.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function edit(Event $event)
    {
        // Vérifier que l'utilisateur est un administrateur
        if (Auth::user()->role !== 'admin') {
            return redirect()->route('dashboard')->withErrors([
                'error' => 'Vous n\'êtes pas autorisé à modifier un événement.'
            ]);
        }
        
        return Inertia::render('Events/Edit', [
            'event' => $event
        ]);
    }
    
    /**
     * Mettre à jour un événement.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Event $event)
    {
        // Vérifier que l'utilisateur est un administrateur
        if (Auth::user()->role !== 'admin') {
            return redirect()->route('dashboard')->withErrors([
                'error' => 'Vous n\'êtes pas autorisé à modifier un événement.'
            ]);
        }
        
        $validated = $request->validate([
            'titre' => 'required|string|max:255',
            'date' => 'required|date',
            'heure_debut' => 'required|date_format:H:i',
            'heure_fin' => 'required|date_format:H:i|after:heure_debut',
            'lieu' => 'required|string|max:255',
            'type_evenement' => 'required|in:Session de formation,Action de visibilité,Collecte,Action SDE,Action Plaidoyer,Réunion interne,Autre',
            'contact_nom' => 'required|string|max:255',
            'contact_email' => 'required|email|max:255',
            'contact_telephone' => 'required|string|max:20',
            'coviturage_possible' => 'required|in:oui,non',
            'dejeuner_prevu' => 'required|in:oui,non',
            'type_public' => 'required|in:Tout public,Familles,Enfants,Etudiants,Bénévoles,JA',
            'information_supplementaire' => 'nullable|string',
        ]);
        
        $event->update($validated);
        
        return redirect()->route('events.edit', $event)->with('success', 'Événement mis à jour avec succès.');
    }
    
    /**
     * Supprimer un événement.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function destroy(Event $event)
    {
        // Vérifier que l'utilisateur est un administrateur
        if (Auth::user()->role !== 'admin') {
            return redirect()->route('dashboard')->withErrors([
                'error' => 'Vous n\'êtes pas autorisé à supprimer un événement.'
            ]);
        }
        
        // Supprimer toutes les participations associées à cet événement
        Participation::where('event_id', $event->id)->delete();
        
        // Supprimer l'événement
        $event->delete();
        
        return redirect()->route('events.index')->with('success', 'Événement supprimé avec succès.');
    }
}