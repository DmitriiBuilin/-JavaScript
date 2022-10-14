"use strict";

const API = 
'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        cartUrl: '/getBasket.json',
        products: [],
        filtered: [],
        cart: [],
        userSearch: '',
        countItems: '',
        showCart: false,
        showSorter: false,
    },
    methods: {
        // makeGETRequest(url, callback) { 
             
        // }, 
        // makePOSTRequest(url, data, callback) { 
        //     let xhr; 
        //     if (window.XMLHttpRequest) { 
        //         xhr = new XMLHttpRequest(); 
        //     } else if (window.ActiveXObject) {
        //          xhr = new ActiveXObject("Microsoft.XMLHTTP"); 
        //         } 
                
        //         xhr.onreadystatechange = function () { 
        //             if (xhr.readyState === 4) { 
        //                 callback(xhr.responseText); 
        //             } 
        //         } 
        //         xhr.open('POST', url, true); 
        //         xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8'); 
        //         xhr.send(data); 
        // },
        filter(){
         const regexp = new RegExp(this.userSearch, 'i');
         this.filtered = this.products.filter(
            product => regexp.test(product.product_name)
            );
        },
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error);
                })
        },
        addProduct(product){
                let find = this.cart.find(
                    item => product.id_product === item.id_product
                    );
                if(find){
                    find.quantity++;
                }else{
                    this.$set(product,'quantity',1);
                    this.cart.push(product);
                    this.countItems = this.cart.length;
                    // localStorage.setItem('cartSave', JSON.stringify(this.cart));
                }
        },
        removeProduct(product){
            this.cart.splice(this.cart.indexOf(product), 1);
            this.countItems = this.cart.length;
            // localStorage.setItem('cartSave', JSON.stringify(this.cart));
        },
        reduceQty(product){
            if(product.quantity > 1){
                product.quantity--;
                // localStorage.setItem('cartSave', JSON.stringify(this.cart));
            }
            
        },
        increaseQty(product){
            product.quantity++;
            // localStorage.setItem('cartSave', JSON.stringify(this.cart));
        }
    },
    mounted(){
        this.getJson(`/catalogData`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                    // this.countItems = this.cart.length;
                }
                                
        })
    }
    
})



// class CartBox {
//     constructor(container){
//         this.container = '.cart-list';
//         this.goods = [];
//         this.getProductList()
//             .then(data => {
//                 this.goods = data.contents;
//                 this.render();
//                 this.removeProduct();
//                 this.reduceQty()
//                 this.increaseQty()
//                 this.getTotalSum();
//             });
        
           
//     }
//     /* Метод выводит список товаров добавленных в корзину
//      */
//     render(){
//         const block = document.querySelector(this.container);
//         for(let product of this.goods){
//              const item = new CartBoxElement(product);
//              block.insertAdjacentHTML("beforeend",item.render());
//         }
//     }
//     /* Метод формирует массив элементов состоящий из товаров добавленных 
//     * в корзину
//      */
//     getProductList(){
//         return fetch(`${API}/getBasket.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             });
//     }
//     /* Метод увеличивает количество товара в корзине
//     */
//     reduceQty(){
//         document.querySelector('.cart-list').addEventListener('click', event => 
//         {
//             if (!event.target.classList
//                 .contains('reduce-cart-button')) {
//                     return;          
//             }
//             let getId = event.target.getAttribute('id');
//             let findId = this.goods.find(el => el.id_product == getId);
//             let qtyElement = document.getElementById(getId)
//                 .childNodes[7].childNodes[1];
//             let qtyValue = +qtyElement.textContent;
//             qtyValue--;
//             if (qtyValue > 0) {
//                 qtyElement.textContent = qtyValue;
//                 findId.quantity--;
//                 document.querySelector('.total-sum').remove();
//                 this.getTotalSum();
//             }

