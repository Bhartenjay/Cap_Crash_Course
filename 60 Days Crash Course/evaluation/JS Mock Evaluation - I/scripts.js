document.addEventListener("DOMContentLoaded", function () {
  let categorySelect = document.getElementById("category");
  let searchInput = document.getElementById("search");
  let priceSelect = document.getElementById("price");
  let productGrid = document.getElementById("product-grid");

 
  fetchProducts();

  
  categorySelect.addEventListener("change", filterProducts);
  searchInput.addEventListener("input", filterProducts);
  priceSelect.addEventListener("change", sortProducts);

  
  function fetchProducts() {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        displayProducts(data);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }

  
  function displayProducts(products) {
    productGrid.innerHTML = "";
    products.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add("product-item");

      productItem.innerHTML = `
        <img class="product-image" src="${product.image}" alt="Product Image">
        <h3 class="product-title">${product.title}</h3>
        <p class="product-price">$${product.price}</p>
      `;

      productGrid.appendChild(productItem);
    });
  }

  
  function filterProducts() {
    const selectedCategory = categorySelect.value.toLowerCase();
    const searchQuery = searchInput.value.trim().toLowerCase();

    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        let filteredProducts = data;

        if (selectedCategory !== "all") {
          filteredProducts = filteredProducts.filter(product => product.category.toLowerCase() === selectedCategory);
        }

        if (searchQuery !== "") {
          filteredProducts = filteredProducts.filter(product => product.title.toLowerCase().includes(searchQuery));
        }

        displayProducts(filteredProducts);
      })
      .catch((error) => console.error("Error filtering products:", error));
  }

  
  function sortProducts() {
    let sortOrder = priceSelect.value;

    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        const sortedProducts = [...data];

        if (sortOrder === "low-high") {
          sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOrder === "high-low") {
          sortedProducts.sort((a, b) => b.price - a.price);
        }

        displayProducts(sortedProducts);
      })
      .catch((error) => console.error("Error sorting products:", error));
  }
});
