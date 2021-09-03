Vue.component("restaurants", {
    data: function(){
        return {
            restaurants: null,
            search_params:{
                name: "",
                location: "",
                rating: 0,
                type: "ALL",
                onlyopened: false
            },
            selected_restaurants: {},
            sortType:"name",
            sortDirection:"ascending",
            }

    },
    template: `
        <div class="restaurantsID">
        <div class="content clearfix">
		<div class="main-content">
            <div class="sorting"> 
                <h4 class="sorting-title">Sort by</h4>
                <select name="sortby" v-on:change="sort" v-model="sortType">
                    <option value="name">Name</option>
                    <option value="location">Location</option>
                    <option value="rating">Rating</option>
                </select>
                <select name="sortdirection" v-on:change="sort" v-model="sortDirection">
                    <option value="ascending">Ascending</option>
                    <option value="descending">Descending</option>
                </select>

            </div>

      <div class="wrapper">
        <div class="title">
            <h4><span>fresh food for good health</span>our menu</h4>
        </div>
        <div  v-for="r in restaurants" class="menu">
            <div class="single-menu">
                <img :src="restaurantImageLogo(r)" class="post-image" width="150" height="150">
                <div class="menu-content">
                    <h2><a href=""> 
						{{r.name}}
					</a></h2>
					&nbsp;
					<p class="preview-text">
                        <p>{{r.location.street}} {{r.location.houseNumber}}, {{r.location.city}}</p>
						<p>{{r.typeOfRestaurant}}</p>
						<p>{{r.status}}</p>
						<p>{{r.rating}}</p>
					</p>
				</div>			
			</div>
		</div>
	</div>

    <div class="sidebar">
        <h3 class="search-title">Searh restaurants</h3>
        <div class="restaurants-name">
            <p class="text-restaurants-info">Name</p>
            <input type="text" name="name" placeholder="Type restaurant's name..."class="name-input" v-model="search_params.name"></input>
        </div>
        <div class="restaurants-address">
            <p class="text-restaurants-info">Address</p>
            <input type="text" name="address" placeholder="Type restaurant's address..."class="address-input" v-model="search_params.location"></input>
        </div>
        <div class="restaurants-rating">
            <p class="text-restaurants-info">Rating</p>
            <input type="number" name="rating" min=0 max=5 placeholder="0"class="rating-input" v-model="search_params.rating"></input>
        </div>
        <div class="restaurants-type">
            <p class="text-restaurants-info">Type</p>
            <select class="restaurants-type-selection" v-model="search_params.type">
				<option value="ALL" selected>ALL</option>
				<option value="CHINESE">CHINESE</option>
				<option value="ITALIAN">ITALIAN</option>
				<option value="BARBECUE">BARBECUE</option>
			</select>
        </div>
        <div class="restaurants-status">
            <p class="text-restaurants-info">Staus</p>
            <input type="checkbox" name="status" v-model="search_params.onlyopened">Show me only opened restaurants</input>
        </div>
        <button v-on:click="searchRestaurants">Search</button>       
    </div>		

    
    </div>
      
        </div>
  </div>

           
    </div>
    `,
    mounted(){
        axios.get('rest/restaurants')
        .then(response =>(this.restaurants = response.data))
        .catch(function (error) {
            alert('Something is wrong with loading the restaurants!');
    });	
    },
    methods:{
        restaurantImageLogo: function(r){
            if(r.imageRestaurant === 'None'){
                return "../images/podrazumevani-logo-restorana.jpg";
            } else{
                return r.imageRestaurant;
            }
        },
        searchRestaurants: function () {
			axios.get('rest/searchRestaurants', { params: {
				 name: this.search_params.name,
				 location: this.search_params.location,
				 rating: this.search_params.rating,
				 type: this.search_params.type,
				 onlyopened: this.search_params.onlyopened
			} })
				.then(response => (this.restaurants = response.data))
                    .catch(function (error) {
					    alert('Something is wrong with searching for restaurants!');
				});	

		},
        sort: function(){
            if(this.sortType == "name"){
                if(this.sortDirection=="ascending"){
                    this.restaurants.sort((a, b) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0));
                }else{
                    this.restaurants.sort((b, a) => (a.name.toUpperCase() > b.name.toUpperCase()) ? 1 : ((b.name.toUpperCase() > a.name.toUpperCase()) ? -1 : 0));
                }
            } else if(this.sortType == "location"){
                if(this.sortDirection=="ascending"){
                    this.restaurants.sort((a, b) => (a.location.city.toUpperCase() > b.location.city.toUpperCase()) ? 1 : ((b.location.city.toUpperCase() > a.location.city.toUpperCase()) ? -1 : 0));
                }else{
                    this.restaurants.sort((b, a) => (a.location.city.toUpperCase() > b.location.city.toUpperCase()) ? 1 : ((b.location.city.toUpperCase() > a.location.city.toUpperCase()) ? -1 : 0));
                }
            } else if(this.sortType == "rating"){
                if(this.sortDirection=="ascending"){
                    this.restaurants.sort((a, b) => (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0));
                }else{
                    this.restaurants.sort((b, a) => (a.rating > b.rating) ? 1 : ((b.rating > a.rating) ? -1 : 0));
                }
            }

        },
        showrestaurant: function(restaurant){
            window.location.href = "#/onerestaurant/"+restaurant.name;
        }
    }  
});