
const razones = [
  {
    titulo: "Por tu forma de ser",
    texto: "Porque tienes una forma tan especial de hacer que cada momento que estamos juntos se convierta en recuerdos bonitos"
    // texto: "Porque tienes una manera especial de hacer que los momentos sencillos se conviertan en recuerdos bonitos."
  },
  {
    titulo: "Por tu sonrisa",
    texto: "Porque al ver tu carita bonita cuando sonries me llena de felicidad ."
  },
  {
    titulo: "Por cómo me haces sentir",
    texto: "Porque tu presencia me llena de tranquilidad y me siento segura al estar contigo."
  },
  {
    titulo: "Por los pequeños detalles",
    texto: "Porque cada detalle que me das, me hace muy feliz y me hace sentir que piensas en mi."
  },
  {
    titulo: "Por las conversaciones",
    texto: "Porque hablar contigo y reírnos de cualquier cosa puede hacer especial cualquier momento, me escuchas y me pones atencion en cada detalle."
  },
  {
    titulo: "Por lo que eres",
    texto: "Porque tu perfecta imperfeccion me encanta, porque no necesito que seas mas ni menos, tal cual eres me ENCANTAS."
  },
  {
    titulo: "Por los recuerdos",
    texto: "Porque cada momento que compartimos se convierte en un bonito recuerdo que tendre el resto de mivida."
  },
  {
    titulo: "Simplemente, por ti",
    texto: "Porque entre tantas personas en este mundo, hay algo en ti que me hace sentir bien y querida.Sin dejar atras que me encantan tus manitas preciosas."
  }
];

// Elementos de la página
const inicio = document.getElementById("inicio");
const universo = document.getElementById("universo");
const formulario = document.getElementById("formulario");
const campoNombre = document.getElementById("nombre");
const saludo = document.getElementById("saludo");
const error = document.getElementById("error");
const estrellasFondo = document.getElementById("estrellas");

const botonesRazones = document.querySelectorAll(".estrella-razon");
const contador = document.getElementById("contador");
const progreso = document.getElementById("progreso");

const mensaje = document.getElementById("mensaje");
const numeroMensaje = document.getElementById("numeroMensaje");
const tituloMensaje = document.getElementById("tituloMensaje");
const textoMensaje = document.getElementById("textoMensaje");
const cerrarMensaje = document.getElementById("cerrarMensaje");

const final = document.getElementById("final");
const volver = document.getElementById("volver");

const descubiertas = new Set();

// Crear las estrellas decorativas del fondo
function crearEstrellas() {
  const cantidad = 85;

  for (let i = 0; i < cantidad; i++) {
    const estrella = document.createElement("span");

    estrella.classList.add("estrella-fondo");
    estrella.style.left = `${Math.random() * 100}%`;
    estrella.style.top = `${Math.random() * 100}%`;

    const tamano = Math.random() * 2.5 + 1;
    estrella.style.width = `${tamano}px`;
    estrella.style.height = `${tamano}px`;
    estrella.style.animationDelay = `${Math.random() * 4}s`;
    estrella.style.animationDuration = `${2 + Math.random() * 4}s`;

    estrellasFondo.appendChild(estrella);
  }
}

crearEstrellas();

// Comprobar el nombre ingresado
formulario.addEventListener("submit", (evento) => {
  evento.preventDefault();

  const nombre = campoNombre.value.trim();

  if (nombre.toLocaleLowerCase("es") !== "enrique") {
    error.textContent =
      "Este pequeño universo está reservado para alguien muy especial. Inténtalo de nuevo. ♡";

    campoNombre.value = "";
    campoNombre.focus();
    return;
  }

  error.textContent = "";
  saludo.textContent = "Para ti, Enrique ✨";

  mostrarUniverso();
});

function mostrarUniverso() {
  inicio.classList.add("oculto");
  universo.classList.remove("oculto");

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

// Abrir una razón al pulsar una estrella
botonesRazones.forEach((boton) => {
  boton.addEventListener("click", () => {
    const indice = Number(boton.dataset.indice);
    const razon = razones[indice];

    if (!razon) return;

    numeroMensaje.textContent =
      `RAZÓN ${String(indice + 1).padStart(2, "0")}`;

    tituloMensaje.textContent = razon.titulo;
    textoMensaje.textContent = razon.texto;

    mensaje.classList.remove("oculto");
    final.classList.add("oculto");

    boton.classList.add("descubierta");
    descubiertas.add(indice);

    actualizarProgreso();

    mensaje.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });
  });
});

// Actualizar la barra y el contador
function actualizarProgreso() {
  const cantidad = descubiertas.size;
  const porcentaje = (cantidad / razones.length) * 100;

  contador.textContent = `${cantidad} de ${razones.length}`;
  progreso.style.width = `${porcentaje}%`;

  if (cantidad === razones.length) {
    final.classList.remove("oculto");
  }
}

// Cerrar el mensaje actual
cerrarMensaje.addEventListener("click", () => {
  mensaje.classList.add("oculto");
});

// Volver a recorrer las estrellas
volver.addEventListener("click", () => {
  descubiertas.clear();

  botonesRazones.forEach((boton) => {
    boton.classList.remove("descubierta");
  });

  actualizarProgreso();

  mensaje.classList.add("oculto");
  final.classList.add("oculto");

  document.querySelector(".progreso-contenedor").scrollIntoView({
    behavior: "smooth",
    block: "center"
  });
});
