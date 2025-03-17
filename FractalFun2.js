window.onload = function() {
    const canvas = document.getElementById("mandelbrotCanvas2");
    if (!canvas) {
        console.error("Canvas with ID 'mandelbrotCanvas2' not found!");
        return;
    }
    
    const ctx = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;

    let zoom = 1;
    let centerX = -0.75, centerY = 0;

    function drawMandelbrot() {
        const maxIterations = 250;
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = imgData.data;

        for (let px = 0; px < canvas.width; px++) {
            for (let py = 0; py < canvas.height; py++) {
                let x0 = (px / canvas.width) * (3.5 / zoom) - (2.5 / zoom) + centerX;
                let y0 = (py / canvas.height) * (2 / zoom) - (1 / zoom) + centerY;
                let x = 0, y = 0, iteration = 0;

                while (x*x + y*y <= 4 && iteration < maxIterations) {
                    let tempX = x*x - y*y + x0;
                    y = 2*x*y + y0;
                    x = tempX;
                    iteration++;
                }

                const r = (iteration % 16) * 16;
                const g = (iteration % 32) * 8;
                const b = (iteration % 64) * 4;
                
                const index = (px + py * canvas.width) * 4;
                pixels[index] = r;
                pixels[index + 1] = g;
                pixels[index + 2] = b;
                pixels[index + 3] = 255;
            }
        }

        ctx.putImageData(imgData, 0, 0);
    }

    function animateZoom() {
        zoom *= 1.02;
        drawMandelbrot();

        if (zoom > 50) {
            zoom = 1;
            centerX = -0.75;
            centerY = 0;
        }

        requestAnimationFrame(animateZoom);
    }

    animateZoom();
};
