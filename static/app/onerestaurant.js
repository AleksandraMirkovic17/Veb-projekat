Vue.component("onerestaurant",{
    data : function(){
        return{
            loggedInUser: null,
            thisrestaurant: null
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
                <div v-for="a in thisrestaurant.articles">
                        <div class="post">
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

    }
}


});