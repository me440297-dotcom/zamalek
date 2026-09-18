 let cart = [];


// =========================
// CART ELEMENTS
// =========================

const cartButton = document.getElementById("cart-button");
const cartBox = document.getElementById("cart-box");
const closeCart = document.getElementById("close-cart");

const cartCount = document.getElementById("cart-count");
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");


// =========================
// CHECKOUT ELEMENTS
// =========================

const checkoutItems = document.getElementById("checkout-items");
const checkoutButton = document.getElementById("checkout-btn");
const checkoutSection = document.getElementById("checkout");
const checkoutTotal = document.getElementById("checkout-total");
const backToCart = document.getElementById("back-to-cart");
const checkoutForm = document.getElementById("checkout-form");


// =========================
// SUCCESS ELEMENTS
// =========================

const orderSuccess = document.getElementById("order-success");
const successName = document.getElementById("success-name");
const successTotal = document.getElementById("success-total");
const orderNumber = document.getElementById("order-number");
const continueShopping = document.getElementById("continue-shopping");


// =========================
// PRODUCT ELEMENTS
// =========================

const productCards =
    document.querySelectorAll(".product-card");


// =========================
// PRODUCT DETAILS ELEMENTS
// =========================

const productDetails =
    document.getElementById("product-details");

const detailsImage =
    document.getElementById("details-image");

const detailsName =
    document.getElementById("details-name");

const detailsPrice =
    document.getElementById("details-price");

const detailsDescription =
    document.getElementById("details-description");

const detailsSize =
    document.getElementById("details-size");

const detailsColor =
    document.getElementById("details-color");

const detailsQuantity =
    document.getElementById("details-quantity");

const detailsAdd =
    document.getElementById("details-add");

const detailsBuy =
    document.getElementById("details-buy");

const closeDetails =
    document.getElementById("close-details");

let currentProduct = null;


// =========================
// فتح السلة
// =========================

cartButton.addEventListener("click", () => {

    cartBox.classList.add("active");

});


// =========================
// قفل السلة
// =========================

closeCart.addEventListener("click", () => {

    cartBox.classList.remove("active");

});


// =========================
// إضافة منتج للسلة
// =========================

productCards.forEach((productCard) => {

    const addButton =
        productCard.querySelector(".add-to-cart");

    addButton.addEventListener("click", () => {

        addProductToCart(productCard);

        alert(
            productCard.querySelector("h3").textContent.trim() +
            " added to cart 🛒"
        );

    });

});


// =========================
// إضافة المنتج للسلة
// =========================

function addProductToCart(productCard) {

    const productName =
        productCard
            .querySelector("h3")
            .textContent
            .trim();

    const priceText =
        productCard.querySelector("p").textContent;

    const productPrice =
        parseInt(
            priceText.replace(/\D/g, "")
        );

    const size =
        productCard.querySelector(".size")?.value ||
        "Default";

    const color =
        productCard.querySelector(".color")?.value ||
        "Default";

    const quantityElement =
        productCard.querySelector(".product-quantity");

    let quantity =
        quantityElement
            ? parseInt(quantityElement.value) || 1
            : 1;

    quantity =
        Math.max(
            1,
            Math.min(10, quantity)
        );

    addItemToCart(
        productName,
        productPrice,
        size,
        color,
        quantity
    );

}


// =========================
// إضافة بيانات المنتج للسلة
// =========================

