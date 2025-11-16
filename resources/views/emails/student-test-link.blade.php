<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Your Test is Ready</title>
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
            margin-bottom: 20px;
        }
        p {
            color: #555;
            font-size: 16px;
            margin-bottom: 15px;
        }
        .test-info {
            background: #f8f9fa;
            border-left: 4px solid #28a745;
            padding: 15px 20px;
            margin: 25px 0;
        }
        .test-info strong {
            color: #2c3e50;
            font-size: 18px;
        }
        .expiry {
            color: #e74c3c;
            font-weight: 600;
        }
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
            margin: 20px 0;
        }
    </style>
</head>
<body>
    <div class="email-wrapper">
        <div class="header">
            <img src="https://i.postimg.cc/rdkyv7dV/dtn-logo.png" alt="Drivers Test Now" class="logo">
        </div>
        
        <div class="content">
            <h2>Hello, {{ $studentName }}! 👋</h2>
            
            <p>Your instructor has assigned you a new test and you're ready to begin.</p>
            
            <div class="test-info">
                <p style="margin: 0;"><strong>{{ $quizTitle }}</strong></p>
            </div>
            
            <div class="divider"></div>
            
            <p>⏰ <strong>Important:</strong> This test link expires on <span class="expiry">{{ $expiresAt->format('F j, Y \a\t g:i A') }}</span></p>
            
            <p>Click the button below to start your test. Make sure you have a stable internet connection and enough time to complete the assessment.</p>
            
            <div class="button-container">
                <a href="{{ $testUrl }}" class="button">🚀 Start Your Test</a>
            </div>
            
            <p style="font-size: 14px; color: #777; margin-top: 30px;">
                <strong>Tips for success:</strong><br>
                • Find a quiet place free from distractions<br>
                • Read each question carefully before answering<br>
                • You cannot pause once you begin<br>
                • Good luck!
            </p>
        </div>
        
        <div class="footer">
            <p style="margin-bottom: 10px;">Having trouble with the button? Copy and paste this link into your browser:</p>
            <a href="{{ $testUrl }}">{{ $testUrl }}</a>
            <p style="margin-top: 20px; color: #999; font-size: 12px;">
                © {{ date('Y') }} Drivers Test Now. All rights reserved.
            </p>
        </div>
    </div>
</body>
</html>