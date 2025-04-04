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
        try {
            // Validation des données
            $validated = $request->validate([
                'user_id' => 'required|integer|exists:users,id',
                'event_id' => 'required|integer|exists:events,id'
            ]);

            // Vérification si l'utilisateur participe déjà à l'événement
            $existingParticipation = Participation::where('user_id', $validated['user_id'])
                ->where('event_id', $validated['event_id'])
                ->exists();

            if ($existingParticipation) {
                return back()->withErrors(['message' => 'Vous participez déjà à cet événement.']);
            }

            // Création de la participation
            $participation = Participation::create($validated);
            
            // Récupération des détails complets de la participation
            $participation->load('event');

            return Inertia::render('Participations/Success', [
                'message' => 'Participation enregistrée avec succès.',
                'participation' => $participation
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de l\'enregistrement de la participation : ' . $e->getMessage());
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    /**
     * Supprimer une participation.
     *
     * @param  \App\Models\Participation  $participation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Participation $participation)
    {
        try {
            // Vérifier que l'utilisateur connecté est bien le propriétaire de la participation
            if (Auth::id() !== $participation->user_id) {
                return back()->withErrors(['error' => 'Vous n\'êtes pas autorisé à supprimer cette participation.']);
            }
            
            $participation->delete();
            
            return Inertia::render('Participations/Success', [
                'message' => 'Participation supprimée avec succès.'
            ]);
        } catch (\Exception $e) {
            Log::error('Erreur lors de la suppression de la participation : ' . $e->getMessage());
            return back()->withErrors(['error' => 'Une erreur est survenue lors de la suppression.']);
        }
    }
    
    /**
     * Afficher les participants d'un événement (pour les administrateurs).
     *
     * @param  \App\Models\Event  $event
     * @return \Illuminate\Http\Response
     */
    public function showParticipants(Event $event)
    {
        // Vérifier que l'utilisateur est un administrateur
        if (Auth::user()->role !== 'admin') {
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

