// Animación de aparición al hacer scroll
const elements = document.querySelectorAll('.fade-up');

window.addEventListener('scroll', () => {
  elements.forEach(el => {
    const position = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (position < windowHeight - 100) {
      el.classList.add('visible');
    }
  });
});

// Efecto de brillo en títulos
const titles = document.querySelectorAll('h2, h3');
titles.forEach(title => {
  title.addEventListener('mouseenter', () => {
    title.style.textShadow = '0 0 20px rgba(120, 0, 150, 0.6)';
  });
  title.addEventListener('mouseleave', () => {
    title.style.textShadow = '0 0 10px rgba(120, 0, 150, 0.3)';
  });
});

// Animación de aparición suave
document.querySelectorAll('.fade-up').forEach(el => {
  el.style.opacity = 0;
  window.addEventListener('scroll', () => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 100) {
      el.style.transition = 'opacity 1s ease, transform 1s ease';
      el.style.opacity = 1;
      el.style.transform = 'translateY(0)';
    }
  });
});

// === Animación Dinámica para la Línea de Tiempo ===
document.addEventListener("DOMContentLoaded", () => {
    const elementosLineaTiempo = document.querySelectorAll(".timeline-node-item");

    const opcionesOpciones = {
        root: null, 
        rootMargin: "0px",
        threshold: 0.12 // Se activa cuando asoma un 12% en pantalla
    };

    const observadorHistorial = new IntersectionObserver((entradas, observador) => {
        entradas.forEach((entrada, indice) => {
            if (entrada.isIntersecting) {
                // Aparecen uno tras otro con un elegante retraso escalonado
                setTimeout(() => {
                    entrada.target.classList.add("reveal-active");
                }, indice * 60); 
                observador.unobserve(entrada.target);
            }
        });
    }, opcionesOpciones);

    elementosLineaTiempo.forEach(item => {
        observadorHistorial.observe(item);
    });
});

// === Despliegue Secuencial por Ramas para el Organigrama SLP ===
document.addEventListener("DOMContentLoaded", () => {
    const ramasOrganigrama = document.querySelectorAll(".org-column-branch");

    // Inicializamos con opacidad cero para la animación de entrada
    ramasOrganigrama.forEach((rama) => {
        rama.style.opacity = "0";
        rama.style.transform = "translateY(20px)";
        rama.style.transition = "opacity 0.6s cubic-bezier(0.25, 1, 0.5, 1), transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)";
    });

    const opcionesOrganigrama = {
        root: null,
        threshold: 0.08 // Se activa cuando asoma la base del grid
    };

    const observadorOrg = new IntersectionObserver((entradas, observador) => {
        entradas.forEach((entrada) => {
            if (entrada.isIntersecting) {
                const columnas = entrada.target.querySelectorAll(".org-column-branch");
                
                // Muestra cada departamento uno tras otro de izquierda a derecha
                columnas.forEach((columna, index) => {
                    setTimeout(() => {
                        columna.style.opacity = "1";
                        columna.style.transform = "translateY(0)";
                    }, index * 90); 
                });
                
                observador.unobserve(entrada.target);
            }
        });
    }, opcionesOrganigrama);

    const mallaDepartamentos = document.querySelector(".org-departments-grid");
    if (mallaDepartamentos) {
        observadorOrg.observe(mallaDepartamentos);
    }
});

// Función para alternar el menú desplegable
function toggleMenu(event) {
    event.preventDefault();
    
    const dropdownMenu = document.querySelector('#menu-actividades .dropdown-menu');
    const arrow = document.getElementById('arrow');
    
    // Alternar el menú
    dropdownMenu.classList.toggle('show');
    arrow.classList.toggle('rotate');
}

// Cerrar menú al hacer clic fuera
document.addEventListener('click', function(event) {
    const container = document.getElementById('menu-actividades');
    const dropdownMenu = document.querySelector('#menu-actividades .dropdown-menu');
    const arrow = document.getElementById('arrow');
    
    // Verificar si existe el menú y si el clic fue fuera del contenedor
    if (container && dropdownMenu && arrow) {
        if (!container.contains(event.target)) {
            dropdownMenu.classList.remove('show');
            arrow.classList.remove('rotate');
        }
    }
});

function toggleMenu(event, menuId) {
    event.preventDefault();
    
    const dropdownMenu = document.getElementById(`menu-${menuId}-dropdown`);
    const arrow = document.getElementById(`arrow-${menuId}`);
    
    if (dropdownMenu && arrow) {
        dropdownMenu.classList.toggle('show');
        arrow.classList.toggle('rotate');
    }
}

// Cerrar cualquier menú al hacer clic fuera
document.addEventListener('click', function(event) {
    const containers = document.querySelectorAll('.dropdown-container');
    
    containers.forEach(container => {
        const menuId = container.id.replace('menu-', '');
        const dropdownMenu = document.getElementById(`menu-${menuId}-dropdown`);
        const arrow = document.getElementById(`arrow-${menuId}`);
        
        if (dropdownMenu && arrow && !container.contains(event.target)) {
            dropdownMenu.classList.remove('show');
            arrow.classList.remove('rotate');
        }
    });
});
