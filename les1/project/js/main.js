const products = [
    {id: 1, title: 'Notebook', price: 2000, img: 'https://android.ktfix.it/wp-content/uploads/2018/11/hardware-1.jpg'},
    {id: 2, title: 'Mouse', price: 20, img: 'https://massaget.kz/userdata/news/news_48920/image_l.jpg'},
    {id: 3, title: 'Keyboard', price: 200, img: 'https://invexpert.ru/wp-content/uploads/d/2/6/d26d81857353d5381b6523be34fc8e73.jpeg'},
    {id: 4, title: 'Gamepad', price: 50, img: 'https://smartfonoff.mobi/wp-content/uploads/2016/01/Exynos-8890-vs-Kirin-950.jpg'},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (item) => {
    return `<div class="product-item">
                <img class="product-item-img" src="${item.img}"
                 alt="image">
                <h3 class="product-item-name">${item.title}</h3>
                <p class="product-item-price">${item.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList.join('');
};

renderPage(products);