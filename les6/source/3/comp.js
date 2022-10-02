Vue.component('test',{
    data(){
        return {
            name:'Иван',
            age:25
        }
    },

   template:`<div>
                <div>Добрый день, {{ name }}.</div>
                <div>Привет, {{ name }}!!!</div>
             </div>`
});
