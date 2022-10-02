Vue.component('test',{
    data(){
        return {
            name:'Иван',
            age:25
        }
    },

   template:`<div>Добрый день, {{ name }}. Ваш возраст: {{ age }}
                    <inner-comp></inner-comp>
             </div>`
});

Vue.component('inner-comp',{
    data(){
        return {
            counter:0
        }
    },
    methods:{
        increase(x){
            this.counter += x;
        }
    },
    template:`<div>
                   <button @click="increase($parent.age);$parent.age = counter;">OK</button> 
                   <span>Счетчик равен: {{ counter }}</span>
              </div>`
})