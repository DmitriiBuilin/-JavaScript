"use strict";

const API = 
'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        cart: [],
        countItems: '',
        showCart: false,
        showSorter: false,
    },
    methods: {
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

                }
        },
        removeProduct(product){
            this.cart.splice(this.cart.indexOf(product), 1);
            this.countItems = this.cart.length;

        },
        reduceQty(product){
            if(product.quantity > 1){
                product.quantity--;

            }
            
        },
        increaseQty(product){
            product.quantity++;

        }
    },   
})