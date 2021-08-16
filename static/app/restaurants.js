Vue.component("restaurants", {
    data: function(){
        return {
            restaurants = null
        }
    },
    template: `
    <div class="restaurantsID">
        <h1>These are all restaurants</h1>
        <div v-for="restaurant in restaurants" class="restaurantsDiv">
            <img :src = "restaurantImageLogo(restaurant)"/>
            <div>
            <p>{{restaurant.name}}</p>
            </div>
            <table>
            <tr><td><h4>{{restaurant.name}}</h4></td></tr>
            <tr><td>Tip restorana: {{restaurant.typeRestaurant}}</td></tr>
            <tr><td>Status: {{restaurant.status}}</td></tr>
        </div>
    </div>
    `
    ,
    mounted(){
        axios
            .get('rest/restaurants')
            .then(response =>(this.restaurants = response.data));
    }
    ,
    methods:{
        restaurantImageLogo: function(restaurant){
            if(restaurant.imageRestaurant == 'None'){
                return 'images/podrazumevani-logo-restorana.jpg';
            } else{
                return restaurant.imageRestaurant;
            }
        }
    }  
});