 let cart = [];

/* =========================
   ELEMENTS
========================= */

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

const cartButton = $("#cart-button");
const cartBox = $("#cart-box");
const closeCart = $("#close-cart");

const cartCount = $("#cart-count");
const cartItems = $("#cart-items");
const cartTotal = $("#cart-total");

const checkoutItems = $("#checkout-items");
const checkoutButton = $("#checkout-btn");
const checkoutSection = $("#checkout");
const checkoutTotal = $("#checkout-total");
const backToCart = $("#back-to-cart");
const checkoutForm = $("#checkout-form");

const orderSuccess = $("#order-success");
const successName = $("#success-name");
const successTotal = $("#success-total");
const orderNumber = $("#order-number");
const continueShopping = $("#continue-shopping");

const productDetails = $("#product-details");
const detailsImage = $("#details-image");
const detailsName = $("#details-name");
const detailsPrice = $("#details-price");
const detailsDescription = $("#details-description");
const detailsSize = $("#details-size");
const detailsColor = $("#details-color");
const detailsQuantity = $("#details-quantity");
const detailsAdd = $("#details-add");
const detailsBuy = $("#details-buy");
const closeDetails = $("#close-details");

const shopSection = $("#shop");

let currentProduct = null;

/* =========================
   PERFORMANCE
========================= */

const prefersReducedMotion =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const isTouchDevice =
    window.matchMedia("(hover: none)").matches ||
    "ontouchstart" in window;

/* =========================
   HELPERS
========================= */

function smoothScroll(element) {
    if (!element) return;

    element.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start"
    });
}

function getNumber(text) {
    return parseInt(
        String(text || "").replace(/\D/g, ""),
        10
    ) || 0;
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
   CART OPEN / CLOSE
========================= */

cartButton?.addEventListener("click", () => {
    cartBox?.classList.add("active");
});

closeCart?.addEventListener("click", () => {
    cartBox?.classList.remove("active");
});

/* =========================
   ADD PRODUCT
========================= */

function addProductToCart(productCard) {
    if (!productCard) return;

    const name =
        productCard.querySelector("h3")?.textContent.trim() ||
        "Product";

    const price =
        getNumber(
            productCard.querySelector("p")?.textContent
        );

    const size =
        productCard.querySelector(".size")?.value ||
        "Default";

    const color =
        productCard.querySelector(".color")?.value ||
        "Default";

    const quantityInput =
        productCard.querySelector(".product-quantity");

    let quantity =
        parseInt(quantityInput?.value, 10) || 1;

    quantity = Math.max(
        1,
        Math.min(10, quantity)
    );

    addItemToCart(
        name,
        price,
        size,
        color,
        quantity
    );
}

/* =========================
   PRODUCT BUTTONS
========================= */

$$(".product-card").forEach((card) => {

    const addButton =
        card.querySelector(".add-to-cart");

    addButton?.addEventListener("click", () => {

        addProductToCart(card);

        const name =
            card.querySelector("h3")?.textContent.trim();

        alert(`${name || "Product"} added to cart 🛒`);
    });
});

/* =========================
   CART ITEMS
========================= */

function addItemToCart(
    name,
    price,
    size,
    color,
    quantity
) {
    const existingProduct =
        cart.find(
            (item) =>
                item.name === name &&
                item.size === size &&
                item.color === color
        );

    if (existingProduct) {

        existingProduct.quantity =
            Math.min(
                10,
                existingProduct.quantity + quantity
            );

    } else {

        cart.push({
            name,
            price,
            size,
            color,
            quantity
        });
    }

    updateCart();
}

/* =========================
   UPDATE CART
========================= */

function updateCart() {

    if (!cartItems) return;

    const fragment =
        document.createDocumentFragment();

    for (let index = 0; index < cart.length; index++) {

        const item = cart[index];

        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";

        cartItem.innerHTML = `
            <div>
                <strong>${item.name}</strong>

                <p>EGP ${item.price}</p>

                <p>Size: ${item.size}</p>

                <p>Color: ${item.color}</p>

                <div class="quantity-controls">

                    <button
                        type="button"
                        data-action="decrease"
                        data-index="${index}"
                    >
                        -
                    </button>

                    <span>${item.quantity}</span>

                    <button
                        type="button"
                        data-action="increase"
                        data-index="${index}"
                    >
                        +
                    </button>

                </div>

                <button
                    type="button"
                    class="remove-btn"
                    data-action="remove"
                    data-index="${index}"
                >
                    Remove
                </button>
            </div>
        `;

        fragment.appendChild(cartItem);
    }

    cartItems.replaceChildren(fragment);

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
   CART CONTROLS
========================= */

cartItems?.addEventListener("click", (event) => {

    const button =
        event.target.closest("button");

    if (!button) return;

    const index =
        Number(button.dataset.index);

    const action =
        button.dataset.action;

    if (!Number.isInteger(index)) return;

    const item = cart[index];

    if (!item) return;

    if (action === "increase") {

        if (item.quantity < 10) {
            item.quantity++;
        }

    } else if (action === "decrease") {

        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cart.splice(index, 1);
        }

    } else if (action === "remove") {

        cart.splice(index, 1);
    }

    updateCart();
});

/* =========================
   PRODUCT DETAILS
========================= */

$$(".product-click").forEach((imageBox) => {

    imageBox.addEventListener("click", () => {

        const productCard =
            imageBox.closest(".product-card");

        if (!productCard) return;

        const image =
            productCard.querySelector("img");

        const name =
            productCard
                .querySelector("h3")
                ?.textContent
                .trim() || "Product";

        const price =
            getNumber(
                productCard
                    .querySelector("p")
                    ?.textContent
            );

        const description =
            productCard.dataset.description || "";

        const size =
            productCard.querySelector(".size")?.value ||
            "S";

        const color =
            productCard.querySelector(".color")?.value ||
            "Black";

        currentProduct = {
            name,
            price,
            image: image?.src || "",
            description
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
            detailsSize.value = size;
        }

        if (detailsColor) {
            detailsColor.value = color;
        }

        if (detailsQuantity) {
            detailsQuantity.value = 1;
        }

        productDetails?.classList.add("active");

        smoothScroll(productDetails);
    });
});

/* =========================
   DETAILS ADD
========================= */

detailsAdd?.addEventListener("click", () => {

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
        detailsSize?.value || "S",
        detailsColor?.value || "Black",
        quantity
    );

    alert(
        `${currentProduct.name} added to cart 🛒`
    );
});

