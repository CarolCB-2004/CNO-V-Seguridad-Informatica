/**
 * Motor del Phishing Quiz - PR02 (Versión Analítica Extendida)
 * 10 Escenarios Extensos | Puntaje base 10 | Análisis Técnico Profundo
 */

// --- VARIABLES GLOBALES Y ANALÍTICA ---
let currentIdx = 0; 
let score = 0; 
let failedVectors = []; 
let startTime; 
let userAlias = "";
let sessionAnalytics = {
    failedScenarios: {} // Registra cuántas veces se falla cada ID
};
let isAnswering = false; // Nueva bandera para evitar clics múltiples

const scenarios = [
    { 
        id: 1,
        title: "Escenario 1: Fraude de Donación",
        image: "img/quiz1.png", 
        text: "Analiza la imagen superior. Un profesor supuestamente quiere donar un piano de alta gama. ¿Es una comunicación institucional segura?", 
        isPhishing: true, 
        vector: "Ingeniería Social / Scam",
        desc: `<b>Análisis Técnico:</b> Este es un modelo de 'Advance Fee Scam'. <br><br>
               <b>Puntos Clave:</b> 
               <ul>
                   <li><b>Canal no oficial:</b> El atacante usa un nombre real del directorio para generar confianza, pero pide contacto por Gmail personal.</li>
                   <li><b>Psicología:</b> Utiliza la gratitud y la urgencia de "deshacerse de algo valioso" para nublar el juicio.</li>
                   <li><b>Objetivo:</b> Una vez contactado, solicitarán pagos por "seguros" o "fletes" que nunca terminan.</li>
               </ul>` 
    },
    { 
        id: 2,
        title: "Escenario 2: Notificación de Microsoft Teams",
        image: "",
        text: `<div class="email-mockup">
                <div class="email-header" style="background:#464eb8; color:white; padding:15px;">
                    <b>Microsoft Teams</b>
                </div>
                <div class="email-body">
                    <p>Tus compañeros están intentando ponerse en contacto contigo en Teams.</p>
                    <div style="margin:20px 0; padding:15px; border:1px solid #e1e1e1; border-radius:4px;">
                        <span style="background:#464eb8; color:white; border-radius:50%; padding:10px; margin-right:10px;">JD</span>
                        <b>Juan Delgado</b> te mencionó en el canal <b>'Proyectos_Finanzas'</b>
                    </div>
                    <p style="font-size:0.9em; color:#666;">"Necesito que revises el archivo adjunto para la auditoría de mañana antes de que cerremos el sistema."</p>
                    <center><a href="#" class="cta-button" style="background:#464eb8; color:white !important; border-radius:3px;">Ir a la conversación</a></center>
                    <p style="font-size:0.7em; color:#999; margin-top:20px;">Microsoft Corporation, One Microsoft Way, Redmond, WA 98052</p>
                </div>
            </div>`, 
        isPhishing: false, 
        vector: "Comunicación Oficial",
        desc: `<b>Análisis Técnico:</b> Es un correo legítimo de notificación de Microsoft 365.<br><br>
               <b>Indicadores de Seguridad:</b> 
               <ul>
                   <li><b>Coherencia:</b> El diseño respeta el branding de Teams (mora/azul) y los estilos de fuente oficiales.</li>
                   <li><b>Destino:</b> Al pasar el ratón por el botón (hover), el enlace apunta a <i>https://teams.microsoft.com/...</i></li>
                   <li><b>Contexto:</b> No solicita contraseñas ni descargar archivos directamente desde el correo, sino que invita a ir a la plataforma.</li>
               </ul>` 
    },
    { 
        id: 3,
        title: "Escenario 3: Aviso de Suspensión Netflix",
        image: "",
        text: `<div class="email-mockup">
                <div class="email-header" style="background:black; text-align:center; padding:20px;">
                    <h1 style="color:#e50914; margin:0; font-family:Arial;">NETFLIX</h1>
                </div>
                <div class="email-body">
                    <h2 style="color:#333;">Actualiza tu método de pago</h2>
                    <p>Lamentamos informarte que tu suscripción ha sido suspendida temporalmente debido a un problema con el procesamiento de tu último pago mensual.</p>
                    <p>Para seguir disfrutando de tus series y películas favoritas, es necesario que valides tus datos bancarios en las próximas 12 horas o tu cuenta será eliminada permanentemente.</p>
                    <center><a href="#" class="cta-button" style="background:#e50914; color:white !important; font-weight:bold; border-radius:2px; padding:15px 30px;">REINICIAR MEMBRESÍA</a></center>
                    <p style="font-size:0.8em; color:#777; margin-top:25px;">Si necesitas ayuda, visita el Centro de Ayuda o contáctanos.</p>
                </div>
            </div>`, 
        isPhishing: true, 
        vector: "Suscripciones / Robo de Tarjetas",
        desc: `<b>Análisis Técnico:</b> Phishing masivo de recolección de tarjetas (Carding).<br><br>
               <b>Banderas Rojas (Red Flags):</b> 
               <ul>
                   <li><b>Urgencia Extrema:</b> La amenaza de "eliminación permanente" en 12 horas es una técnica de presión típica.</li>
                   <li><b>Falta de Personalización:</b> No se dirige a ti por tu nombre, usa términos genéricos.</li>
                   <li><b>Procedimiento:</b> Netflix nunca borra una cuenta por falta de pago inmediatamente.</li>
               </ul>` 
    },
    { 
        id: 4,
        title: "Escenario 4: Actualización de SAT (Factura)",
        image: "",
        text: `<div class="email-mockup">
                <div class="email-header" style="border-bottom:2px solid #000;">
                    <img src="https://www.gob.mx/cms/uploads/image/file/488329/SAT.jpg" width="120">
                </div>
                <div class="email-body">
                    <p><b>Estimado Contribuyente:</b></p>
                    <p>Se ha detectado una irregularidad en su situación fiscal correspondiente al ejercicio 2025. Presenta una inconsistencia en sus declaraciones de IVA que requiere aclaración inmediata.</p>
                    <p>Hemos adjuntado el documento con los detalles del requerimiento y la línea de captura para el pago de la multa generada.</p>
                    <div style="background:#eee; padding:15px; border:1px dashed #666; text-align:center;">
                        <i class="fas fa-file-pdf" style="color:red; font-size:2em;"></i><br>
                        <a href="#">Detalle_Multa_SAT_9921.pdf.exe</a>
                    </div>
                    <p style="color:red; font-size:0.85em;">Nota: Si no atiende este requerimiento, se procederá al embargo de cuentas bancarias.</p>
                </div>
            </div>`, 
        isPhishing: true, 
        vector: "Malware / Ransomware",
        desc: `<b>Análisis Técnico:</b> Distribución de Malware vía Phishing gubernamental.<br><br>
               <b>Evidencia Crítica:</b> 
               <ul>
                   <li><b>Doble Extensión:</b> El archivo <b>.pdf.exe</b> es una técnica para ocultar ejecutables maliciosos.</li>
                   <li><b>Tono Coercitivo:</b> La mención de "embargo de cuentas" busca generar pánico.</li>
                   <li><b>Canal:</b> El SAT notifica formalmente a través del Buzón Tributario, nunca enviando ejecutables.</li>
               </ul>` 
    },
    { 
        id: 5,
        title: "Escenario 5: Recompensa de Lealtad (Starbucks)",
        image: "",
        text: `<div class="email-mockup">
                <div class="email-header" style="background:#00704a; color:white; padding:15px; text-align:center;">
                    <b style="font-size:1.5em;">Starbucks Rewards</b>
                </div>
                <div class="email-body">
                    <h2>¡Felicidades por ser un cliente frecuente!</h2>
                    <p>Has sido seleccionado para recibir una <b>Starbucks Card con $500 MXN</b> de saldo de regalo por tu lealtad este año.</p>
                    <p>Para reclamar tu saldo, solo debes completar una breve encuesta de satisfacción de 3 preguntas para ayudarnos a mejorar nuestro servicio.</p>
                    <center><a href="#" class="cta-button" style="background:#00704a; color:white !important; border-radius:50px;">Empezar Encuesta</a></center>
                    <p style="font-size:0.7em; color:#666; margin-top:30px;">*Válido solo para clientes registrados. El código se enviará al finalizar la encuesta.</p>
                </div>
            </div>`, 
        isPhishing: true, 
        vector: "Scam / Recolección de Datos",
        desc: `<b>Análisis Técnico:</b> Campaña de 'Survey Scam'.<br><br>
               <b>Modus Operandi:</b> 
               <ul>
                   <li><b>Cebo:</b> Un premio desproporcionado por una tarea mínima.</li>
                   <li><b>Exfiltración:</b> Suelen pedir datos personales o el pago de una "comisión de envío" robando la tarjeta.</li>
               </ul>` 
    },
    { 
        id: 6,
        title: "Escenario 6: Dropbox - Espacio Lleno",
        image: "",
        text: `<div class="email-mockup">
                <div class="email-body">
                    <img src="https://aem.dropbox.com/cms/content/dam/dropbox/www/en-us/branding/dropbox-logo-glyph.png" width="40">
                    <h2 style="color: #0061ff;">Tu Dropbox está lleno y ha dejado de sincronizarse</h2>
                    <p>Tus archivos ya no se están respaldando. Además, no podrás enviar ni recibir archivos compartidos hasta que liberes espacio o aumentes tu plan.</p>
                    <p>Como oferta especial por hoy, obtén <b>1TB extra</b> por solo $1 USD al mes durante el primer año.</p>
                    <center><a href="#" class="cta-button" style="background:#0061ff; color:white !important;">Obtener 1TB ahora</a></center>
                </div>
            </div>`, 
        isPhishing: false, 
        vector: "Comunicación Oficial",
        desc: `<b>Análisis Técnico:</b> Notificación legítima de servicio.<br><br>
               <b>Por qué es seguro:</b> 
               <ul>
                   <li><b>Upselling:</b> Es una oferta comercial estándar de Dropbox.</li>
                   <li><b>Dominios:</b> Los enlaces dirigen a dominios verificados de <i>dropbox.com</i> con certificado SSL válido.</li>
               </ul>` 
    },
    { 
        id: 7,
        title: "Escenario 7: Soporte Técnico Apple (iCloud)",
        image: "",
        text: `<div class="email-mockup">
                <div class="email-body">
                    <center><i class="fab fa-apple" style="font-size:3em; color:#555;"></i></center>
                    <h3 style="text-align:center;">Tu Apple ID ha sido bloqueado</h3>
                    <p>Alguien intentó iniciar sesión en tu cuenta desde un navegador no reconocido en <b>Teherán, Irán</b>. Por tu seguridad, tu Apple ID ha sido deshabilitado.</p>
                    <p>Para desbloquear tu cuenta, debes verificar tu identidad proporcionando la respuesta a tus preguntas de seguridad y confirmando tus datos de facturación.</p>
                    <center><a href="#" class="cta-button" style="background:#007aff; color:white !important; border-radius:5px;">Desbloquear Cuenta</a></center>
                    <p style="font-size:0.8em; color:#999; text-align:center;">Copyright © 2026 Apple Inc. All rights reserved.</p>
                </div>
            </div>`, 
        isPhishing: true, 
        vector: "Robo de ID / Credenciales",
        desc: `<b>Análisis Técnico:</b> Ataque de Account Takeover (ATO).<br><br>
               <b>Señales de Peligro:</b> 
               <ul>
                   <li><b>Ubicación Extraña:</b> Usar "Irán" genera una alerta de seguridad psicológica instantánea.</li>
                   <li><b>Solicitud de Datos:</b> Apple jamás pide datos de facturación a través de un botón de correo para "desbloquear".</li>
               </ul>` 
    },
    { 
        id: 8,
        title: "Escenario 8: Factura de PayPal",
        image: "",
        text: `<div class="email-mockup">
                <div class="email-header" style="padding:20px;"><img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_v3_2x.png" width="120"></div>
                <div class="email-body">
                    <p>Has enviado un pago de <b>$1,250.00 MXN</b> a <b>Servicios de Hosting Global</b>.</p>
                    <p>Si no reconoces esta transacción, haz clic en el botón de abajo para cancelarla y obtener un reembolso completo. Tienes 60 minutos para realizar esta acción.</p>
                    <center><a href="#" class="cta-button" style="background:#0070ba; color:white !important;">Cancelar Transacción</a></center>
                    <p style="font-size:0.85em; color:#666; margin-top:20px;">ID de transacción: 89SH220199LL</p>
                </div>
            </div>`, 
        isPhishing: true, 
        vector: "Fraude de Reembolso",
        desc: `<b>Análisis Técnico:</b> Este es un ataque de 'Refund Scam'.<br><br>
               <b>Estrategia:</b> El estafador asusta al usuario con un cargo falso para que entregue sus credenciales al intentar "cancelar".` 
    },
    { 
        id: 9,
        title: "Escenario 9: LinkedIn - Solicitud de Conexión",
        image: "",
        text: `<div class="email-mockup">
                <div class="email-header" style="background:#0077b5; color:white; padding:10px;"><b>LinkedIn</b></div>
                <div class="email-body">
                    <p><b>Sofia Ramírez</b>, Reclutadora IT Senior en TechCorp, quiere conectar contigo.</p>
                    <p style="color:#666;">"Hola, vi tu perfil y me gustaría platicarte sobre una vacante de Analista de Seguridad que encaja perfecto con tu experiencia."</p>
                    <center><a href="#" class="cta-button" style="background:#0077b5; color:white !important; border-radius:2px;">Aceptar invitación</a></center>
                </div>
            </div>`, 
        isPhishing: false, 
        vector: "Comunicación Oficial",
        desc: `<b>Análisis Técnico:</b> Correo legítimo de red social.<br><br>
               <b>Dato:</b> Aunque se puede usar para Spear Phishing, el formato y cabeceras de este correo corresponden a la plataforma real.` 
    },
    { 
        id: 10,
        title: "Escenario 10: FedEx - Dirección Incorrecta",
        image: "",
        text: `<div class="email-mockup">
                <div class="email-header" style="background:#4D148C; height:10px;"></div>
                <div class="email-body">
                    <img src="https://www.fedex.com/content/dam/fedex-static/brand-assets/v2/logos/fedex-logo.png" width="100">
                    <h2 style="color:#4D148C;">Tu paquete no pudo ser entregado</h2>
                    <p>El mensajero de FedEx no pudo localizar el domicilio el día 28/02/2026. Se requiere una confirmación manual de los datos de envío para el segundo intento.</p>
                    <p>Por favor, descargue su etiqueta de envío actualizada y llévela a la oficina más cercana.</p>
                    <center><a href="#" class="cta-button" style="background:#FF6600; color:white !important;">Descargar Etiqueta.zip</a></center>
                </div>
            </div>`, 
        isPhishing: true, 
        vector: "Malware / Zip-bomb",
        desc: `<b>Análisis Técnico:</b> FedEx nunca envía archivos .zip para etiquetas. Es un método para infectar equipos con Spyware.` 
    }
];

