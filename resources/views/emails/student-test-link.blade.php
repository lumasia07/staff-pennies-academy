<!DOCTYPE html>
<html>
<head>
    <title>Your Test is Ready</title>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; }
        .container { width: 90%; margin: 20px auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; }
        .button { display: inline-block; padding: 12px 24px; margin: 20px 0; background-color: #00888A; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold; font-color: #ffffff; }
        .footer { margin-top: 20px; font-size: 0.9em; color: #777; }
    </style>
</head>
<body>
    <div class="container">
    <img src="{{ url('images/dtn-logo.png') }}" alt="Drivers Test Now Logo" style="width: 150px;">
        <h2>Hello, {{ $studentName }}!</h2>
        
        <p>Your instructor has assigned you the following test: <strong>{{ $quizTitle }}</strong>.</p>
        
        <p>This test link is valid until: <strong>{{ $expiresAt->format('F j, Y, g:i a') }}</strong>.</p>
        
        <p>Please click the button below to begin your test. Good luck!</p>
        
        <a href="{{ $testUrl }}" class="button" s>Start Your Test</a>
        
        <p class="footer">
            If you're having trouble clicking the button, copy and paste this URL into your browser:<br>
            <small>{{ $testUrl }}</small>
        </p>
    </div>
</body>
</html>