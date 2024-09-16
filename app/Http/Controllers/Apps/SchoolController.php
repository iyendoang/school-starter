<?php

namespace App\Http\Controllers\Apps;

use App\Http\Controllers\Controller;
use App\Http\Resources\Apps\SchoolResource;
use App\Models\School;
use App\Models\Token;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\Middleware;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class SchoolController extends Controller
{
    /**
     * middleware
     */
    public static function middleware()
    {
        return [
            new Middleware('permission:schools-data', only: ['index']),
            new Middleware('permission:schools-create', only: ['create']),
            new Middleware('permission:schools-update', only: ['update']),
            new Middleware('permission:schools-destroy', only: ['destroy']),
        ];
    }
    public function index()
    {
        $schools = School::query()
            ->with(['tokens.application'])
            ->when(request()->search, function ($query) {
                $query->where('name', 'like', '%' . request()->search . '%');
            })
            ->select('id', 'name', 'npsn')
            ->latest()
            ->paginate(7)
            ->withQueryString();

        // Transform the data using the SchoolResource
        $schoolsResource = SchoolResource::collection($schools);

        // Return the transformed data
        return inertia('Apps/Schools/Index', [
            'schools' => $schoolsResource->additional([
                'current_page' => $schools->currentPage(),
                'last_page' => $schools->lastPage(),
                'per_page' => $schools->perPage(),
                'total' => $schools->total(),
            ])
        ]);
    }


    public function create()
    {
        return inertia('Apps/Schools/Create');
    }

    public function store(Request $request)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|max:255',
            'npsn' => 'required|numeric|digits:8|unique:schools',
        ]);

        // Create a new school with the validated data
        School::create([
            'name' => $request->name,
            'npsn' => $request->npsn,
        ]);
        // Redirect to the index page after successful creation
        return to_route('apps.schools.index');
    }

    public function edit(School $school)
    {
        return inertia('Apps/Schools/Edit', ['school' => new SchoolResource($school)]);
    }

    public function update(Request $request, School $school)
    {
        // Validate the incoming request data
        $request->validate([
            'name' => 'required|string|max:255',
            'npsn' => [
                'required',
                'numeric',
                'digits:8',
                Rule::unique('schools')->ignore($school->id)
            ],
        ]);

        // Update the existing school with the validated data
        $school->update([
            'name' => $request->name,
            'npsn' => $request->npsn,
        ]);

        // Redirect to the index page after successful update
        return to_route('apps.schools.index');
    }


    public function destroy(School $school)
    {
        $school->delete();
        return to_route('apps.schools.index');
    }

    public function bulkDelete(Request $request)
    {
        // Validate that 'selectedSchools' is an array of integers
        $validated = $request->validate([
            'selectedSchools' => 'required|array',
            'selectedSchools.*' => 'integer|exists:schools,id',
        ]);

        // Check if there are any IDs to delete
        if (empty($validated['selectedSchools'])) {
            return redirect()->back()->withErrors(['selectedSchools' => 'No schools selected for deletion.']);
        }

        // Delete the schools with the specified IDs
        School::whereIn('id', $validated['selectedSchools'])->delete();

        // Redirect back to the index page with a success message
        return redirect()->route('apps.schools.index')->with('success', 'Schools deleted successfully.');
    }
}