// --- LÓGICA DEL JUEGO ---

window.startQuiz = function() {
    userAlias = document.getElementById('user-alias').value.trim();
    if (!userAlias) { alert("Ingresa un alias."); return; }
    
    // Reiniciar estados
    currentIdx = 0; 
    score = 0; 
    failedVectors = []; 
    sessionAnalytics.failedScenarios = {};
    startTime = Date.now();
    isAnswering = false;
    
    document.getElementById('quiz-intro').style.display = 'none';
    document.getElementById('final-score').style.display = 'none';
    document.getElementById('quiz-engine').style.display = 'block';
    renderScenario();
};

window.restartQuiz = function() { window.startQuiz(); };

function renderScenario() {
    isAnswering = false; // Reset bandera al iniciar nuevo escenario
    const s = scenarios[currentIdx];
    document.getElementById('step-title').innerText = `Escenario ${currentIdx + 1} de 10`;
    document.getElementById('live-points').innerText = `Aciertos: ${score}`;
    
    let content = s.image ? `<center><img src="${s.image}" style="max-width:100%; border-radius:8px; margin-bottom:15px;"></center>` : "";
    document.getElementById('scenario-text').innerHTML = content + s.text;
    document.getElementById('feedback-message').style.display = 'none';
    document.getElementById('quiz-buttons').style.display = 'flex';
}

