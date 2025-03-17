<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Live Mandelbrot Zoom</title>
    <style>
        body {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: black;
            color: white;
            font-family: Arial, sans-serif;
        }
        h1 {
            margin-bottom: 10px;
        }
        canvas {
            background-color: black;
        }
    </style>
</head>
<body>
    <h1>Mandelbrot Zoom Sequence</h1>
    <canvas id="mandelbrotCanvas"></canvas>
    
    <script src="FractalFun2.js"></script>
</body>
</html>
