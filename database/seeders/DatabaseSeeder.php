<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            LocationUserSeeder::class,
            QuizSeederB::class,
            QuizSeederC::class,
            QuizSeederD::class,
            QuizSeederE::class,
            QuizSeederF::class,
        ]);
    }
}