<?php

namespace App\Http\Controllers;

use App\Models\Participation;
use App\Models\User;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ParticipationController extends Controller
{
    /**
     * Afficher toutes les participations de l'utilisateur connecté.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $participations = Participation::with(['user', 'event'])
            ->where('user_id', Auth::id())
            ->get();
        return response()->json($participations);
    }

    /**
     * Vérifier si l'utilisateur est inscrit à un événement.
     *
     * @param  int  $eventId
     * @return \Illuminate\Http\Response
     */
    public function checkParticipation($eventId)
    {
        $isParticipating = Participation::where('user_id', Auth::id())
            ->where('event_id', $eventId)
            ->exists();
        
        return response()->json(['isParticipating' => $isParticipating]);
    }

    /**
     * Créer une nouvelle participation.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'event_id' => 'required|exists:events,id',
        ]);

        // Vérifier si l'utilisateur n'est pas déjà inscrit
        $existingParticipation = Participation::where('user_id', Auth::id())
            ->where('event_id', $request->event_id)
            ->first();

        if ($existingParticipation) {
            return response()->json(['message' => 'Vous êtes déjà inscrit à cet événement.'], 422);
        }

        $participation = Participation::create([
            'user_id' => Auth::id(),
            'event_id' => $request->event_id,
        ]);

        return response()->json($participation, 201);
    }

    /**
     * Supprimer une participation.
     *
     * @param  \App\Models\Participation  $participation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Participation $participation)
    {
        $participation->delete();
        return response()->json(['message' => 'Participation supprimée avec succès.']);
    }
}
