function addProducts() {
  let form = document.querySelector("form");
  let nameProductForm = form.querySelector("#nameProductForm");
  let priceProductForm = form.querySelector("#priceProductForm");
  let imgProductForm = form.querySelector("#imgProductForm");
  let btnSend = form.querySelector("#btnSend");
  let btnClean = form.querySelector("#btnClean");

  // Event listener para el botón "Enviar"
  btnSend.addEventListener("click", async function (event) {
    event.preventDefault();

    // Obtener los valores de los campos del formulario
    let titulo = nameProductForm.value.trim();
    let precio = priceProductForm.value.trim();
    let imagen = imgProductForm.value.trim();

    // Verificar que todos los campos estén completos
    if (titulo === "" || precio === "" || imagen === "") {
      alert("Por favor completa todos los campos");
      return;
    }

    // Obtener el siguiente id
    let id;
    try {
      const response = await fetch("https://673518f65995834c8a91e228.mockapi.io/products");
      const products = await response.json();
      const maxId = products.reduce(
        (max, product) => Math.max(max, parseInt(product.id, 10)),
        0
      );
      id = maxId + 1;
    } catch (error) {
      console.error("Error al obtener el ID:", error);
      return;
    }

    // Datos del nuevo producto
    let nuevoProducto = {
      id: id.toString(),
      titulo: titulo,
      precio: parseFloat(precio).toFixed(2).replace(".", ","),
      imagen: imagen,
    };

    // Opciones para la solicitud fetch
    let options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoProducto),
    };

    // Realizar la solicitud POST a la API
    fetch("https://673518f65995834c8a91e228.mockapi.io/products", options)
      .then((response) => {
        if (!response.ok) {
          throw new Error("La solicitud no fue exitosa");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Producto añadido:", data);
        alert("Producto añadido exitosamente");
        form.reset(); // Limpiar el formulario después de enviar
      })
      .catch((error) => {
        console.error("Error al realizar la solicitud:", error);
      });
  });

  // Event listener para el botón "Limpiar"
  btnClean.addEventListener("click", function (event) {
    event.preventDefault();
    form.reset();
  });
}

addProducts();

export { addProducts };
