/* --- Carta --- */

// Tarjetas
const tarjetas = document.querySelectorAll(".carta__item");
console.log(tarjetas);

// Flechas
const flechaIzquierda = document.querySelector(".carta__flecha--left");
console.log(flechaIzquierda);
const flechaDerecha = document.querySelector(".carta__flecha--right");
console.log(flechaDerecha);

// Paginación
const paginacion = document.querySelector(".carta__paginacion");
console.log(paginacion);

// Tarjeta activa (empieza en Burguers)
let indiceActual = 1;


// Colocamos las tarjetas
function actualizarCarrusel() {

    // Eliminamos todas las posiciones
    tarjetas.forEach((tarjeta) => {

        tarjeta.classList.remove(
            "carta__item--left",
            "carta__item--center",
            "carta__item--right",
            "carta__item--hidden"
        );
    });

    // Calculamos las posiciones de las tarjetas
    const indiceIzquierda =
        (indiceActual - 1 + tarjetas.length) % tarjetas.length;
    
    const indiceDerecha =
        (indiceActual + 1) % tarjetas.length;
    
    // Asignamos las clases
    tarjetas[indiceIzquierda].classList.add("carta__item--left");
    tarjetas[indiceActual].classList.add("carta__item--center");
    tarjetas[indiceDerecha].classList.add("carta__item--right");

    // Ocultamos el resto de tarjetas
    tarjetas.forEach((tarjeta, indice) => {

        if (
            indice !== indiceIzquierda &&
            indice !== indiceActual &&
            indice !== indiceDerecha
        ) {
            tarjeta.classList.add("carta__item--hidden");
        }
    });

    crearPaginacion();
}

// Flecha Derecha
flechaDerecha.addEventListener("click", () => {
    indiceActual++;
    
    if (indiceActual>=tarjetas.length) {
        indiceActual = 0;
    }

    actualizarCarrusel();
});

// Flecha Izquierda
flechaIzquierda.addEventListener("click", () => {
    indiceActual--;
    
    if (indiceActual< 0) {
        indiceActual = tarjetas.length;
    }

    actualizarCarrusel();
});

// Ejecutar paginacion
function crearPaginacion() {
    paginacion.innerHTML = "";
    tarjetas.forEach((_, indice) => {
        const punto = document.createElement("span");
        punto.classList.add("carta__punto");

        if (indice == indiceActual) {
            punto.classList.add("activo");
        }

        punto.addEventListener("click", () => {
            indiceActual = indice;
            actualizarCarrusel();
            crearPaginacion();
        });

        paginacion.appendChild (punto);
    });
}

// Ejecutamos la función al cargar la página
actualizarCarrusel();


/* --- Reseñas --- */

const resenas = document.querySelectorAll(".resena");
const btnPrev = document.querySelector(".resenas__btn--prev");
const btnNext = document.querySelector(".resenas__btn--next");
const puntos = document.querySelectorAll(".resenas__pagination span");


function mostrarResena () {
    resenas.forEach ((resena) => {
        resena.classList.remove("active");
    });

    puntos.forEach((punto) => {
        punto.classList.remove("active");
    });

    resenas[indiceActual].classList.add("active");
    puntos[indiceActual].classList.add("active");
}

mostrarResena();

btnNext.addEventListener("click", () => {
    indiceActual++;

    if (indiceActual >= resenas.length) {
        indiceActual = 0;
    }

    mostrarResena();
});

btnPrev.addEventListener("click", () => {

    indiceActual--;

    if (indiceActual < 0) {
        indiceActual = resenas.length - 1;
    }

    mostrarResena ();
});