function addItemToCart(
    name,
    price,
    size,
    color,
    quantity
) {

    const existingProduct =
        cart.find(
            item =>
                item.name === name &&
                item.size === size &&
                item.color === color
        );


    if (existingProduct) {

        existingProduct.quantity += quantity;

        if (existingProduct.quantity > 10) {
            existingProduct.quantity = 10;
        }

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


// =========================
// تحديث السلة
// =========================

function updateCart() {

    cartItems.innerHTML = "";

    let total = 0;
    let count = 0;


    cart.forEach((item, index) => {

        total +=
            item.price *
            item.quantity;

        count +=
            item.quantity;


        const cartItem =
            document.createElement("div");

        cartItem.classList.add("cart-item");


        cartItem.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <p>
                    EGP ${item.price}
                </p>

                <p>
                    Size: ${item.size}
                </p>

                <p>
                    Color: ${item.color}
                </p>

                <div class="quantity-controls">

                    <button
                        onclick="decreaseQuantity(${index})"
                    >
                        -
                    </button>

                    <span>
                        ${item.quantity}
                    </span>

                    <button
                        onclick="increaseQuantity(${index})"
                    >
                        +
                    </button>

                </div>

                <button
                    class="remove-btn"
                    onclick="removeItem(${index})"
                >
                    Remove
                </button>

            </div>

        `;


        cartItems.appendChild(cartItem);

    });


    cartCount.textContent =
        count;

    cartTotal.textContent =
        total;

}


// =========================
// زيادة الكمية
// =========================

function increaseQuantity(index) {

    if (!cart[index]) return;


    if (cart[index].quantity < 10) {

        cart[index].quantity++;

        updateCart();

    }

}


// =========================
// تقليل الكمية
// =========================

function decreaseQuantity(index) {

    if (!cart[index]) return;


    if (cart[index].quantity > 1) {

        cart[index].quantity--;

    } else {

        cart.splice(index, 1);

    }


    updateCart();

}


// =========================
// حذف المنتج
// =========================

function removeItem(index) {

    cart.splice(index, 1);

    updateCart();

}


// =========================
// PRODUCT DETAILS
// =========================

document
    .querySelectorAll(".product-click")
    .forEach((imageBox) => {

        imageBox.addEventListener("click", () => {

            const productCard =
                imageBox.closest(".product-card");

            const image =
                productCard.querySelector("img");

            const name =
                productCard
                    .querySelector("h3")
                    .textContent
                    .trim();

            const price =
                parseInt(
                    productCard
                        .querySelector("p")
                        .textContent
                        .replace(/\D/g, "")
                );

            const description =
                productCard.dataset.description;

            const size =
                productCard.querySelector(".size")?.value ||
                "S";

            const color =
                productCard.querySelector(".color")?.value ||
                "Black";


            currentProduct = {

                name: name,
                price: price,
                image: image.src,
                description: description

            };


            detailsImage.src =
                currentProduct.image;

            detailsImage.alt =
                currentProduct.name;

            detailsName.textContent =
                currentProduct.name;

            detailsPrice.textContent =
                currentProduct.price;

            detailsDescription.textContent =
                currentProduct.description;

            detailsSize.value =
                size;

            detailsColor.value =
                color;

            detailsQuantity.value =
                1;


            productDetails.classList.add("active");


            productDetails.scrollIntoView({
                behavior: "smooth"
            });

        });

    });


// =========================
// ADD TO CART FROM DETAILS
// =========================

detailsAdd.addEventListener("click", () => {

    if (!currentProduct) return;


    let quantity =
        parseInt(detailsQuantity.value) || 1;


    quantity =
        Math.max(
            1,
            Math.min(10, quantity)
        );


    addItemToCart(

        currentProduct.name,

        currentProduct.price,

        detailsSize.value,

        detailsColor.value,

        quantity

    );


    alert(
        currentProduct.name +
        " added to cart 🛒"
    );

});


// =========================
// BUY NOW FROM DETAILS
// =========================

detailsBuy.addEventListener("click", () => {

    if (!currentProduct) return;


    let quantity =
        parseInt(detailsQuantity.value) || 1;


    quantity =
        Math.max(
            1,
            Math.min(10, quantity)
        );


    addItemToCart(

        currentProduct.name,

        currentProduct.price,

        detailsSize.value,

        detailsColor.value,

        quantity

    );


    updateCheckout();


    productDetails.classList.remove("active");

    checkoutSection.classList.add("active");


    checkoutSection.scrollIntoView({
        behavior: "smooth"
    });

});


// =========================
// CLOSE PRODUCT DETAILS
// =========================

closeDetails.addEventListener("click", () => {

    productDetails.classList.remove("active");


    document
        .getElementById("shop")
        .scrollIntoView({
            behavior: "smooth"
        });

});


// =========================
// CHECKOUT DETAILS
// =========================

function updateCheckout() {

    checkoutItems.innerHTML = "";


    cart.forEach((item) => {

        const orderItem =
            document.createElement("div");

        orderItem.classList.add(
            "checkout-item"
        );


        orderItem.innerHTML = `

            <div>

                <strong>
                    ${item.name}
                </strong>

                <p>
                    Size: ${item.size}
                </p>

                <p>
                    Color: ${item.color}
                </p>

                <p>
                    Quantity: ${item.quantity}
                </p>

            </div>

            <strong>
                EGP ${item.price * item.quantity}
            </strong>

        `;


        checkoutItems.appendChild(
            orderItem
        );

    });


    checkoutTotal.textContent =
        cartTotal.textContent;

}


// =========================
// فتح CHECKOUT
// =========================

checkoutButton.addEventListener("click", () => {

    if (cart.length === 0) {

        alert(
            "Your cart is empty 🛒"
        );

        return;

    }


    updateCheckout();


    cartBox.classList.remove(
        "active"
    );

    checkoutSection.classList.add(
        "active"
    );


    checkoutSection.scrollIntoView({
        behavior: "smooth"
    });

});


// =========================
// الرجوع للسلة
// =========================

backToCart.addEventListener("click", () => {

    checkoutSection.classList.remove(
        "active"
    );

    cartBox.classList.add(
        "active"
    );

});


// =========================
// BUY NOW FROM PRODUCTS
// =========================

const buyNowButtons =
    document.querySelectorAll(".buy-now");


buyNowButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const productCard =
            button.closest(".product-card");


        addProductToCart(
            productCard
        );


        updateCheckout();


        checkoutSection.classList.add(
            "active"
        );


        checkoutSection.scrollIntoView({
            behavior: "smooth"
        });

    });

});


// =========================
// PLACE ORDER
// =========================

checkoutForm.addEventListener(
    "submit",
    (event) => {

        event.preventDefault();


        if (cart.length === 0) {

            alert(
                "Your cart is empty 🛒"
            );

            return;

        }


        const name =
            document
                .getElementById("customer-name")
                .value
                .trim();


        const phone =
            document
                .getElementById("customer-phone")
                .value
                .trim();


        const governorate =
            document
                .getElementById("governorate")
                .value;


        const address =
            document
                .getElementById("customer-address")
                .value
                .trim();


        const payment =
            document
                .getElementById("payment-method")
                .value;


        const total =
            cartTotal.textContent;


        // رقم الطلب

        const randomNumber =
            Math.floor(
                100000 +
                Math.random() * 900000
            );


        // =========================
        // تجهيز المنتجات
        // =========================

        let productsMessage = "";


        cart.forEach(
            (item, index) => {

                productsMessage +=

                    `${index + 1}. ${item.name}\n` +

                    `Size: ${item.size}\n` +

                    `Color: ${item.color}\n` +

                    `Quantity: ${item.quantity}\n` +

                    `Price: EGP ${item.price * item.quantity}\n\n`;

            }
        );


        // =========================
        // رسالة واتساب
        // =========================

        const message =

            `🛍️ ZAMALEK NEW ORDER\n\n` +

            `Order #: ${randomNumber}\n\n` +

            `👤 Customer:\n` +

            `${name}\n\n` +

            `📱 Phone:\n` +

            `${phone}\n\n` +

            `📍 Address:\n` +

            `${governorate}\n` +

            `${address}\n\n` +

            `🛒 ORDER DETAILS:\n\n` +

            `${productsMessage}` +

            `💰 TOTAL: EGP ${total}\n\n` +

            `💳 Payment: ${payment}`;


        // =========================
        // رقم واتساب المتجر
        // =========================

        const whatsappNumber =
            "201227840123";


        const whatsappURL =
            "https://wa.me/" +
            whatsappNumber +
            "?text=" +
            encodeURIComponent(
                message
            );


        // =========================
        // فتح واتساب
        // =========================

        window.open(
            whatsappURL,
            "_blank"
        );


        // =========================
        // صفحة تأكيد الطلب
        // =========================

        successName.textContent =
            name;

        successTotal.textContent =
            total;

        orderNumber.textContent =
            randomNumber;


        checkoutSection.classList.remove(
            "active"
        );

        orderSuccess.classList.add(
            "active"
        );


        orderSuccess.scrollIntoView({
            behavior: "smooth"
        });


        // تفريغ السلة

        cart = [];

        updateCart();

    }
);


// =========================
// CONTINUE SHOPPING
// =========================

continueShopping.addEventListener(
    "click",
    () => {

        orderSuccess.classList.remove(
            "active"
        );

        document
            .getElementById("shop")
            .scrollIntoView({
                behavior: "smooth"
            });

    }
);/* =========================================
   ANIME SCROLL REVEAL
   ========================================= */

const revealElements = document.querySelectorAll(
    ".products h2, .product-card, .about, .contact"
);

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    },
    {
        threshold: 0.15
    }
);


revealElements.forEach((element) => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

html {
    scroll-behavior: smooth;
}

:root {
    --red: #ff1744;
    --red-dark: #8b001f;
    --blue: #00c8ff;
    --purple: #8a2be2;
    --pink: #ff00a8;
    --white: #ffffff;
    --gray: #9a9a9a;
    --dark: #050507;
}

body {
    background:
        radial-gradient(circle at 10% 10%, rgba(255, 0, 80, .13), transparent 25%),
        radial-gradient(circle at 90% 20%, rgba(0, 190, 255, .10), transparent 25%),
        radial-gradient(circle at 50% 80%, rgba(130, 0, 255, .09), transparent 30%),
        #030305;

    color: white;
    font-family: Arial, sans-serif;

    overflow-x: hidden;

    position: relative;

    animation: pageEnter 1s ease;
}


/* ==================================================
   ANIMATED COLOR ATMOSPHERE
================================================== */

body::before {

    content: "";

    position: fixed;

    inset: -30%;

    z-index: -10;

    background:
        radial-gradient(
            circle at 20% 30%,
            rgba(255, 0, 70, .18),
            transparent 22%
        ),
        radial-gradient(
            circle at 80% 25%,
            rgba(0, 180, 255, .15),
            transparent 20%
        ),
        radial-gradient(
            circle at 50% 80%,
            rgba(140, 0, 255, .13),
            transparent 25%
        );

    filter: blur(50px);

    animation: colorUniverse 12s ease-in-out infinite alternate;

    pointer-events: none;
}

@keyframes colorUniverse {

    0% {
        transform: translate(-3%, -2%) scale(1);
    }

    50% {
        transform: translate(4%, 3%) scale(1.12);
    }

    100% {
        transform: translate(-2%, 5%) scale(1.05);
    }
}


/* ==================================================
   HUGE JAPANESE / CHINESE STYLE BACKGROUND
================================================== */

body::after {

    content: "力  魂  自由  熱血  無限";

    position: fixed;

    top: 50%;
    left: 50%;

    transform:
        translate(-50%, -50%)
        rotate(-8deg);

    width: 180%;

    white-space: nowrap;

    font-size: clamp(100px, 15vw, 260px);

    font-weight: 900;

    letter-spacing: 45px;

    color: rgba(255,255,255,.025);

    z-index: -9;

    pointer-events: none;

    animation: kanjiMove 18s linear infinite;
}

@keyframes kanjiMove {

    0% {
        transform:
            translate(-55%, -50%)
            rotate(-8deg);
    }

    50% {
        transform:
            translate(-45%, -48%)
            rotate(-4deg);
    }

    100% {
        transform:
            translate(-55%, -50%)
            rotate(-8deg);
    }
}


/* ==================================================
   PAGE
================================================== */

@keyframes pageEnter {

    from {
        opacity: 0;
        filter: blur(8px);
    }

    to {
        opacity: 1;
        filter: blur(0);
    }
}


/* ==================================================
   HEADER
================================================== */

header {

    position: relative;
    z-index: 100;

    display: flex;

    justify-content: space-between;
    align-items: center;

    padding: 28px 65px;

    background: rgba(5,5,8,.55);

    backdrop-filter: blur(20px);

    border-bottom: 1px solid rgba(255,255,255,.06);

    box-shadow:
        0 10px 50px rgba(0,0,0,.4);

    animation: headerAppear 1s cubic-bezier(.2,.8,.2,1);
}

@keyframes headerAppear {

    from {
        opacity: 0;
        transform: translateY(-60px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}


header h1 {

    font-size: 34px;

    letter-spacing: 8px;

    font-weight: 900;

    position: relative;

    background:
        linear-gradient(
            90deg,
            white,
            #ff1744,
            #00c8ff,
            white
        );

    background-size: 300%;

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    animation: logoGradient 5s linear infinite;
}

@keyframes logoGradient {

    0% {
        background-position: 0%;
    }

    100% {
        background-position: 300%;
    }
}


/* ==================================================
   NAV
================================================== */

nav {

    display: flex;

    gap: 35px;
}

nav a {

    color: #aaa;

    text-decoration: none;

    font-size: 15px;

    letter-spacing: 2px;

    position: relative;

    transition: .35s;
}

nav a::before {

    content: "";

    position: absolute;

    width: 0;

    height: 1px;

    left: 0;

    bottom: -8px;

    background:
        linear-gradient(
            90deg,
            var(--red),
            var(--blue)
        );

    transition: .35s;
}

nav a:hover {

    color: white;

    text-shadow:
        0 0 15px rgba(255,255,255,.5);

    transform: translateY(-2px);
}

nav a:hover::before {
    width: 100%;
}


/* ==================================================
   CART
================================================== */

.cart {

    cursor: pointer;

    padding: 10px 15px;

    border: 1px solid rgba(255,255,255,.1);

    border-radius: 30px;

    background: rgba(255,255,255,.03);

    backdrop-filter: blur(10px);

    transition: .3s;
}

.cart:hover {

    transform: scale(1.08);

    border-color: var(--red);

    box-shadow:
        0 0 25px rgba(255,23,68,.25);
}

#cart-count {

    display: inline-flex;

    align-items: center;
    justify-content: center;

    width: 23px;
    height: 23px;

    background:
        linear-gradient(
            135deg,
            var(--red),
            var(--pink)
        );

    color: white;

    border-radius: 50%;

    font-size: 12px;

    box-shadow:
        0 0 15px rgba(255,23,68,.5);
}


/* ==================================================
   HERO
================================================== */

.hero {

    min-height: 90vh;

    display: flex;

    flex-direction: column;

    justify-content: center;

    align-items: center;

    text-align: center;

    position: relative;

    overflow: hidden;

    padding: 50px 20px;

    background:
        linear-gradient(
            180deg,
            rgba(0,0,0,.1),
            rgba(0,0,0,.7)
        );
}


/* HERO GRID */

.hero::before {

    content: "";

    position: absolute;

    inset: 0;

    background:
        linear-gradient(
            rgba(255,255,255,.025) 1px,
            transparent 1px
        ),
        linear-gradient(
            90deg,
            rgba(255,255,255,.025) 1px,
            transparent 1px
        );

    background-size: 60px 60px;

    mask-image:
        radial-gradient(
            circle,
            black 20%,
            transparent 75%
        );

    animation: gridMove 12s linear infinite;

    pointer-events: none;
}

@keyframes gridMove {

    from {
        background-position: 0 0;
    }

    to {
        background-position: 60px 60px;
    }
}


/* HERO GIANT LETTER */

.hero::after {

    content: "影";

    position: absolute;

    right: 4%;

    top: 5%;

    font-size: clamp(220px, 35vw, 600px);

    font-weight: 900;

    color: rgba(255,23,68,.045);

    text-shadow:
        0 0 100px rgba(255,0,60,.08);

    animation: giantShadow 7s ease-in-out infinite;

    pointer-events: none;
}

@keyframes giantShadow {

    0%,100% {
        transform:
            rotate(8deg)
            translateY(0);
    }

    50% {
        transform:
            rotate(-3deg)
            translateY(-40px);
    }
}


/* ==================================================
   HERO TITLE
================================================== */

.hero h2 {

    position: relative;

    z-index: 5;

    font-size: clamp(55px, 9vw, 125px);

    font-weight: 900;

    letter-spacing: 12px;

    line-height: .95;

    background:
        linear-gradient(
            100deg,
            #fff 0%,
            #fff 35%,
            #ff1744 50%,
            #00c8ff 65%,
            #fff 100%
        );

    background-size: 300%;

    -webkit-background-clip: text;

    -webkit-text-fill-color: transparent;

    animation:
        heroTitle 1.3s cubic-bezier(.17,.67,.3,1.4),
        titleGradient 5s linear infinite;

    filter:
        drop-shadow(0 0 30px rgba(255,0,70,.18));
}

@keyframes heroTitle {

    0% {
        opacity: 0;

        transform:
            translateY(100px)
            scale(.4)
            skewX(10deg);

        filter: blur(20px);
    }

    60% {
        transform:
            translateY(-10px)
            scale(1.08)
            skewX(-2deg);
    }

    100% {
        opacity: 1;

        transform:
            translateY(0)
            scale(1)
            skewX(0);

        filter: blur(0);
    }
}

@keyframes titleGradient {

    0% {
        background-position: 0%;
    }

    100% {
        background-position: 300%;
    }
}


.hero h2::after {

    content: "";

    display: block;

    width: 180px;

    height: 4px;

    margin: 30px auto;

    background:
        linear-gradient(
            90deg,
            transparent,
            var(--red),
            var(--blue),
            transparent
        );

    box-shadow:
        0 0 15px var(--red),
        0 0 35px var(--blue);

    animation: linePower 2s ease infinite alternate;
}

@keyframes linePower {

    from {
        width: 100px;
        opacity: .5;
    }

    to {
        width: 240px;
        opacity: 1;
    }
}


.hero p {

    position: relative;

    z-index: 5;

    max-width: 650px;

    color: #aaa;

    font-size: 20px;

    line-height: 1.8;

    letter-spacing: 3px;

    animation: heroText 1.8s ease;
}

@keyframes heroText {

    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}


/* ==================================================
   PREMIUM BUTTON
================================================== */

.shop-btn {

    position: relative;

    z-index: 5;

    margin-top: 35px;

    padding: 18px 55px;

    border: 1px solid rgba(255,255,255,.2);

    background:
        linear-gradient(
            135deg,
            white,
            #ddd
        );

    color: black;

    font-size: 15px;

    font-weight: 900;

    letter-spacing: 3px;

    cursor: pointer;

    overflow: hidden;

    transition: .4s;

    box-shadow:
        0 0 0 transparent;
}

.shop-btn::before {

    content: "";

    position: absolute;

    inset: 0;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.8),
            transparent
        );

    transform:
        translateX(-120%)
        skewX(-20deg);

    transition: .7s;
}

.shop-btn:hover::before {

    transform:
        translateX(120%)
        skewX(-20deg);
}

.shop-btn:hover {

    background:
        linear-gradient(
            135deg,
            var(--red),
            var(--pink)
        );

    color: white;

    transform:
        translateY(-5px)
        scale(1.05);

    box-shadow:
        0 15px 50px rgba(255,23,68,.35),
        0 0 30px rgba(255,23,68,.25);
}


/* ==================================================
   PRODUCTS SECTION
================================================== */

.products {

    position: relative;

    padding: 130px 60px;

    overflow: hidden;

    background:
        linear-gradient(
            180deg,
            transparent,
            rgba(255,0,70,.035),
            transparent
        );
}

.products h2 {

    position: relative;

    z-index: 5;

    text-align: center;

    font-size: clamp(35px, 5vw, 60px);

    letter-spacing: 7px;

    margin-bottom: 70px;

    text-transform: uppercase;

    background:
        linear-gradient(
            90deg,
            white,
            #ff1744,
            #00c8ff,
            white
        );

    background-size: 300%;

    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;

    animation: titleGradient 6s linear infinite;
}

.products h2::after,
.about h2::after,
.contact h2::after {

    content: "";

    display: block;

    width: 80px;

    height: 3px;

    margin: 20px auto;

    background:
        linear-gradient(
            90deg,
            var(--red),
            var(--blue)
        );

    box-shadow:
        0 0 20px var(--red);
}


/* BIG BACKGROUND */

.products::before {

    content: "戦";

    position: absolute;

    right: -100px;

    top: 20px;

    font-size: 600px;

    font-weight: 900;

    color: rgba(0,200,255,.025);

    animation: battleFloat 8s ease-in-out infinite;

    pointer-events: none;
}

@keyframes battleFloat {

    0%,100% {
        transform: rotate(5deg) scale(1);
    }

    50% {
        transform: rotate(-5deg) scale(1.08);
    }
}


/* ==================================================
   PRODUCT CONTAINER
================================================== */

.product-container {

    position: relative;

    z-index: 5;

    display: flex;

    justify-content: center;

    gap: 35px;

    flex-wrap: wrap;
}


/* ==================================================
   PRODUCT CARD
================================================== */

.product-card {

    width: 300px;

    padding: 12px;

    position: relative;

    overflow: hidden;

    background:
        linear-gradient(
            145deg,
            rgba(255,255,255,.08),
            rgba(255,255,255,.015)
        );

    border: 1px solid rgba(255,255,255,.09);

    backdrop-filter: blur(18px);

    box-shadow:
        0 25px 70px rgba(0,0,0,.55);

    transition:
        .5s cubic-bezier(.17,.67,.3,1.3);

    animation: cardAppear .9s ease both;
}

.product-card:nth-child(1) {
    animation-delay: .15s;
}

.product-card:nth-child(2) {
    animation-delay: .3s;
}

.product-card:nth-child(3) {
    animation-delay: .45s;
}

@keyframes cardAppear {

    from {
        opacity: 0;

        transform:
            translateY(80px)
            rotateX(15deg)
            scale(.85);
    }

    to {
        opacity: 1;

        transform:
            translateY(0)
            rotateX(0)
            scale(1);
    }
}


/* COLOR BORDER */

.product-card::before {

    content: "";

    position: absolute;

    inset: -2px;

    background:
        linear-gradient(
            135deg,
            transparent 30%,
            var(--red),
            transparent 60%,
            var(--blue)
        );

    opacity: 0;

    z-index: -1;

    transition: .5s;
}

.product-card:hover::before {
    opacity: 1;
}


/* NUMBER */

.product-card::after {

    content: "01";

    position: absolute;

    right: 20px;

    top: 15px;

    font-size: 14px;

    font-weight: 900;

    letter-spacing: 3px;

    color: rgba(255,255,255,.4);

    z-index: 10;
}

.product-card:nth-child(2)::after {
    content: "02";
}

.product-card:nth-child(3)::after {
    content: "03";
}


.product-card:hover {

    transform:
        translateY(-18px)
        scale(1.035)
        rotateX(2deg);

    border-color: rgba(255,23,68,.5);

    box-shadow:
        0 40px 90px rgba(0,0,0,.8),
        0 0 50px rgba(255,23,68,.12),
        0 0 80px rgba(0,200,255,.08);
}


/* ==================================================
   PRODUCT IMAGE
================================================== */

.product-image {

    width: 100%;

    height: 390px;

    position: relative;

    overflow: hidden;

    background:
        radial-gradient(
            circle,
            #27272c,
            #09090b
        );
}

.product-image::before {

    content: "";

    position: absolute;

    inset: 0;

    background:
        linear-gradient(
            135deg,
            rgba(255,23,68,.15),
            transparent 40%,
            rgba(0,200,255,.1)
        );

    z-index: 1;

    pointer-events: none;
}

.product-image::after {

    content: "";

    position: absolute;

    top: -100%;

    left: -100%;

    width: 60%;

    height: 300%;

    background:
        linear-gradient(
            90deg,
            transparent,
            rgba(255,255,255,.2),
            transparent
        );

    transform: rotate(25deg);

    transition: .8s;

    z-index: 3;
}

.product-card:hover .product-image::after {

    left: 150%;

    top: -50%;
}

.product-image img {

    width: 100%;

    height: 100%;

    object-fit: contain;

    transition:
        .7s cubic-bezier(.17,.67,.3,1.3);

    position: relative;

    z-index: 2;
}

.product-card:hover .product-image img {

    transform:
        scale(1.12)
        translateY(-5px);
}


/* ==================================================
   PRODUCT TEXT
================================================== */

.product-card h3 {

    margin-top: 22px;

    font-size: 20px;

    letter-spacing: 1px;
}

.product-card p {

    margin-top: 10px;

    color: #aaa;

    font-size: 15px;

    line-height: 1.6;
}


/* ==================================================
   OPTIONS
================================================== */

.product-options,
.quantity-selector {

    margin-top: 18px;
}

.product-options label,
.quantity-selector label {

    display: block;

    margin-bottom: 7px;

    color: #888;

    font-size: 12px;

    letter-spacing: 2px;

    text-transform: uppercase;
}

.product-options select,
.product-quantity {

    width: 100%;

    padding: 12px;

    background:
        rgba(0,0,0,.6);

    color: white;

    border: 1px solid #333;

    outline: none;

    transition: .3s;
}

.product-options select:focus,
.product-quantity:focus {

    border-color: var(--red);

    box-shadow:
        0 0 20px rgba(255,23,68,.15);
}


/* ==================================================
   PRODUCT BUTTONS
================================================== */

.product-card button {

    width: 100%;

    padding: 14px;

    margin-top: 20px;

    border: none;

    background: white;

    color: black;

    font-weight: 900;

    letter-spacing: 2px;

    cursor: pointer;

    transition: .35s;

    position: relative;

    overflow: hidden;
}

.product-card button:hover {

    background:
        linear-gradient(
            90deg,
            var(--red),
            var(--pink)
        );

    color: white;

    transform: translateY(-3px);

    box-shadow:
        0 12px 35px rgba(255,23,68,.3);
}

.buy-now {

    background: #19191d !important;

    color: white !important;

    border: 1px solid #333 !important;
}

.buy-now:hover {

    background:
        linear-gradient(
            90deg,
            #4215ff,
            #00c8ff
        ) !important;

    box-shadow:
        0 12px 35px rgba(0,180,255,.25) !important;
}


/* ==================================================
   PRODUCT DETAILS
================================================== */

.product-details {

    display: none;

    min-height: 100vh;

    padding: 100px 30px;

    background:
        radial-gradient(
            circle at 20% 50%,
            rgba(255,0,70,.12),
            transparent 35%
        ),
        radial-gradient(
            circle at 80% 30%,
            rgba(0,190,255,.1),
            transparent 30%
        ),
        #050507;
}

.product-details.active {

    display: block;

    animation: detailOpen .7s cubic-bezier(.17,.67,.3,1.3);
}

@keyframes detailOpen {

    from {
        opacity: 0;
        transform:
            scale(.92)
            translateY(40px);
        filter: blur(10px);
    }

    to {
        opacity: 1;
        transform:
            scale(1)
            translateY(0);
        filter: blur(0);
    }
}

.details-container {

    max-width: 1100px;

    margin: auto;

    display: flex;

    align-items: center;

    gap: 70px;
}

.details-image {

    width: 52%;

    height: 650px;

    background:
        radial-gradient(
            circle,
            #29292e,
            #08080a
        );

    border: 1px solid rgba(255,255,255,.08);

    box-shadow:
        0 40px 100px rgba(0,0,0,.7);
}

.details-image img {

    width: 100%;
    height: 100%;

    object-fit: contain;
}

.details-info {

    width: 48%;
}

.details-info h2 {

    font-size: clamp(35px, 5vw, 60px);

    line-height: 1;

    margin-bottom: 20px;
}

.details-price {

    font-size: 28px;

    font-weight: bold;

    color: var(--red);

    text-shadow:
        0 0 20px rgba(255,23,68,.25);

    margin-bottom: 25px;
}

#details-description {

    color: #999;

    line-height: 1.9;

    font-size: 16px;

    margin-bottom: 30px;
}

