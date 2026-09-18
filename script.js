 /* =========================================================
   ZAMALEK — LIGHTWEIGHT SCRIPT
========================================================= */

"use strict";

/* =========================
   CART
========================= */

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
const heroShopButton = document.getElementById("hero-shop-btn");

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

    const number = element.textContent.replace(/[^\d]/g, "");

    return parseInt(number, 10) || 0;
}

function getCartTotal() {

    let total = 0;

    for (const item of cart) {
        total += item.price * item.quantity;
    }

    return total;
}

function getCartCount() {

    let count = 0;

    for (const item of cart) {
        count += item.quantity;
    }

    return count;
}

/* =========================
   HERO BUTTON
========================= */

if (heroShopButton) {

    heroShopButton.addEventListener("click", function () {
        scrollToElement(shopSection);
    });
}

/* =========================
   CART OPEN / CLOSE
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
   ADD ITEM
========================= */

function addItemToCart(name, price, size, color, quantity) {

    quantity = Math.max(1, Math.min(10, quantity));

    const existing = cart.find(function (item) {

        return (
            item.name === name &&
            item.size === size &&
            item.color === color
        );

    });

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

/* =========================
   PRODUCT CARD
========================= */

function addProductToCart(card) {

    if (!card) return "";

    const nameElement = card.querySelector("h3");
    const priceElement = card.querySelector(".product-card > p");
    const sizeElement = card.querySelector(".size");
    const colorElement = card.querySelector(".color");
    const quantityElement = card.querySelector(".product-quantity");

    const name = nameElement
        ? nameElement.textContent.trim()
        : "Product";

    const price = getPrice(priceElement);

    const size = sizeElement
        ? sizeElement.value
        : "Default";

    const color = colorElement
        ? colorElement.value
        : "Default";

    let quantity = quantityElement
        ? parseInt(quantityElement.value, 10)
        : 1;

    if (!Number.isFinite(quantity)) {
        quantity = 1;
    }

    quantity = Math.max(1, Math.min(10, quantity));

    if (quantityElement) {
        quantityElement.value = quantity;
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

    const addButton =
        card.querySelector(".add-to-cart");

    if (addButton) {

        addButton.addEventListener("click", function () {

            const name = addProductToCart(card);

            alert(name + " added to cart 🛒");

        });
    }

    const buyButton =
        card.querySelector(".buy-now");

    if (buyButton) {

        buyButton.addEventListener("click", function () {

            addProductToCart(card);

            updateCheckout();

            if (checkoutSection) {
                checkoutSection.classList.add("active");
                scrollToElement(checkoutSection);
            }

        });
    }

});

/* =========================
   UPDATE CART
========================= */

function updateCart() {

    if (!cartItems) return;

    cartItems.innerHTML = "";

    if (cart.length === 0) {

        const empty = document.createElement("p");

        empty.textContent = "YOUR BAG IS EMPTY.";

        empty.style.color = "#777";
        empty.style.padding = "25px 0";

        cartItems.appendChild(empty);

    } else {

        cart.forEach(function (item, index) {

            const div =
                document.createElement("div");

            div.className = "cart-item";

            const wrapper =
                document.createElement("div");

            const title =
                document.createElement("strong");

            title.textContent = item.name;

            const price =
                document.createElement("p");

            price.textContent =
                "EGP " + item.price;

            const size =
                document.createElement("p");

            size.textContent =
                "Size: " + item.size;

            const color =
                document.createElement("p");

            color.textContent =
                "Color: " + item.color;

            const controls =
                document.createElement("div");

            controls.className =
                "quantity-controls";

            const minus =
                document.createElement("button");

            minus.type = "button";
            minus.textContent = "−";

            minus.addEventListener(
                "click",
                function () {
                    decreaseQuantity(index);
                }
            );

            const number =
                document.createElement("span");

            number.textContent =
                item.quantity;

            const plus =
                document.createElement("button");

            plus.type = "button";
            plus.textContent = "+";

            plus.addEventListener(
                "click",
                function () {
                    increaseQuantity(index);
                }
            );

            controls.appendChild(minus);
            controls.appendChild(number);
            controls.appendChild(plus);

            const remove =
                document.createElement("button");

            remove.type = "button";
            remove.className = "remove-btn";
            remove.textContent = "Remove";

            remove.addEventListener(
                "click",
                function () {
                    removeItem(index);
                }
            );

            wrapper.appendChild(title);
            wrapper.appendChild(price);
            wrapper.appendChild(size);
            wrapper.appendChild(color);
            wrapper.appendChild(controls);
            wrapper.appendChild(remove);

            div.appendChild(wrapper);

            cartItems.appendChild(div);

        });
    }

    if (cartCount) {
        cartCount.textContent = getCartCount();
    }

    if (cartTotal) {
        cartTotal.textContent = getCartTotal();
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
            card.querySelector(".product-card > p");

        const sizeElement =
            card.querySelector(".size");

        const colorElement =
            card.querySelector(".color");

        currentProduct = {

            name: nameElement
                ? nameElement.textContent.trim()
                : "Product",

            price: getPrice(priceElement),

            image: image
                ? image.currentSrc || image.src
                : "",

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
                sizeElement
                    ? sizeElement.value
                    : "S";
        }

        if (detailsColor) {
            detailsColor.value =
                colorElement
                    ? colorElement.value
                    : "Black";
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

    detailsAdd.addEventListener("click", function () {

        if (!currentProduct) return;

        let quantity =
            parseInt(
                detailsQuantity?.value,
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
            detailsSize
                ? detailsSize.value
                : "S",
            detailsColor
                ? detailsColor.value
                : "Black",
            quantity
        );

        alert(
            currentProduct.name +
            " added to cart 🛒"
        );

    });

}

/* =========================
   DETAILS BUY
========================= */

if (detailsBuy) {

    detailsBuy.addEventListener("click", function () {

        if (!currentProduct) return;

        let quantity =
            parseInt(
                detailsQuantity?.value,
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
            detailsSize
                ? detailsSize.value
                : "S",
            detailsColor
                ? detailsColor.value
                : "Black",
            quantity
        );

        updateCheckout();

        if (productDetails) {
            productDetails.classList.remove("active");
        }

        if (checkoutSection) {

            checkoutSection.classList.add("active");

            scrollToElement(checkoutSection);

        }

    });

}

/* =========================
   CLOSE DETAILS
========================= */

if (closeDetails) {

    closeDetails.addEventListener("click", function () {

        if (productDetails) {
            productDetails.classList.remove("active");
        }

        scrollToElement(shopSection);

    });

}

/* =========================
   CHECKOUT
========================= */

function updateCheckout() {

    if (!checkoutItems) return;

    checkoutItems.innerHTML = "";

    if (cart.length === 0) {

        checkoutItems.textContent =
            "YOUR BAG IS EMPTY.";

    } else {

        cart.forEach(function (item) {

            const div =
                document.createElement("div");

            div.className = "checkout-item";

            const info =
                document.createElement("div");

            const title =
                document.createElement("strong");

            title.textContent = item.name;

            const size =
                document.createElement("p");

            size.textContent =
                "Size: " + item.size;

            const color =
                document.createElement("p");

            color.textContent =
                "Color: " + item.color;

            const quantity =
                document.createElement("p");

            quantity.textContent =
                "Quantity: " + item.quantity;

            info.appendChild(title);
            info.appendChild(size);
            info.appendChild(color);
            info.appendChild(quantity);

            const price =
                document.createElement("strong");

            price.textContent =
                "EGP " +
                (item.price * item.quantity);

            div.appendChild(info);
            div.appendChild(price);

            checkoutItems.appendChild(div);

        });

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

    checkoutButton.addEventListener("click", function () {

        if (cart.length === 0) {

            alert("Your cart is empty 🛒");

            return;
        }

        updateCheckout();

        if (cartBox) {
            cartBox.classList.remove("active");
        }

        if (checkoutSection) {

            checkoutSection.classList.add("active");

            scrollToElement(checkoutSection);

        }

    });

}

/* =========================
   BACK TO CART
========================= */

if (backToCart) {

    backToCart.addEventListener("click", function () {

        if (checkoutSection) {
            checkoutSection.classList.remove("active");
        }

        if (cartBox) {
            cartBox.classList.add("active");
        }

    });

}

/* =========================
   PLACE ORDER
========================= */

if (checkoutForm) {

    checkoutForm.addEventListener("submit", function (event) {

        event.preventDefault();

        if (cart.length === 0) {

            alert("Your cart is empty 🛒");

            return;
        }

        const name =
            document.getElementById("customer-name")
                ?.value.trim() || "";

        const phone =
            document.getElementById("customer-phone")
                ?.value.trim() || "";

        const governorate =
            document.getElementById("governorate")
                ?.value || "";

        const address =
            document.getElementById("customer-address")
                ?.value.trim() || "";

        const payment =
            document.getElementById("payment-method")
                ?.value || "";

        const total = getCartTotal();

        const randomNumber =
            Math.floor(
                100000 +
                Math.random() * 900000
            );

        let productsMessage = "";

        cart.forEach(function (item, index) {

            productsMessage +=
                `${index + 1}. ${item.name}\n` +
                `Size: ${item.size}\n` +
                `Color: ${item.color}\n` +
                `Quantity: ${item.quantity}\n` +
                `Price: EGP ${item.price * item.quantity}\n\n`;

        });

        const message =
            `🛍️ ZAMALEK NEW ORDER\n\n` +
            `Order #: ${randomNumber}\n\n` +
            `👤 Customer:\n${name}\n\n` +
            `📱 Phone:\n${phone}\n\n` +
            `📍 Address:\n` +
            `${governorate}\n${address}\n\n` +
            `🛒 ORDER DETAILS:\n\n` +
            productsMessage +
            `💰 TOTAL: EGP ${total}\n\n` +
            `💳 Payment: ${payment}`;

        const whatsappURL =
            "https://wa.me/201227840123?text=" +
            encodeURIComponent(message);

        window.open(
            whatsappURL,
            "_blank",
            "noopener"
        );

        if (successName) {
            successName.textContent = name;
        }

        if (successTotal) {
            successTotal.textContent = total;
        }

        if (orderNumber) {
            orderNumber.textContent = randomNumber;
        }

        if (checkoutSection) {
            checkoutSection.classList.remove("active");
        }

        if (orderSuccess) {

            orderSuccess.classList.add("active");

            scrollToElement(orderSuccess);

        }

        cart = [];

        updateCart();

    });

}

/* =========================
   CONTINUE SHOPPING
========================= */

if (continueShopping) {

    continueShopping.addEventListener("click", function () {

        if (orderSuccess) {
            orderSuccess.classList.remove("active");
        }

        scrollToElement(shopSection);

    });

}

/* =========================
   INITIALIZE
========================= */

updateCart();
