const result = document.querySelector(".result");

const fetchProduct = async () => {
  result.innerHTML = `<h2>Loading...</h2>`;

  function getProductById(productsArray, productId) {
    return productsArray.find((product) => product.id === productId);
  }

  try {
    const id = window.location.search;
    const { data } = await axios.get(`/api/3-airtable`);
    const product = getProductById(data, id.split("=")[1]);

    result.innerHTML = `<h1 class="title">${product.name}</h1>
  <article class="product">
    <img class="product-img"
    src="${product.url}"
    alt="${product.name}"
    />
    <div class="product-info">
      <h5 class="title">${product.name}</h5>
      <h5 class="price">$${product.price}</h5>
      <p class="desc">${product.decs}</p>
    </div>
  </article>`;
  } catch (error) {
    result.innerHTML = `<h2>${error}</h2>`;
  }
};

fetchProduct();