.details-info select,
#details-quantity {

    width: 100%;

    padding: 14px;

    margin-bottom: 10px;

    background: #0d0d10;

    color: white;

    border: 1px solid #333;
}

.details-info button {

    width: 100%;

    padding: 15px;

    margin-top: 12px;

    border: none;

    cursor: pointer;

    font-weight: bold;

    letter-spacing: 2px;

    transition: .3s;
}

#details-add {

    background: white;

    color: black;
}

#details-add:hover {

    background: var(--red);

    color: white;

    box-shadow:
        0 0 30px rgba(255,23,68,.3);
}

#details-buy {

    background:
        linear-gradient(
            90deg,
            #1717ff,
            #00c8ff
        );

    color: white;
}

#details-buy:hover {

    transform: translateY(-3px);

    box-shadow:
        0 0 35px rgba(0,200,255,.3);
}

#close-details {

    background: transparent !important;

    color: #888 !important;

    border: 1px solid #333 !important;
}

#close-details:hover {

    color: white !important;

    border-color: white !important;

    background: rgba(255,255,255,.04) !important;
}


/* ==================================================
   CART
================================================== */

.cart-box {

    position: fixed;

    top: 0;

    right: -430px;

    width: 410px;

    height: 100vh;

    padding: 35px;

    z-index: 1000;

    overflow-y: auto;

    background:
        linear-gradient(
            145deg,
            rgba(30,30,36,.97),
            rgba(5,5,8,.98)
        );

    backdrop-filter: blur(30px);

    border-left: 1px solid rgba(255,255,255,.08);

    box-shadow:
        -30px 0 100px rgba(0,0,0,.7);

    transition: .5s cubic-bezier(.17,.67,.3,1.3);
}

