Vue.component('cart', {
    props: ['img', 'cart', 'visibility'],
    template: `
    <div class="cart-list" v-show="visibility">
        <cart-item v-for="product of cart" 
        :key="product.id_product" 
        :img="img" 
        :product="product"
        ></cart-item>
    </div>
    `
});

Vue.component('cart-item', {
    props: ['product', 'img'],
    template: `
        <div class="cart-product-item">
            <img class="cart-image" :src="img" alt="image">
            <h3 class="">{{product.product_name}}</h3>
            <p class="">Цена: {{product.price}} $</p>
            <p class="">Количество: <span>{{product.quantity}}</span></p>
            <button class="remove-cart-button" :key="product.id_product" @click="$root.removeProduct(product)">Удалить</button>
            <button class="reduce-cart-button" @click="$root.reduceQty(product)">-</button>
            <button class="increase-cart-button" @click="$root.increaseQty(product)">+</button>
        </div>
    `
});