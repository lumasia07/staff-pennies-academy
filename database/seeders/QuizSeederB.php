<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Quiz;
use App\Models\Question;
use Illuminate\Support\Facades\Hash;

class QuizSeederB extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Get a location user (prefer Frisco, fallback to any location user, then any user)
        $locationUser = User::where('name', 'Frisco')->first();
        if (!$locationUser) {
            $locationUser = User::where('type', 'location')->first();
        }
        if (!$locationUser) {
            $locationUser = User::first();
        }

        // 1. Create the "Exam B" Quiz
        $quiz = Quiz::create([
            'title' => 'Exam B - Basic Knowledge',
            'description' => 'Texas Department of Public Safety - Non Commercial Driver License',
            'instructor_id' => $locationUser ? $locationUser->id : null,
        ]);

        // 2. All 30 Questions & Answers for Exam B
        $questions = [
            // Q1
            [
                'question_text' => 'After overtaking another vehicle on a two-lane road, you can best judge when it is safe to drive back into the right-hand lane by:',
                'image_url' => '/test_images/b/q1.png',
                'options' => [
                    "waiting until you can see the overtaken vehicle in the rearview mirror.",
                    "waiting until you can no longer see the overtaken vehicle on your right.",
                    "waiting until you can no longer see the overtaken vehicle in your rearview mirror.",
                    "waiting one full minute."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q2
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/b/q2.png', 
                'options' => [
                    "know that left turns are prohibited at this intersection.",
                    "turn left after a complete stop.",
                    "move over into the right lane if you are driving slow."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q3
            [
                'question_text' => 'The most a person (age 21 or older) can be fined for a first offense of driving while under the influence of intoxicating liquor with no death or crash resulting in injury is:',
                'image_url' => '/test_images/b/q3.png',
                'options' => [
                    "\$2,000.",
                    "\$5,000.",
                    "\$1,000.",
                    "\$3,000."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q4
            [
                'question_text' => 'Alcohol affects a driver by:',
                'image_url' => '/test_images/b/q4.png',
                'options' => [
                    "slowing down reaction and impairing perception.",
                    "all of these.",
                    "emotions become unstable.",
                    "interfering with concentration and loss of judgment."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q5
            [
                'question_text' => 'When entering a street from a private road, alley or driveway you must:',
                'image_url' => '/test_images/b/q5.png',
                'options' => [
                    "proceed at 5 mph.",
                    "stop only when turning left.",
                    "sound your horn.",
                    "yield the right of way to all approaching vehicles and pedestrians."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q6
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/b/q6.png', 
                'options' => [
                    "slow down for a winding road and do not pass.",
                    "slow down for a U-turn and do not pass.",
                    "slow down for a double turn and do not pass."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q7
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/b/q7.png', 
                'options' => [
                    "slow down to at least 35 mph for the curve ahead.",
                    "know that the lawful speed limit is 35 mph in this zone.",
                    "drive in the left lane if you are going over 35 mph."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q8
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/b/q8.png', 
                'options' => [
                    "proceed carefully in the direction of the arrow after yielding the right of way to other vehicles and pedestrians.",
                    "slow down.",
                    "stop.",
                    "stop, then go ahead in the direction shown by the arrow."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q9
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/b/q9.png', 
                'options' => [
                    "slow down for a low place in the road.",
                    "dim your lights.",
                    "slow down for a hill."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q10
            [
                'question_text' => 'When choosing your driving speed, the most important thing(s) to consider is:',
                'image_url' => '/test_images/b/q10.png',
                'options' => [
                    "the condition of the car engine and upholstery.",
                    "the time you have to travel.",
                    "the speed limit, the weather, traffic, road, the vehicle and the driver.",
                    "the condition of other drivers."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q11
            [
                'question_text' => 'The maximum fine for a person age 21 or older who possesses an open container of alcohol in a vehicle on a public highway regardless of whether the vehicle is being operated, stopped or parked is:',
                'image_url' => '/test_images/b/q11.png',
                'options' => [
                    "\$1,000.",
                    "\$200.",
                    "\$50.",
                    "\$500."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q12
            [
                'question_text' => 'If you must walk on the highway, you should:',
                'image_url' => '/test_images/b/q12.png',
                'options' => [
                    "walk on the right side if there are no sidewalks.",
                    "walk on the side that has the widest shoulders.",
                    "walk on the side with the highest amount of traffic.",
                    "walk on the left side if there are no sidewalks."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q13
            [
                'question_text' => 'If you run off the pavement, you should:',
                'image_url' => '/test_images/b/q13.png',
                'options' => [
                    "apply the brakes hard.",
                    "turn the steering wheel quickly toward the road.",
                    "steer straight ahead and speed up.",
                    "steer straight and slow down before attempting to return to the pavement."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q14
            [
                'question_text' => 'The shape of this sign indicates:',
                'image_url' => '/test_images/b/q14.png', 
                'options' => [
                    "school bus parking only.",
                    "a school event is taking place.",
                    "a school crossing."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q15
            [
                'question_text' => 'A solid yellow line on your side of the road marks a:',
                'image_url' => '/test_images/b/q15.png',
                'options' => [
                    "no-passing zone.",
                    "slow down zone.",
                    "multiple lane highway.",
                    "traffic signal ahead."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q16
            [
                'question_text' => 'If a child ran into the road 60 to 65 feet ahead of your vehicle, what is the highest speed from which you could stop with good brakes before hitting the child?',
                'image_url' => '/test_images/b/q16.png',
                'options' => [
                    "30 mph.",
                    "20 mph.",
                    "50 mph.",
                    "40 mph."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q17
            [
                'question_text' => 'Blind, partially blind, or disabled individuals may carry what color cane when walking?',
                'image_url' => '/test_images/b/q17.png',
                'options' => [
                    "Blue.",
                    "White.",
                    "Yellow.",
                    "Orange."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q18
            [
                'question_text' => "A minor's (if under the age of 17) driver license may be suspended for a first offense of driving under the influence of alcohol or drugs by a minor for:",
                'image_url' => '/test_images/b/q18.png',
                'options' => [
                    "1 year to 2 years.",
                    "90 to 365 days.",
                    "180 days to 2 years.",
                    "2 to 4 years."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q19
            [
                'question_text' => 'Drivers must give the right-of-way to pedestrians:',
                'image_url' => '/test_images/b/q19.png',
                'options' => [
                    "if the pedestrian has entered the crosswalk, even if the WALK light changes to red.",
                    "if the pedestrian has entered the crosswalk, even if the traffic light changes to green.",
                    "if the pedestrian has a WALK signal.",
                    "all of the answers."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q20
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/b/q20.png', 
                'options' => [
                    "follow the sign if you're shopping for a wheelchair.",
                    "ignore individuals in wheelchairs.",
                    "slow your speed and watch for individuals who are disabled or may be crossing the road in a wheelchair."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q21
            [
                'question_text' => 'To pass a vehicle inspection, the brakes on a car traveling at 20 miles per hour, must stop a car within:',
                'image_url' => '/test_images/b/q21.png',
                'options' => [
                    "10 feet.",
                    "45 feet.",
                    "25 feet.",
                    "23 feet."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q22
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/b/q22.png', 
                'options' => [
                    "slow down very slowly.",
                    "come to a complete stop.",
                    "stop only when other traffic is close."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q23
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/b/q23.png', 
                'options' => [
                    'slow down for a "Y" intersection.',
                    'slow down for a dip in an intersection.',
                    'slow down for a "T" intersection.'
                ],
                'correct_option_index' => 0 // A
            ],
            // Q24
            [
                'question_text' => 'When you approach a school bus which has stopped to pick up or discharge children, you must:',
                'image_url' => '/test_images/b/q24.png', 
                'options' => [
                    "stop and wait until the bus has resumed motion or you are signaled by the driver to proceed.",
                    "stop and then you may carefully pass at a speed of not over 10 mph.",
                    "sound your horn and carefully pass.",
                    "slow down and pass carefully at a speed not over 10 mph."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q25
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/b/q25.png', 
                'options' => [
                    "get ready to turn as you cannot enter the next street the way you are going.",
                    "expect oncoming traffic in the left lane.",
                    "get ready to cross a two-way street."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q26
            [
                'question_text' => 'Under favorable circumstances, including reaction time, a motor vehicle with good brakes going 50 mph can be stopped within:',
                'image_url' => '/test_images/b/q26.png',
                'options' => [
                    "about 133 feet.",
                    "about 55 feet.",
                    "about 229 feet.",
                    "about 100 feet."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q27
            [
                'question_text' => 'The shape of this sign indicates you should:',
                'image_url' => '/test_images/b/q27.png', 
                'options' => [
                    "look out for a train.",
                    "always stop, look and listen.",
                    "disregard if you cannot read the sign."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q28
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/b/q28.png', 
                'options' => [
                    "get ready to cross a rural road.",
                    "look out for a train.",
                    "always stop."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q29
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/b/q29.png', 
                'options' => [
                    "slow down for a right turn.",
                    "slow down for a right curve.",
                    "look for a detour to the right."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q30
            [
                'question_text' => 'At 20 mph the average person, from the moment danger is seen and the brakes are applied, the vehicle will travel about:',
                'image_url' => '/test_images/b/q30.png', 
                'options' => [
                    "88 feet.",
                    "22 feet.",
                    "10 feet.",
                    "44 feet."
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