<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <title>Test Results</title>
    <style>
        body { 
            font-family: 'Helvetica', 'Arial', sans-serif; 
            color: #1a1a1a; 
            background: #fff;
            line-height: 1.5;
            font-size: 10pt;
            margin: 0;
            padding: 0;
        }
        
        .container { 
            width: 100%; 
            margin: 0 auto; 
            padding: 20px;
        }
        
        .header {
            text-align: center;
            margin-bottom: 25px;
        }
        
        .institution-name {
            font-size: 1.5rem;
            font-weight: bold;
            color: #0169fe; /* DTN Blue */
            margin-bottom: 5px;
        }
        
        .document-title {
            font-size: 1.1rem;
            color: #333;
            margin-top: 8px;
        }

        /* --- Info Section (as a table) --- */
        .info-table {
            width: 100%;
            border-collapse: collapse;
            margin: 20px 0;
            background: #f8f9fa;
            border-left: 4px solid #0169fe; /* DTN Blue */
        }
        .info-table td {
            padding: 10px 15px;
            border-bottom: 1px dotted #ddd;
        }
        .info-table tr:last-child td {
            border-bottom: none;
        }
        .info-label {
            font-weight: bold;
            color: #333;
            width: 180px;
        }
        .info-value {
            text-align: left;
            color: #444;
        }

        /* --- Performance Section (as a table) --- */
        .performance-table {
            width: 100%;
            margin: 20px 0;
            border: 1px solid #e0e0e0;
            background: #fafafa;
        }
        .performance-table > tbody > tr > td {
            padding: 20px;
            vertical-align: top;
        }
        
        .grade-box {
            text-align: center;
            width: 150px;
        }
        
        .grade-display {
            font-size: 2.5rem;
            font-weight: bold;
            margin: 10px 0;
        }
        
        .grade-pass { color: #28a745; /* DTN Green */ }
        .grade-fail { color: #dc3545; /* DTN Red */ }
        
        .status-indicator {
            display: inline-block;
            padding: 6px 20px;
            border-radius: 3px;
            font-weight: 600;
            letter-spacing: 1px;
            font-size: 0.9rem;
            color: #fff;
        }
        .status-pass { background: #28a745; }
        .status-fail { background: #dc3545; }
        
        /* --- Performance Grid (as a nested table) --- */
        .metrics-table {
            width: 100%;
            text-align: center;
        }
        .metrics-table td {
            width: 25%;
            padding: 10px;
            background: #fff;
            border: 1px solid #ddd;
        }
        
        .metric-label {
            font-size: 0.75rem;
            color: #666;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
        }
        
        .metric-value {
            font-size: 1.5rem;
            font-weight: bold;
            color: #2c3e50;
        }
        
        .summary-section {
            margin-top: 20px;
            padding: 15px;
            background: #f8f9fa;
            border-radius: 4px;
            text-align: center;
        }
        .summary-title {
            font-size: 1.1rem;
            color: #333;
            font-weight: 600;
            margin-bottom: 10px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        .summary-text { font-size: 0.9rem; color: #555; line-height: 1.6; }
        
        .footer {
            margin-top: 25px;
            padding-top: 15px;
            border-top: 2px solid #333;
            text-align: center;
            font-size: 0.85rem;
            color: #666;
        }

        /* --- Answers Section --- */
        .answers-section {
            margin-top: 40px;
            page-break-before: always; /* Start answers on a new page */
        }
        .answers-header {
            font-size: 1.3rem;
            font-weight: bold;
            color: #333;
            border-bottom: 1px solid #ccc;
            padding-bottom: 10px;
        }
        .question-block {
            margin-top: 20px;
            padding-bottom: 10px;
            border-bottom: 1px dashed #eee;
            page-break-inside: avoid; /* Keep question/answers together */
        }
        .question-text {
            font-weight: bold;
            margin-bottom: 10px;
        }
        .answer { margin-left: 20px; }
        .answer-correct { color: #28a745; font-weight: bold; }
        .answer-incorrect { color: #dc3545; font-weight: bold; text-decoration: line-through; }
        .answer-key { color: #333; margin-top: 5px; }

    </style>
</head>
<body>
    <div class="container">
        
        <div class="header">
            <div class="institution-name">
                <img src="images/dtn-logo.png" alt="Drivers Test Now Logo" style="width: 150px;">
            </div>
            <div class="document-title">Official Test Score Report</div>
        </div>

        <table class="info-table">
            <tr>
                <td class="info-label">Assessment Title:</td>
                <td class="info-value">{{ $test->quiz->title }}</td>
            </tr>
            <tr>
                <td class="info-label">Student Name:</td>
                <td class="info-value">{{ $test->student->first_name }} {{ $test->student->last_name }}</td>
            </tr>
            <tr>
                <td class="info-label">Date of Completion:</td>
                <td class="info-value">{{ $test->completed_at->format('F d, Y \a\t g:i A') }}</td>
            </tr>
        </table>

        <div class="summary-section">
            <div class="summary-title">Performance Summary</div>
            <table class="metrics-table" style="margin: 0 auto; width: 70%; border: 1px solid #ddd; border-collapse: collapse;">
                <tr>
                    <td style="padding: 10px; font-weight: bold; background: #f1f1f1;">Total Questions</td>
                    <td style="padding: 10px; text-align: center;">{{ $total }}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; background: #f1f1f1;">Correct Answers</td>
                    <td style="padding: 10px; text-align: center; color: #28a745;">{{ $correct }}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; background: #f1f1f1;">Incorrect Answers</td>
                    <td style="padding: 10px; text-align: center; color: #dc3545;">{{ $incorrect }}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; background: #f1f1f1;">Score Achieved</td>
                    <td style="padding: 10px; text-align: center;">{{ $test->score }}%</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; background: #f1f1f1;">Pass Mark</td>
                    <td style="padding: 10px; text-align: center;">70%</td>
                </tr>
                <tr>
                    <td style="padding: 10px; font-weight: bold; background: #f1f1f1;">Result</td>
                    <td style="padding: 10px; text-align: center; font-weight: bold; 
                            color: {{ $test->score >= 70 ? '#28a745' : '#dc3545' }};">
                        {{ $test->score >= 70 ? 'PASSED' : 'FAILED' }}
                    </td>
                </tr>
            </table>

            <p class="summary-text" style="margin-top: 15px;">
                @if($test->score >= 70)
                    This performance meets the passing standard of 70% and demonstrates satisfactory mastery of the assessed material.
                @else
                    This performance does not meet the passing standard of 70%.
                @endif
            </p>
            <p style="margin-top: 15px; font-size: 0.8rem;">
                Generated on {{ now()->format('F d, Y \a\t g:i A') }}
            </p>
        </div>

        <!-- This starts the second page of the PDF -->
        {{-- <div class="answers-section">
            <h2 class="answers-header">Test Review</h2>
            @foreach($test->answers as $index => $answer)
                <div class="question-block">
                    <p class="question-text"><strong>Q{{ $index + 1 }}:</strong> {{ $answer->question->question_text }}</p>
                    
                    @if($answer->is_correct)
                        <p class="answer answer-correct">Your Answer: {{ $answer->question->options[$answer->submitted_option_index] }} (Correct)</p>
                    @else
                        <p class="answer answer-incorrect">Your Answer: {{ $answer->question->options[$answer->submitted_option_index] }} (Wrong)</p>
                        <p class="answer answer-key"><strong>Correct Answer:</strong> {{ $answer->question->options[$answer->question->correct_option_index] }}</p>
                    @endif
                </div>
            @endforeach
        </div> --}}

    </div>
</body>
</html>