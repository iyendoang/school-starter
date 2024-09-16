<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ApplicationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('applications')->insert([
            ['id' => 'SIDOEL', 'name' => 'Application A'],
            ['id' => 'SIDOEL-2', 'name' => 'Application B'],
        ]);
    }
}