.cart-box.active {

    right: 0;

    box-shadow:
        -20px 0 100px rgba(255,0,70,.08);
}

.cart-box h2 {

    font-size: 32px;

    letter-spacing: 4px;

    margin-bottom: 35px;
}

.cart-item {

    padding: 18px 0;

    border-bottom: 1px solid #29292d;
}

.cart-total {

    margin-top: 30px;

    font-size: 23px;

    color: var(--red);
}

.quantity-controls {

    display: flex;

    align-items: center;

    gap: 8px;

    margin-top: 12px;
}

.quantity-controls button {

    width: auto;

    padding: 6px 12px;

    margin: 0;

    background: white;

    color: black;

    border: none;

    cursor: pointer;
}

.remove-btn {

    width: auto !important;

    padding: 7px 12px !important;

    margin-top: 10px !important;

    background: #29292d !important;

    color: #aaa !important;
}

#checkout-btn {

    width: 100%;

    margin-top: 18px;

    padding: 15px;

    border: none;

    background:
        linear-gradient(
            90deg,
            var(--red),
            var(--pink)
        );

    color: white;

    font-weight: bold;

    cursor: pointer;

    transition: .3s;
}

#checkout-btn:hover {

    transform: translateY(-3px);

    box-shadow:
        0 15px 40px rgba(255,23,68,.3);
}

