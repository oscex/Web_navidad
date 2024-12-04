document.addEventListener("DOMContentLoaded", () => {
  const apiUrl = "../data/data.json"; // Ruta del archivo JSON
  const cardsContainer = document.getElementById("cards-container");

  // Función para obtener los datos del archivo JSON
  async function fetchContenido() {
    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error("Error al obtener los datos de la API");
      }
      const data = await response.json();
      renderCards(data.contenido); // Llamar a la función para renderizar las tarjetas
    } catch (error) {
      console.error("Error:", error);
    }
  }

  // Función para renderizar las tarjetas
  function renderCards(contenido) {
    contenido.forEach((item, index) => {
      const card = document.createElement("div");
      card.className = "card"; // Asignar la clase 'card' para la animación

      // Crear el contenido de cada tarjeta
      card.innerHTML = `
        <img src="${item.rutaPortada}" class="card-img-top" alt="${item.titulo}">
        <div class="card-body">
          <h5 class="card-title">${item.titulo}</h5>
          <p>${item.resumen}</p>
          <button class="btn-primary" data-id="${item.id}">Ver detalles</button>
        </div>
      `;
      
      cardsContainer.appendChild(card);

      // Añadir la animación de aparición de las tarjetas
      setTimeout(() => {
        card.classList.add("show");
      }, 100 * index); // Retraso basado en el índice de la tarjeta
    });

    // Añadir evento para el botón "Ver detalles"
    const buttons = document.querySelectorAll(".btn-primary");
    buttons.forEach(button => {
      button.addEventListener("click", (event) => {
        const id = event.target.getAttribute("data-id");
        showDetails(id, contenido);
      });
    });
  }

  // Función para mostrar los detalles en el modal
  function showDetails(id, contenido) {
    const item = contenido.find(c => c.id === parseInt(id));
    if(item.tipo == "Noticia" || item.tipo == "Formulario"){
      if (item) {
        const modalContent = document.getElementById("modalBody");
        modalContent.innerHTML = `
          <h1 class="text-center">${item.titulo}</h1>
          <img src="${item.tieneImagen ? item.rutaImagen : item.rutaPortada}" 
               class="img-thumbnail rounded mx-auto d-block mb-4" style="max-height: 20rem;" alt="${item.titulo}">
          <div class="row">
            <div class="col">
              <h5>Contenido</h5>
              <p>${item.contenido.replaceAll(/\r?\n/g, "<br />")}</p>
            </div>
          </div>
          <div class="mt-4">
            <ul class="list-group">
              <li class="list-group-item"><strong>Fecha de Publicación:</strong> ${item.fechaPublicacion}</li>
              <li class="list-group-item"><strong>Video:</strong> ${
                item.tieneVideo
                  ? `<a href="${item.rutaVideo}" target="_blank">Ver video</a>`
                  : "No disponible"
              }</li>
            </ul>
          </div>
        `;
              console.log(item.contenido);
        // Mostrar el modal con animación
        const modal = document.getElementById("detailsModal");
        modal.classList.add("show");
      }
    } else if (item.tipo == 'Articulo'){
      if (item) {
        const modalContent = document.getElementById("modalBody");
        modalContent.innerHTML = `
          <h1 class="text-center">${item.titulo}</h1>
          <img src="${item.tieneImagen ? item.rutaImagen2 : item.rutaPortada2}" 
               class="img-thumbnail rounded mx-auto d-block mb-4" style="max-height: 20rem;">
          <img src="${item.tieneImagen ? item.rutaImagen3 : item.rutaPortada3}" 
               class="img-thumbnail rounded mx-auto d-block mb-4" style="max-height: 20rem;">
          <img src="${item.tieneImagen ? item.rutaImagen4 : item.rutaPortada4}" 
               class="img-thumbnail rounded mx-auto d-block mb-4" style="max-height: 20rem;">
          <img src="${item.tieneImagen ? item.rutaImagen5 : item.rutaPortada5}" 
               class="img-thumbnail rounded mx-auto d-block mb-4" style="max-height: 20rem;">
         <img src="${item.tieneImagen ? item.rutaImagen6 : item.rutaPortada6}" 
               class="img-thumbnail rounded mx-auto d-block mb-4" style="max-height: 20rem;">
          <div class="row">
            <div class="col">
            </div>
          </div>
          <div class="mt-4">
            <ul class="list-group">
              <li class="list-group-item"><strong>Fecha de Publicación:</strong> ${item.fechaPublicacion}</li>
              <li class="list-group-item"><strong>Video:</strong> ${
                item.tieneVideo
                  ? `<a href="${item.rutaVideo}" target="_blank">Ver video</a>`
                  : "No disponible"
              }</li>
            </ul>
          </div>
        `;
              console.log(item.contenido);
        // Mostrar el modal con animación
        const modal = document.getElementById("detailsModal");
        modal.classList.add("show");
    }
  }
  }
  // Función para cerrar el modal
  function closeModal() {
    const modal = document.getElementById("detailsModal");
    modal.classList.remove("show");
  }

  // Conectar el botón de cerrar en el modal
  const closeModalBtn = document.getElementById("closeModalBtn");
  closeModalBtn.addEventListener("click", closeModal);

  // Cargar el contenido desde el archivo JSON
  fetchContenido();
});
