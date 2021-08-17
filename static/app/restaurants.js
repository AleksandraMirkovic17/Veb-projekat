Vue.component("restaurants", {
    data: function(){
        return {
            restaurants: null
            }

    },
    template: `
    <div class="restaurantsID">
        <h1>These are all restaurants</h1>
        <div v-for="r in restaurants" class="restaurantsDiv">
            <div>
            <p>{{r.name}}</p>
            </div>
            <table>
            <tr><td><h4>{{r.name}}</h4></td></tr>
            <tr><td>Tip restorana: {{r.typeRestaurant}}</td></tr>
            <tr><td>Status: {{r.status}}</td></tr>
            </table>
        </div>
    </div>
    `,
    mounted(){
        axios.get('rest/restaurants')
        .then(response =>(this.restaurants = response.data));
    },
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