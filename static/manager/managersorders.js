Vue.component("managersorders",{
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
            toDate: ''
          }
       },
   template: `
   <div class="managersorder">
   <div class="order">
   <header class="card-header"><h1> All orders from {{loggedUser.restaurant}} </h1></header>
   <div v-for="managersorder in orders" v-if="filter(managersorder.order)" class="order1">
    <article class="card">
        <div class="card-body">
            <h6>Order ID: {{managersorder.order.id}}</h6>
            <article class="card">
                <div class="card-body row">
                    <div class="col"> <strong>Date and time:</strong> <br>{{managersorder.order.date}} </div>
                    <div class="col"> <strong>Restaurant:</strong> {{managersorder.order.restaurant}} <br> </div>
                    <div class="col"> <strong>Status:</strong>  {{managersorder.order.orderState}} <br> </div>
                    <div class="col"> <strong>Customer:</strong> {{managersorder.order.fullName}} ({{managersorder.order.username}})<br> </div>
                    <div class="col" v-if="delivering(managersorder.order)"> <strong>Deliverer:</strong> <span>{{managersorder.order.deliverer}}</span> <br> </div>
                    <div class="col"> <strong>Price:</strong> {{managersorder.order.price}} RSD<br> </div>
                    <div class="col"> <strong>Price with discount:</strong> {{managersorder.order.priceWithDiscount}} RSD<br> </div>


                    
                </div>
            </article>
            <div class="track">
                <div v-bind:class='{step : true, active: aktivno1(managersorder.order.orderState)}'> <span class="icon"> <i class="fa fa-check"></i> </span> <span class="text">Proccessing</span> </div>
                <div v-bind:class='{step : true, active: aktivno2(managersorder.order.orderState)}'> <span class="icon"> <i class="fa fa-user"></i> </span> <span class="text"> Prepairing</span> </div>
                <div v-bind:class='{step : true, active: aktivno3(managersorder.order.orderState)}'> <span class="icon"> <i class="fa fa-truck"></i> </span> <span class="text"> Ready to deliver </span> </div>
                <div v-bind:class='{step : true, active: aktivno4(managersorder.order.orderState)}'> <span class="icon"> <i class="fa fa-box"></i> </span> <span class="text">Trsansporting</span> </div>
                <div v-bind:class='{step : true, active: aktivno5(managersorder.order.orderState)}'> <span class="icon"> </span> <span class="text">Delivered</span> </div>

            </div>
            <hr>
            <ul class="row">
                <li v-for="item in managersorder.order.articles" class="col-md-4">
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
            <a v-if="managerstatechange(managersorder.order.orderState)" v-on:click="nextstate(managersorder.order.id)" class="btn btn-warning" data-abc="true"> Next state</a>
            <table>
            <h4 v-if="managersorder.order.orderState=='READYTODELIVER'">Competing deliverers:</h4>
            <tr v-if="managersorder.order.orderState=='READYTODELIVER'" v-for="deliverer in managersorder.competingdeliverers">
                <td>{{deliverer.name}} {{deliverer.surname}}</td>
                <td>{{deliverer.userName}}</td>
                <td><button v-on:click="approvedeliverer(deliverer.userName, managersorder.order.id)">Approve</button></td>
                <td><button v-on:click="disapprovedeliverer(deliverer.userName, managersorder.order.id)">Disapprove</button></td>
            </tr>
            </table>
        </div>
    </article>
</div>
   </div>
   <div class="sidebar">
 <h1>Search</h1>
 <table>
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
</table>
</div> 
</div>`,
   mounted () {
    axios.get('rest/testlogin')
    .then(response =>
        { if(response.data!= "Err:UserIsNotLoggedIn"){
            this.loggedUser=response.data;
            if(this.loggedUser.role == 'MANAGER'){       

                   axios.get("rest/getManagersOrders", 
                    {
                        params: {
                            restaurant : this.loggedUser.restaurant
                        }
                    })
                    .then(responsee =>{
                        this.orders = responsee.data;
                        this.sort();
                    })
                    .catch(function(error){
                        alert("It is impossible to load orders from the "+this.loggedUser.restaurant + " Server error!");
                    }); 
                    
            }
            } else{
                alert("You don't have a permission to access this site, beacuse you are not a manager!");
            }
        })
        .catch(() => {
            alert('Test login is temporary unavailable')
            });	
   },
     methods: {
         delivering: function(order){
             if(order.deliverer==null || order.deliverer==""){
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
        managerstatechange: function(state){
            if(state == 'PREPAIRING' || state== 'PROCESSING'){
                return true;
            }
            return false;
        },
        nextstate: function(id){
            axios
            .put("rest/nextorderstate", {
                "id" : id
            })
            .then(response =>{
                this.loadorders();
                this.sort();
            })
            .catch(function(error){
                alert("It is impossible to go to the next state of the delivery, try again later!")
            })
        },
        loadorders: function(){
            axios.get("rest/getManagersOrders", 
                    {
                        params: {
                            restaurant : this.loggedUser.restaurant
                        }
                    })
                    .then(responsee =>{
                        this.orders = responsee.data;
                        this.sort();
                    })
                    .catch(function(error){
                        alert("It is impossible to load orders from the "+this.loggedUser.restaurant + " Server error!");
                    }); 
                    this.sort();
        },
        filter: function(order){
            if((this.pricefrom == '' || order.priceWithDiscount>=this.pricefrom)
             && (this.priceto == '' || order.priceWithDiscount<=this.priceto)
             && (this.state=='ALL' || order.orderState==this.state) 
             && (this.fromDate=="" || order.date>=this.fromDate)
             && (this.toDate=="" || order.date<=this.toDate)){
                return true;
            }else{
                return false;
            }
        },
        sort: function(){
            if(this.sortType == "date"){
                if(this.sortDirection=="ascending"){
                    this.orders.sort((a, b) => (a.order.date > b.order.date) ? 1 : ((b.order.date > a.order.date) ? -1 : 0));
                }else{
                    this.orders.sort((b, a) => (a.order.date > b.order.date) ? 1 : ((b.order.date > a.order.date) ? -1 : 0));
                }
            } else if(this.sortType == "price"){
                if(this.sortDirection=="ascending"){
                    this.orders.sort((a, b) => (a.order.priceWithDiscount > b.order.priceWithDiscount) ? 1 : ((b.order.priceWithDiscount > a.order.priceWithDiscount) ? -1 : 0));
                }else{
                    this.orders.sort((b, a) => (a.order.priceWithDiscount > b.order.priceWithDiscount) ? 1 : ((b.order.priceWithDiscount > a.order.priceWithDiscount) ? -1 : 0));
                }
            }
        },
        approvedeliverer: function(deliverer, id){
            axios
            .post("rest/approvedeliverer",
            {
                "deliverer" : deliverer,
                "id" : id
            })
            .then(response => {
                this.loadorders();
            })
            .catch(function(error) {
                alert("It is impossible to approve deliverer!")  ;            
            });
        },
        disapprovedeliverer: function(deliverer, id){
            axios
            .post("rest/disapprovedeliverer",
            {
                "deliverer" : deliverer,
                "id" : id
            })
            .then(response =>{
                this.loadorders();
            })
            .catch(function(error){
                alert("It is impossible to disapprove deliverer!")  ;            
            });
        }
         


}
 });      
   