<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Quiz;
use App\Models\Question;

class QuizSeederD extends Seeder
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
            'title' => 'Exam D - Basic Knowledge',
            'description' => 'Texas Department of Public Safety - Non Commercial Driver License',
            'instructor_id' => $locationUser ? $locationUser->id : null,
        ]);

        $questions = [
            // Q1
            [
                'question_text' => 'The lights on your vehicle must be turned on at any time of the day or night when persons and vehicles cannot be clearly seen for at least:',
                'image_url' => '/test_images/d/q1.png',
                'options' => [
                    "750 feet.",
                    "1,000 feet.",
                    "1,500 feet.",
                    "350 feet."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q2
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/d/q2.png', // <-- REUSED
                'options' => [
                    "slow down for a right turn.",
                    "look for a detour to the right.",
                    "slow down for a right curve."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q3
            [
                'question_text' => 'After overtaking another vehicle on a two-lane road, you can best judge when it is safe to drive back into the right-hand lane by:',
                'image_url' => '/test_images/d/q3.png',
                'options' => [
                    "waiting until you can no longer see the overtaken vehicle on your right.",
                    "waiting until you can see the overtaken vehicle in the rearview mirror.",
                    "waiting one full minute.",
                    "waiting until you can no longer see the overtaken vehicle in your rearview mirror."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q4
            [
                'question_text' => 'A flashing yellow light warns drivers:',
                'image_url' => '/test_images/d/q4.png',
                'options' => [
                    "to slow down if other traffic is near.",
                    "to slow down and proceed with caution.",
                    "stop.",
                    "do not turn."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q5
            [
                'question_text' => 'Headlights must be turned on:',
                'image_url' => '/test_images/d/q5.png',
                'options' => [
                    "at sunset.",
                    "30 minutes before sunset.",
                    "only after it gets completely dark.",
                    "30 minutes after sunset."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q6
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/d/q6.png',
                'options' => [
                    "look out for cattle running loose.",
                    "look out for gravel trucks.",
                    "not apply brakes suddenly or make sharp turns."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q7
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
            // Q8
            [
                'question_text' => 'Alcohol affects a driver by:',
                'image_url' => '/test_images/d/q8.png',
                'options' => [
                    "slowing down reaction and impairing perception.",
                    "interfering with concentration and loss of judgment.",
                    "all of these.",
                    "emotions become unstable."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q9
            [
                'question_text' => "A person's driver license will automatically be suspended if convicted of:",
                'image_url' => '/test_images/d/q9.png', // <-- REUSED
                'options' => [
                    "attempting to flee from a law enforcement officer.",
                    "possessing a fictitous or altered driver license.",
                    "four or more traffic violations.",
                    "failure to maintain financial responsibility."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q10
            [
                'question_text' => 'Vehicle skids are caused by:',
                'image_url' => '/test_images/d/q10.png',
                'options' => [
                    "tires losing their grip on the road surface.",
                    "too much ice or snow on the road.",
                    "air pressure in tires too low.",
                    "air pressure in tires too high."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q11
            [
                'question_text' => 'If you are involved in an injury crash in a city, you must immediately notify:',
                'image_url' => '/test_images/d/q11.png',
                'options' => [
                    "the county sheriff.",
                    "the highway patrol.",
                    "the Justice of the Peace.",
                    "the local police."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q12
            [
                'question_text' => 'When you are taking medicine prescribed for you by a doctor you should:',
                'image_url' => '/test_images/d/q12.png',
                'options' => [
                    "drive short distances only.",
                    "ask your doctor or pharmacist if it may affect your ability to drive.",
                    "never drive.",
                    "drive only if you feel okay."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q13
            [
                'question_text' => 'This sign indicates:',
                'image_url' => '/test_images/d/q13.png',
                'options' => [
                    "turn left at any time.",
                    "oncoming traffic must stop for vehicles turning left at the intersection when the arrow is green.",
                    "oncoming traffic may proceed with a green arrow."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q14
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/d/q14.png', // <-- REUSED
                'options' => [
                    "stop, then go ahead in the direction shown by the arrow.",
                    "proceed carefully in the direction of the arrow after yielding the right of way to other vehicles and pedestrians.",
                    "stop.",
                    "slow down."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q15
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/d/q15.png', // <-- Add image
                'options' => [
                    "slow down for a right curve and do not pass.",
                    "slow down for a right and left turn and do not pass.",
                    "slow down for a right and left curve and do not pass."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q16
            [
                'question_text' => 'A solid yellow line on your side of the road marks a:',
                'image_url' => '/test_images/d/q16.png',
                'options' => [
                    "traffic signal ahead.",
                    "slow down zone.",
                    "multiple lane highway.",
                    "no-passing zone."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q17
            [
                'question_text' => 'If you are driving at the speed limit and another driver sounds their horn and starts to pass, you should:',
                'image_url' => '/test_images/d/q17.png',
                'options' => [
                    "sound your horn and wave.",
                    "make it as safe and easy as you can for the other driver.",
                    "refuse to move over.",
                    "speed up and get out of the way."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q18
            [
                'question_text' => 'When you approach a school bus which has stopped to pick up or discharge children, you must:',
                'image_url' => '/test_images/d/q18.png', // <-- REUSED
                'options' => [
                    "stop and wait until the bus has resumed motion or you are signaled by the driver to proceed.",
                    "sound your horn and carefully pass.",
                    "stop and then you may carefully pass at a speed of not over 10 mph.",
                    "slow down and pass carefully at a speed not over 10 mph."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q19
            [
                'question_text' => 'As you near an intersection, you discover you are in the wrong lane for turning right as intended therefore, you should:',
                'image_url' => '/test_images/d/q19.png',
                'options' => [
                    "move quickly into the proper lane.",
                    "turn from the lane you are in if no cars are coming.",
                    "wait until other cars pass and then get into the proper lane.",
                    "drive on ahead until you can safely get into the proper lane, then turn at another intersection."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q20
            [
                'question_text' => 'The maximum daytime speed limit for passenger cars on most highways numbered by this state or United States is:',
                'image_url' => '/test_images/d/q20.png',
                'options' => [
                    "60 mph.",
                    "55 mph.",
                    "65 mph.",
                    "70 mph."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q21
            [
                'question_text' => 'The most a person (age 21 or older) can be fined for a first offense of driving while under the influence of intoxicating liquor with no death or crash resulting in injury is:',
                'image_url' => '/test_images/d/q21.png',
                'options' => [
                    "\$3,000.",
                    "\$2,000.",
                    "\$1,000.",
                    "\$5,000."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q22
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/d/q22.png', // <-- Add image
                'options' => [
                    "slow down and watch for people crossing the street on foot.",
                    "watch for an intersection.",
                    "know that pedestrians are not permitted to cross in this area."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q23
            [
                'question_text' => 'If a child ran into the road 60 to 65 feet ahead of your vehicle, what is the highest speed from which you could stop with good brakes before hitting the child?',
                'image_url' => '/test_images/d/q23.png',
                'options' => [
                    "40 mph.",
                    "50 mph.",
                    "30 mph.",
                    "20 mph."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q24
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/d/q24.png',
                'options' => [
                    "stop only when other traffic is close.",
                    "slow down very slowly.",
                    "come to a complete stop."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q25
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/d/q25.png', // <-- REUSED
                'options' => [
                    "watch for children.",
                    "drive around this area.",
                    "always sound your horn."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q26
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/d/q26.png', // <-- Add image
                'options' => [
                    "slow down for a left turn.",
                    "look for a detour to the left.",
                    "slow down for a left curve."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q27
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/d/q27.png', // <-- Add image
                'options' => [
                    "look carefully in all directions for traffic.",
                    "watch mostly to the right for other traffic.",
                    "watch mostly to the left for other traffic."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q28
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/d/q28.png', // <-- Add image
                'options' => [
                    "slow down for a reverse turn ahead.",
                    "get ready to cross or enter a one-way street to the right.",
                    "watch for side road traffic to the right."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q29
            [
                'question_text' => 'The shape of this sign indicates you should:',
                'image_url' => '/test_images/d/q29.png', // <-- REUSED
                'options' => [
                    "look out for a train.",
                    "always stop, look and listen.",
                    "disregard if you cannot read the sign."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q30
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/d/q30.png', // <-- REUSED
                'options' => [
                    "speed up to beat other cars across.",
                    "slow down and use caution because the bridge ahead is not as wide as the road.",
                    "stop and wait for oncoming cars to cross first."
                ],
                'correct_option_index' => 1 // B
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
