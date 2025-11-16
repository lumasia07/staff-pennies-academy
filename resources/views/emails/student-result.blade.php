<!DOCTYPE html>
<html>
<head>
    <title>Your Test Results</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { width: 90%; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        .score-box { text-align: center; margin: 20px 0; padding: 20px; background-color: #f8f9fa; border-radius: 8px; }
        .score-large { font-size: 2.5em; font-weight: bold; color: #0169fe; }
        .result-pass { color: #28a745; }
        .result-fail { color: #dc3545; }
        .stats { display: flex; justify-content: space-around; margin: 20px 0; }
        .stat-item { text-align: center; }
        .stat-value { font-size: 1.5em; font-weight: bold; }
        .footer { margin-top: 20px; font-size: 0.9em; color: #777; }
    </style>
</head>
<body>
    <div class="container">
        <div style="text-align:center; margin-bottom:24px;">
            <img src="{{ url('images/dtn-logo.png') }}" alt="Drivers Test Now Logo" style="height:60px;">
        </div>
        <h2>Hello, {{ $studentName }}!</h2>

        <p>Here are your results for the test: <strong>{{ $quizTitle }}</strong>.</p>

        <div class="score-box">
            <div class="score-large {{ $score >= 70 ? 'result-pass' : 'result-fail' }}">
                {{ $score }}%
            </div>
            <div style="font-size: 1.2em; margin-top: 10px;">
                {{ $score >= 80 ? 'PASSED' : 'FAILED' }}
            </div>
        </div>

        <div class="stats">
            <div class="stat-item">
                <div class="stat-value" style="color: #28a745;">{{ $correct }}</div>
                <div>Correct</div>
            </div>
            <div class="stat-item">
                <div class="stat-value" style="color: #dc3545;">{{ $total - $correct }}</div>
                <div>Incorrect</div>
            </div>
            <div class="stat-item">
                <div class="stat-value">{{ $total }}</div>
                <div>Total Questions</div>
            </div>
        </div>

        <p><strong>Test completed on:</strong> {{ $completedAt->format('F j, Y, g:i a') }}</p>

        <p>Thank you for completing your test. Your instructor has been notified of your results.</p>
        <p>
            <a href="{{ $pdfUrl }}" style="display:inline-block;padding:10px 20px;background:#0169fe;color:#fff;text-decoration:none;border-radius:5px;" target="_blank">Download Your PDF Score Sheet</a>
        </p>

        <p class="footer">
            This is an automated message from Drivers Test Now.
        </p>
    </div>
</body>
</html>