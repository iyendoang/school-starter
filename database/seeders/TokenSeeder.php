<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TokenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('tokens')->insert([
            [
                'token_access' => Str::uuid()->toString(),
                'application_id' => 1,
                'school_id' => 1, // Ensure this matches an existing school ID
                'expired_at' => '2024-09-14 00:00:00',
                'status' => true,
            ],
            [
                'token_access' => Str::uuid()->toString(),
                'application_id' => 2,
                'school_id' => 1, // Ensure this matches an existing school ID
                'expired_at' => '2024-09-14 00:00:00',
                'status' => true,
            ],
            [
                'token_access' => Str::uuid()->toString(),
                'application_id' => 2, // Ensure this matches an existing application ID
                'school_id' => 2, // Ensure this matches an existing school ID
                'expired_at' => now()->addYear(),
                'status' => false,
            ],
            [
                'token_access' => Str::uuid()->toString(),
                'application_id' => 2,
                'school_id' => 3, // Ensure this matches an existing school ID
                'expired_at' => now()->addYear(),
                'status' => true,
            ],
        ]);
    }
}