#close-cart {

    width: 100%;

    margin-top: 25px;

    padding: 13px;

    background: transparent;

    color: #aaa;

    border: 1px solid #333;

    cursor: pointer;
}


/* ==================================================
   ABOUT
================================================== */

.about {

    position: relative;

    overflow: hidden;

    padding: 140px 30px;

    text-align: center;

    background:
        linear-gradient(
            135deg,
            #0c0c10,
            #08080b
        );
}

.about::before {

    content: "無限";

    position: absolute;

    left: -30px;

    top: 10px;

    font-size: 300px;

    font-weight: 900;

    color: rgba(255,0,70,.025);

    animation: infinityMove 8s ease-in-out infinite;

    pointer-events: none;
}

@keyframes infinityMove {

    0%,100% {
        transform: rotate(-10deg) translateY(0);
    }

    50% {
        transform: rotate(-5deg) translateY(-30px);
    }
}

.about h2,
.contact h2 {

    position: relative;

    font-size: 50px;

    letter-spacing: 6px;

    margin-bottom: 30px;
}

.about p {

    position: relative;

    max-width: 750px;

    margin: auto;

    color: #999;

    font-size: 18px;

    line-height: 2;
}


/* ==================================================
   CONTACT
================================================== */

.contact {

    position: relative;

    overflow: hidden;

    padding: 140px 30px;

    text-align: center;

    background:
        radial-gradient(
            circle at 50% 50%,
            rgba(0,180,255,.06),
            transparent 35%
        );
}

