<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Quiz;
use App\Models\Question;

class QuizSeederF extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $locations = ['Frisco','Denton','Grapevine','Rockwall','McKinney','Prosper','Princeton'];
        $locationUser = User::whereIn('name', $locations)->inRandomOrder()->first();
        if (!$locationUser) {
            $locationUser = User::first();
        }

        // 1. Create the "Exam F" Quiz
        $quiz = Quiz::create([
            'title' => 'Exam F - Basic Knowledge',
            'description' => 'Texas Department of Public Safety - Non Commercial Driver License',
            'instructor_id' => $locationUser ? $locationUser->id : null,
        ]);

        // 2. All 30 Questions & Answers for Exam F
        $questions = [
            // Q1
            [
                'question_text' => 'When possible, pedestrians should walk:',
                'image_url' => '/test_images/f/q1.png', // <-- Add image here
                'options' => [
                    "on the side of the road with the lightest traffic.",
                    "on the right side of the road to avoid oncoming traffic.",
                    "on a sidewalk.",
                    "on the left side of the road facing traffic."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q2
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/f/q2.png', // <-- Add image here
                'options' => [
                    "slow down for a low place in the road.",
                    "slow down for a sudden sharp rise in the road.",
                    "slow down for a dip."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q3
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/f/q3.png', // <-- Add image here
                'options' => [
                    "watch for water trucks.",
                    "watch for trucks as they are not permitted in this area.",
                    "prepare to reduce speed for a downgrade."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q4
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/f/q4.png', // <-- Add image here
                'options' => [
                    "pass only if you are in a hurry.",
                    "never pass another vehicle at this location.",
                    "cross the double stripe and return quickly when passing a vehicle here."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q5
            [
                'question_text' => 'You must always stop when:',
                'image_url' => '/test_images/f/q5.png',
                'options' => [
                    "crossing a railroad track.",
                    "approaching a yield sign.",
                    "a law enforcement officer instructs you to stop.",
                    "you feel tired."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q6
            [
                'question_text' => 'This sign indicates:',
                'image_url' => '/test_images/f/q6.png', // <-- Add image here
                'options' => [
                    "all traffic must turn.",
                    "you must stop before turning left.",
                    "left turn permitted on green arrow, as approaching traffic is directed to stop."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q7
            [
                'question_text' => 'If you are stopped by law enforcement, it is suggested you:',
                'image_url' => '/test_images/f/q7.png',
                'options' => [
                    "Slow down and move the vehicle safely to the right of the road",
                    "Place vehicle in parking position, activating emergency brake and hazardous warning lights",
                    "Remain in your car, keep both hands clearly in sight on the steering wheel",
                    "All of the above"
                ],
                'correct_option_index' => 3 // D
            ],
            // Q8
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/f/q8.png', // <-- Add image here
                'options' => [
                    "disregard as this sign is for the construction workers.",
                    "watch for machinery and workers.",
                    "look for a detour."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q9
            [
                'question_text' => 'This sign indicates:',
                'image_url' => '/test_images/f/q9.png', // <-- Add image here
                'options' => [
                    "the road ahead curves sharply to the left.",
                    "you should yield before making a left turn.",
                    "you should move to the left lane due to road construction."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q10
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/f/q10.png', // <-- REUSED IMAGE
                'options' => [
                    "slow down for a \"T\" intersection.",
                    "slow down for a dip in an intersection.",
                    "slow down for a \"Y\" intersection."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q11
            [
                'question_text' => 'Why should you drive slower at night?',
                'image_url' => '/test_images/f/q11.png',
                'options' => [
                    "There are more careless drivers on the road at night.",
                    "We do not see as well as we do during the daylight.",
                    "You are more apt to get sleepy.",
                    "There is more traffic on the roads."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q12
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/f/q12.png', // <-- Add image here
                'options' => [
                    "slow to 35 mph to exit expressway.",
                    "exit to right for Highway No. 35.",
                    "maintain a speed of at least 35 mph on expressway."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q13
            [
                'question_text' => 'If blinded by the lights of an approaching vehicle at night, it is best to:',
                'image_url' => '/test_images/f/q13.png',
                'options' => [
                    "stop.",
                    "slow down and avoid looking directly into the headlights of the approaching vehicle.",
                    "dim your lights and continue at the same speed.",
                    "leave your lights on bright to offset the glare."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q14
            [
                'question_text' => 'When approaching an intersection, bridge or railroad crossing, you should never drive on the left side of the road when within:',
                'image_url' => '/test_images/f/q14.png',
                'options' => [
                    "100 feet.",
                    "250 feet.",
                    "200 feet.",
                    "150 feet."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q15
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/f/q15.png', // <-- Add image here
                'options' => [
                    "always stop.",
                    "expect other traffic to yield to you.",
                    "yield the right of way to vehicles on the other road."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q16
            [
                'question_text' => 'Vehicle skids are caused by:',
                'image_url' => '/test_images/f/q16.png',
                'options' => [
                    "tires losing their grip on the road surface.",
                    "air pressure in tires too low.",
                    "air pressure in tires too high.",
                    "too much ice or snow on the road."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q17
            [
                'question_text' => 'Your driver license may be suspended for causing:',
                'image_url' => '/test_images/f/q17.png',
                'options' => [
                    "one near crash.",
                    "one serious crash.",
                    "one minor crash.",
                    "two near crashes."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q18
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/f/q18.png', // <-- REUSED IMAGE
                'options' => [
                    "slow down for a U-turn and do not pass.",
                    "slow down for a double turn and do not pass.",
                    "slow down for a winding road and do not pass."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q19
            [
                'question_text' => 'When following another vehicle, how much driving time should you maintain between yourself and the vehicle you are following?',
                'image_url' => '/test_images/f/q19.png',
                'options' => [
                    "3 seconds.",
                    "4 seconds.",
                    "1 second.",
                    "2 seconds."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q20
            [
                'question_text' => 'In Texas, if you are involved in a crash, upon request from a law enforcement officer or the other person involved, you are required to furnish:',
                'image_url' => '/test_images/f/q20.png',
                'options' => [
                    "evidence of your gasoline purchase.",
                    "evidence of vehicle purchase.",
                    "evidence of passing your driving exam.",
                    "evidence of financial responsibility."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q21
            [
                'question_text' => 'As you near an intersection, you discover you are in the wrong lane for turning right as intended therefore, you should:',
                'image_url' => '/test_images/f/q21.png',
                'options' => [
                    "turn from the lane you are in if no cars are coming.",
                    "wait until other cars pass and then get into the proper lane.",
                    "drive on ahead until you can safely get into the proper lane, then turn at another intersection.",
                    "move quickly into the proper lane."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q22
            [
                'question_text' => 'In a passenger vehicle which of the following must use safety belts?',
                'image_url' => '/test_images/f/q22.png',
                'options' => [
                    "The driver, front seat passenger and back seat passengers under 17 years of age.",
                    "All passengers occupying a seat in a vehicle equipped with a safety belt.",
                    "Only the front seat passengers.",
                    "Only the driver."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q23
            [
                'question_text' => 'If you are stopped by law enforcement in an unsafe area, you may:',
                'image_url' => '/test_images/f/q23.png',
                'options' => [
                    "Turn on your hazard lights",
                    "Drive to a nearby, well-lit, populated area",
                    "Call 911 while you stop and verify the officer's identity",
                    "All of the above"
                ],
                'correct_option_index' => 3 // D
            ],
            // Q24
            [
                'question_text' => 'If you run off the pavement, you should:',
                'image_url' => '/test_images/f/q24.png',
                'options' => [
                    "steer straight ahead and speed up.",
                    "steer straight and slow down before attempting to return to the pavement.",
                    "turn the steering wheel quickly toward the road.",
                    "apply the brakes hard."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q25
            [
                'question_text' => 'If you have a blow-out while driving, you should:',
                'image_url' => null,
                'options' => [
                    "push in the clutch and coast to a stop.",
                    "step on the gas.",
                    "hit the brakes.",
                    "steer straight ahead, take your foot off the gas and gently apply the brakes."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q26
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/f/q26.png', // <-- REUSED IMAGE
                'options' => [
                    "watch for children.",
                    "drive around this area.",
                    "always sound your horn."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q27
            [
                'question_text' => "A minor's (if under the age of 17) driver license may be suspended for a first offense of driving under the influence of alcohol or drugs by a minor for:",
                'image_url' => '/test_images/f/q27.png',
                'options' => [
                    "90 to 365 days.",
                    "2 to 4 years.",
                    "1 year to 2 years.",
                    "180 days to 2 years."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q28
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/sign_narrow_bridge.png', // <-- Add image here
                'options' => [
                    "slow down and use caution because the bridge ahead is not as wide as the road.",
                    "speed up to beat other cars across.",
                    "stop and wait for oncoming cars to cross first."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q29
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/f/q29.png', // <-- Add image here
                'options' => [
                    "detour.",
                    "stop until you are waved on.",
                    "watch for a construction or maintenance worker with a flag up ahead."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q30
            [
                'question_text' => 'The maximum fine for a person age 21 or older who possesses an open container of alcohol in a vehicle on a public highway regardless of whether the vehicle is being operated, stopped or parked is:',
                'image_url' => '/test_images/f/q30.png', // <-- Add image here
                'options' => [
                    "\$200.",
                    "\$50.",
                    "\$1,000.",
                    "\$500."
                ],
                'correct_option_index' => 3 // D
            ],
        ];


        // 3. Loop through and create each question
        foreach ($questions as $q) {
            $quiz->questions()->create([
                'question_text' => $q['question_text'],
                'image_url' => $q['image_url'],
                'options' => $q['options'],
                'correct_option_index' => $q['correct_option_index'],
            ]);
        }
    }
}