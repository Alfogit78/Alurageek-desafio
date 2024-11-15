import { deleteProduct } from "./deletProducts.js";

function printProducts() {
  let products = document.getElementById("products");

  fetch("https://673518f65995834c8a91e228.mockapi.io/products")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((element) => {
        // Formatear el precio con coma y dos decimales
        let precioFormateado = parseFloat(element.precio)
          .toFixed(2)
          .replace(".", ",");

        // Crear el HTML del producto con botón al lado derecho del precio
        let productHTML = `
                    <div class="cart" id="${element.id}">
                        <img src="${element.imagen}" alt="img-producto">
                        <p>${element.titulo}</p>
                        <div class="price">
                            <p>$ ${precioFormateado}</p>
                            <img src="../img/btn-borrar.svg" class="btn-delete" alt="Borrar producto">
                        </div>
                    </div>
                `;

        // Insertar el HTML del producto en el contenedor
        let div = document.createElement("div");
        div.innerHTML = productHTML;

        // Agregar el evento de click para eliminar el producto
        let deleteButton = div.querySelector(".btn-delete");
        deleteButton.addEventListener("click", (event) => {
          event.preventDefault();
          deleteProduct(element.id);
        });

        // Agregar el producto al contenedor principal
        products.appendChild(div);
      });
    })
    .catch((error) => console.error("Error:", error));
}

printProducts();

export { printProducts };