.contact::after {

    content: "自由";

    position: absolute;

    right: -20px;

    bottom: -50px;

    font-size: 300px;

    font-weight: 900;

    color: rgba(0,200,255,.025);

    animation: freedomMove 8s ease-in-out infinite;

    pointer-events: none;
}

@keyframes freedomMove {

    0%,100% {
        transform: rotate(8deg);
    }

    50% {
        transform: rotate(-4deg) translateY(-25px);
    }
}

.contact > p {

    color: #999;

    font-size: 18px;
}

.contact-info {

    position: relative;

    z-index: 2;

    margin-top: 35px;
}

.contact-info p {

    margin: 15px 0;

    color: #ddd;
}


/* ==================================================
   CHECKOUT
================================================== */

.checkout {

    display: none;

    min-height: 100vh;

    padding: 100px 20px;

    background:
        radial-gradient(
            circle at 50% 20%,
            rgba(255,0,70,.12),
            transparent 35%
        ),
        #050507;
}

.checkout.active {

    display: block;

    animation: detailOpen .6s ease;
}

.checkout-container {

    max-width: 650px;

    margin: auto;

    padding: 45px;

    background:
        rgba(255,255,255,.035);

    border: 1px solid rgba(255,255,255,.08);

    backdrop-filter: blur(20px);

    box-shadow:
        0 30px 90px rgba(0,0,0,.6);
}

