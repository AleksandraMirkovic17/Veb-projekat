Vue.component("onerestaurant",{
    data : function(){
        return{
            loggedInUser: null,
            thisrestaurant:null,
            comments: null,
            articles:'',
            sortType: "name",
            sortDirection: "ascending",
            showDishes: true,
            showDrinks: true
        }

    },
    template:
    ` 
    <div>
     <div class="onerestaurant">
      <div class="restaurant-title wow fadeInUp" data-wow-delay="0.1s">
        <h2>{{thisrestaurant.name}}</h2>
       </div>
       
            <div class="post">
            <img :src=thisrestaurant.imageRestaurant class="post-image">
                <div class="post-preview">
                    <h3> {{thisrestaurant.name}} basic informations</h3>
                    &nbsp;
                    <p class="preview-text">
                        <p>Address: {{thisrestaurant.location.street}} {{thisrestaurant.location.houseNumber}}, {{thisrestaurant.location.city}}</p>
                        <p>Type: {{thisrestaurant.typeRestaurant}}</p>
                        <p>Status: {{thisrestaurant.status}}</p>
                        <p>Average rating: {{thisrestaurant.rating}}</p>
                    </p>
                </div>             
            </div>
           
            <div class="menurestaurant">
                            
                        <section id="menu" data-stellar-background-ratio="0.5">
                            <div class="container">
                                <div class="row">
                
                                    <div class="col-md-12 col-sm-12">
                                            <div class="section-title wow fadeInUp" data-wow-delay="0.1s">
                                                <h2>Menu</h2>
                                                <h4>The food that lengthens life.</h4>
                                            </div>
                                            <div class="filter">
                                            <div class="sorting"> 
                                                <h4 class="sorting-title">Sort by: </h4>
                                                <select name="sortby" v-on:change="sortartical" v-model="sortType">
                                                    <option value="name">Name</option>
                                                    <option value="price">Price</option>
                                                </select>
                                                <select name="sortdirection" v-on:change="sortartical" v-model="sortDirection">
                                                    <option value="ascending">Ascending</option>
                                                    <option value="descending">Descending</option>
                                                </select>
                                            </div>
                                            <div class="boxes">
                                                <input type="checkbox" id="box-1" v-model="showDishes" checked>
                                                <label for="box-1">Dishes</label>
                                                <input type="checkbox" id="box-2" checked v-model="showDrinks" value="drink" checked>
                                                <label for="box-2">Drinks </label>
                                            </div>
                                            </div>
                                          
                                    </div>
                                    <div class="articles">
                                    <div class="article" v-for="a in articles" v-if="filtered(a)">
                                    <div class="col-md-4 col-sm-6">
                                            <div class="menu-thumb">
                                                <img :src="loadLogoArtical(a)" class="img-responsive"  width="25%" 
                                                height="300px" alt="">
                
                                                    <div class="menu-info">
                                                        <div class="menu-item">
                                                                <h3>{{a.nameArtical}}</h3>
                                                                <p>Description: {{a.description}}</p>
                                                                <p>Quantity: {{a.quantity}} <span v-if="a.type=='DISH'">gr</span><span v-else-if="a.type=='DRINK'">ml</span></p>
                                                                <p>Type: {{a.type}}</p>
                                                                <div class="addtocart" v-if="loggedInUser.role == 'CUSTOMER' && thisrestaurant.status=='OPEN'">
                                                                <input type="number" min="1" v-on:click="calculatePrice(a)" type="number" v-bind:id="a.nameArtical+'q'" name=""/>
                                                                <button v-on:click="addToChart(a)">Add to cart</button>
                                                                </div>
                                                                <span v-if="loggedInUser.role == 'CUSTOMER' && thisrestaurant.status=='OPEN'">Total price:<span v-bind:id="a.nameArtical+'l'">0</span>RSD</span>
                                                        </div>
                                                        <div class="menu-price">
                                                                <span>{{a.price}} RSD</span>
                                                        </div>
                                                    </div>
                                            </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                       </div>
                    </section>
            
            </div> <!--Menu restaurant-->
            <div class="menurestaurant  comment-section">
                    <div class="section-title wow fadeInUp" data-wow-delay="0.1s">
                        <h2>Comments</h2>
                        <h4>The food that lengthens life.</h4>
                    </div>
                    <div class="comment-table">
                        <table>
                            <tr v-for="comment in comments" v-if="comment.text!='' && (comment.status=='Approved' || loggedInUser.role=='ADMINISTRATOR' || loggedInUser.restaurant==thisrestaurant.name)">
                                <td class="comment-username">{{comment.customer}} </td>
                                <td class="comment-text">"{{comment.text}}"</td>
                                <td class="comment-status"  v-if="(loggedInUser.role=='ADMINISTRATOR' || loggedInUser.restaurant==thisrestaurant.name)">{{comment.status}}</td>
                            </tr>
                        </table>
                    </div>
            </div>
        </div>
        <div id="js-map" style="height:500px; width:100%;"></div>
        </div>
    `
    ,
    mounted() {
        axios.get('rest/testlogin')
            .then(response => {
            this.loggedInUser = response.data;
          });
          init();
        
          var path = window.location.href;
          var restaurantName = path.split('/onerestaurant/')[1];
          var name = restaurantName.replace('%20', ' ');
          axios.get('rest/getRestaurantByName', {
            params:
                {
                    name : name
                }
         }
          )
            .then(response => {
              this.thisrestaurant = response.data;
              this.articles = this.thisrestaurant.articles;
              axios.get('rest/getrestaurantscomments', {
                  params:
                  {
                      restaurant : this.thisrestaurant.name
                  }
              })
              .then(resp =>{
                  this.comments = resp.data;
              })
              .catch(function(error){
                  alert("It is impossible to load restaurant's comments!")
              })
            });
    },
    methods:{
        loadLogoArtical: function(r){
            if(r.imageRestaurant === 'None'){
                return "../images/artical.png";
            } else{
                return r.image;
            }
    },
    calculatePrice: function(artical){
      let inputQuantity = document.getElementById(artical.nameArtical+'q');
      let labelTotalPrice = document.getElementById(artical.nameArtical+'l');
      let totalPrice = artical.price * inputQuantity.value;
      labelTotalPrice.innerHTML = totalPrice.toString();
    },
    addToChart: function(artical){
        let inputQuantity = document.getElementById(artical.nameArtical+'q');
        let totalQuatity = inputQuantity.value;
        if(totalQuatity == 0){
            alert("You can't add zero items to shooping cart!")
        }else{
        axios.post('rest/addToChart', {
            restaurant: this.thisrestaurant.name,
            nameArtical: artical.nameArtical,
            quantity: totalQuatity,
            username: this.loggedInUser.userName
          }).then(response => {
            if (response.data == 'OK') {
              alert('Item added to chart successfully!');
              inputQuantity.value = 0;
              this.calculatePrice(artical);
            } else {
              alert(response.data);
            }
          }).catch(error => {
            alert('Adding items to chart is temporary unavailable!');
          });
        }

    },
    sortartical: function(){
        if(this.sortType == "name"){
            if(this.sortDirection=="ascending"){
                this.articles.sort((a, b) => (a.nameArtical.toUpperCase() > b.nameArtical.toUpperCase()) ? 1 : ((b.nameArtical.toUpperCase() > a.nameArtical.toUpperCase()) ? -1 : 0));
            }else{
                this.articles.sort((b, a) => (a.nameArtical.toUpperCase() > b.nameArtical.toUpperCase()) ? 1 : ((b.nameArtical.toUpperCase() > a.nameArtical.toUpperCase()) ? -1 : 0));
            }
        } else if(this.sortType == "price"){
            if(this.sortDirection=="ascending"){
                this.articles.sort((a, b) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
            }else{
                this.articles.sort((b, a) => (a.price > b.price) ? 1 : ((b.price > a.price) ? -1 : 0));
            }
        }
    },
    filtered: function(artical){
        if((this.showDishes && artical.type=='DISH') || (this.showDrinks && artical.type=='DRINK')){
            return true;
        }
        else{
            return false;
        }
    }
}


});
function init(){
	const map = new ol.Map({
		view: new ol.View({
			center: [2208254.0327390945,5661276.834908611],
			zoom: 15
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		],
		target: 'js-map'
	})
	var previousLayer = null;
	map.on('click', function(e){
		if(previousLayer!=null) {map.removeLayer(previousLayer)}
		var latLong = ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
		console.log(latLong);
		this.longitude = latLong[0]
		this.latitude = latLong[1]
		
		var layer = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [
					new ol.Feature({
						geometry: new ol.geom.Point(ol.proj.fromLonLat(latLong))
					})
				]
			})
		});	
		previousLayer = layer;
		map.addLayer(layer);
	  //simpleReverseGeocoding(this.longitude, this.latitude)
	})
}