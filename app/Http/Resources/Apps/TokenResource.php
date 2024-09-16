<?php

namespace App\Http\Resources\Apps;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TokenResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request)
    {
        return [
            'id' => $this->id,
            'school_name' => $this->school->name,
            'school_npsn' => $this->school->npsn,
            'application_id' => $this->application->id,
            'application_name' => $this->application->name,
            'token_access' => $this->token_access,
            'expired_at' => $this->expired_at ? $this->expired_at->format('Y-m-d') : null,
            'status' => $this->status ? 'Active' : 'Inactive',
        ];
    }
}
