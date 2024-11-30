document.addEventListener("DOMContentLoaded", () => {
    const apiUrl = "../data/data.json";
    const cardsContainer = document.getElementById("cards-container");
  
    async function fetchContenido() {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error("Error al obtener los datos de la API");
        }
        const data = await response.json();
        renderCards(data.contenido);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  
    function renderCards(contenido) {
      contenido.forEach(contenido => {
        const card = document.createElement("div");
        card.className = "col-md-4";
  
        card.innerHTML = `
          <div class="card h-100">
            <img src="${contenido.rutaPortada}" class="card-img-top" alt="${contenido.rutaPortada}">
            <div class="card-body">
              <h5 class="card-title">${cotenido.titulo}</h5>
              <a href="#" class="btn btn-primary">Comprar</a>
            </div>
          </div>
        `;
  
        cardsContainer.appendChild(card);
      });
    }
  
    fetchContenido();
  });
  