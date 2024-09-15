<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Resources\Apps\ApplicationResource;
use App\Http\Resources\Apps\SchoolResource;
use App\Http\Resources\Apps\TokenResource;
use App\Models\Application;
use App\Models\School;
use App\Models\Token;
use Illuminate\Http\Request;

class TokenController extends Controller
{
    public function create($school_id)
    {
        // Fetch the school using the School model
        $school = School::findOrFail($school_id);

        // Transform the school data using SchoolResource
        $schoolResource = new SchoolResource($school);

        // Fetch all applications
        $applications = ApplicationResource::collection(Application::all());

        return inertia('Apps/Tokens/Create', [
            'school' => $schoolResource,
            'applications' => $applications,
        ]);
    }


    public function store(Request $request, $school_id)
    {
        $request->validate([
            'application_id' => 'required|exists:applications,id',
            'token_access' => 'required|string',
            'expired_at' => 'nullable|date',
            'status' => 'required|boolean',
        ]);

        // Check if a token with the same application_id and school_id already exists
        $existingToken = Token::where('school_id', $school_id)
            ->where('application_id', $request->application_id)
            ->first();

        if ($existingToken) {
            // Return a validation error indicating that this token already exists
            return back()->withErrors([
                'application_id' => 'A token for this application and school already exists.',
            ])->withInput();
        }

        // Create the new token
        Token::create([
            'school_id' => $school_id,
            'application_id' => $request->application_id,
            'token_access' => $request->token_access,
            'expired_at' => $request->expired_at,
            'status' => $request->status,
        ]);

        return redirect()->route('apps.schools.index')->with('success', 'Token created successfully.');
    }

    public function edit($id)
    {
        $token = Token::findOrFail($id);
        $applications = Application::all();

        return inertia('Apps/Tokens/Edit', [
            'token' => new TokenResource($token),
            'applications' => $applications,
        ]);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'application_id' => 'required|exists:applications,id',
            'token_access' => 'required|string',
            'expired_at' => 'nullable|date',
            'status' => 'required|boolean',
        ]);
    
        $token = Token::findOrFail($id);
    
        // Check if a token with the same application_id and school_id already exists, excluding the current token's ID
        $existingToken = Token::where('school_id', $token->school_id)
            ->where('application_id', $request->application_id)
            ->where('id', '!=', $token->id) // Exclude the current token's ID
            ->first();
    
        if ($existingToken) {
            // Return a validation error indicating that this token already exists
            return back()->withErrors([
                'application_id' => 'A token for this application and school already exists.',
            ])->withInput();
        }
    
        // Update the token
        $token->update([
            'application_id' => $request->application_id,
            'token_access' => $request->token_access,
            'expired_at' => $request->expired_at,
            'status' => $request->status,
        ]);
    
        return redirect()->route('apps.schools.index')->with('success', 'Token updated successfully.');
    }
    

    public function destroy($id)
    {
        $token = Token::findOrFail($id);
        $token->delete();

        return redirect()->route('apps.schools.index')->with('success', 'Token deleted successfully.');
    }
}
