<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class SchoolSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('schools')->insert([
            ['name' => 'School A', 'npsn' => '20178161'],
            ['name' => 'School B', 'npsn' => '20178162'],
            ['name' => 'School C', 'npsn' => '20178163'],
        ]);
    }
}
