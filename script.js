 let cart = [];

/* =========================
   ELEMENTS
========================= */

const cartButton = document.getElementById("cart-button");
const cartBox = document.getElementById("cart-box");
const closeCart = document.getElementById("close-cart");

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");

const checkoutItems = document.getElementById("checkout-items");
const checkoutButton = document.getElementById("checkout-btn");
const checkoutSection = document.getElementById("checkout");
const checkoutTotal = document.getElementById("checkout-total");
const backToCart = document.getElementById("back-to-cart");
const checkoutForm = document.getElementById("checkout-form");

const orderSuccess = document.getElementById("order-success");
const successName = document.getElementById("success-name");
const successTotal = document.getElementById("success-total");
const orderNumber = document.getElementById("order-number");
const continueShopping = document.getElementById("continue-shopping");

const productDetails = document.getElementById("product-details");
const detailsImage = document.getElementById("details-image");
const detailsName = document.getElementById("details-name");
const detailsPrice = document.getElementById("details-price");
const detailsDescription = document.getElementById("details-description");
const detailsSize = document.getElementById("details-size");
const detailsColor = document.getElementById("details-color");
const detailsQuantity = document.getElementById("details-quantity");
const detailsAdd = document.getElementById("details-add");
const detailsBuy = document.getElementById("details-buy");
const closeDetails = document.getElementById("close-details");

const shopSection = document.getElementById("shop");

let currentProduct = null;

/* =========================
   HELPERS
========================= */

function scrollToElement(element) {
    if (!element) return;

    element.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}

function getPrice(element) {
    if (!element) return 0;

    return parseInt(
        element.textContent.replace(/\D/g, ""),
        10
    ) || 0;
}

function getCartTotal() {
    let total = 0;

    for (let i = 0; i < cart.length; i++) {
        total += cart[i].price * cart[i].quantity;
    }

    return total;
}

function getCartCount() {
    let count = 0;

    for (let i = 0; i < cart.length; i++) {
        count += cart[i].quantity;
    }

    return count;
}

/* =========================
   CART
========================= */

if (cartButton) {
    cartButton.addEventListener("click", function () {
        if (cartBox) {
            cartBox.classList.add("active");
        }
    });
}

if (closeCart) {
    closeCart.addEventListener("click", function () {
        if (cartBox) {
            cartBox.classList.remove("active");
        }
    });
}

/* =========================
   ADD TO CART
========================= */

function addItemToCart(
    name,
    price,
    size,
    color,
    quantity
) {
    let existing = null;

    for (let i = 0; i < cart.length; i++) {

        if (
            cart[i].name === name &&
            cart[i].size === size &&
            cart[i].color === color
        ) {
            existing = cart[i];
            break;
        }
    }

    if (existing) {

        existing.quantity = Math.min(
            10,
            existing.quantity + quantity
        );

    } else {

        cart.push({
            name: name,
            price: price,
            size: size,
            color: color,
            quantity: quantity
        });
    }

    updateCart();
}

function addProductToCart(card) {

    if (!card) return;

    const nameElement =
        card.querySelector("h3");

    const priceElement =
        card.querySelector("p");

    const sizeElement =
        card.querySelector(".size");

    const colorElement =
        card.querySelector(".color");

    const quantityElement =
        card.querySelector(".product-quantity");

    const name =
        nameElement ?
        nameElement.textContent.trim() :
        "Product";

    const price =
        getPrice(priceElement);

    const size =
        sizeElement ?
        sizeElement.value :
        "Default";

    const color =
        colorElement ?
        colorElement.value :
        "Default";

    let quantity =
        quantityElement ?
        parseInt(quantityElement.value, 10) :
        1;

    if (!quantity || quantity < 1) {
        quantity = 1;
    }

    if (quantity > 10) {
        quantity = 10;
    }

    addItemToCart(
        name,
        price,
        size,
        color,
        quantity
    );

    return name;
}

/* =========================
   PRODUCT BUTTONS
========================= */

const productCards =
    document.querySelectorAll(".product-card");

productCards.forEach(function (card) {

    const button =
        card.querySelector(".add-to-cart");

    if (!button) return;

    button.addEventListener("click", function () {

        const name =
            addProductToCart(card);

        alert(
            name + " added to cart 🛒"
        );
    });
});

/* =========================
   UPDATE CART
========================= */

function updateCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    for (let i = 0; i < cart.length; i++) {

        const item = cart[i];

        const div =
            document.createElement("div");

        div.className = "cart-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>

                <p>EGP ${item.price}</p>

                <p>Size: ${item.size}</p>

                <p>Color: ${item.color}</p>

                <div class="quantity-controls">

                    <button
                        type="button"
                        onclick="increaseQuantity(${i})"
                    >
                        +
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        type="button"
                        onclick="decreaseQuantity(${i})"
                    >
                        -
                    </button>

                </div>

                <button
                    type="button"
                    class="remove-btn"
                    onclick="removeItem(${i})"
                >
                    Remove
                </button>
            </div>
        `;

        cartItems.appendChild(div);
    }

    if (cartCount) {
        cartCount.textContent =
            getCartCount();
    }

    if (cartTotal) {
        cartTotal.textContent =
            getCartTotal();
    }
}

/* =========================
   QUANTITY
========================= */

function increaseQuantity(index) {

    if (!cart[index]) return;

    if (cart[index].quantity < 10) {
        cart[index].quantity++;
        updateCart();
    }
}

function decreaseQuantity(index) {

    if (!cart[index]) return;

    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);
    }

    updateCart();
}

function removeItem(index) {

    if (!cart[index]) return;

    cart.splice(index, 1);

    updateCart();
}

/* =========================
   PRODUCT DETAILS
========================= */

const productClickElements =
    document.querySelectorAll(".product-click");

productClickElements.forEach(function (element) {

    element.addEventListener("click", function () {

        const card =
            element.closest(".product-card");

        if (!card) return;

        const image =
            card.querySelector("img");

        const nameElement =
            card.querySelector("h3");

        const priceElement =
            card.querySelector("p");

        const sizeElement =
            card.querySelector(".size");

        const colorElement =
            card.querySelector(".color");

        currentProduct = {

            name:
                nameElement ?
                nameElement.textContent.trim() :
                "Product",

            price:
                getPrice(priceElement),

            image:
                image ?
                image.src :
                "",

            description:
                card.dataset.description || ""
        };

        if (detailsImage) {
            detailsImage.src =
                currentProduct.image;

            detailsImage.alt =
                currentProduct.name;
        }

        if (detailsName) {
            detailsName.textContent =
                currentProduct.name;
        }

        if (detailsPrice) {
            detailsPrice.textContent =
                currentProduct.price;
        }

        if (detailsDescription) {
            detailsDescription.textContent =
                currentProduct.description;
        }

        if (detailsSize) {
            detailsSize.value =
                sizeElement ?
                sizeElement.value :
                "S";
        }

        if (detailsColor) {
            detailsColor.value =
                colorElement ?
                colorElement.value :
                "Black";
        }

        if (detailsQuantity) {
            detailsQuantity.value = 1;
        }

        if (productDetails) {
            productDetails.classList.add("active");
            scrollToElement(productDetails);
        }
    });
});

/* =========================
   DETAILS ADD
========================= */

if (detailsAdd) {

    detailsAdd.addEventListener(
        "click",
        function () {

            if (!currentProduct) return;

            let quantity =
                parseInt(
                    detailsQuantity.value,
                    10
                ) || 1;

            quantity =
                Math.max(
                    1,
                    Math.min(10, quantity)
                );

            addItemToCart(
                currentProduct.name,
                currentProduct.price,
                detailsSize ?
                detailsSize.value :
                "S",
                detailsColor ?
                detailsColor.value :
                "Black",
                quantity
            );

            alert(
                currentProduct.name +
                " added to cart 🛒"
            );
        }
    );
}

/* =========================
   DETAILS BUY
========================= */

if (detailsBuy) {

    detailsBuy.addEventListener(
        "click",
        function () {

            if (!currentProduct) return;

            let quantity =
                parseInt(
                    detailsQuantity.value,
                    10
                ) || 1;

            quantity =
                Math.max(
                    1,
                    Math.min(10, quantity)
                );

            addItemToCart(
                currentProduct.name,
                currentProduct.price,
                detailsSize ?
                detailsSize.value :
                "S",
                detailsColor ?
                detailsColor.value :
                "Black",
                quantity
            );

            updateCheckout();

            if (productDetails) {
                productDetails.classList.remove(
                    "active"
                );
            }

            if (checkoutSection) {
                checkoutSection.classList.add(
                    "active"
                );

                scrollToElement(
                    checkoutSection
                );
            }
        }
    );
}

/* =========================
   CLOSE DETAILS
========================= */

if (closeDetails) {

    closeDetails.addEventListener(
        "click",
        function () {

            if (productDetails) {
                productDetails.classList.remove(
                    "active"
                );
            }

            scrollToElement(shopSection);
        }
    );
}

/* =========================
   CHECKOUT
========================= */

function updateCheckout() {

    if (!checkoutItems) return;

    checkoutItems.innerHTML = "";

    for (let i = 0; i < cart.length; i++) {

        const item = cart[i];

        const div =
            document.createElement("div");

        div.className =
            "checkout-item";

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>

                <p>Size: ${item.size}</p>

                <p>Color: ${item.color}</p>

                <p>Quantity: ${item.quantity}</p>
            </div>

            <strong>
                EGP ${item.price * item.quantity}
            </strong>
        `;

        checkoutItems.appendChild(div);
    }

    if (checkoutTotal) {
        checkoutTotal.textContent =
            getCartTotal();
    }
}

