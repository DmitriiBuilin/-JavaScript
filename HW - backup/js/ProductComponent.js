Vue.component('products', {
    props: ['products', 'img'],
    template: `
    <div class="products">
        <product v-for="product of products"
        :key="product.id_product"
        :img="img"
        :product="product"
        ></product> 
    </div>
    `
});

Vue.component('product', {
    props: ['product', 'img'],
    template: `
        <div class="product-item">
            <img class="product-item-img" :src="img" alt="Some img">
            <h3 class="product-item-name">{{product.product_name}}</h3>
            <p class="product-item-price">{{product.price}} $</p>
            <button class="buy-btn" @click="$root.addProduct(product)">Купить</button>
        </div>
    `
});