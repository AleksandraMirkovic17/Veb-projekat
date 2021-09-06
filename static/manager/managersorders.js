Vue.component("managersorders",{
    data: function(){
          return{
            loggedUser: null,
            orders: null
          }
       },
   template: `
   <div class="order">
   <header class="card-header"> All orders from {{loggedUser.restaurant}} </header>
   <div v-for="order in orders" class="order1">
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
                            <p class="title">{{item.artical.nameArtical}} x {{item.quantity}}</p> <span class="text-muted">{{item.artical.price}} RSD </span>
                        </figcaption>
                    </figure>
                </li>
            </ul>
            <hr> 
            <a v-if="managerstatechange(order.orderState)" v-on:click="nextstate(order.id)" class="btn btn-warning" data-abc="true"> Next state</a>
        </div>
    </article>
</div>

   </div> `,
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
             if(order.deliverer=='null'){
                 return true;
             }else{
                 return false;
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
                return false;
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
                    })
                    .catch(function(error){
                        alert("It is impossible to load orders from the "+this.loggedUser.restaurant + " Server error!");
                    }); 
        }
         


}
 });      
   