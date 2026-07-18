/* --- Elementos --- */
const cesta = document.querySelector(".cesta");
const ticket = document.querySelector(".ticket");
const overlay = document.querySelector(".overlay");
const cerrarTicket = document.querySelector(".ticket__close");
const stickers = document.querySelectorAll(".sticker");
const contadorCesta = document.querySelector(".cesta__contador");


/* Generar ticket y suma de precio de productos */
const ticketLista = document.querySelector(".ticket__lista");
const ticketTotal = document.querySelector(".ticket__total strong");


/* Notificación "Pedido realizado" */
const botonPedido = document.querySelector(".btn--pedido");

botonPedido.addEventListener("click", () => {

    alert("¡Pedido realizado correctamente!");

});



let stickerActual = null;

let offsetX = 0;
let offsetY = 0;

let contador = 0;

let total = 0;


/* --- Funciones --- */
function abrirTicket() {
    ticket.classList.add("active");
    overlay.classList.add("active");
}

function cerrar() {
    ticket.classList.remove("active");
    overlay.classList.remove("active");
}

/* Al pulsar  pegatina, luego arrastramos */
function comenzarArrastre(e) {
    stickerActual = e.currentTarget;

    const rect = stickerActual.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    stickerActual.style.left = rect.left + "px";
    stickerActual.style.top = rect.top + "px";

    stickerActual.style.right = "auto";
    stickerActual.style.bottom = "auto";

    stickerActual.style.zIndex = "999";

    stickerActual.classList.add("dragging");
    
}


/* Función para moverla */

function moverSticker(e){
    if(!stickerActual) return;

    stickerActual.style.left = (e.clientX - offsetX) + "px";
    stickerActual.style.top = (e.clientY - offsetY) + "px";
}

/* Detectar cesta */
function estaEnLaCesta(sticker){
    const rectSticker = sticker.getBoundingClientRect();
    const rectCesta = cesta.getBoundingClientRect();

    return !(
        rectSticker.right < rectCesta.left ||
        rectSticker.left > rectCesta.right ||
        rectSticker.bottom < rectCesta.top ||
        rectSticker.top > rectCesta.bottom
    );
}



function añadirProducto(sticker){
    const nombre = sticker.dataset.name;
    const precio = Number(sticker.dataset.price);
    
    total += precio;
    
    const li = document.createElement("li");

    li.className = "ticket__item";

    li.innerHTML = `
        <div class="ticket__info">
            <span class="ticket__name">${nombre}</span>
            <span class="ticket__price">${precio.toFixed(2)} €</span>
        </div>
    `;

    ticketLista.appendChild(li);
    ticketTotal.textContent = total.toFixed(2) + " €";

}





/* Soltar */
function soltarSticker(){
    if(!stickerActual) return;

    stickerActual.style.zIndex = "";

    stickerActual.classList.remove("dragging");

    if(estaEnLaCesta(stickerActual)){
        contador++;
        contadorCesta.textContent = contador;
        añadirProducto(stickerActual);
    

        cesta.querySelector(".cesta__dropzone").classList.add("bounce");
        setTimeout(() => {
            cesta.querySelector(".cesta__dropzone").classList.remove("bounce");
        }, 450);

        stickerActual.style.display = "none";
    }

    stickerActual = null;
}


stickers.forEach(sticker=> {
    sticker.addEventListener("pointerdown", comenzarArrastre)
});



/* --- Eventos --- */
cesta.addEventListener("click", abrirTicket);
cerrarTicket.addEventListener("click", cerrar);
overlay.addEventListener("click", cerrar);


document.addEventListener("pointermove", moverSticker);
document.addEventListener("pointerup", soltarSticker);