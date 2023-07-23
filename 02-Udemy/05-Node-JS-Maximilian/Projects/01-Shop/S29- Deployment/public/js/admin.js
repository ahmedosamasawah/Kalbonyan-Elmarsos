document.addEventListener("DOMContentLoaded", () => {
  // Event delegation for handling dynamically added delete buttons
  document.addEventListener("click", (event) => {
    const deleteButton = event.target.closest(".delete-btn");
    if (deleteButton) {
      deleteProduct(deleteButton);
    }
  });
});

const deleteProduct = (btn) => {
  const prodId = btn.parentNode.querySelector("[name=productId]").value;
  const csrf = btn.parentNode.querySelector("[name=_csrf]").value;

  const productEl = btn.closest("article");

  fetch(`/admin/product/${prodId}`, {
    method: "DELETE",
    headers: {
      "csrf-token": csrf,
    },
  })
    .then((result) => {
      return result.json();
    })
    .then((data) => {
      console.log(data);
      productEl.parentNode.removeChild(productEl);
    })
    .catch((err) => console.log(err));
};