window.checkAnswer = function(choice) {
    if(isAnswering) return; // Si ya hizo clic, ignorar clics extra
    isAnswering = true;

    const s = scenarios[currentIdx];
    const isCorrect = (choice === s.isPhishing);
    
    if(isCorrect) {
        score++;
    } else {
        failedVectors.push(s.vector);
        sessionAnalytics.failedScenarios[s.id] = (sessionAnalytics.failedScenarios[s.id] || 0) + 1;
    }
    
    const fb = document.getElementById('feedback-message');
    fb.style.display = 'block';
    fb.style.backgroundColor = isCorrect ? '#e6f4ea' : '#fce8e6';
    fb.style.color = isCorrect ? '#1e7e34' : '#c5221f';
    
    fb.innerHTML = `
        <div style="padding:15px; border-left: 5px solid ${isCorrect ? '#28a745' : '#dc3545'}">
            <strong style="font-size:1.1em;">${isCorrect ? '✓ ¡Correcto!' : '✗ Identificación Errónea'}</strong>
            <div style="margin-top:10px; line-height:1.5;">${s.desc}</div>
            <div style="margin-top:10px; font-size:0.85em; font-style:italic;">Vector: ${s.vector}</div>
        </div>`;
    
    // CORRECCIÓN: NO ocultamos los botones aquí para que sigan visibles
    // document.getElementById('quiz-buttons').style.display = 'none';

    setTimeout(() => {
        currentIdx++;
        if(currentIdx < 10) renderScenario();
        else showFinalResults();
    }, 5500);
};