/* =========================
   DETAILS BUY
========================= */

detailsBuy?.addEventListener("click", () => {

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
        detailsSize?.value || "S",
        detailsColor?.value || "Black",
        quantity
    );

    updateCheckout();

    productDetails?.classList.remove("active");
    checkoutSection?.classList.add("active");

    smoothScroll(checkoutSection);
});

/* =========================
   CLOSE DETAILS
========================= */

closeDetails?.addEventListener("click", () => {

    productDetails?.classList.remove("active");

    smoothScroll(shopSection);
});

/* =========================
   CHECKOUT
========================= */

function updateCheckout() {

    if (!checkoutItems) return;

    const fragment =
        document.createDocumentFragment();

    for (const item of cart) {

        const orderItem =
            document.createElement("div");

        orderItem.className =
            "checkout-item";

        orderItem.innerHTML = `
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

        fragment.appendChild(orderItem);
    }

    checkoutItems.replaceChildren(fragment);

    if (checkoutTotal) {
        checkoutTotal.textContent =
            getCartTotal();
    }
}

/* =========================
   OPEN CHECKOUT
========================= */

checkoutButton?.addEventListener("click", () => {

    if (cart.length === 0) {
        alert("Your cart is empty 🛒");
        return;
    }

    updateCheckout();

    cartBox?.classList.remove("active");
    checkoutSection?.classList.add("active");

    smoothScroll(checkoutSection);
});

/* =========================
   BACK TO CART
========================= */

backToCart?.addEventListener("click", () => {

    checkoutSection?.classList.remove("active");
    cartBox?.classList.add("active");
});

/* =========================
   BUY NOW
========================= */

$$(".buy-now").forEach((button) => {

    button.addEventListener("click", () => {

        const productCard =
            button.closest(".product-card");

        if (!productCard) return;

        addProductToCart(productCard);

        updateCheckout();

        checkoutSection?.classList.add("active");

        smoothScroll(checkoutSection);
    });
});

/* =========================
   PLACE ORDER
========================= */

checkoutForm?.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();

        if (cart.length === 0) {
            alert("Your cart is empty 🛒");
            return;
        }

        const name =
            $("#customer-name")?.value.trim() || "";

        const phone =
            $("#customer-phone")?.value.trim() || "";

        const governorate =
            $("#governorate")?.value || "";

        const address =
            $("#customer-address")?.value.trim() || "";

        const payment =
            $("#payment-method")?.value || "";

        const total =
            getCartTotal();

        const randomNumber =
            Math.floor(
                100000 +
                Math.random() * 900000
            );

        let productsMessage = "";

        cart.forEach((item, index) => {

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
            successName.textContent = name;
        }

        if (successTotal) {
            successTotal.textContent = total;
        }

        if (orderNumber) {
            orderNumber.textContent =
                randomNumber;
        }

        checkoutSection?.classList.remove("active");
        orderSuccess?.classList.add("active");

        smoothScroll(orderSuccess);

        cart.length = 0;

        updateCart();
    }
);

/* =========================
   CONTINUE SHOPPING
========================= */

continueShopping?.addEventListener(
    "click",
    () => {

        orderSuccess?.classList.remove("active");

        smoothScroll(shopSection);
    }
);

/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    $$(".products h2, .product-card, .about, .contact");

if (prefersReducedMotion) {

    revealElements.forEach((element) => {
        element.classList.add("show");
    });

} else if ("IntersectionObserver" in window) {

    const revealObserver =
        new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) return;

                    entry.target.classList.add("show");

                    observer.unobserve(
                        entry.target
                    );
                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -40px 0px"
            }
        );

    revealElements.forEach((element) => {

        element.classList.add("reveal");

        revealObserver.observe(element);
    });

} else {

    revealElements.forEach((element) => {
        element.classList.add("show");
    });
}

/* =========================
   DESKTOP CINEMATIC EFFECTS
========================= */

if (
    !isTouchDevice &&
    !prefersReducedMotion
) {

    const cursor =
        $(".cursor-glow");

    const heroTitle =
        $(".hero h2");

    const heroText =
        $(".hero p");

    const heroButton =
        $(".hero .shop-btn");

    let mouseX = 0;
    let mouseY = 0;
    let mouseFrame = null;

    document.addEventListener(
        "mousemove",
        (event) => {

            mouseX = event.clientX;
            mouseY = event.clientY;

            if (mouseFrame) return;

            mouseFrame =
                requestAnimationFrame(() => {

                    mouseFrame = null;

                    const x =
                        (mouseX /
                            window.innerWidth -
                            0.5) * 12;

                    const y =
                        (mouseY /
                            window.innerHeight -
                            0.5) * 12;

                    if (cursor) {

                        cursor.style.transform =
                            `translate3d(${mouseX}px,${mouseY}px,0)`;
                    }

                    if (heroTitle) {

                        heroTitle.style.transform =
                            `translate3d(${x}px,${y}px,0)`;
                    }

                    if (heroText) {

                        heroText.style.transform =
                            `translate3d(${x * 0.35}px,${y * 0.35}px,0)`;
                    }

                    if (heroButton) {

                        heroButton.style.transform =
                            `translate3d(${x * 0.15}px,${y * 0.15}px,0)`;
                    }
                });
        },
        { passive: true }
    );

    /* =========================
       CURSOR HOVER
    ========================= */

    $$
        ("button, a, .product-card, .cart, .product-click")
        .forEach((element) => {

            element.addEventListener(
                "mouseenter",
                () => {
                    cursor?.classList.add(
                        "cursor-large"
                    );
                }
            );

            element.addEventListener(
                "mouseleave",
                () => {
                    cursor?.classList.remove(
                        "cursor-large"
                    );
                }
            );
        });

    /* =========================
       PRODUCT TILT
    ========================= */

    $$(".product-card").forEach((card) => {

        let tiltFrame = null;
        let lastX = 0;
        let lastY = 0;

        card.addEventListener(
            "mousemove",
            (event) => {

                lastX = event.clientX;
                lastY = event.clientY;

                if (tiltFrame) return;

                tiltFrame =
                    requestAnimationFrame(() => {

                        tiltFrame = null;

                        const rect =
                            card.getBoundingClientRect();

                        const x =
                            lastX - rect.left;

                        const y =
                            lastY - rect.top;

                        const rotateY =
                            ((x / rect.width) - 0.5) * 5;

                        const rotateX =
                            ((y / rect.height) - 0.5) * -5;

                        card.style.transform =
                            `translate3d(0,-10px,0) scale(1.02) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                    });
            },
            { passive: true }
        );

        card.addEventListener(
            "mouseleave",
            () => {

                if (tiltFrame) {
                    cancelAnimationFrame(
                        tiltFrame
                    );

                    tiltFrame = null;
                }

                card.style.transform = "";
            }
        );
    });
}

/* =========================
   POWER CLICK
========================= */

if (
    !isTouchDevice &&
    !prefersReducedMotion
) {

    document.addEventListener(
        "click",
        (event) => {

            const effect =
                document.createElement("div");

            effect.className =
                "power-effect";

            effect.style.left =
                `${event.clientX}px`;

            effect.style.top =
                `${event.clientY}px`;

            document.body.appendChild(effect);

            setTimeout(() => {
                effect.remove();
            }, 700);
        },
        { passive: true }
    );
}

/* =========================
   INITIALIZE
========================= */

updateCart();
