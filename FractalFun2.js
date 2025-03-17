window.onload = function() {
    const canvas = document.getElementById("mandelbrotCanvas");
    if (!canvas) {
        console.error("Canvas with ID 'mandelbrotCanvas' not found!");
        return;
    }
    
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;

    function drawMandelbrot() {
        const maxIterations = 200;  // More iterations for finer details
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imgData.data;

        for (let px = 0; px < canvas.width; px++) {
            for (let py = 0; py < canvas.height; py++) {
                let x0 = (px / canvas.width) * 3.5 - 2.5;
                let y0 = (py / canvas.height) * 2 - 1;
                let x = 0, y = 0, iteration = 0;

                while (x*x + y*y <= 4 && iteration < maxIterations) {
                    let tempX = x*x - y*y + x0;
                    y = 2*x*y + y0;
                    x = tempX;
                    iteration++;
                }

                // Different Color Mapping - Rainbow Gradient Effect
                const r = (iteration % 16) * 16;
                const g = (iteration % 32) * 8;
                const b = (iteration % 64) * 4;
                
                const index = (px + py * canvas.width) * 4;
                pixels[index] = r;
                pixels[index + 1] = g;
                pixels[index + 2] = b;
                pixels[index + 3] = 255; // Full opacity
            }
        }

        ctx.putImageData(imgData, 0, 0);
    }

    drawMandelbrot();
};
