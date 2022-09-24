"use strict";

const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

class CartBox {
    constructor(container){
        this.container = container;
        this.goods = [];
    }
    /* Метод выводит список товаров добавленных в корзину
     */
    render(){}
    /* Метод формирует массив элементов состоящий из товаров добавленных в корзину
     */
    productList(){}
    /* Метод увеличивает количество товара в корзине
    */
    increaseQty(){}
    /* Метод уменьшает количество товара в корзине
    */
    reduceQty(){}
    /* Метод удаляет товар из корзины
    */
    removeProduct(){}
    /* Метод считает и выводит общую сумму товаров добавленных в корзину
     */
    getTotalprice(){}
}

class CartBoxElement {
    constructor(product){
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        this.qty = product.qty;
    }
    /* Метод выводит карточку товара в корзине с учетом заказанного количества.
    *  Формирует верстку карточки.
    */
    render(){}
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
        this.render();//вывод товаров на страницу
        this.getTotalprice();
    }
    // _fetchProducts(){
    //     this.goods = [
    //         {id: 1, title: 'Notebook', price: 2000, img: 
    //             'https://android.ktfix.it/wp-content/uploads/2018/11/hardware-1.jpg'
    //         },
    //         {id: 2, title: 'Mouse', price: 20, img: 
    //             'https://massaget.kz/userdata/news/news_48920/image_l.jpg'
    //         },
    //         {id: 3, title: 'Keyboard', price: 200, img: 
    //             'https://invexpert.ru/wp-content/uploads/d/2/6/d26d81857353d5381b6523be34fc8e73.jpeg'
    //         },
    //         {id: 4, title: 'Gamepad', price: 50, img: 
    //             'https://smartfonoff.mobi/wp-content/uploads/2016/01/Exynos-8890-vs-Kirin-950.jpg'
    //         },
    //     ];
    // }
    _getProducts(){      
        return fetch(`${API}/catalogData.json`)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
       
    }
    /*Метод выводит в консоль суммарную стоимость всех товаров
     */
    getTotalprice(){
        let sum = 0;
        this.goods.forEach((element) => {
            sum += element.price;
        });
        console.log(`Sum of all goods = ${sum}`);
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
        this.id = product.id;
        this.price = product.price;
        this.img = img;
    }
    render(){
        return `<div class="product-item">
                    <img class="product-item-img" src="${this.img}"
                        alt="image">
                    <h3 class="product-item-name">${this.title}</h3>
                    <p class="product-item-price">${this.price}</p>
                    <button class="buy-btn">Купить</button>
                </div>`
    }
}

let list = new ProductList();


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