//         });
//     }
//     /* Метод уменьшает количество товара в корзине
//     */
//     increaseQty(){
//         document.querySelector('.cart-list').addEventListener('click', event => 
//         {
//             if (!event.target.classList
//                 .contains('increase-cart-button')) {
//                     return;          
//             }
//             let getId = event.target.getAttribute('id');
//             let findId = this.goods.find(el => el.id_product == getId);
//             let qtyElement = document.getElementById(getId)
//                 .childNodes[7].childNodes[1];
//             let qtyValue = +qtyElement.textContent;
//             qtyValue++;
//             qtyElement.textContent = qtyValue;
//             findId.quantity++;
//             document.querySelector('.total-sum').remove();
//             this.getTotalSum();
//         });
//     }   

//     /* Метод удаляет товар из корзины
//     */
//     removeProduct(){
//         document.querySelector('.cart-list').addEventListener('click', event => 
//         {
//             if (!event.target.classList
//                 .contains('remove-cart-button')) {
//                     return;          
//             }
//             let getId = event.target.getAttribute('id');
//             let findId = this.goods.findIndex(el => el.id_product == getId);
//             this.goods.splice(findId, 1);
//             document.getElementById(getId).remove();
//             document.querySelector('.total-sum').remove();
//             this.getTotalSum();
//         });
//     }
//     /* Метод считает и выводит общую сумму товаров добавленных в корзину
//      */
//     getTotalSum(){
//         let sum = 0;
//         this.goods.forEach((element) => {
//             sum += element.price*element.quantity;
//         });
//         document.querySelector(this.container).insertAdjacentHTML("beforeend", 
//         `<div class="total-sum">Общая сумма товаров: ${sum} $</div>`)
//     }
// }

// class CartBoxElement {
//     constructor(product, img = 
//         'https://android.ktfix.it/wp-content/uploads/2018/11/hardware-1.jpg'){
//             this.id = product.id_product;
//             this.title = product.product_name;
//             this.price = product.price;
//             this.qty = product.quantity;
//             this.img = img;
//     }
//     /* Метод выводит карточку товара в корзине с учетом заказанного количества.
//     *  Формирует верстку карточки.
//     */
//     render(){
//         return `<div class="cart-product-item" id="${this.id}">
//                     <img class="cart-image" src="${this.img}" alt="image">
//                     <h3 class="">${this.title}</h3>
//                     <p class="">Цена: ${this.price} $</p>
//                     <p class="">Количество: <span>${this.qty}</span>    </p>
//                     <button class="remove-cart-button" id="${this.id}">Удалить</button>
//                     <button class="reduce-cart-button" id="${this.id}">-</button>
//                     <button class="increase-cart-button" id="${this.id}">+</button>
//                 </div>`
//     }
// }

// class ProductList{
//     constructor(container='.products'){
//         this.container = container;
//         this.goods = [];
//         this._getProducts()
//             .then(data => {
//                 this.goods = data;
//                 this.render()
//                 this.addToCart()
//             });
//     }

//     /* Метод осуществляет поиск товаров на странице товаров
//      */
//     findProduct(){}

//     /* Метод добавляет товар в корзину
//      */
//     addToCart(){}

//     _getProducts(){      
//         return fetch(`${API}/catalogData.json`)
//             .then(result => result.json())
//             .catch(error => {
//                 console.log(error);
//             });       
//     }

//     render(){
//         const block = document.querySelector(this.container);
//         for(let product of this.goods){
//              const item = new ProductItem(product);
//              block.insertAdjacentHTML("beforeend",item.render());
//         }
//     }
// }

// class ProductItem{
//     constructor(product, img = 
//         'https://android.ktfix.it/wp-content/uploads/2018/11/hardware-1.jpg'){
//             this.title = product.product_name;
//             this.id = product.id_product;
//             this.price = product.price;
//             this.img = img;
//     }
//     render(){
//         return `<div class="product-item" id="${this.id}">
//                     <img class="product-item-img" src="${this.img}" alt="image">
//                     <h3 class="product-item-name">${this.title}</h3>
//                     <p class="product-item-price">${this.price}</p>
//                     <button class="buy-btn" id="${this.id}">Купить</button>
//                 </div>`
//     }
// }

// let list = new ProductList();
// let cart = new CartBox();

// document.querySelector('.header-wrp').addEventListener('click', event => {
//     if (!event.target.classList
//         .contains('btn-cart')) {
//             return;
//     }
//     document.querySelector('.cart-list').classList.toggle('hidden')
// });