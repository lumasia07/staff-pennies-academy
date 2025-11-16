<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Test Results</title>
    <style>
        body { 
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif; 
            line-height: 1.6;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
        }
        .email-wrapper {
            max-width: 600px;
            margin: 30px auto;
            background-color: #ffffff;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        .header {
            background: linear-gradient(135deg, #0169fe 0%, #0149c9 100%);
            padding: 30px 20px;
            text-align: center;
        }
        .logo {
            max-width: 180px;
            height: auto;
        }
        .content {
            padding: 40px 30px;
        }
        h2 {
            color: #2c3e50;
            font-size: 24px;
            margin-bottom: 15px;
            text-align: center;
        }
        p {
            color: #555;
            font-size: 16px;
            margin-bottom: 15px;
        }
        .result-badge {
            text-align: center;
            padding: 30px 20px;
            margin: 25px 0;
            background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
            border-radius: 8px;
        }
        .score { 
            font-size: 4em; 
            font-weight: bold; 
            margin: 15px 0;
            line-height: 1;
        }
        .pass { color: #28a745; }
        .fail { color: #e74c3c; }
        .status-label {
            display: inline-block;
            padding: 10px 30px;
            border-radius: 25px;
            font-weight: bold;
            font-size: 18px;
            margin-top: 10px;
            color: #fff;
        }
        .status-pass { background: #28a745; }
        .status-fail { background: #e74c3c; }
        .stats-container {
            display: table;
            width: 100%;
            margin: 25px 0;
            background: #f8f9fa;
            border-radius: 8px;
            overflow: hidden;
        }
        .stats-row {
            display: table-row;
        }
        .stat {
            display: table-cell;
            width: 33.33%;
            text-align: center;
            padding: 20px 10px;
            border-right: 1px solid #e0e0e0;
        }
        .stat:last-child {
            border-right: none;
        }
        .stat-label { 
            font-size: 0.85em; 
            color: #777;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 8px;
        }
        .stat-value { 
            font-size: 2em; 
            font-weight: bold;
            color: #2c3e50;
        }
        .stat-correct { color: #28a745; }
        .stat-incorrect { color: #e74c3c; }
        .button-container {
            text-align: center;
            margin: 30px 0;
        }
        .button { 
            display: inline-block; 
            padding: 15px 40px; 
            background: linear-gradient(135deg, #28a745 0%, #20893a 100%);
            color: #ffffff !important; 
            text-decoration: none; 
            border-radius: 6px; 
            font-weight: bold;
            font-size: 16px;
            box-shadow: 0 4px 6px rgba(40, 167, 69, 0.3);
        }
        .test-info {
            background: #f8f9fa;
            border-left: 4px solid #0169fe;
            padding: 15px 20px;
            margin: 20px 0;
            font-size: 14px;
        }
        .footer { 
            background: #f8f9fa;
            padding: 25px 30px;
            text-align: center;
            font-size: 13px;
            color: #777;
            border-top: 1px solid #e0e0e0;
        }
        .footer a {
            color: #0169fe;
            word-break: break-all;
        }
        .divider {
            height: 2px;
            background: linear-gradient(90deg, transparent 0%, #28a745 50%, transparent 100%);
            margin: 25px 0;
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="header">
            <img src="https://i.postimg.cc/rdkyv7dV/dtn-logo.png" alt="Drivers Test Now" class="logo">
        </div>
        
        <div class="content">
            <h2>Test Results for {{ $studentName }}</h2>
            
            <p>Congratulations on completing your test! Here are your results for:</p>
            
            <div class="test-info">
                <strong style="color: #2c3e50; font-size: 16px;">{{ $quizTitle }}</strong><br>
                <span style="color: #777;">Completed on {{ $completedAt->format('F j, Y \a\t g:i A') }}</span>
            </div>
            
            <div class="result-badge">
                <div style="font-size: 14px; color: #555; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 10px;">Your Score</div>
                <div class="score {{ $score >= 80 ? 'pass' : 'fail' }}">{{ $score }}%</div>
                <span class="status-label {{ $score >= 80 ? 'status-pass' : 'status-fail' }}">
                    {{ $score >= 80 ? '✓ PASSED' : '✗ FAILED' }}
                </span>
            </div>
            
            <div class="divider"></div>
            
            <div class="stats-container">
                <div class="stats-row">
                    <div class="stat">
                        <div class="stat-label">Correct</div>
                        <div class="stat-value stat-correct">{{ $correct }}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Incorrect</div>
                        <div class="stat-value stat-incorrect">{{ $total - $correct }}</div>
                    </div>
                    <div class="stat">
                        <div class="stat-label">Total</div>
                        <div class="stat-value">{{ $total }}</div>
                    </div>
                </div>
            </div>
            
            @if($score >= 80)
                <p style="background: #d4edda; border-left: 4px solid #28a745; padding: 15px; border-radius: 4px; color: #155724;">
                    <strong>Excellent work!</strong> You've successfully passed this assessment with a score above the 80% passing threshold. Your instructor has been notified of your achievement.
                </p>
            @else
                <p style="background: #f8d7da; border-left: 4px solid #e74c3c; padding: 15px; border-radius: 4px; color: #721c24;">
                    Unfortunately, you did not meet the 80% passing threshold this time. Don't be discouraged—review the material and try again. Your instructor has been notified and may provide additional guidance.
                </p>
            @endif
            
            <div class="button-container">
                <a href="{{ $pdfUrl }}" class="button">📄 Download Detailed Report (PDF)</a>
            </div>
        </div>
        
        <div class="footer">
            <p style="margin-bottom: 10px;">If you have questions about your results, please contact your instructor.</p>
            <p style="margin-top: 20px; color: #999; font-size: 12px;">
                © {{ date('Y') }} Drivers Test Now. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>