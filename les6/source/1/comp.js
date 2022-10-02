Vue.component('test',{
    props:['year'],
    data(){
        return {
            name:'Иван',
            age:25
        }
    },

   template:`<div>Добрый день, {{ name }} и <slot></slot>!
                    Возраст пользователя <slot></slot>: {{ year }} <br>
                    Год рождения пользователя {{ name }}: 
                    {{ new Date().getFullYear() - age }} году
              </div>`
});