.checkout-container h2 {

    text-align: center;

    font-size: 42px;

    letter-spacing: 5px;

    margin-bottom: 40px;
}

#checkout-form label {

    display: block;

    margin-top: 20px;

    margin-bottom: 8px;

    color: #888;

    font-size: 13px;

    letter-spacing: 1px;
}

#checkout-form input,
#checkout-form select,
#checkout-form textarea {

    width: 100%;

    padding: 14px;

    background: rgba(0,0,0,.5);

    color: white;

    border: 1px solid #333;

    outline: none;

    transition: .3s;
}

#checkout-form input:focus,
#checkout-form select:focus,
#checkout-form textarea:focus {

    border-color: var(--red);

    box-shadow:
        0 0 20px rgba(255,23,68,.12);
}

#checkout-form textarea {

    min-height: 120px;

    resize: vertical;
}

#checkout-form button {

    width: 100%;

    padding: 15px;

    margin-top: 30px;

    border: none;

    background:
        linear-gradient(
            90deg,
            var(--red),
            var(--pink)
        );

    color: white;

    font-weight: bold;

    cursor: pointer;
}

.checkout-summary {

    margin-top: 30px;

    padding: 22px;

    border: 1px solid #333;

    background: rgba(0,0,0,.3);
}

.checkout-summary p {

    font-size: 24px;

    color: var(--red);
}

.checkout-item {

    display: flex;

    justify-content: space-between;

    padding: 15px 0;

    border-bottom: 1px solid #29292d;
}

.checkout-final-total {

    margin-top: 25px;

    text-align: right;

    font-size: 24px;
}

#back-to-cart {

    width: 100%;

    padding: 13px;

    margin-top: 15px;

    background: #222;

    color: white;

    border: none;

    cursor: pointer;
}


/* ==================================================
   SUCCESS
================================================== */

.order-success {

    display: none;

    min-height: 80vh;

    padding: 100px 20px;

    justify-content: center;

    align-items: center;

    text-align: center;

    background:
        radial-gradient(
            circle,
            rgba(0,200,255,.08),
            transparent 35%
        ),
        #050507;
}

.order-success.active {

    display: flex;

    animation: detailOpen .7s ease;
}

.success-container {

    max-width: 600px;

    width: 100%;

    padding: 55px 35px;

    background:
        rgba(255,255,255,.035);

    border: 1px solid rgba(255,255,255,.08);

    backdrop-filter: blur(20px);

    box-shadow:
        0 30px 100px rgba(0,0,0,.6);
}

.success-icon {

    width: 75px;

    height: 75px;

    margin: auto;

    display: flex;

    justify-content: center;

    align-items: center;

    border-radius: 50%;

    border: 2px solid var(--red);

    color: var(--red);

    font-size: 38px;

    box-shadow:
        0 0 30px rgba(255,23,68,.25);

    animation: successPulse 2s infinite;
}

@keyframes successPulse {

    0%,100% {
        transform: scale(1);
        box-shadow: 0 0 20px rgba(255,23,68,.2);
    }

    50% {
        transform: scale(1.08);
        box-shadow: 0 0 50px rgba(255,23,68,.5);
    }
}

.success-container h2 {

    margin-top: 25px;

    font-size: 38px;

    letter-spacing: 5px;
}

.success-message {

    margin-top: 15px;

    color: #999;

    font-size: 18px;
}

.order-number {

    margin-top: 25px;

    color: var(--blue);

    font-size: 22px;
}

.success-details {

    margin-top: 30px;

    padding: 22px;

    border: 1px solid #333;

    text-align: left;
}

.success-details p {

    margin: 12px 0;

    color: #999;
}

.success-details strong {
    color: white;
}

#continue-shopping {

    width: 100%;

    padding: 15px;

    margin-top: 30px;

    border: none;

    background: white;

    color: black;

    font-weight: bold;

    cursor: pointer;

    transition: .3s;
}

#continue-shopping:hover {

    background: var(--red);

    color: white;
}


/* ==================================================
   FOOTER
================================================== */

footer {

    position: relative;

    overflow: hidden;

    padding: 90px 30px 35px;

    text-align: center;

    background: #020204;

    border-top: 1px solid rgba(255,255,255,.08);
}

footer::before {

    content: "魂";

    position: absolute;

    left: 50%;

    top: -40px;

    transform: translateX(-50%);

    font-size: 230px;

    font-weight: 900;

    color: rgba(255,23,68,.025);

    pointer-events: none;
}

