"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class CartBox {
    constructor(container){
        this.container = '.cart-list';
        this.goods = [];
        this.getProductList()
            .then(data => {
                this.goods = data.contents;
                this.render();
                this.removeProduct();
                this.reduceQty()
                this.increaseQty()
                this.getTotalSum();
            });
        
           
    }
    /* Метод выводит список товаров добавленных в корзину
     */
    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
             const item = new CartBoxElement(product);
             block.insertAdjacentHTML("beforeend",item.render());
        }
    }
    /* Метод формирует массив элементов состоящий из товаров добавленных в корзину
     */
    getProductList(){
        return fetch(`${API}/getBasket.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }
    /* Метод увеличивает количество товара в корзине
    */
    reduceQty(){
        document.querySelector('.cart-list').addEventListener('click', event => {
            if (!event.target.classList
                .contains('reduce-cart-button')) {
                    return;          
            }
            let getId = event.target.getAttribute('id');
            let findId = this.goods.find(el => el.id_product == getId);
            let qtyElement = document.getElementById(getId).childNodes[7].childNodes[1];
            let qtyValue = +qtyElement.textContent;
            qtyValue--;
            if (qtyValue > 0) {
                qtyElement.textContent = qtyValue;
                findId.quantity--;
                document.querySelector('.total-sum').remove();
                this.getTotalSum();
            }

        });
    }
    /* Метод уменьшает количество товара в корзине
    */
    increaseQty(){
        document.querySelector('.cart-list').addEventListener('click', event => {
            if (!event.target.classList
                .contains('increase-cart-button')) {
                    return;          
            }
            let getId = event.target.getAttribute('id');
            let findId = this.goods.find(el => el.id_product == getId);
            let qtyElement = document.getElementById(getId).childNodes[7].childNodes[1];
            let qtyValue = +qtyElement.textContent;
            qtyValue++;
            qtyElement.textContent = qtyValue;
            findId.quantity++;
            document.querySelector('.total-sum').remove();
            this.getTotalSum();
        });
    }   

    /* Метод удаляет товар из корзины
    */
    removeProduct(){
        document.querySelector('.cart-list').addEventListener('click', event => {
            if (!event.target.classList
                .contains('remove-cart-button')) {
                    return;          
            }
            let getId = event.target.getAttribute('id');
            let findId = this.goods.findIndex(el => el.id_product == getId);
            this.goods.splice(findId, 1);
            document.getElementById(getId).remove();
            document.querySelector('.total-sum').remove();
            this.getTotalSum();
        });
    }
    /* Метод считает и выводит общую сумму товаров добавленных в корзину
     */
    getTotalSum(){
        let sum = 0;
        this.goods.forEach((element) => {
            sum += element.price*element.quantity;
        });
        document.querySelector(this.container).insertAdjacentHTML("beforeend", `<div class="total-sum">Общая сумма товаров: ${sum} $</div>`)
    }
}

class CartBoxElement {
    constructor(product, img = 'https://android.ktfix.it/wp-content/uploads/2018/11/hardware-1.jpg'){
        this.id = product.id_product;
        this.title = product.product_name;
        this.price = product.price;
        this.qty = product.quantity;
        this.img = img;
    }
    /* Метод выводит карточку товара в корзине с учетом заказанного количества.
    *  Формирует верстку карточки.
    */
    render(){
        return `<div class="cart-product-item" id="${this.id}">
                    <img class="cart-image" src="${this.img}" alt="image">
                    <h3 class="">${this.title}</h3>
                    <p class="">Цена: ${this.price} $</p>
                    <p class="">Количество: <span>${this.qty}</span>    </p>
                    <button class="remove-cart-button" id="${this.id}">Удалить</button>
                    <button class="reduce-cart-button" id="${this.id}">-</button>
                    <button class="increase-cart-button" id="${this.id}">+</button>
                </div>`
    }
}

class ProductList{
    constructor(container='.products'){
        this.container = container;
        this.goods = [];
        // this._fetchProducts();//рекомендация, чтобы метод был вызван в текущем классе
        this._getProducts()
            .then(data => { //data - объект js
                this.goods = data;
                this.render()
            });
    }

    _getProducts(){      
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });       
    }

    render(){
        const block = document.querySelector(this.container);
        for(let product of this.goods){
             const item = new ProductItem(product);
             block.insertAdjacentHTML("beforeend",item.render());
//              block.innerHTML += item.render();
        }
    }
}

class ProductItem{
    constructor(product, img = 'https://android.ktfix.it/wp-content/uploads/2018/11/hardware-1.jpg'){
        this.title = product.product_name;
        this.id = product.id_product;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return `<div class="product-item" data-id="${this.id}">
                    <img class="product-item-img" src="${this.img}" alt="image">
                    <h3 class="product-item-name">${this.title}</h3>
                    <p class="product-item-price">${this.price}</p>
                    <button class="buy-btn">Купить</button>
                </div>`
    }
}

let list = new ProductList();
let cart = new CartBox();


// const products = [
    // {id: 1, title: 'Notebook', price: 2000, img: 'https://android.ktfix.it/wp-content/uploads/2018/11/hardware-1.jpg'},
    // {id: 2, title: 'Mouse', price: 20, img: 'https://massaget.kz/userdata/news/news_48920/image_l.jpg'},
    // {id: 3, title: 'Keyboard', price: 200, img: 'https://invexpert.ru/wp-content/uploads/d/2/6/d26d81857353d5381b6523be34fc8e73.jpeg'},
    // {id: 4, title: 'Gamepad', price: 50, img: 'https://smartfonoff.mobi/wp-content/uploads/2016/01/Exynos-8890-vs-Kirin-950.jpg'},
// ];
// //Функция для формирования верстки каждого товара
// //Добавить в выводе изображение
// const renderProduct = (item) => {
//     return `<div class="product-item">
//                 <img class="product-item-img" src="${item.img}"
//                  alt="image">
//                 <h3 class="product-item-name">${item.title}</h3>
//                 <p class="product-item-price">${item.price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// };
// const renderPage = list => {
//     const productsList = list.map(item => renderProduct(item));
//     console.log(productsList);
//     document.querySelector('.products').innerHTML = productsList.join('');
// };

// renderPage(products);

document.querySelector('.header-wrp').addEventListener('click', event => {
    if (!event.target.classList
        .contains('btn-cart')) {
            return;
    }
    document.querySelector('.cart-list').classList.toggle('hidden')
});