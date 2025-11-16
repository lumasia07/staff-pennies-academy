<?php
namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class LocationUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = [
            'Frisco',
            'Denton',
            'Grapevine',
            'Rockwall',
            'McKinney',
            'Prosper',
            'Princeton',
        ];
        $password = 'DTN2025#!#';
        foreach ($locations as $location) {
            User::firstOrCreate(
                ['email' => strtolower($location) . '@driverstestnow.com'],
                [
                    'name' => $location,
                    'password' => Hash::make($password),
                ]
            );
        }
    }
}