.footer-logo {

    position: relative;

    font-size: 35px;

    font-weight: 900;

    letter-spacing: 10px;

    background:
        linear-gradient(
            90deg,
            white,
            var(--red),
            var(--blue),
            white
        );

    background-size: 300%;

    -webkit-background-clip: text;

    -webkit-text-fill-color: transparent;

    animation: titleGradient 5s linear infinite;
}

footer > p {

    margin-top: 18px;

    color: #666;
}

.footer-links,
.social-links {

    display: flex;

    justify-content: center;

    gap: 30px;

    flex-wrap: wrap;

    margin-top: 35px;
}

.footer-links a,
.social-links a {

    color: #777;

    text-decoration: none;

    transition: .3s;
}

.footer-links a:hover,
.social-links a:hover {

    color: white;

    transform: translateY(-3px);
}

.copyright {

    margin-top: 55px !important;

    padding-top: 25px;

    border-top: 1px solid #17171b;

    color: #444 !important;

    font-size: 12px;
}


/* ==================================================
   POWER CLICK
================================================== */

.power-effect {

    position: fixed;

    width: 15px;
    height: 15px;

    border: 2px solid white;

    border-radius: 50%;

    transform: translate(-50%, -50%);

    pointer-events: none;

    z-index: 99999;

    animation: powerBurst .7s ease-out forwards;
}

.power-effect::before,
.power-effect::after {

    content: "";

    position: absolute;

    top: 50%;
    left: 50%;

    width: 150px;

    height: 2px;

    background:
        linear-gradient(
            90deg,
            transparent,
            var(--red),
            var(--blue),
            transparent
        );

    box-shadow:
        0 0 15px var(--red);
}

.power-effect::before {

    transform:
        translate(-50%, -50%)
        rotate(45deg);
}

.power-effect::after {

    transform:
        translate(-50%, -50%)
        rotate(-45deg);
}

@keyframes powerBurst {

    from {
        width: 10px;
        height: 10px;
        opacity: 1;
    }

    to {
        width: 220px;
        height: 220px;
        opacity: 0;
    }
}


/* ==================================================
   MOBILE
================================================== */

@media (max-width: 768px) {

    header {

        padding: 22px 18px;

        flex-direction: column;

        gap: 20px;
    }

    header h1 {
        font-size: 27px;
    }

    nav {

        gap: 15px;

        flex-wrap: wrap;

        justify-content: center;
    }

    nav a {
        font-size: 12px;
    }

    .hero {

        min-height: 75vh;

        padding: 40px 18px;
    }

    .hero h2 {

        font-size: 43px;

        letter-spacing: 4px;
    }

    .hero p {

        font-size: 15px;

        letter-spacing: 1px;
    }

    .hero::after {

        font-size: 190px;

        right: -50px;
    }

    body::after {

        font-size: 85px;

        letter-spacing: 10px;
    }

    .products {

        padding: 90px 18px;
    }

    .products h2 {

        font-size: 31px;

        letter-spacing: 4px;
    }

    .products::before {

        font-size: 250px;
    }

    .product-container {

        flex-direction: column;

        align-items: center;
    }

    .product-card {

        width: 100%;

        max-width: 360px;
    }

    .product-image {

        height: 400px;
    }

    .details-container {

        flex-direction: column;

        gap: 35px;
    }

    .details-image,
    .details-info {

        width: 100%;
    }

    .details-image {

        height: 450px;
    }

    .details-info h2 {

        font-size: 34px;
    }

    .cart-box {

        width: 100%;

        right: -100%;
    }

    .about,
    .contact {

        padding: 100px 20px;
    }

    .about h2,
    .contact h2 {

        font-size: 35px;
    }

    .about::before,
    .contact::after {

        font-size: 120px;
    }

    .checkout-container {

        padding: 28px 20px;
    }

    .checkout-container h2 {

        font-size: 30px;
    }
}/* ==================================================
   ZAMALEK CINEMATIC EXPERIENCE
================================================== */

document.addEventListener("DOMContentLoaded", () => {

    const cursor = document.querySelector(".cursor-glow");

    /* MOUSE LIGHT */

    document.addEventListener("mousemove", (event) => {

        if (!cursor) return;

        cursor.style.left = event.clientX + "px";
        cursor.style.top = event.clientY + "px";

        /* HERO PARALLAX */

        const heroTitle =
            document.querySelector(".hero h2");

        const heroText =
            document.querySelector(".hero p");

        const heroButton =
            document.querySelector(".hero .shop-btn");

        const x =
            (event.clientX / window.innerWidth - .5) * 20;

        const y =
            (event.clientY / window.innerHeight - .5) * 20;

        if (heroTitle) {

            heroTitle.style.transform =
                `translate(${x}px, ${y}px)`;

        }

        if (heroText) {

            heroText.style.transform =
                `translate(${x * .4}px, ${y * .4}px)`;

        }

        if (heroButton) {

            heroButton.style.transform =
                `translate(${x * .2}px, ${y * .2}px)`;

        }

    });


    /* CURSOR GROWS ON INTERACTIVE ELEMENTS */

    const interactive =
        document.querySelectorAll(
            "button, a, .product-card, .cart, .product-click"
        );

    interactive.forEach(element => {

        element.addEventListener("mouseenter", () => {

            if (!cursor) return;

            cursor.style.width = "280px";
            cursor.style.height = "280px";

        });

        element.addEventListener("mouseleave", () => {

            if (!cursor) return;

            cursor.style.width = "180px";
            cursor.style.height = "180px";

        });

    });


    /* PRODUCT TILT */

    document.querySelectorAll(".product-card")
        .forEach(card => {

            card.addEventListener("mousemove", (event) => {

                const rect =
                    card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const rotateY =
                    ((x / rect.width) - .5) * 10;

                const rotateX =
                    ((y / rect.height) - .5) * -10;

                card.style.transform =
                    `
                    translateY(-18px)
                    scale(1.035)
                    rotateX(${rotateX}deg)
                    rotateY(${rotateY}deg)
                    `;

            });


            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

});