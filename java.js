const products = [
    {id: 0, img: "img/pexels-chanwalrus-958545.jpg", name: "Pizza", price: 22},
    {id: 1, img: "img/pexels-ella-olsson-572949-1640773.jpg", name: "Pasta", price: 18},
    {id: 2, img: "img/pexels-elletakesphotos-1660030.jpg", name: "Burger", price: 15},
    {id: 3, img: "img/pexels-elletakesphotos-1660030.jpg", name: "Sandwich", price: 12},
    {id: 4, img: "img/pexels-rajesh-tp-749235-1633526.jpg", name: "Sushi", price: 30},
    {id: 5, img: "img/pexels-chanwalrus-958545.jpg", name: "Fries", price: 10},
    {id: 6, img: "img/pexels-chanwalrus-958545.jpg", name: "Salad", price: 8},
    {id: 7, img: "img/pexels-rajesh-tp-749235-1633526.jpg", name: "Steak", price: 40},
    {id: 8, img: "img/pexels-chanwalrus-958545.jpg", name: "Tacos", price: 25},
    {id: 9, img: "E:/js/foods/img/pexels-vince-29732925.jpg", name: "Burrito", price: 20}
];

let checkoutlist = [];
const card_list = document.querySelector('.card_list');
const show = products.map((item, key) => {
    return `
        <div class="box">
            <div class="img">
                <img src="${item.img}" alt="">
            </div>
            <button class="btn" onclick="addtocart(${key})">
                <i class="fa-solid fa-cart-shopping"></i> add to cart
            </button>
            <div class="cont">
                <h3 class="name">${item.name}</h3>
                <div class="price">${item.price}.00</div>
            </div>
        </div>
    `;
});

card_list.innerHTML = show.join("");

function addtocart(id) {
    if (checkoutlist[id] == null) {
        checkoutlist[id] = products[id];
        checkoutlist[id].quantity = 1;
    } else {
        checkoutlist[id].quantity += 1;
    }
    reload();
}

const nav = document.querySelector('.navlist');
const btn1 = document.querySelector('.btn1');
const image = document.querySelector('.img1');
const quantity = document.querySelector('.demo');
const totalprice = document.querySelector('.totalp');
const container = document.querySelector('.container');
const pop = document.querySelector('.pop');
const pop1 = document.querySelector('.pop1');
const btn3=document.querySelector('.btn3');
function reload() {
    // Reset the navigation and initialize counters
    nav.innerHTML = '';
    let count = 0;
    let total = 0;

    // Loop through checkoutlist and update total and count
    checkoutlist.forEach((item, key) => {
        total += item.price * item.quantity;
        count += item.quantity;

        // Add item to navigation list
        nav.innerHTML += `
            <li>
                <span class="name">${item.name}</span>
                <span class="price">${item.price}</span>
                <div class="button">
                    <button class="plus" onclick="changequantity(${key}, ${item.quantity - 1})">-</button>
                </div>
                <p class="count">${item.quantity}</p>
                <div class="button">
                    <button class="minus" onclick="changequantity(${key}, ${item.quantity + 1})">+</button>
                </div>
            </li>
        `;
    });

    // Update cart details
    quantity.innerHTML = `Your cart (${count})`;
    totalprice.innerHTML = `<small style="align-items: center;">Subtotal (${count} items) = $</small>` + total.toFixed(2);
}


btn1.addEventListener('click', () => {
    pop.style.display = "block";
    reload();

    const count = checkoutlist.reduce((acc, item) => acc + item.quantity, 0);
    const total = checkoutlist.reduce((acc, item) => acc + item.price * item.quantity, 0);

    pop1.innerHTML = `
        <div class="confirm">
            <h1>Confirm Box</h1>
            <h3>Total items: ${count}</h3>
            <h3>Total price: $${total.toFixed(2)}</h3>
            <button class="btn3">Confirm</button>
        </div>
    `;

    const btn3 = document.querySelector('.btn3');
    btn3.addEventListener('click', () => {
        pop.style.display = "none";
        alert("Submitted successfully!");
        checkoutlist.length = 0;
        reload();

    });
});




reload();

document.querySelectorAll('.btn').forEach((item) => {
    item.addEventListener('click', () => {
        image.style.display = "none";
        btn1.style.display = "block";
    });
});


function changequantity(key, newQuantity) {
    if (newQuantity <= 0) {
        delete checkoutlist[key];
    } else {
        checkoutlist[key].quantity = newQuantity;
    }
    reload();
}

