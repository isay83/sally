// --- 1. DATOS: El Poemario ---
// Puedes agregar tantos poemas como quieras siguiendo esta estructura.
const poemas = [
    {
        titulo: "Para Sally",
        cuerpo: `Hola Amor,
Este es el inicio de un pequeño viaje
a través de mis versos para ti.

Espero que cada palabra te recuerde
lo especial que eres en mi vida.

Aquí subiré mis poemas para ti, pero también te escribiré cartas, publicaciones en tu perfil y cualquier cosa que se me ocurra para hacerte sonreír.

Te quiero mucho, mi niña hermosa.`
    }
];

// Estado de la aplicación
let indiceActual = 0;

// --- 2. ELEMENTOS DEL DOM ---
const envelope = document.getElementById('envelope');
const elTitulo = document.getElementById('poem-title');
const elCuerpo = document.getElementById('poem-body');
const elContador = document.getElementById('poem-counter');
const btnAnterior = document.getElementById('btn-prev');
const btnSiguiente = document.getElementById('btn-next');
const overlay = document.getElementById('overlay');


// --- 3. LÓGICA DEL SOBRE ---
function abrirSobre() {
    envelope.classList.remove('close');
    envelope.classList.add('open');
}

function cerrarSobre() {
    envelope.classList.remove('open');
    envelope.classList.add('close');
}

// Eventos externos del sobre
document.getElementById('btn-open').addEventListener('click', abrirSobre);
document.getElementById('btn-reset').addEventListener('click', cerrarSobre);

// Si hace clic en el sobre cerrado, se abre.
envelope.addEventListener('click', () => {
    if (envelope.classList.contains('close')) {
        abrirSobre();
    }
});

function abrirSobre() {
    envelope.classList.remove('close');
    envelope.classList.add('open');
    overlay.classList.add('open-overlay'); // Activa el fondo oscuro
}

function cerrarSobre() {
    envelope.classList.remove('open');
    envelope.classList.add('close');
    overlay.classList.remove('open-overlay'); // Desactiva el fondo oscuro
}

// También puedes hacer que si hace clic en el fondo oscuro, se cierre la carta
overlay.addEventListener('click', cerrarSobre);

// --- 4. LÓGICA DE NAVEGACIÓN DE POEMAS ---
function actualizarPoema() {
    const p = poemas[indiceActual];
    elTitulo.innerText = p.titulo;
    elCuerpo.innerText = p.cuerpo;
    elContador.innerText = `${indiceActual + 1} / ${poemas.length}`;

    // Control de estado de los botones
    btnAnterior.disabled = (indiceActual === 0);

    if (indiceActual === poemas.length - 1) {
        btnSiguiente.innerText = "Fin 💖";
        btnSiguiente.disabled = true;
    } else {
        btnSiguiente.innerText = "Siguiente ➡️";
        btnSiguiente.disabled = false;
    }

    // Regresa el scroll al inicio al cambiar de poema
    elCuerpo.scrollTop = 0;
}

btnAnterior.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que el clic cierre el sobre accidentalmente
    if (indiceActual > 0) {
        indiceActual--;
        actualizarPoema();
    }
});

btnSiguiente.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que el clic cierre el sobre accidentalmente
    if (indiceActual < poemas.length - 1) {
        indiceActual++;
        actualizarPoema();
    }
});

// Evitar que hacer clic dentro del texto de la carta cierre el sobre
elCuerpo.addEventListener('click', (e) => {
    e.stopPropagation();
});

// Inicializar el primer poema al cargar la página
actualizarPoema();

// --- 5. ANIMACIÓN DE FONDO (Corazones SVG) ---
function crearCorazon() {
    const container = document.getElementById('particles-container');
    const corazon = document.createElement('div');

    // Código SVG de un corazón puro
    corazon.innerHTML = `<svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>`;

    // Configuración aleatoria
    const colores = ['#e60073', '#ff6f61', '#f5a3a2', '#ff99cc'];
    corazon.style.position = 'absolute';
    corazon.style.left = Math.random() * 100 + 'vw';
    corazon.style.top = '-20px';
    corazon.style.color = colores[Math.floor(Math.random() * colores.length)];
    corazon.style.opacity = Math.random() * 0.5 + 0.3; // Opacidad entre 0.3 y 0.8
    corazon.style.transform = `scale(${Math.random() * 1.5 + 0.5})`; // Tamaños diferentes

    // Animación de caída
    const duration = Math.random() * 4 + 4; // Entre 4 y 8 segundos
    corazon.animate([
        { transform: `translateY(0) rotate(0deg)`, opacity: 1 },
        { transform: `translateY(110vh) rotate(360deg)`, opacity: 0 }
    ], {
        duration: duration * 1000,
        easing: 'linear'
    });

    container.appendChild(corazon);

    // Limpiar elemento para no saturar memoria
    setTimeout(() => corazon.remove(), duration * 1000);
}

// Crear un corazón cada 500ms
setInterval(crearCorazon, 500);