<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;

class User extends Authenticatable
{
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'phone', // Ajouter le champ phone
        'role',  // Ajouter le champ role
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
        'password' => 'hashed', // Hachage du mot de passe
    ];

    /**
     * Définir le rôle d'un utilisateur.
     *
     * @return string
     */
    public function getRoleAttribute($value)
    {
        return $value === 0 ? 'bénévole' : 'admin';
    }

    /**
     * Relation pour l'événement (si un utilisateur peut avoir plusieurs événements, par exemple).
     * 
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    // public function evenements()
    // {
    //     return $this->hasMany(Evenement::class);
    // }
}
