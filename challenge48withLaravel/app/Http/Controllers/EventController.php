<?php

namespace App\Http\Controllers;

use App\Models\Event;
use Illuminate\Http\Request;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        return Inertia::render('Events/Index', [
            'events' => Event::orderBy('date', 'desc')->get()
        ]);
    }

    public function create()
    {
        return Inertia::render('Events/Create');
    }

    public function store(Request $request)
    {
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

        return redirect()->route('events.index');
    }
}