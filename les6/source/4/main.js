const app = new Vue({
    el:'#app',
    data:{
        name:'Олег',
        name2:'Игорь'
    },
    methods:{
        info(age){
            alert(`Год рождения: ${new Date().getFullYear() - age}`);
        }
    }
});