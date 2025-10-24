import { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import bgImage from "../assets/images/vikasit-bharat.png"
import "./Layout.css";

export default function Layout() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const particles: any[] = [];
        const colors = ["#ff9933", "#ffffff", "#128807"];
        const particleCount = 100;

        for (let i = 0; i < particleCount; i++) {
            const typeRand = Math.random();
            particles.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                size: Math.random() * 5 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                dx: (Math.random() - 0.5) * 0.5,
                dy: Math.random() * 0.5 + 0.2,
                type: typeRand < 0.7 ? "circle" : typeRand < 0.9 ? "triangle" : "sparkle",
                sparklePhase: Math.random() * Math.PI * 2,
            });
        }

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", resizeCanvas);
        resizeCanvas();

        const img = new Image();
        // img.src = bgImage;
        let imgX = 0;

        const drawTriangle = (x: number, y: number, size: number, color: string) => {
            ctx.beginPath();
            ctx.moveTo(x, y - size);
            ctx.lineTo(x - size, y + size);
            ctx.lineTo(x + size, y + size);
            ctx.closePath();
            ctx.fillStyle = color;
            ctx.shadowBlur = 6;
            ctx.shadowColor = color;
            ctx.fill();
        };

        const drawSparkle = (x: number, y: number, size: number, color: string, phase: number) => {
            const sparkleSize = size * (0.5 + 0.5 * Math.sin(phase));
            ctx.beginPath();
            ctx.moveTo(x, y - sparkleSize);
            ctx.lineTo(x, y + sparkleSize);
            ctx.moveTo(x - sparkleSize, y);
            ctx.lineTo(x + sparkleSize, y);
            ctx.strokeStyle = color;
            ctx.lineWidth = 1.5;
            ctx.shadowBlur = 8;
            ctx.shadowColor = color;
            ctx.stroke();
        };

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw moving background image
            const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
            imgX -= 0.1; // slow horizontal movement
            if (imgX <= -img.width * scale) imgX = 0;

            ctx.drawImage(img, imgX, 0, img.width * scale, img.height * scale);
            ctx.drawImage(img, imgX + img.width * scale, 0, img.width * scale, img.height * scale);

            // Semi-transparent tricolor overlay
            const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
            gradient.addColorStop(0, "rgba(255,153,51,0.2)");
            gradient.addColorStop(0.5, "rgba(255,255,255,0.2)");
            gradient.addColorStop(1, "rgba(18,136,7,0.2)");
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Glow waves behind watermark
            const time = Date.now() * 0.002;
            for (let i = 0; i < 3; i++) {
                const waveHeight = 30 + i * 20;
                ctx.beginPath();
                for (let x = 0; x < canvas.width; x += 10) {
                    const y = canvas.height / 2 + Math.sin(x / 200 + time + i) * waveHeight;
                    if (x === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.strokeStyle = `rgba(255,255,255,${0.05 + i * 0.03})`;
                ctx.lineWidth = 4;
                ctx.shadowBlur = 20;
                ctx.shadowColor = "rgba(255,255,255,0.1)";
                ctx.stroke();
            }

            // Watermark text
            ctx.save();
            ctx.font = "80px Arial Black";
            ctx.fillStyle = "rgba(0,0,0,0.03)";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText("Vikasit Bharat", canvas.width / 2, canvas.height / 2);
            ctx.restore();

            // Particles
            particles.forEach((p) => {
                if (p.type === "circle") {
                    ctx.beginPath();
                    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                    ctx.fillStyle = p.color;
                    ctx.shadowBlur = 6;
                    ctx.shadowColor = p.color;
                    ctx.fill();
                } else if (p.type === "triangle") drawTriangle(p.x, p.y, p.size, p.color);
                else if (p.type === "sparkle") drawSparkle(p.x, p.y, p.size, p.color, p.sparklePhase!);

                p.x += p.dx;
                p.y += p.dy;

                if (p.y > canvas.height) p.y = 0;
                if (p.x > canvas.width) p.x = 0;
                if (p.x < 0) p.x = canvas.width;

                if (p.sparklePhase !== undefined) p.sparklePhase += 0.05;
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
        };
    }, []);

    return (
        <div className="layout">
            <Navbar />
            <canvas ref={canvasRef} className="layout-canvas"></canvas>
            <div className="layout-content">
                <Outlet />
            </div>
        </div>
    );
}
