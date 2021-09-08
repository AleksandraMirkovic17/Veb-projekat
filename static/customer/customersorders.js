Vue.component("customersorders",{
  data: function(){
        return{
          loggedUser: null,
          orders: null,
          pricefrom:'',
          priceto:'',
          sortType: "date",
          sortDirection: "descending",
          state: 'ALL',
          fromDate: '',
          toDate: '',
          restaurant:'',
          typeofrestaurant: 'ALL',
          isTypeOk: true
        }
     },
 template: `
 <div class="managersorder">
 <div class="order">
 <div class="info">
 <div class="profile">
 <h1>Your profile</h1>
 <table>
     <tr>
        <td>Full name</td>
        <td>{{loggedUser.name}} {{loggedUser.surname}}</td>
     </tr>
     <tr>
        <td>Username</td>
        <td>{{loggedUser.userName}}</td>
     </tr>
     <tr>
        <td>Birthday</td>
        <td>{{loggedUser.date}}</td>
     </tr>
     <tr>
        <td>Role</td>
        <td>{{loggedUser.role}}</td>
     </tr>
 </table>
 </div>
 <div class="controlpanel">
     <h1>Control panel<h1>
     <table>
     <tr>
        <td>Status</td>
        <td>{{loggedUser.customerType}}</td>
     <tr>
     <tr>
        <td>Discount on every order</td>
        <td>{{loggedUser.discount}} %</td>
     <tr>
     <tr>
        <td>Score</td>
        <td>{{loggedUser.points}}</td>
     <tr>
     </table>
 </div>
 </div>
 <h1 class="title1">Orders made by {{loggedUser.name}} {{loggedUser.surname}}</h1>
 
 <div v-for="order in orders" v-if="filter(order)" class="order1">
  <article class="card">
      <div class="card-body">
          <h6>Order ID: {{order.id}}</h6>
          <article class="card">
              <div class="card-body row">
                  <div class="col"> <strong>Date and time:</strong> <br>{{order.date}} </div>
                  <div class="col"> <strong>Restaurant:</strong> {{order.restaurant}} <br> </div>
                  <div class="col"> <strong>Status:</strong>  {{order.orderState}} <br> </div>
                  <div class="col"> <strong>Customer:</strong> {{order.fullName}} ({{order.username}})<br> </div>
                  <div class="col" v-if="delivering(order)"> <strong>Deliverer:</strong> <span>{{order.deliverer}}</span> <br> </div>
                  <div class="col"> <strong>Price:</strong> {{order.price}} RSD<br> </div>
                  <div class="col"> <strong>Price with discount:</strong> {{order.priceWithDiscount}} RSD<br> </div>


                  
              </div>
          </article>
          <div class="track">
              <div v-bind:class='{step : true, active: aktivno1(order.orderState)}'> <span class="icon"> <i class="fa fa-check"></i> </span> <span class="text">Proccessing</span> </div>
              <div v-bind:class='{step : true, active: aktivno2(order.orderState)}'> <span class="icon"> <i class="fa fa-user"></i> </span> <span class="text"> Prepairing</span> </div>
              <div v-bind:class='{step : true, active: aktivno3(order.orderState)}'> <span class="icon"> <i class="fa fa-truck"></i> </span> <span class="text"> Ready to deliver </span> </div>
              <div v-bind:class='{step : true, active: aktivno4(order.orderState)}'> <span class="icon"> <i class="fa fa-box"></i> </span> <span class="text">Trsansporting</span> </div>
              <div v-bind:class='{step : true, active: aktivno5(order.orderState)}'> <span class="icon"> </span> <span class="text">Delivered</span> </div>

          </div>
          <hr>
          <ul class="row">
              <li v-for="item in order.articles" class="col-md-4">
                  <figure class="itemside mb-3">
                      <div class="aside"><img :src="loadLogoItem(item)" class="img-sm border"></div>
                      <figcaption class="info align-self-center">
                          <p class="title"><strong>{{item.artical.nameArtical}}</strong> x {{item.quantity}}</p> 
                      </figcaption>
                      <span class="text-muted">{{item.artical.price}} RSD </span>
                      <p class ="title">, Total: <strong>{{item.artical.price *item.quantity}} RSD</strong></p>

                  </figure>
              </li>
          </ul>
          <hr> 
          <a v-if="order.orderState=='PROCESSING'" v-on:click="cancelorder(order.id)" class="btn btn-warning" data-abc="true"> CANCEL</a>
      </div>
  </article>
</div>
 </div>
 <div class="sidebar">
<h1>Search</h1>
<table>
<tr>
     <td>Restaurant</td>
     <td><input type="text" v-model="restaurant"></td>
</tr>
<tr>
     <td>Price from:</td>
     <td><input type="number" min="0" v-model="pricefrom"/></td>
</tr>
<tr>
     <td>Price up to:</td>
     <td><input type="number" min="0" v-model="priceto"/></td>
</tr>
<hr>
  <tr>
     <td>From date:</td>
     <td><input type="date" min="0" v-model="fromDate"/></td>
</tr>
<tr>
     <td>To date:</td>
     <td><input type="date" min="0" v-model="toDate"/></td>
</tr>
</table>
<p class="sortby">Sort by</p>
<select name="sortby" v-on:change="sort" v-model="sortType">
<option value="price">Price</option>
<option value="date">Date</option>
<option value="restaurant">Restaurant</option>
</select>
<select name="sortdirection" v-on:change="sort" v-model="sortDirection">
<option value="ascending">Ascending</option>
<option value="descending">Descending</option>
</select>
<p class="sortby">Filter</p>
<table>
<tr>
<td>Show me states</td>
<td>
<select name="sortdirection" v-model="state">
<option value="ALL">All</option>
<option value="PROCESSING">Processing</option>
<option value="PREPAIRING">Prepairing</option>
<option value="READYTODELIVER">Ready to be delivered</option>
<option value="TRANSPORTING">Transporting</option>
<option value="DELIVERED">Delivered</option>
<option value="CANCELED">Canceled</option>
</select>
</td>
</tr>
<tr>
<td>Type of restaurant</td>
<td>
<select name="sortdirection" v-model="typeofrestaurant" v-on:change="getType()">
<option value="ALL">All</option>
<option value="BARBECUE">Barbecue</option>
<option value="ITALIAN">Italian</option>
<option value="CHINESE">Chinese</option>
</select>
</td>
</tr>
</table>
</div> 
</div>`,
 mounted () {
  axios.get('rest/testlogin')
  .then(response =>
      { if(response.data!= "Err:UserIsNotLoggedIn"){
          this.loggedUser=response.data;
          if(this.loggedUser.role == 'CUSTOMER'){       

                 axios.get("rest/getOrders")
                  .then(responsee =>{
                      this.orders = responsee.data;
                      this.sort();
                  })
                  .catch(function(error){
                      alert("It is impossible to load customer's orders- Server error!");
                  }); 
                  
          }
          } else{
              alert("You don't have a permission to access this site, beacuse you are not a customer!");
          }
      })
      .catch(() => {
          alert('Test login is temporary unavailable')
          });	
 },
   methods: {
       delivering: function(order){
           if(order.deliverer==null){
               return false;
           }else{
               return true;
           }
       },
       aktivno1: function(stanje){
           if(stanje == 'PREPAIRING' || stanje== 'PROCESSING' || stanje== 'READYTODELIVER' || stanje=='TRANSPORTING' || stanje=='DELIVERED'){
               return true;
           }
           return false;
       },
       aktivno2: function(stanje){

          if(stanje == 'PREPAIRING' || stanje== 'READYTODELIVER' || stanje=='TRANSPORTING' || stanje=='DELIVERED'){
              return true;
          }
          return false;
       },
       aktivno3: function(stanje){
          if( stanje== 'READYTODELIVER' || stanje=='TRANSPORTING' || stanje=='DELIVERED'){
              return true;
          }
          return false;
       },
       aktivno4: function(stanje){
          if( stanje=='TRANSPORTING' || stanje=='DELIVERED'){
              return true;
          }
          return false;
       },
       aktivno5: function(stanje){
          if( stanje=='DELIVERED'){
              return true;
          }
          return false;
       },
       loadLogoItem: function(a){          
          return a.artical.image;
      },
      deliver: function(id){
          axios
          .put("rest/nextorderstate", {
              "id" : id
          })
          .then(response =>{
              this.loadorders();
              this.sort();
          })
          .catch(function(error){
              alert("It is impossible to deliver the order, try again later!")
          })
      },
      loadorders: function(){
          if(this.loggedUser.role == 'CUSTOMER'){       

            axios.get("rest/getOrders")
            .then(responsee =>{
                this.orders = responsee.data;
                this.sort();
            })
            .catch(function(error){
                alert("It is impossible to load customer's orders- Server error!");
            }); 
            
    } else{
        alert("You don't have a permission to access this site, beacuse you are not a customer!");
    }
        },
      getType : function(){
          if(this.typeofrestaurant == "ALL"){
              this.loadorders();
          }
          else{
          axios
          .get("rest/getrestaurantstypecustomer", 
          {
              params : {
                  username : this.loggedUser.userName,
                  restaurantstyperequired : this.typeofrestaurant
              }
          })
          .then(response =>{
              alert("Tu sam")
              this.orders= response.data;
              this.sort();
          })
          .catch(function(error){
              alert("It is impossible to get the type of the restaurant! Server error!")
          })
      }
      },
      cancelorder: function(id){
        axios
        .post("rest/cancelorder", id)
        .catch(function(error){
          alert("It's impossible to cancel the order!")
        })

        axios.get('rest/testlogin')
        .then(response =>
            { if(response.data!= "Err:UserIsNotLoggedIn"){
                this.loggedUser=response.data;
            }
            })
            .catch(() => {
                alert('Test login is temporary unavailable')
                });	
        this.loadorders();

     },
      filter: function(order){
          if((this.pricefrom == '' || order.priceWithDiscount>=this.pricefrom)
           && (this.priceto == '' || order.priceWithDiscount<=this.priceto)
           && (this.state=='ALL' || order.orderState==this.state) 
           && (this.fromDate=="" || order.date>=this.fromDate)
           && (this.toDate=="" || order.date<=this.toDate)
           && (this.restaurant=="" || (order.restaurant.toUpperCase()).includes(this.restaurant.toUpperCase()))){
              return true;
           }
          else{
              return false;
          }
      },
      sort: function(){
          if(this.sortType == "date"){
              if(this.sortDirection=="ascending"){
                  this.orders.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
              }else{
                  this.orders.sort((b, a) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0));
              }
          } else if(this.sortType == "price"){
              if(this.sortDirection=="ascending"){
                  this.orders.sort((a, b) => (a.priceWithDiscount > b.priceWithDiscount) ? 1 : ((b.priceWithDiscount > a.priceWithDiscount) ? -1 : 0));
              }else{
                  this.orders.sort((b, a) => (a.priceWithDiscount > b.priceWithDiscount) ? 1 : ((b.priceWithDiscount > a.priceWithDiscount) ? -1 : 0));
              }
          } else if(this.sortType == "restaurant"){
              if(this.sortDirection=="ascending"){
                  this.orders.sort((a, b) => (a.restaurant.toUpperCase() > b.restaurant.toUpperCase()) ? 1 : ((b.restaurant.toUpperCase() > a.restaurant.toUpperCase()) ? -1 : 0));
              }else{
                  this.orders.sort((b, a) => (a.restaurant.toUpperCase() > b.restaurant.toUpperCase()) ? 1 : ((b.restaurant.toUpperCase() > a.restaurant.toUpperCase()) ? -1 : 0));
              }
          }
      }
       


}
});      
 