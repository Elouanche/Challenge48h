<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Invitation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'email',
        'token',
        'used',
        'created_by',
        'expires_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'used' => 'boolean',
        'expires_at' => 'datetime',
    ];

    /**
     * Generate a unique token for the invitation.
     *
     * @return string
     */
    public static function generateToken(): string
    {
        return Str::random(32);
    }

    /**
     * Get the user who created the invitation.
     */
    public function creator()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * Check if the invitation is valid (not used and not expired).
     *
     * @return bool
     */
    public function isValid(): bool
    {
        if ($this->used) {
            return false;
        }

        if ($this->expires_at && $this->expires_at->isPast()) {
            return false;
        }

        return true;
    }

    /**
     * Mark the invitation as used.
     *
     * @return bool
     */
    public function markAsUsed(): bool
    {
        $this->used = true;
        return $this->save();
    }
}