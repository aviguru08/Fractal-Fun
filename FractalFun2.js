document.addEventListener("DOMContentLoaded", function() {
    setTimeout(() => {
        const canvas = document.getElementById("mandelbrotCanvas2");
        if (!canvas) {
            console.error("Canvas with ID 'mandelbrotCanvas2' not found!");
            return;
        }

        const ctx = canvas.getContext("2d");
        canvas.width = 800;
        canvas.height = 600;

        function drawMandelbrot() {
            const maxIterations = 300; // Increased iterations for finer details
            const zoom = 1.5; // Adjust zoom level to make it different
            const offsetX = -0.7; // Shift left for a different focus
            const offsetY = 0.3; // Shift up slightly

            const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
            const pixels = imgData.data;

            for (let px = 0; px < canvas.width; px++) {
                for (let py = 0; py < canvas.height; py++) {
                    let x0 = (px / canvas.width) * (3.5 / zoom) - (2.5 / zoom) + offsetX;
                    let y0 = (py / canvas.height) * (2 / zoom) - (1 / zoom) + offsetY;
                    let x = 0, y = 0, iteration = 0;

                    while (x*x + y*y <= 4 && iteration < maxIterations) {
                        let tempX = x*x - y*y + x0;
                        y = 2*x*y + y0;
                        x = tempX;
                        iteration++;
                    }

                    // New color scheme for Mandelbrot Set 2
                    const color = iteration === maxIterations 
                        ? [0, 0, 0] // Black for the set
                        : [
                            (iteration % 16) * 10, 
                            (iteration % 32) * 5, 
                            (iteration % 64) * 3
                        ];

                    const index = (px + py * canvas.width) * 4;
                    pixels[index] = color[0];
                    pixels[index + 1] = color[1];
                    pixels[index + 2] = color[2];
                    pixels[index + 3] = 255;
                }
            }

            ctx.putImageData(imgData, 0, 0);
        }

        drawMandelbrot();
    }, 100);
});
