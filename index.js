
  document.addEventListener("DOMContentLoaded", () => {
    const cartSidebar = document.getElementById("cartSidebar");
    const closeCartBtn = document.getElementById("closeCartBtn");
    const cartItemsContainer = document.querySelector(".cart-items");
    const cartTotal = document.getElementById("cartTotal");
    const cartIcon = document.getElementById("cartIcon");
    const cartCountBadge = document.getElementById("cartCountBadge");

    let cart = [];

    // Function to update the cart total and cart count
    function updateCartTotal() {
      let total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
      cartTotal.textContent = `Rp ${total.toLocaleString()}`;
      updateCartCount();
    }

    // Function to update the cart count badge
    function updateCartCount() {
      const itemCount = cart.reduce((acc, item) => acc + item.quantity, 0);
      cartCountBadge.textContent = itemCount;
      cartCountBadge.style.display = itemCount > 0 ? "block" : "none"; // Show badge only if there's at least 1 item
    }

    // Function to render cart items
    function renderCartItems() {
      cartItemsContainer.innerHTML = "";

      cart.forEach((item, index) => {
        const cartItem = document.createElement("div");
        cartItem.className = "cart-item";
        cartItem.innerHTML = `
          <div>
            <p><strong>${item.name}</strong></p>
            <p>Price: Rp ${item.price.toLocaleString()}</p>
            <div>
              <button class="quantity-btn" onclick="updateQuantity(${index}, -1)">-</button>
              <span>${item.quantity}</span>
              <button class="quantity-btn" onclick="updateQuantity(${index}, 1)">+</button>
            </div>
          </div>
          <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(cartItem);
      });

      updateCartTotal();
    }

    // Function to open the cart sidebar
    function openCartSidebar() {
      cartSidebar.style.right = "0";
    }

    // Function to close the cart sidebar
    function closeCartSidebar() {
      cartSidebar.style.right = "-400px";
    }

    // Function to add item to the cart
    function addToCart(name, price) {
      const existingItem = cart.find((item) => item.name === name);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        cart.push({ name, price, quantity: 1 });
      }
      renderCartItems();
      openCartSidebar();
    }

    // Function to update item quantity
    window.updateQuantity = (index, change) => {
      cart[index].quantity += change;
      if (cart[index].quantity <= 0) {
        cart.splice(index, 1); // Remove the item if quantity is zero
      }
      renderCartItems();
    };

    // Function to remove item from the cart
    window.removeFromCart = (index) => {
      cart.splice(index, 1);
      renderCartItems();
    };

    // Event listeners
    closeCartBtn.addEventListener("click", closeCartSidebar);

    // Add to cart button click event
    document.querySelectorAll(".btn-custom").forEach((btn) => {
      btn.addEventListener("click", function () {
        const productCard = this.closest(".product-card");
        const name = productCard.querySelector(".product-name").textContent;
        const priceText = productCard.querySelector(".product-price").textContent.replace(/[^\d]/g, "");
        const price = parseFloat(priceText);

        addToCart(name, price);
      });
    });

    // Open cart sidebar when cart icon is clicked
    cartIcon.addEventListener("click", openCartSidebar);
  });
