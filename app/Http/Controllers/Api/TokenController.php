<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\Apps\TokenResource;
use App\Models\School;
use App\Models\Token;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class TokenController extends Controller
{
    public function index()
    {
        // Fetch all tokens with related applications and schools
        $tokens = Token::with('application', 'school')->get();
        return TokenResource::collection($tokens); // Use resource for consistent response format
    }

    public function verifyToken(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'npsn' => 'required|exists:schools,npsn',
            'application_id' => 'required',
            'token_access' => 'required|string',
        ]);

        // Find the school based on the provided NPSN
        $school = School::where('npsn', $request->npsn)->first();
        if (!$school) {
            return response()->json(['valid' => false, 'message' => 'NPSN is invalid.'], 400);
        }

        // Find the token based on the provided token, application_id, and school_id
        $token = Token::where('token_access', $request->token_access)
            ->where('application_id', $request->application_id)
            ->where('school_id', $school->id)
            ->first();

        if ($token) {
            // Check if the token is expired or inactive
            if (Carbon::now()->greaterThan($token->expired_at) || !$token->status) {
                return response()->json(['valid' => false, 'message' => 'Token is either expired or inactive.'], 403);
            }
            return response()->json(['valid' => true, 'token' => new TokenResource($token)]);
        } else {
            return response()->json(['valid' => false, 'message' => 'Token is invalid for this application.'], 400);
        }
    }
}
