const scenarios = [
    { 
        id: 1,
        title: "Escenario 1: El Filántropo del Piano",
        image: "img/quiz1.png", 
        
        isPhishing: true, 
        vector: "Ingeniería Social / Advance Fee Scam",
        desc: `<b>Análisis Técnico:</b> Este es un clásico 'Fraude de Pago por Adelantado'.<br><br>
               <b>Señales de alerta:</b>
               <ul>
                   <li><b>Uso de Gmail:</b> Un académico real usaría un correo institucional (.edu), no una cuenta gratuita de Gmail.</li>
                   <li><b>Carga Emocional:</b> Utiliza la historia de la "esposa fallecida" para bajar las defensas del usuario.</li>
                   <li><b>El Gancho:</b> Te regalan algo caro, pero tú debes pagar el "flete" a una cuenta anónima. Una vez pagas, el "profesor" desaparece.</li>
               </ul>` 
    },
    { 
        id: 2,
        title: "Escenario 2: Actividad en Microsoft Teams",
        image: "",
        text: `<div class="email-mockup">
                <div class="email-header" style="background:#464eb8; color:white; padding:15px; display:flex; align-items:center;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/c/c9/Microsoft_Office_Teams_%282018%E2%80%93present%29.svg" width="30" style="margin-right:10px;">
                    <b>Microsoft Teams</b>
                </div>
                <div class="email-body">
                    <p style="color:#444;">Mientras no estabas, tus compañeros intentaron contactarte en el espacio de trabajo.</p>
                    <div style="margin:20px 0; padding:20px; border:1px solid #e1e1e1; border-left:4px solid #464eb8; background:#f9f9f9;">
                        <b style="color:#464eb8;">Juan Delgado (Finanzas)</b> te mencionó:<br>
                        <i style="color:#666;">"Hola, te dejé los reportes de la auditoría interna en la carpeta de archivos. Por favor revísalos antes de la reunión de las 4:00 PM."</i>
                    </div>
                    <center>
                        <a href="https://teams.microsoft.com/l/message/..." class="cta-button" style="background:#464eb8; color:white !important; padding:12px 25px; border-radius:3px; text-decoration:none;">Responder en Teams</a>
                    </center>
                    <p style="font-size:0.8em; color:#999; margin-top:20px;">Has recibido esta notificación porque eres miembro de la organización corporativa.</p>
                </div>
            </div>`, 
        isPhishing: false, 
        vector: "Comunicación Corporativa Legítima",
        desc: `<b>Análisis Técnico:</b> Este correo es <b>LEGÍTIMO</b>.<br><br>
               <b>Por qué es seguro:</b>
               <ul>
                   <li><b>Estructura Estándar:</b> Sigue el formato exacto de las notificaciones de Microsoft 365.</li>
                   <li><b>Contexto Coherente:</b> Menciona un departamento real (Finanzas) y una acción específica (mención en un canal).</li>
                   <li><b>Enlaces:</b> Al pasar el ratón sobre el botón, el dominio apunta directamente a <i>teams.microsoft.com</i> bajo HTTPS.</li>
               </ul>` 
    },
    { 
        id: 3,
        title: "Escenario 3: Alerta de Facturación Netflix",
        image: "",
        text: `<div class="email-mockup">
                <div class="email-header" style="background:black; text-align:center; padding:25px;">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg" width="120">
                </div>
                <div class="email-body">
                    <h2 style="color:#222;">Última oportunidad para actualizar tu cuenta</h2>
                    <p>No hemos podido procesar el pago de tu última suscripción mensual. Como resultado, tu acceso al servicio de streaming ha sido suspendido temporalmente.</p>
                    <div style="background:#fff3cd; padding:15px; border:1px solid #ffeeba; border-radius:5px; margin:15px 0;">
                        <b>Estado:</b> Suspendido<br>
                        <b>Plazo:</b> Tienes 12 horas para validar tus datos o tu historial de perfiles será borrado permanentemente.
                    </div>
                    <center>
                        <a href="#" class="cta-button" style="background:#e50914; color:white !important; font-weight:bold; padding:15px 30px; border-radius:2px; text-decoration:none;">REINICIAR MEMBRESÍA</a>
                    </center>
                </div>
            </div>`, 
        isPhishing: true, 
        vector: "Phishing de Suscripción / Robo de Tarjeta",
        desc: `<b>Análisis Técnico:</b> Intento de robo de credenciales y datos bancarios.<br><br>
               <b>Indicadores de Phishing:</b>
               <ul>
                   <li><b>Urgencia Artificial:</b> La amenaza de "borrar el historial en 12 horas" es una táctica para impedir que el usuario piense con claridad.</li>
                   <li><b>Saludo Genérico:</b> No se dirigen a ti por tu nombre, sino de forma impersonal.</li>
                   <li><b>Enlace sospechoso:</b> El botón suele dirigir a un dominio como <i>"netflix-support-update.com"</i> en lugar de <i>netflix.com</i>.</li>
               </ul>` 
    },
    { 
        id: 4,
        title: "Escenario 4: Notificación del SAT (Buzón Tributario)",
        image: "",
        text: `<div class="email-mockup">
                <div style="border-bottom:2px solid #b22222; padding-bottom:10px; margin-bottom:20px;">
                    <img src="https://www.gob.mx/cms/uploads/image/file/488329/SAT.jpg" width="150">
                </div>
                <div class="email-body">
                    <p><b>AVISO IMPORTANTE:</b> Se ha generado una resolución administrativa con fecha de hoy respecto a su situación fiscal 2024.</p>
                    <p>Debido a discrepancias en sus declaraciones anuales, se ha emitido una orden de auditoría digital. Es obligatorio que descargue y firme el acuse de recibo adjunto para evitar multas mayores o la cancelación de sus sellos digitales.</p>
                    <div style="background:#f2f2f2; padding:20px; border:1px dashed #999; text-align:center; margin:20px 0;">
                        <span style="display:block; margin-bottom:10px; font-family:monospace;">Archivo adjunto:</span>
                        <a href="#" style="color:#0056b3; font-weight:bold; text-decoration:underline;">Orden_Auditoria_SAT_Identificador_99281.pdf.zip</a>
                    </div>
                </div>
            </div>`, 
        isPhishing: true, 
        vector: "Malware / Ransomware",
        desc: `<b>Análisis Técnico:</b> Este es un ataque de distribución de malware.<br><br>
               <b>Por qué es peligroso:</b>
               <ul>
                   <li><b>Extensión del archivo:</b> Los archivos <b>.zip</b> o <b>.exe</b> enviados supuestamente por el gobierno suelen contener troyanos o ransomware.</li>
                   <li><b>Miedo Autoritario:</b> Utiliza la autoridad del SAT para asustar al contribuyente con multas.</li>
                   <li><b>Dato Real:</b> El SAT nunca envía archivos para descargar directamente en un correo; siempre te pide iniciar sesión en su portal oficial.</li>
               </ul>` 
    },
    { 
        id: 5,
        title: "Escenario 5: Encuesta Starbucks Rewards",
        image: "",
        text: `<div class="email-mockup">
                <div style="background:#00704a; color:white; padding:20px; text-align:center;">
                    <h1 style="margin:0; font-size:1.5em;">Starbucks Rewards</h1>
                </div>
                <div class="email-body" style="text-align:center;">
                    <h2 style="color:#00704a;">¡Has sido seleccionado para una Starbucks Card de $500 MXN!</h2>
                    <p>En Starbucks valoramos tu opinión. Hemos seleccionado a 50 clientes frecuentes para participar en nuestro panel de calidad 2026.</p>
                    <p>Solo responde 3 preguntas rápidas sobre tu experiencia en tienda y el saldo se abonará a tu aplicación de inmediato.</p>
                    <br>
                    <a href="#" style="background:#00704a; color:white !important; padding:15px 30px; border-radius:50px; text-decoration:none; display:inline-block; font-weight:bold;">RECLAMAR MI TARJETA</a>
                    <p style="font-size:0.7em; color:#999; margin-top:20px;">*Promoción válida por tiempo limitado. Se requiere validación de correo electrónico.</p>
                </div>
            </div>`, 
        isPhishing: true, 
        vector: "Scam / Recolección de Datos (Harvesting)",
        desc: `<b>Análisis Técnico:</b> Se trata de un 'Survey Scam'.<br><br>
               <b>Objetivo:</b> El atacante busca recolectar tu correo, contraseña y posiblemente datos de tu cuenta de Starbucks o redes sociales (al pedirte "iniciar sesión" para la encuesta).<br>
               <b>Punto clave:</b> El premio es desproporcionado por el esfuerzo pedido (3 preguntas por $500). Si parece demasiado bueno para ser verdad, probablemente lo sea.` 
    },
    { 
        id: 6,
        title: "Escenario 6: Alerta de Almacenamiento Dropbox",
        image: "",
        text: `<div class="email-mockup">
                <div class="email-body">
                    <img src="https://aem.dropbox.com/cms/content/dam/dropbox/www/en-us/branding/dropbox-logo-glyph.png" width="40" style="margin-bottom:15px;">
                    <h2 style="color:#0061ff; margin-top:0;">Tu espacio de Dropbox está casi lleno</h2>
                    <p>Hola, tu cuenta gratuita ha alcanzado el <b>98% de su capacidad</b> (1.96 GB de 2 GB). Si superas el límite, tus archivos dejarán de sincronizarse en tus dispositivos.</p>
                    <p>Como oferta especial por ser usuario antiguo, obtén un descuento del 50% en el plan <b>Dropbox Plus (2TB)</b> durante el primer año.</p>
                    <center>
                        <a href="https://www.dropbox.com/buy" class="cta-button" style="background:#0061ff; color:white !important; padding:12px 25px; border-radius:3px; text-decoration:none; display:inline-block; margin:15px 0;">Aumentar mi espacio</a>
                    </center>
                    <p style="font-size:0.8em; color:#777;">Si no deseas cambiar de plan, te recomendamos eliminar archivos duplicados o carpetas compartidas pesadas.</p>
                </div>
            </div>`, 
        isPhishing: false, 
        vector: "Notificación de Servicio Real",
        desc: `<b>Análisis Técnico:</b> Este es un correo <b>LEGÍTIMO</b> de marketing y servicio.<br><br>
               <b>Por qué es real:</b>
               <ul>
                   <li><b>Datos Precisos:</b> Muestra el uso exacto del almacenamiento del usuario.</li>
                   <li><b>Sin Amenazas:</b> Explica qué pasará (deja de sincronizar) sin amenazar con borrar la cuenta de inmediato.</li>
                   <li><b>Transparencia:</b> El enlace lleva al subdominio oficial <i>www.dropbox.com</i>.</li>
               </ul>` 
    },
    { 
        id: 7,
        title: "Escenario 7: Seguridad de Apple ID",
        image: "",
        text: `<div class="email-mockup" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;">
                <div class="email-body">
                    <center><i class="fab fa-apple" style="font-size:3.5em; color:#555; margin-bottom:10px;"></i></center>
                    <h2 style="text-align:center; font-weight:600;">Tu ID de Apple ha sido bloqueado</h2>
                    <p>Se ha intentado iniciar sesión en tu cuenta desde un dispositivo no reconocido en <b>Teherán, Irán</b> (IP: 91.186.220.12).</p>
                    <p>Para proteger tu información, hemos bloqueado temporalmente el acceso a iCloud, iMessage y la App Store. Debes verificar tu identidad para restablecer el acceso.</p>
                    <center>
                        <a href="#" style="background:#007aff; color:white !important; padding:12px 30px; border-radius:8px; text-decoration:none; display:inline-block; margin:20px 0; font-weight:500;">Verificar Mi Cuenta</a>
                    </center>
                    <p style="font-size:0.8em; color:#888; text-align:center;">Si no fuiste tú, ignora este mensaje y cambia tu contraseña inmediatamente.</p>
                </div>
            </div>`, 
        isPhishing: true, 
        vector: "Robo de Credenciales / iCloud Bypass",
        desc: `<b>Análisis Técnico:</b> Ataque de pánico por ubicación geográfica.<br><br>
               <b>Red Flags:</b>
               <ul>
                   <li><b>Ubicación Exótica:</b> Usan países con mala reputación de ciberseguridad para asustar al usuario.</li>
                   <li><b>Botón de Verificación:</b> Te llevará a una página que imita a Apple donde te pedirán tu correo, contraseña y las respuestas a tus preguntas de seguridad.</li>
                   <li><b>Remitente:</b> Si revisas el correo del emisor, verás algo como <i>support-apple-id@security-mail.net</i> en lugar de <i>apple.com</i>.</li>
               </ul>` 
    },
    { 
        id: 8,
        title: "Escenario 8: Confirmación de Pago PayPal",
        image: "",
        text: `<div class="email-mockup">
                <div style="padding:20px; border-bottom:1px solid #eee;">
                    <img src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_v3_2x.png" width="130">
                </div>
                <div class="email-body">
                    <p>Hola Cliente,</p>
                    <p>Has enviado un pago de <b>$1,250.00 MXN</b> a <i>"Servicios Globales de Hosting Ltd."</i>.</p>
                    <p>Si tú no realizaste esta transacción o crees que alguien ha accedido a tu cuenta sin permiso, haz clic en el botón de abajo para cancelar el pago y solicitar un reembolso total.</p>
                    <center>
                        <div style="background:#f8f8f8; padding:20px; border-radius:5px; margin:20px 0;">
                            <p style="margin:0; font-size:0.9em; color:#666;">ID de Transacción: 882199021-X</p>
                            <a href="#" style="display:inline-block; margin-top:15px; background:#0070ba; color:white !important; padding:12px 35px; border-radius:25px; text-decoration:none; font-weight:bold;">Cancelar y Reembolsar</a>
                        </div>
                    </center>
                </div>
            </div>`, 
        isPhishing: true, 
        vector: "Fraude de Reembolso (Refund Scam)",
        desc: `<b>Análisis Técnico:</b> Esta es una táctica inversa muy efectiva.<br><br>
               <b>Cómo funciona:</b> Te notifican de un gasto que <b>SABEN</b> que no hiciste. Tu reacción natural es entrar para "cancelar". Al hacer clic, entras en un portal falso de PayPal que captura tus datos bancarios.<br>
               <b>Dato clave:</b> PayPal siempre te llama por tu nombre y apellido registrados, nunca como "Hola Cliente".` 
    },
    { 
        id: 9,
        title: "Escenario 9: Nueva Conexión en LinkedIn",
        image: "",
        text: `<div class="email-mockup">
                <div style="background:#0077b5; color:white; padding:15px; font-weight:bold;">LinkedIn</div>
                <div class="email-body">
                    <p><b>Sofia Ramírez</b> quiere conectar contigo.</p>
                    <div style="display:flex; align-items:center; margin:20px 0;">
                        <div style="width:60px; height:60px; background:#ccc; border-radius:50%; margin-right:15px;"></div>
                        <div>
                            <b style="font-size:1.1em;">Sofia Ramírez</b><br>
                            <span style="color:#666;">IT Recruitment Manager en TechSolutions Global</span>
                        </div>
                    </div>
                    <p style="color:#555; font-style:italic;">"Hola, he visto tu perfil y encajas perfectamente con una vacante senior que estamos abriendo. Me gustaría enviarte la propuesta."</p>
                    <center>
                        <a href="https://www.linkedin.com/mynetwork/invites/" style="background:#0077b5; color:white !important; padding:10px 20px; border-radius:20px; text-decoration:none; font-weight:bold; display:inline-block;">Aceptar invitación</a>
                    </center>
                </div>
            </div>`, 
        isPhishing: false, 
        vector: "Notificación de Red Social Legítima",
        desc: `<b>Análisis Técnico:</b> Este es un correo <b>LEGÍTIMO</b>.<br><br>
               <b>Puntos a favor:</b>
               <ul>
                   <li><b>Formato Corporativo:</b> Sigue el esquema exacto de LinkedIn para invitaciones.</li>
                   <li><b>Sin Enlaces Extraños:</b> No te pide descargar un PDF ni ir a un sitio externo para ver la "vacante"; te invita a la plataforma oficial.</li>
                   <li><b>Remitente:</b> El correo proviene de <i>invitations@linkedin.com</i>.</li>
               </ul>` 
    },
    { 
        id: 10,
        title: "Escenario 10: Problema de Entrega FedEx",
        image: "",
        text: `<div class="email-mockup">
                <div style="padding:15px;">
                    <img src="https://www.fedex.com/content/dam/fedex-static/brand-assets/v2/logos/fedex-logo.png" width="100">
                </div>
                <div class="email-body">
                    <h2 style="color:#4D148C; margin-top:0;">No pudimos entregar tu paquete</h2>
                    <p>Lamentamos informarte que el repartidor no pudo localizar tu domicilio para la entrega del paquete con guía <b>#FX-7721-09</b>.</p>
                    <p>El paquete ha sido devuelto a nuestro centro de distribución regional. Es necesario que imprimas la etiqueta de recolección adjunta y la presentes en la oficina más cercana antes de 48 horas o el paquete será destruido.</p>
                    <center>
                        <a href="#" style="background:#FF6600; color:white !important; padding:15px 30px; text-decoration:none; font-weight:bold; display:inline-block; border-radius:4px; margin:15px 0;">DESCARGAR ETIQUETA_ENVIO.ZIP</a>
                    </center>
                    <p style="font-size:0.8em; color:#666;">Gracias por elegir FedEx.</p>
                </div>
            </div>`, 
        isPhishing: true, 
        vector: "Malware / Ransomware",
        desc: `<b>Análisis Técnico:</b> Uno de los ataques de malware más comunes.<br><br>
               <b>Por qué es Falso:</b>
               <ul>
                   <li><b>Tipo de Archivo:</b> Las empresas de mensajería nunca envían archivos <b>.zip</b>. Las etiquetas suelen ser links a su web o PDFs simples.</li>
                   <li><b>Amenaza Irreal:</b> FedEx nunca "destruye" un paquete en 48 horas; lo mantienen en oficina por varios días o semanas.</li>
                   <li><b>Anexo Peligroso:</b> Al abrir el .zip, se ejecutará un script que cifra tus archivos (Ransomware) o instala un registrador de teclas (Keylogger).</li>
               </ul>` 
    }
];