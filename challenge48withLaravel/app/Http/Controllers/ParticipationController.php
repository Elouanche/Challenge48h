<?php

namespace App\Http\Controllers;

use App\Models\Participation;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ParticipationController extends Controller
{
    /**
     * Afficher toutes les participations de l'utilisateur connecté.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        Log::info('Accès à la liste des participations');
        $user = Auth::user();
        $participations = Participation::with(['event'])
            ->where('user_id', $user->id)
            ->get();
            
        return Inertia::render('Participations/Index', [
            'participations' => $participations
        ]);
    }

    /**
     * Afficher le formulaire de participation à un événement.
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function create(Event $event)
    {
        Log::info('Affichage du formulaire de participation pour l\'événement', ['event_id' => $event->id]);
        return Inertia::render('Participations/Create', [
            'event' => $event
        ]);
    }

    /**
     * Créer une nouvelle participation.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        Log::info('Tentative de création de participation', ['data' => $request->all()]);
        
        // Récupération directe de l'event_id depuis la requête
        $event_id = $request->input('event_id');
        
        // Si event_id est null, essayer de le récupérer depuis le corps JSON
        if (!$event_id && $request->isJson()) {
            $jsonData = $request->json()->all();
            $event_id = $jsonData['event_id'] ?? null;
        }
        
        // Log pour déboguer
        Log::info('Event ID récupéré', ['event_id' => $event_id]);
        
        // Validation des données
        $validated = [
            'event_id' => $event_id,
            'user_id' => Auth::id()
        ];
        
        // Vérification que l'event_id existe
        if (!$event_id || !Event::find($event_id)) {
            Log::error('Event ID invalide ou manquant', ['event_id' => $event_id]);
            return back()->withErrors(['error' => 'Événement invalide ou manquant.']);
        }
        
        // Log des données validées pour vérification
        Log::info('Données validées pour participation', ['event_id' => $validated['event_id'], 'user_id' => $validated['user_id']]);
        
        Log::info('Données validées pour participation', $validated);


        // Vérification si l'utilisateur participe déjà à l'événement
        if (Participation::where('user_id', $validated['user_id'])
            ->where('event_id', $validated['event_id'])
            ->exists()) {
            Log::warning('Participation déjà existante', $validated);
            return back()->withErrors(['error' => 'Vous participez déjà à cet événement.']);
        }
        /*
        try {
            $participation = Participation::create($validated);

            Log::info('Participation créée avec succès', ['participation_id' => $participation->id]);
            return redirect()->route('participations.index')->with('success', 'Participation enregistrée avec succès.');

            
            // Récupération des détails complets de la participation
            $participation->load('event');

            return Inertia::render('Participations/Success', [
                'message' => 'Participation enregistrée avec succès.',
                'participation' => $participation
            ]);
        }*/
       
    }

    /**
     * Supprimer une participation.
     *
     * @param  \App\Models\Participation  $participation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Participation $participation)
    {
        if (Auth::id() !== $participation->user_id) {
            return redirect()->route('events.show', $participation->event_id)
                ->withErrors(['error' => 'Vous n\'êtes pas autorisé à supprimer cette participation.']);
        }

        $participation->delete();

        return redirect()->route('events.show', $participation->event_id)
            ->with('success', 'Participation supprimée avec succès.');
    }
    
    /**
     * Afficher les participants d'un événement (pour les administrateurs).
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function showParticipants(Event $event)
    {
        Log::info('Affichage des participants pour l\'événement', ['event_id' => $event->id]);
        // Vérifier que l'utilisateur est un administrateur
        if (Auth::user()->role !== 'admin') {
            Log::warning('Tentative non autorisée d\'accès à la liste des participants', ['user_id' => Auth::id()]);
            return back()->withErrors(['error' => 'Vous n\'êtes pas autorisé à voir cette page.']);
        }
        
        $participants = Participation::with('user')
            ->where('event_id', $event->id)
            ->get();
            
        return Inertia::render('Participations/Participants', [
            'event' => $event,
            'participants' => $participants
        ]);
    }
}