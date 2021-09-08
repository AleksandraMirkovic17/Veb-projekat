Vue.component("onerestaurant",{
    data : function(){
        return{
            loggedInUser: null,
            thisrestaurant: null,
            articles:'',
            sortType: "name",
            sortDirection: "ascending",
            showDishes: true,
            showDrinks: true
        }

    },
    template:
    ` 
    <div class="onerestaurant">
        <h1>{{thisrestaurant.name}}</h1>
            <div class="post">
            <img :src=thisrestaurant.imageRestaurant class="post-image">
                <div class="post-preview">
                    <h2> {{thisrestaurant.name}} basic informations</h2>
                    &nbsp;
                    <p class="preview-text">
                        <p>Address: {{thisrestaurant.location.street}} {{thisrestaurant.location.houseNumber}}, {{thisrestaurant.location.city}}</p>
                        <p>Type: {{thisrestaurant.typeRestaurant}}</p>
                        <p>Status: {{thisrestaurant.status}}</p>
                        <p>Average rating: {{thisrestaurant.rating}}</p>
                    </p>
                </div>			
            </div>
            <div class="show-articles">
            <h3>List of articles</h3>
                <div v-for="a in articles">
                        <div class="post" v-if="filtered(a)">
                        <img :src="loadLogoArtical(a)" class="post-image">
                            <h2>
                                {{a.nameArtical}}
                            </h2>
                            &nbsp;
                            <p class="preview-text">
                            <p>Price: {{a.price}} RSD</p>
                            <p>Type: {{a.type}} </p>
                            <p>Description: {{a.description}} </p>
                            <p>Quantity: {{a.quantity}} <span v-if="a.type=='DISH'">gr</span><span v-else-if="a.type=='DRINK'">ml</span></p>                       
                            </p>
                            <div v-if="loggedInUser.role == 'CUSTOMER' && thisrestaurant.status=='OPEN'">
                                  <input min=0 v-on:click="calculatePrice(a)" type="number" v-bind:id="a.nameArtical+'q'">
                                  <button v-on:click="addToChart(a)">Add to chart</button>
                                  <br><br>
                                  <label>Price: <label v-bind:id="a.nameArtical+'l'">0</label> RSD</label>
                              </div>
                        </div>               
                </div>   
            </div>
            <div class="sidebar">
            <div class="wrapp">
                <h3>Filter articles</h3>
                <div class="sorting"> 
                    <h4 class="sorting-title">Sort by</h4>
                    <select name="sortby" v-on:change="sortartical" v-model="sortType">
                        <option value="name">Name</option>
                        <option value="price">Price</option>
                    </select>
                    <select name="sortdirection" v-on:change="sortartical" v-model="sortDirection">
                        <option value="ascending">Ascending</option>
                        <option value="descending">Descending</option>
                    </select>
                </div>
                <div class="filter">
                    <h4 class="sorting-title">Show me</h4>
                    
                    <input type="checkbox" v-model="showDishes" value="dish" checked><label> Dishes</label>
                    <br>
                    <input type="checkbox" v-model="showDrinks" value="drink" checked><label> Drinks</label>
                </div>
            </div>
            
        </div>
    </div>
    `
    ,
    mounted() {
        axios.get('rest/testlogin')
            .then(response => {
            this.loggedInUser = response.data;
          });
        
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