function showFinalResults() {
    const totalTime = Math.round((Date.now() - startTime) / 1000);
    
    let worstScenarioID = Object.keys(sessionAnalytics.failedScenarios).reduce((a, b) => 
        sessionAnalytics.failedScenarios[a] > sessionAnalytics.failedScenarios[b] ? a : b, "Ninguno");

    let trendText = "Sin errores detectados. ¡Excelente criterio!";
    if (failedVectors.length > 0) {
        const counts = failedVectors.reduce((a, b) => ({...a, [b]: (a[b] || 0) + 1}), {});
        const worstVector = Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
        trendText = `Eres propenso a caer en ataques de: <br><b style="color:#c5221f;">${worstVector}</b>`;
    }

    // CORRECCIÓN: Aseguramos que pasamos el alias capturado al inicio
    saveUserResult(userAlias, score, totalTime, failedVectors);
    
    document.getElementById('quiz-engine').style.display = 'none';
    document.getElementById('final-score').style.display = 'block';
    document.getElementById('btn-post-quiz').style.display = 'flex';
    document.getElementById('percentage').innerText = `${score}/10`;
    
    let evaluationHTML = score >= 8 ? "<b>Estatus: Protegido</b>" : "<b>Estatus: Vulnerable</b>";
    
    document.getElementById('evaluation-text').innerHTML = `
        <div style="margin-bottom:15px;">${evaluationHTML}</div>
        <div style="background:#f8f9fa; padding:10px; border-radius:5px; font-size:0.9em; text-align:left; font-weight:normal;">
            <p><strong>Análisis de Tendencias:</strong></p>
            <p>${trendText}</p>
            ${worstScenarioID !== "Ninguno" ? `<p style="font-size:0.85em; color:#666;">* El Escenario ${worstScenarioID} fue tu mayor reto técnico.</p>` : ''}
        </div>
    `;
    
    renderLeaderboard();
}

