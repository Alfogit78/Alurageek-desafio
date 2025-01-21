function deleteProduct(productId) {
  fetch(`https://run.mocky.io/v3/3c332801-7abc-4109-b9ec-b7523c0bef57/${productId}`, {
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
