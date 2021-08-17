Vue.component("restaurants", {
    data: function(){
        return {
            restaurants: null
            }

    },
    template: `
    <div class="restaurantsID">
        <div class="content clearfix">
		<div class="main-content">
			<h1 class="all-restaurants-title">Preview of all restaurants</h1>
            <div v-for="r in restaurants" class="restaurantsDiv">
			<div class="post">
				<img src="images/podrazumevani-logo-restorana.jpg" alt="" class="post-image">
				<div class="post-preview">
					<h2><a href=""> 
						{{r.name}}
					</a></h2>
					&nbsp;
					<p class="preview-text">
						<p>{{r.typeOfRestaurant}}</p>
						<p>{{r.status}}</p>
						<p>Prosecna ocena</p>
					</p>
				</div>
				
			</div>
		</div>


	</div>
    <div class="sidebar">
        <h3 class="search-title">Searh restaurants</h3>
        <div class="restaurants-name">
            <p class="text-restaurants-info">Name</p>
            <input type="text" name="name" placeholder="Type restaurant's name..."class="name-input"></input>
        </div>
        <div class="restaurants-address">
            <p class="text-restaurants-info">Address</p>
            <input type="text" name="address" placeholder="Type restaurant's address..."class="address-input"></input>
        </div>
        <div class="restaurants-rating">
            <p class="text-restaurants-info">Rating</p>
            <input type="number" name="rating" min=0 max=5 placeholder="0"class="rating-input"></input>
        </div>
        <div class="restaurants-type">
            <p class="text-restaurants-info">Type</p>
            <select class="restaurants-type-selection">
				<option selected value="ALL">ALL</option>
				<option value="CHINESE">CHINESE</option>
				<option value="ITALIAN">ITALIAN</option>
				<option value="BARBECUE">BARBECUE</option>
			</select>
        </div>
        <div class="restaurants-status">
            <p class="text-restaurants-info">Staus</p>
            <input type="checkbox" name="status">Show me only opened restaurants</input>
        </div>
        <button v-on:click="pretragaRestorana">Search</button>       
    </div>		

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