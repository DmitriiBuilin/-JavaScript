Vue.component('cart', {
    props: ['img', 'cart', 'visibility'],
    template: `
    <div class="cart-list" v-show="visibility">
        <cart-item v-for="product of cart" 
        :key="product.id_product" 
        :img="product.img" 
        :product="product"
        ></cart-item>
    </div>
    `
});

Vue.component('cart-item', {
    props: ['product', 'img'],
    template: `
        <div class="shopping-cart-item">
        <img class="cart-image" :src="img" alt="image">
            <div class="shopping-cart-description">
                <div class="shopping-cart-header-wrp">
                    <h2>{{product.product_name}}</h2>
                    <button type="button" class="shopping-cart-close-button" @click="$root.removeProduct(product)">
                    </button>
                </div>
                <p>Price: {{product.price}} $</p>
                <div class="shopping-cart-description-quantity">
                    <p>Quantity:</p>
                    <input type="number" min="1" :value="product.quantity" placeholder="">
                </div>
                <button class="remove-cart-button" :key="product.id_product" @click="$root.removeProduct(product)">Удалить</button>
                <button class="reduce-cart-button" @click="$root.reduceQty(product)">-</button>
                <button class="increase-cart-button" @click="$root.increaseQty(product)">+</button>
            </div>
        </div>
    `
});