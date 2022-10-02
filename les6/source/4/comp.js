Vue.component('test',{
    props:['name'],
    data(){
        return {
            name2:'Иван',
            age:25
        }
    },

   template:`<div>
                <div>Добрый день, {{ name }} и {{name2 }}!</div>
                <inner-comp></inner-comp>
             </div>`
});

Vue.component('inner-comp',{
    template: `<div>
                    <button @click="$root.info($parent.age)">Узнать год рождения</button>
              </div>`
})
