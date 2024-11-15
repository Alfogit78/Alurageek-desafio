function deleteProduct(productId) {
  fetch(`https://673518f65995834c8a91e228.mockapi.io/products/${productId}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.ok) {
        console.log("Producto eliminado exitosamente");
        let productToRemove = document.getElementById(productId);
        productToRemove.remove();
      } else {
        console.error("Error al eliminar el producto:", response.status);
      }
    })
    .catch((error) => console.error("Error:", error));
}

export { deleteProduct };
