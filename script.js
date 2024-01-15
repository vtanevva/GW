
  // function to add a product to the cart
  function addToCart(productName, price) {
    // creating a new cart item element
    const cartItem = document.createElement('div');
    cartItem.classList.add('cart-item');
    cartItem.innerHTML = `
      <span class="product-name">${productName}</span>
      <span class="product-price">€${price.toFixed(2)}</span>
      <button class="delete-button" onclick="deleteCartItem(this)">Delete</button>
    `;

    // appending the cart item to the cart container
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.appendChild(cartItem);

    // updating total price and cart display
    updateCartDisplay();

    // saving cart data to a cookie
    saveCartData();
  }

  // function to update the total price and cart display
  function updateCartDisplay() {
    // updating total price
    updateTotalPrice();

    // slidinge down the cart container
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.classList.add('show-cart');

    // updating the red circle banner
    updateRedCircleBanner();
  }

  // function to update the red circle banner
  function updateRedCircleBanner() {
    const cartItems = document.getElementsByClassName('cart-item');
    const redCircleBanner = document.getElementById('redCircleBanner');
    redCircleBanner.textContent = cartItems.length;
  }

  // function to toggle the visibility of the cart
  function toggleCart() {
    const cartContainer = document.getElementById('cartContainer');
    cartContainer.classList.toggle('show-cart');

    // updating the red circle banner when hiding the cart
    if (!cartContainer.classList.contains('show-cart')) {
      updateRedCircleBanner();
    }
  }

  // function to delete a cart item
  function deleteCartItem(button) {
    const cartItem = button.closest('.cart-item');
    cartItem.remove();

    // updating total price and cart display after deletion
    updateCartDisplay();

    // Save cart data to a cookie after deletion
    saveCartData();
  }

  // function to update the total price in the cart
  function updateTotalPrice() {
    const cartItems = document.getElementsByClassName('cart-item');
    let totalPrice = 0;

    // calculation of the total price
    Array.from(cartItems).forEach(item => {
      const priceString = item.querySelector('.product-price').textContent;
      const price = parseFloat(priceString.replace('€', ''));
      totalPrice += price;
    });

    // displaying the total price
    const totalElement = document.getElementById('totalPrice');
    totalElement.textContent = `Total: €${totalPrice.toFixed(2)}`;
  }

  // function to save cart data to a cookie
  function saveCartData() {
    const cartContainer = document.getElementById('cartContainer');
    const cartItems = cartContainer.getElementsByClassName('cart-item');

    // extract product names and prices from cart items
    const products = Array.from(cartItems).map(item => {
      const productName = item.querySelector('.product-name').textContent;
      const priceString = item.querySelector('.product-price').textContent;
      const price = parseFloat(priceString.replace('€', ''));
      return { productName, price };
    });

    // saving products to a cookie
    document.cookie = `cart=${JSON.stringify(products)}; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/`;
  }

  // function to load cart data from a cookie
  function loadCartData() {
    const cookieValue = document.cookie.replace(/(?:(?:^|.*;\s*)cart\s*=\s*([^;]*).*$)|^.*$/, "$1");
    if (cookieValue) {
      const cartContainer = document.getElementById('cartContainer');
      const products = JSON.parse(cookieValue);

      // creation of cart items based on saved products
      products.forEach(product => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
          <span class="product-name">${product.productName}</span>
          <span class="product-price">€${product.price.toFixed(2)}</span>
          <button class="delete-button" onclick="deleteCartItem(this)">Delete</button>
        `;
        cartContainer.appendChild(cartItem);
      });

      // updating total price after loading data
      updateTotalPrice();
    }
  }

  // loading cart data when the page loads
  loadCartData();