/* =========================
   OPEN CHECKOUT
========================= */

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

                alert(
                    "Your cart is empty 🛒"
                );

                return;
            }

            updateCheckout();

            if (cartBox) {
                cartBox.classList.remove(
                    "active"
                );
            }

            if (checkoutSection) {

                checkoutSection.classList.add(
                    "active"
                );

                scrollToElement(
                    checkoutSection
                );
            }
        }
    );
}

/* =========================
   BACK TO CART
========================= */

if (backToCart) {

    backToCart.addEventListener(
        "click",
        function () {

            if (checkoutSection) {
                checkoutSection.classList.remove(
                    "active"
                );
            }

            if (cartBox) {
                cartBox.classList.add(
                    "active"
                );
            }
        }
    );
}

/* =========================
   BUY NOW
========================= */

const buyNowButtons =
    document.querySelectorAll(".buy-now");

buyNowButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            const card =
                button.closest(".product-card");

            if (!card) return;

            addProductToCart(card);

            updateCheckout();

            if (checkoutSection) {

                checkoutSection.classList.add(
                    "active"
                );

                scrollToElement(
                    checkoutSection
                );
            }
        }
    );
});

/* =========================
   PLACE ORDER
========================= */

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            if (cart.length === 0) {

                alert(
                    "Your cart is empty 🛒"
                );

                return;
            }

            const name =
                document
                    .getElementById(
                        "customer-name"
                    )
                    ?.value.trim() || "";

            const phone =
                document
                    .getElementById(
                        "customer-phone"
                    )
                    ?.value.trim() || "";

            const governorate =
                document
                    .getElementById(
                        "governorate"
                    )
                    ?.value || "";

            const address =
                document
                    .getElementById(
                        "customer-address"
                    )
                    ?.value.trim() || "";

            const payment =
                document
                    .getElementById(
                        "payment-method"
                    )
                    ?.value || "";

            const total =
                getCartTotal();

            const randomNumber =
                Math.floor(
                    100000 +
                    Math.random() * 900000
                );

            let productsMessage = "";

            for (
                let i = 0;
                i < cart.length;
                i++
            ) {

                const item = cart[i];

                productsMessage +=
                    `${i + 1}. ${item.name}\n` +
                    `Size: ${item.size}\n` +
                    `Color: ${item.color}\n` +
                    `Quantity: ${item.quantity}\n` +
                    `Price: EGP ${item.price * item.quantity}\n\n`;
            }

            const message =
                `🛍️ ZAMALEK NEW ORDER\n\n` +
                `Order #: ${randomNumber}\n\n` +
                `👤 Customer:\n${name}\n\n` +
                `📱 Phone:\n${phone}\n\n` +
                `📍 Address:\n` +
                `${governorate}\n${address}\n\n` +
                `🛒 ORDER DETAILS:\n\n` +
                `${productsMessage}` +
                `💰 TOTAL: EGP ${total}\n\n` +
                `💳 Payment: ${payment}`;

            const whatsappURL =
                "https://wa.me/201227840123?text=" +
                encodeURIComponent(message);

            window.open(
                whatsappURL,
                "_blank"
            );

            if (successName) {
                successName.textContent =
                    name;
            }

            if (successTotal) {
                successTotal.textContent =
                    total;
            }

            if (orderNumber) {
                orderNumber.textContent =
                    randomNumber;
            }

            if (checkoutSection) {
                checkoutSection.classList.remove(
                    "active"
                );
            }

            if (orderSuccess) {
                orderSuccess.classList.add(
                    "active"
                );

                scrollToElement(
                    orderSuccess
                );
            }

            cart = [];

            updateCart();
        }
    );
}

/* =========================
   CONTINUE SHOPPING
========================= */

if (continueShopping) {

    continueShopping.addEventListener(
        "click",
        function () {

            if (orderSuccess) {
                orderSuccess.classList.remove(
                    "active"
                );
            }

            scrollToElement(shopSection);
        }
    );
}

/* =========================
   NO HEAVY ANIMATIONS
========================= */

/*
   تم إيقاف:
   - Mouse Parallax
   - 3D Product Tilt
   - Cursor Glow Movement
   - Power Click Effect
   - Intersection Observer
   - Scroll Reveal JS

   السبب:
   تقليل استهلاك CPU/GPU
   وتحسين السلاسة على الأجهزة الضعيفة.
*/

/* =========================
   INITIALIZE
========================= */

updateCart();
