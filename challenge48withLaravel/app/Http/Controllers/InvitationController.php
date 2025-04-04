<?php

namespace App\Http\Controllers;

use App\Models\Invitation;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class InvitationController extends Controller
{
    /**
     * Display a listing of the invitations.
     */
    public function index()
    {
        $invitations = Invitation::with('creator')->get();
        
        return Inertia::render('Invitations/Index', [
            'invitations' => $invitations
        ]);
    }

    /**
     * Store a newly created invitation in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'email' => 'required|email|unique:invitations,email'
        ]);

        $invitation = new Invitation();
        $invitation->email = $request->email;
        $invitation->token = Invitation::generateToken();
        $invitation->created_by = Auth::id();
        $invitation->expires_at = Carbon::now()->addDays(7);
        $invitation->save();

        // Générer l'URL d'invitation
        $invitationUrl = url('/register/invitation/' . $invitation->token);

        // Ici, on pourrait envoyer un email d'invitation
        // Mail::to($request->email)->send(new InvitationMail($invitation));

        return redirect()->back()->with([
            'success' => 'Invitation envoyée avec succès.',
            'invitationUrl' => $invitationUrl,
            'invitationId' => $invitation->id
        ]);
    }

    /**
     * Resend an invitation.
     */
    public function resend($id)
    {
        $invitation = Invitation::findOrFail($id);
        
        if ($invitation->used) {
            return redirect()->back()->with('error', 'Cette invitation a déjà été utilisée.');
        }

        // Régénérer un nouveau token et mettre à jour la date d'expiration
        $invitation->token = Invitation::generateToken();
        $invitation->expires_at = Carbon::now()->addDays(7);
        $invitation->save();

        // Générer l'URL d'invitation
        $invitationUrl = url('/register/invitation/' . $invitation->token);

        // Ici, on pourrait renvoyer un email d'invitation
        // Mail::to($invitation->email)->send(new InvitationMail($invitation));

        return redirect()->back()->with([
            'success' => 'Invitation renvoyée avec succès.',
            'invitationUrl' => $invitationUrl,
            'invitationId' => $invitation->id
        ]);
    }

    /**
     * Delete an invitation.
     */
    public function delete($id)
    {
        $invitation = Invitation::findOrFail($id);
        $invitation->delete();

        return redirect()->back()->with('success', 'Invitation supprimée avec succès.');
    }
}