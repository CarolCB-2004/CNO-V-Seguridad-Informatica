// ============================================
// Actividad 18 - Modelo Diamante
// JavaScript específico para la actividad 18
// ============================================

// Información detallada de cada nodo
const nodeData = {
    adversario: {
        title: '🎭 ADVERSARIO',
        desc: 'Actor APT - Grupo de amenazas persistente avanzado responsable del ataque. Se identifica mediante geolocalización de IPs y datos WHOIS de los dominios maliciosos.'
    },
    capacidad: {
        title: '⚙️ CAPACIDAD',
        desc: 'Correo Phishing y Malware C2 - Herramientas y técnicas utilizadas: Correo de phishing dirigido para engañar al administrador, y malware con capacidades de beaconing que establece comunicación persistente con el servidor C2.'
    },
    infraestructura: {
        title: '🌐 INFRAESTRUCTURA',
        desc: 'Servidor de Correo malicioso y Servidor de Comando y Control (C2) - Recursos del adversario que envían los correos de phishing y reciben las conexiones del malware, permitiendo la ejecución remota de comandos.'
    },
    victima: {
        title: '👤 VÍCTIMA',
        desc: 'Administrador - Objetivo primario del ataque. Tiene privilegios elevados dentro de la organización, permitiendo al atacante escalar privilegios, moverse lateralmente y acceder a activos críticos como bases de datos o servidores financieros.'
    }
};