function saveUserResult(alias, s, t, v) {
    let lb = JSON.parse(localStorage.getItem('phishing_ranking')) || [];
    lb.push({
        alias: alias, // Guardamos el parámetro alias recibido
        score: s, 
        time: t, 
        failedVectors: v, 
        date: new Date().toLocaleDateString()
    });
    lb.sort((x,y) => y.score - x.score || x.time - y.time);
    localStorage.setItem('phishing_ranking', JSON.stringify(lb.slice(0,50)));
}

function renderLeaderboard() {
    const data = JSON.parse(localStorage.getItem('phishing_ranking')) || [];
    const list = document.getElementById('ranking-list');
    if(list) {
        list.innerHTML = data.slice(0,5).map((u,i)=>`
            <tr>
                <td>${i+1}</td>
                <td>${u.alias || 'Anónimo'}</td>
                <td>${u.score}/10</td>
                <td>${u.time}s</td>
            </tr>`).join('');
    }
}

// --- INTERFAZ ---

window.showTrends = function() {
    const rankingSection = document.getElementById('ranking-table');
    if (rankingSection) {
        rankingSection.scrollIntoView({ behavior: 'smooth' });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const btnTrends = document.getElementById('btn-post-quiz');
    if (btnTrends) {
        btnTrends.onclick = window.showTrends;
    }
    renderLeaderboard();
});

document.getElementById('btn-post-quiz').style.display = 'block';