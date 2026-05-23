/**
 * Archivo: estiloPR03.js
 * Descripción: Control de destellos luminosos interactivos y automáticos
 * en el perímetro de los recuadros.
 */

document.addEventListener("DOMContentLoaded", () => {
    const glowingCards = document.querySelectorAll(".glowing-card");

    glowingCards.forEach(card => {
        // Generar destellos de forma continua y automática en los bordes
        setInterval(() => {
            generateBorderSparkle(card);
        }, 350); // Frecuencia de los destellos en milisegundos

        // Destellos adicionales al mover el cursor sobre el recuadro
        card.addEventListener("mousemove", (e) => {
            if (Math.random() > 0.8) { // Probabilidad para no saturar la pantalla
                generateMouseSparkle(card, e);
            }
        });
    });

    /**
     * Genera un destello luminoso en un punto aleatorio del perímetro (borde) de la tarjeta
     */
    function generateBorderSparkle(card) {
        const particle = document.createElement("div");
        particle.classList.add("sparkle-particle");

        const width = card.offsetWidth;
        const height = card.offsetHeight;

        // Decidir aleatoriamente en cuál de los 4 bordes aparecerá (0: arriba, 1: derecha, 2: abajo, 3: izquierda)
        const targetSide = Math.floor(Math.random() * 4);
        let posX = 0;
        let posY = 0;

        switch (targetSide) {
            case 0: // Borde Superior
                posX = Math.random() * width;
                posY = -2;
                break;
            case 1: // Borde Derecho
                posX = width + 2;
                posY = Math.random() * height;
                break;
            case 2: // Borde Inferior
                posX = Math.random() * width;
                posY = height + 2;
                break;
            case 3: // Borde Izquierdo
                posX = -2;
                posY = Math.random() * height;
                break;
        }

        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;

        // Definir una trayectoria de dispersión sutil hacia afuera
        const driftX = (Math.random() - 0.5) * 25;
        const driftY = (Math.random() - 0.5) * 25;
        
        particle.style.setProperty("--x", `${driftX}px`);
        particle.style.setProperty("--y", `${driftY}px`);

        card.appendChild(particle);

        // Remover la partícula una vez concluida su animación CSS
        setTimeout(() => {
            particle.remove();
        }, 1200);
    }

    /**
     * Genera un destello justo debajo de la trayectoria del cursor dentro de la tarjeta
     */
    function generateMouseSparkle(card, event) {
        const particle = document.createElement("div");
        particle.classList.add("sparkle-particle");

        const rect = card.getBoundingClientRect();
        const posX = event.clientX - rect.left;
        const posY = event.clientY - rect.top;

        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;

        const driftX = (Math.random() - 0.5) * 40;
        const driftY = (Math.random() - 0.5) * 40;

        particle.style.setProperty("--x", `${driftX}px`);
        particle.style.setProperty("--y", `${driftY}px`);

        card.appendChild(particle);

        setTimeout(() => {
            particle.remove();
        }, 1200);
    }
});