// Inicializar el diagrama del Hilo 1
function initDiamondDiagram() {
    const nodes = document.querySelectorAll('.diamond-node');
    const infoTitle = document.getElementById('infoTitle');
    const infoDesc = document.getElementById('infoDesc');
    
    if (!nodes.length) return;
    
    // Agregar tooltips a cada nodo
    nodes.forEach(node => {
        const type = node.getAttribute('data-info');
        if (type && nodeData[type]) {
            node.setAttribute('data-tooltip', `Ver información de ${nodeData[type].title}`);
        }
        
        // Evento de clic
        node.addEventListener('click', function() {
            // Remover clase active de todos los nodos
            nodes.forEach(n => n.classList.remove('active'));
            
            // Agregar clase active al nodo seleccionado
            this.classList.add('active');
            
            // Obtener el tipo de nodo
            const nodeType = this.getAttribute('data-info');
            
            // Actualizar el panel de información
            if (nodeType && nodeData[nodeType]) {
                if (infoTitle) infoTitle.textContent = nodeData[nodeType].title;
                if (infoDesc) infoDesc.textContent = nodeData[nodeType].desc;
            }
            
            // Efecto de feedback visual
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Inicializar el resaltado de líneas
function initLineHighlight() {
    const lines = document.querySelectorAll('.flow-line');
    let currentIndex = 0;
    
    setInterval(() => {
        lines.forEach((line, index) => {
            if (index === currentIndex) {
                line.style.stroke = '#FF1493';
                line.style.strokeWidth = '3';
            } else {
                line.style.stroke = '#FF66A3';
                line.style.strokeWidth = '2';
            }
        });
        currentIndex = (currentIndex + 1) % lines.length;
    }, 800);
}

// Cerrar menús desplegables del header
function initDropdowns() {
    // Función para alternar menú
    window.toggleMenu = function(event, menuId) {
        event.preventDefault();
        const dropdownMenu = document.getElementById(`menu-${menuId}-dropdown`);
        const arrow = document.getElementById(`arrow-${menuId}`);
        if (dropdownMenu && arrow) {
            dropdownMenu.classList.toggle('show');
            arrow.classList.toggle('rotate');
        }
    };
    
    // Cerrar menús al hacer clic fuera
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
    
    // Cerrar menús después de hacer clic en una opción
    document.querySelectorAll('.dropdown-menu a').forEach(link => {
        link.addEventListener('click', function() {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.classList.remove('show');
            });
            document.querySelectorAll('.arrow').forEach(arrow => {
                arrow.classList.remove('rotate');
            });
        });
    });
}

// Inicializar todo cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    initDiamondDiagram();
    initLineHighlight();
    initDropdowns();
});

// ============================================
// Datos del Hilo 2 - Modelo Diamante
// ============================================

const nodeDataHilo2 = {
    'adversario-h2': {
        title: '🎭 ADVERSARIO',
        desc: 'Actor APT - Grupo de amenazas persistente avanzado. En este escenario, el mismo actor del Hilo 1 continúa la operación, utilizando el equipo comprometido del administrador como punto de apoyo para atacar objetivos secundarios dentro de la red interna.'
    },
    'capacidad-h2': {
        title: '⚙️ CAPACIDAD',
        desc: 'Movimiento lateral y Explotación SMB - El atacante utiliza técnicas de movimiento lateral, como PsExec, WMI o Pass-the-Hash, junto con la explotación de vulnerabilidades SMB (como EternalBlue) para propagarse desde el equipo del administrador hacia otros sistemas en la red interna.',
        technical: 'TTPs: T1021 (Remote Services), T1550 (Use Alternate Authentication)'
    },
    'infraestructura-h2': {
        title: '🌐 INFRAESTRUCTURA',
        desc: 'Equipo del Administrador (Usado como Proxy) - El host previamente comprometido se convierte en un nodo de infraestructura. El atacante lo utiliza como proxy para pivotar hacia la segunda víctima, ocultando su verdadera dirección IP y evadiendo las protecciones perimetrales.',
        technical: 'Técnica: Pivoting / Proxy Chaining'
    },
    'victima-h2': {
        title: '👤 VÍCTIMA',
        desc: 'Segunda Víctima (Servidor o Empleado) - Objetivo secundario del ataque. Puede ser un servidor de base de datos con información sensible, un servidor financiero, o un empleado con privilegios administrativos. El atacante busca escalar privilegios, exfiltrar datos o desplegar ransomware.',
        technical: 'Impacto: Riesgo alto de exfiltración de datos o sabotaje'
    }
};

// Inicializar el diagrama del Hilo 2
function initDiamondDiagramHilo2() {
    const nodes = document.querySelectorAll('.hilo2-diagram .diamond-node');
    const infoTitle = document.getElementById('infoTitleHilo2');
    const infoDesc = document.getElementById('infoDescHilo2');
    
    if (!nodes.length) return;
    
    // Agregar tooltips a cada nodo
    nodes.forEach(node => {
        const type = node.getAttribute('data-info');
        if (type && nodeDataHilo2[type]) {
            node.setAttribute('data-tooltip', `Ver información de ${nodeDataHilo2[type].title}`);
        }
        
        // Evento de clic
        node.addEventListener('click', function() {
            // Remover clase active de todos los nodos
            nodes.forEach(n => n.classList.remove('active'));
            
            // Agregar clase active al nodo seleccionado
            this.classList.add('active');
            
            // Obtener el tipo de nodo
            const nodeType = this.getAttribute('data-info');
            
            // Actualizar el panel de información
            if (nodeType && nodeDataHilo2[nodeType]) {
                if (infoTitle) infoTitle.textContent = nodeDataHilo2[nodeType].title;
                if (infoDesc) infoDesc.textContent = nodeDataHilo2[nodeType].desc;
            }
            
            // Efecto de feedback visual
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Inicializar el resaltado de líneas para Hilo 2
function initLineHighlightHilo2() {
    const container = document.querySelector('.hilo2-diagram');
    if (!container) return;
    
    const lines = container.querySelectorAll('.flow-line');
    let currentIndex = 0;
    
    setInterval(() => {
        lines.forEach((line, index) => {
            if (index === currentIndex) {
                line.style.stroke = '#1a6bb0';
                line.style.strokeWidth = '3';
            } else {
                line.style.stroke = '#5dade2';
                line.style.strokeWidth = '2';
            }
        });
        currentIndex = (currentIndex + 1) % lines.length;
    }, 800);
}

// Actualizar la función initDiamondDiagram para incluir ambos diagramas
function initAllDiagrams() {
    initDiamondDiagram();      // Hilo 1
    initDiamondDiagramHilo2(); // Hilo 2
    initLineHighlight();        // Líneas Hilo 1
    initLineHighlightHilo2();   // Líneas Hilo 2
}

// Reemplazar la inicialización del DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
    initAllDiagrams();
    initDropdowns();
});

// ============================================
// Datos del Diagrama de Relación (Pivoting)
// ============================================

const nodeDataPivoting = {
    'adversario-pivot': {
        title: '🎭 ADVERSARIO (Actor APT)',
        desc: 'Actor de amenazas persistente avanzado. Es el mismo atacante que orquesta tanto el ataque inicial (Hilo 1) como el movimiento lateral (Hilo 2). Mantiene el control a través del servidor C2 y utiliza el equipo del administrador como punto de apoyo.'
    },
    'phishing': {
        title: '📧 VECTOR: Phishing',
        desc: 'Correo de phishing dirigido (spear-phishing) enviado al administrador. Este es el vector de entrega inicial que permite al atacante establecer el primer punto de apoyo dentro de la organización.'
    },
    'admin-comprometido': {
        title: '💻 VÍCTIMA INICIAL (Administrador)',
        desc: 'El administrador recibe y ejecuta el malware del phishing. Su equipo queda comprometido y se convierte en la primera víctima. Posteriormente, este mismo equipo es utilizado como infraestructura (proxy) para el movimiento lateral hacia la segunda víctima.'
    },
    'mov-lateral': {
        title: '🔄 CAPACIDAD: Movimiento Lateral',
        desc: 'Técnicas utilizadas: PsExec, WMI, Pass-the-Hash, explotación de vulnerabilidades SMB (EternalBlue). El atacante se desplaza desde el equipo del administrador hacia otros sistemas en la red interna.'
    },
    'proxy': {
        title: '🌐 INFRAESTRUCTURA: Administrador como Proxy',
        desc: 'El equipo del administrador previamente comprometido se convierte en un nodo de infraestructura. El atacante lo utiliza como proxy para pivotar hacia la segunda víctima, ocultando su verdadera dirección IP y evadiendo protecciones perimetrales.'
    },
    'victima2': {
        title: '🎯 VÍCTIMA SECUNDARIA (Segunda Víctima)',
        desc: 'Objetivo secundario del ataque. Puede ser un servidor de base de datos con información sensible, un servidor financiero, un servidor de archivos o un empleado con privilegios administrativos. El atacante busca escalar privilegios, exfiltrar datos o desplegar ransomware.'
    }
};

// Inicializar el diagrama de relación (Pivoting)
function initPivotingDiagram() {
    const nodes = document.querySelectorAll('.pivot-node');
    const infoTitle = document.getElementById('infoTitlePivoting');
    const infoDesc = document.getElementById('infoDescPivoting');
    
    if (!nodes.length) return;
    
    // Agregar tooltips a cada nodo
    nodes.forEach(node => {
        const type = node.getAttribute('data-info');
        if (type && nodeDataPivoting[type]) {
            node.setAttribute('data-tooltip', `Ver información de ${nodeDataPivoting[type].title}`);
        }
        
        // Evento de clic
        node.addEventListener('click', function() {
            // Remover clase active de todos los nodos
            nodes.forEach(n => n.classList.remove('active'));
            
            // Agregar clase active al nodo seleccionado
            this.classList.add('active');
            
            // Obtener el tipo de nodo
            const nodeType = this.getAttribute('data-info');
            
            // Actualizar el panel de información
            if (nodeType && nodeDataPivoting[nodeType]) {
                if (infoTitle) infoTitle.textContent = nodeDataPivoting[nodeType].title;
                if (infoDesc) infoDesc.textContent = nodeDataPivoting[nodeType].desc;
            }
            
            // Efecto de feedback visual
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
}

// Actualizar la función de inicialización
function initAllDiagrams() {
    initDiamondDiagram();       // Hilo 1
    initDiamondDiagramHilo2();  // Hilo 2
    initPivotingDiagram();      // Relación (Pivoting)
    initLineHighlight();        // Líneas Hilo 1
    initLineHighlightHilo2();   // Líneas Hilo 2
}

// Reemplazar la inicialización
document.addEventListener('DOMContentLoaded', function() {
    initAllDiagrams();
    initDropdowns();
});