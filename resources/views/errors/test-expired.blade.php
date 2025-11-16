<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test Expired</title>
    <style>
        body { font-family: Arial, sans-serif; background-color: #f3f4f6; display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0; }
        .container { text-align: center; background: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1); max-width: 400px; }
        h1 { color: #dc3545; margin-bottom: 1rem; }
        p { color: #6b7280; margin-bottom: 1.5rem; }
        a { color: #0169fe; text-decoration: none; font-weight: 500; }
        a:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <div class="container">
        <h1>Test Expired</h1>
        <p>This test link has expired and is no longer available.</p>
        <p>The test was set to expire on {{ $expires_at->format('F j, Y \a\t g:i A') }}.</p>
        <p>Please contact your instructor for a new test link.</p>
    </div>
</body>
</html>