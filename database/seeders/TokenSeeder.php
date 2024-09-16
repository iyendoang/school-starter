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
    // database/seeders/TokenSeeder.php

    public function run()
    {
        DB::table('tokens')->updateOrInsert([
            'application_id' => 'SIDOEL',
            'school_id' => 1,
        ], [
            'token_access' => Str::uuid()->toString(),
            'expired_at' => '2024-09-14 00:00:00',
            'status' => true,
        ]);

        DB::table('tokens')->updateOrInsert([
            'application_id' => 'SIDOEL',
            'school_id' => 2,
        ], [
            'token_access' => Str::uuid()->toString(),
            'expired_at' => now()->addYear(),
            'status' => false,
        ]);

        DB::table('tokens')->updateOrInsert([
            'application_id' => 'SIDOEL',
            'school_id' => 3,
        ], [
            'token_access' => Str::uuid()->toString(),
            'expired_at' => now()->addYear(),
            'status' => true,
        ]);
    }
}
