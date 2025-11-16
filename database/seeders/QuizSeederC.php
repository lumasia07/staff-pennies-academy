<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Quiz;
use App\Models\Question;

class QuizSeederC extends Seeder
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
            'title' => 'Exam C - Basic Knowledge',
            'description' => 'Texas Department of Public Safety - Non Commercial Driver License',
            'instructor_id' => $locationUser ? $locationUser->id : null,
        ]);

        $questions = [
            // Q1
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/c/q1.png',
                'options' => [
                    "continue on - stopping is not permitted.",
                    "stop here if you are tired and wish to rest.",
                    "stop only in an emergency, such as vehicle failure."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q2
            [
                'question_text' => 'Vehicle skids are caused by:',
                'image_url' => '/test_images/c/q2.png',
                'options' => [
                    "too much ice or snow on the road.",
                    "air pressure in tires too high.",
                    "air pressure in tires too low.",
                    "tires losing their grip on the road surface."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q3
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/c/q3.png', // <-- REUSED
                'options' => [
                    "slow down for a low place in the road.",
                    "slow down for a dip.",
                    "slow down for a sudden sharp rise in the road."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q4
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/c/q4.png', // <-- Add image
                'options' => [
                    "speed up and hurry across the bridge.",
                    "continue as you are sign is displayed regardless of condition.",
                    "slow down - a hazardous condition may exist on the bridge."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q5
            [
                'question_text' => 'On multiple lane highways slow drivers should drive:',
                'image_url' => '/test_images/c/q5.png', // <-- Add image
                'options' => [
                    "in whatever lane other slow drivers may be using.",
                    "in a middle lane.",
                    "in the right lane.",
                    "in the left lane."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q6
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/c/q6.png', // <-- Add image
                'options' => [
                    "not enter if your load is higher than 12 ft. 6 in.",
                    "not enter if your load is wider than 12 ft. 6 in.",
                    "not enter if your load is longer than 12 ft. 6 in."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q7
            [
                'question_text' => 'To avoid a crash, a defensive driver should:',
                'image_url' => '/test_images/c/q7.png',
                'options' => [
                    "signal only when meeting other traffic.",
                    "stay alert and look for trouble spots.",
                    "ignore the driving of others.",
                    "insist on his/her right of way."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q8
            [
                'question_text' => 'To pass a vehicle inspection, the brakes on a car traveling at 20 miles per hour, must stop a car within:',
                'image_url' => '/test_images/c/q8.png',
                'options' => [
                    "25 feet.",
                    "23 feet.",
                    "10 feet.",
                    "45 feet."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q9
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
            // Q10
            [
                'question_text' => 'If you are driving at the speed limit and another driver sounds their horn and starts to pass, you should:',
                'image_url' => '/test_images/c/q10.png',
                'options' => [
                    "speed up and get out of the way.",
                    "refuse to move over.",
                    "make it as safe and easy as you can for the other driver.",
                    "sound your horn and wave."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q11
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/c/q11.png', // <-- REUSED
                'options' => [
                    "watch for trucks as they are not permitted in this area.",
                    "prepare to reduce speed for a downgrade.",
                    "watch for water trucks."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q12
            [
                'question_text' => 'A solid yellow line on your side of the road marks a:',
                'image_url' => '/test_images/c/q12.png',
                'options' => [
                    "slow down zone.",
                    "multiple lane highway.",
                    "no-passing zone.",
                    "traffic signal ahead."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q13
            [
                'question_text' => 'This sign indicates:',
                'image_url' => '/test_images/c/q13.png', // <-- Add image
                'options' => [
                    "the end of an obstruction so that it may easily be seen.",
                    "a sharp bend in the road ahead.",
                    "a roadside barber shop."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q14
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/c/q14.png', // <-- REUSED
                'options' => [
                    "follow the sign if you're shopping for a wheelchair.",
                    "slow your speed and watch for individuals who are disabled or may be crossing the road in a wheelchair.",
                    "ignore individuals in wheelchairs."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q15
            [
                'question_text' => 'If a minor has any detectable amount of alcohol in their system while operating a motor vehicle or watercraft, the minor has committed the criminal offense:',
                'image_url' => '/test_images/c/q15.png',
                'options' => [
                    "intoxication manslaughter.",
                    "driving under the influence of alcohol by minor.",
                    "public intoxication.",
                    "intoxication assault."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q16
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/c/q16.png', // <-- Add image
                'options' => [
                    "stay in the right-hand lane when driving slower than other vehicles.",
                    "drive only in the right-hand lane.",
                    "pass to the right, when driving slow."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q17
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/c/q17.png', // <-- Add image
                'options' => [
                    "get ready to detour.",
                    "slow down and expect a change in the road surface.",
                    "speed up to normal as you are at the end of a paving project."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q18
            [
                'question_text' => 'Your driver license may be suspended for:',
                'image_url' => '/test_images/c/q18.png', // <-- Add image
                'options' => [
                    "any violation of traffic laws.",
                    "any moving violation of traffic laws.",
                    "causing a minor crash.",
                    "repeated violations of traffic laws."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q19
            [
                'question_text' => 'As a driver (age 21 or older), if you refuse to give a blood or breath specimen for analysis to determine the alcohol concentration in your body:',
                'image_url' => '/test_images/c/q19.png',
                'options' => [
                    "you may be required to take another driving test.",
                    "your driver license will be suspended.",
                    "you must be fined at least $500.",
                    "you must be sentenced to at least three days in jail."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q20
            [
                'question_text' => 'Blind, partially blind, or disabled individuals may carry what color cane when walking?',
                'image_url' => '/test_images/c/q20.png',
                'options' => [
                    "Orange.",
                    "Yellow.",
                    "Blue.",
                    "White."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q21
            [
                'question_text' => 'When making a long trip, you should stop for a rest:',
                'image_url' => '/test_images/c/q21.png',
                'options' => [
                    "about every two hours or one hundred miles.",
                    "about every four hours or two hundred miles.",
                    "only when you stop for meals and gasoline.",
                    "and hurry so as to reduce time spent on the highway."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q22
            [
                'question_text' => 'As you near an intersection, you discover you are in the wrong lane for turning right as intended therefore, you should:',
                'image_url' => '/test_images/c/q22.png',
                'options' => [
                    "drive on ahead until you can safely get into the proper lane, then turn at another intersection.",
                    "turn from the lane you are in if no cars are coming.",
                    "move quickly into the proper lane.",
                    "wait until other cars pass and then get into the proper lane."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q23
            [
                'question_text' => 'If you are stopped by law enforcement in an unsafe area, you may:',
                'image_url' => null,
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
                'image_url' => '/test_images/c/q24.png',
                'options' => [
                    "steer straight ahead and speed up.",
                    "apply the brakes hard.",
                    "turn the steering wheel quickly toward the road.",
                    "steer straight and slow down before attempting to return to the pavement."
                ],
                'correct_option_index' => 3 // D
            ],
            // Q25
            [
                'question_text' => 'A vehicle should never be parked closer to a fire hydrant than:',
                'image_url' => '/test_images/c/q25.png',
                'options' => [
                    "20 feet.",
                    "15 feet.",
                    "30 feet.",
                    "10 feet."
                ],
                'correct_option_index' => 1 // B
            ],
            // Q26
            [
                'question_text' => 'If you see a pedestrian including a pedestrian guided by an assistance animal or with a white cane at an intersection, you should:',
                'image_url' => '/test_images/c/q26.png',
                'options' => [
                    "slow down.",
                    "use your horn if necessary.",
                    "all of the answers.",
                    "be prepared to stop."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q27
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/c/q27.png',
                'options' => [
                    "slow down on a wet road and avoid sudden turns, stops or speeding.",
                    "be very careful to avoid getting stuck in wet weather.",
                    "speed up on a wet road."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q28
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/c/q28.png',
                'options' => [
                    "not apply brakes suddenly or make sharp turns.",
                    "look out for gravel trucks.",
                    "look out for cattle running loose."
                ],
                'correct_option_index' => 0 // A
            ],
            // Q29
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/c/q29.png', // <-- Add image
                'options' => [
                    "know that it is 158 miles to the Texas boundary line.",
                    "know that US Highway 158 runs straight ahead.",
                    "know that Texas Highway 158 runs right and left ahead."
                ],
                'correct_option_index' => 2 // C
            ],
            // Q30
            [
                'question_text' => 'This sign indicates you should:',
                'image_url' => '/test_images/c/q30.png', // <-- REUSED
                'options' => [
                    "slow down for a winding road and do not pass.",
                    "slow down for a double turn and do not pass.",
                    "slow down for a U-turn and do not pass."
                ],
                'correct_option_index' => 0 // A
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