<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Quiz;
use App\Models\Question;

class QuizSeederE extends Seeder
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

        $quiz = Quiz::create([
            'title' => 'Exam E - Basic Knowledge',
            'description' => 'Texas Department of Public Safety - Non Commercial Driver License',
            'instructor_id' => $locationUser ? $locationUser->id : null,
        ]);

        $questions = [
            // Q1
            [
                'question_text' => 'If an individual (age 21 or older) causes the death of another by accident or mistake while driving under the influence of alcohol, the worst offense the driver may be charged with is:',
                'image_url' => '/test_images/e/q1.png', // <-- REUSED
                'options' => [
                    "negligent homicide (causing death by carelessness).",
                    "intoxication manslaughter.",
                    "driving while under the influence of intoxicating liquor.",
                    "drunkenness."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q2
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/e/q2.png', // <-- REUSED
                'options' => [
                    "slow down very slowly.",
                    "stop only when other traffic is close.",
                    "come to a complete stop."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q3
            [
                'question_text' => 'The maximum fine for a first non-driving alcohol-related offense or possession or consumption of alcohol by a minor is:',
                'image_url' => '/test_images/e/q3.png',
                'options' => [
                    "\$1,500.",
                    "\$750.",
                    "\$500.",
                    "\$1,000."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q4
            [
                'question_text' => 'If you are involved in an injury crash in a city, you must immediately notify:',
                'image_url' => '/test_images/e/q4.png',
                'options' => [
                    "the county sheriff.",
                    "the Justice of the Peace.",
                    "the highway patrol.",
                    "the local police."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q5
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/e/q5.png', // <-- Add image
                'options' => [
                    "look out for a train at a railroad track crossing ahead.",
                    "look for another route as only trucks may use the route ahead.",
                    "watch for trucks entering or crossing the highway ahead."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q6
            [
                'question_text' => 'When making a long trip, you should stop for a rest:',
                'image_url' => '/test_images/e/q6.png',
                'options' => [
                    "about every four hours or two hundred miles.",
                    "and hurry so as to reduce time spent on the highway.",
                    "about every two hours or one hundred miles.",
                    "only when you stop for meals and gasoline."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q7
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/e/q7.png', // <-- Add image
                'options' => [
                    "follow a temporary route to the left.",
                    "get ready to enter a one-way street.",
                    "stay on the main highway if you can."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q8
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/e/q8.png', // <-- REUSED
                'options' => [
                    "slow down for a left curve.",
                    "look for a detour to the left.",
                    "slow down for a left turn."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q9
            [
                'question_text' => 'A driver waiting to make a left turn when the traffic light turns green should:',
                'image_url' => '/test_images/e/q9.png',
                'options' => [
                    "turn hurriedly ahead of any vehicle coming straight through from the other direction.",
                    "turn only after there is no danger from any vehicle coming straight through from the other direction.",
                    "wait and turn on the next yellow light.",
                    "signal and bluff other vehicles into stopping."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q10
            [
                'question_text' => 'If you must walk on the highway, you should:',
                'image_url' => '/test_images/e/q10.png',
                'options' => [
                    "walk on the right side if there are no sidewalks.",
                    "walk on the side with the highest amount of traffic.",
                    "walk on the side that has the widest shoulders.",
                    "walk on the left side if there are no sidewalks."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q11
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/e/q11.png', // <-- REUSED
                'options' => [
                    "watch for a dangerous intersection.",
                    "stay on the right-hand side of the road and watch approaching traffic.",
                    "slow down for end of the pavement."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q12
            [
                'question_text' => 'When you are stopped by law enforcement, drivers and passengers should:',
                'image_url' => null,
                'options' => [
                    "Respond with courtesy",
                    "Refrain from digging or reaching for items in the vehicle without the officer's consent",
                    "Transport any weapons in a separate location from license and insurance documentation",
                    "All of the above"
                ],
                'correct_option_index' => 3 // D
            ],
            // Q13
            [
                'question_text' => 'The shape of this sign indicates:',
                'image_url' => '/test_images/e/q13.png', // <-- REUSED
                'options' => [
                    "school bus parking only.",
                    "a school event is taking place.",
                    "a school crossing."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q14
            [
                'question_text' => 'You may lawfully allow an object to extend beyond the left side of your vehicle by:',
                'image_url' => '/test_images/e/q14.png',
                'options' => [
                    "6 inches.",
                    "3 inches.",
                    "9 inches.",
                    "12 inches."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q15
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/e/q15.png', // <-- REUSED
                'options' => [
                    "not enter if your load is longer than 12 ft. 6 in.",
                    "not enter if your load is wider than 12 ft. 6 in.",
                    "not enter if your load is higher than 12 ft. 6 in."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q16
            [
                'question_text' => 'When parking parallel, it is best to leave the curb side wheels:',
                'image_url' => '/test_images/e/q16.png',
                'options' => [
                    "6 to 18 inches from the curb.",
                    "18 to 24 inches from the curb.",
                    "touching the curb.",
                    "24 to 30 inches from the curb."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q17
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/e/q17.png', // <-- REUSED
                'options' => [
                    "watch for an intersection.",
                    "slow down and watch for people crossing the street on foot.",
                    "know that pedestrians are not permitted to cross in this area."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q18
            [
                'question_text' => 'This sign indicates:',
                'image_url' => '/test_images/e/q18.png', // <-- Add image
                'options' => [
                    "the pavement ahead narrows.",
                    "watch for railroad ahead.",
                    "you are approaching a one-way road."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q19
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/e/q19.png', // <-- Add image
                'options' => [
                    "drive to the right of this sign.",
                    "watch for side road traffic to the right.",
                    "slow down for a right turn at this sign."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q20
            [
                'question_text' => 'Which individual cannot carry a white cane while walking on any public street or highway?',
                'image_url' => '/test_images/e/q20.png',
                'options' => [
                    "A partially blind person.",
                    "A disabled person.",
                    "A person who is not disabled.",
                    "A blind person."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q21
            [
                'question_text' => 'In Texas, if you are involved in a crash, upon request from a law enforcement officer or the other person involved, you are required to furnish:',
                'image_url' => '/test_images/e/q21.png',
                'options' => [
                    "evidence of passing your driving exam.",
                    "evidence of vehicle purchase.",
                    "evidence of your gasoline purchase.",
                    "evidence of financial responsibility."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q22
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/e/q22.png', // <-- REUSED
                'options' => [
                    "expect oncoming traffic in the left lane.",
                    "get ready to turn as you cannot enter the next street the way you are going.",
                    "get ready to cross a two-way street."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q23
            [
                'question_text' => 'The maximum daytime speed limit for passenger cars on most highways numbered by this state or United States is:',
                'image_url' => '/test_images/e/q23.png',
                'options' => [
                    "60 mph.",
                    "65 mph.",
                    "55 mph.",
                    "70 mph."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q24
            [
                'question_text' => 'Drivers should watch for blind persons at:',
                'image_url' => '/test_images/e/q24.png',
                'options' => [
                    "Bus stops.",
                    "Business areas.",
                    "All of the answers.",
                    "Intersections."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q25
            [
                'question_text' => 'Including reaction time, the stopping distance is more than 20 feet at 10 mph, at 20 mph it will be about:',
                'image_url' => '/test_images/e/q25.png',
                'options' => [
                    "30 feet.",
                    "75 feet.",
                    "63 feet.",
                    "45 feet."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q26
            [
                'question_text' => 'The maximum fine for a first conviction of driving without a valid driver license is:',
                'image_url' => '/test_images/e/q26.png',
                'options' => [
                    "\$500",
                    "\$100",
                    "\$50",
                    "\$200"
                ],
                'correct_option_index' => 3 // D
            ],
            // Q27
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/e/q27.png', // <-- REUSED
                'options' => [
                    "ignore individuals in wheelchairs.",
                    "slow your speed and watch for individuals who are disabled or may be crossing the road in a wheelchair.",
                    "follow the sign if you're shopping for a wheelchair."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q28
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/e/q28.png', // <-- Add image
                'options' => [
                    "prepare to merge into one lane of traffic.",
                    "disregard if driving in left lane.",
                    "stop and wait for a signal from the construction worker."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q29
            [
                'question_text' => 'Child passenger safety seats are required for all children under the age of:',
                'image_url' => '/test_images/e/q29.png',
                'options' => [
                    "6 months.",
                    "18 months.",
                    "1 year.",
                    "8 years or less than 4 feet 9 inches in height (regardless of age)."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q30
            [
                'question_text' => 'If you are stopped by law enforcement, it is suggested you:',
                'image_url' => null,
                'options' => [
                    "Slow down and move the vehicle safely to the right of the road",
                    "Place vehicle in parking position, activating emergency brake and hazardous warning lights",
                    "Remain in your car, keep both hands clearly in sight on the steering wheel",
                    "All of the above"
                ],
                'correct_option_index' => 3 // D
            ],
        ];

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