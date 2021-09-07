Vue.component("customersorders",{
     data: function()
     {
         return{
             loggedUser: null,
             orders: null
         }
     },
     template:
     ` 
      <div id="div1">
          <h1> Yours orders</h1>
          <div id="div11" v-for="o in orders">
            <h2>Name restaurant: {{o.restaurant}} </h2>
            <h2>Id restaurant: {{o.id}} </h2>
            <div id="div12">
            <table>
                <tr> 
                    <td>Date:  </td> 
                    <td>{{o.date}} </td> 
                    </tr>
                    <tr> 
                     <td>State:  </td> 
                    <td> {{o.orderState}} </td> 
                    </tr>
                   <tr> 
                    <td>Price:  </td> 
                    <td>{{o.price}}  </td> 
                  </tr>
            </table>
        </div>
        <div id="div13">
         <table id="table1">
            <tr>
              <th>Artical</th>
              <th>Price(x1)</th>
              <th>Quantity</th>
              <th>Total price</th>
            </tr>
              <tr v-for="u in o.articles" v-on:click="selectedUser(u)">
                <td>{{u.artical.nameArtical}}</td>
                <td>{{u.artical.price}}</td>
                <td>{{u.quantity}}</td>
                <td>{{u.quantity * u.artical.price}}</td>
            </tr>
          </table>
        </div>
       
        </div>
    </div>
</div>

     `,
    mounted(){
        axios.get('rest/testlogin')
        .then(response =>
            { if(response.data!= "Err:UserIsNotLoggedIn"){
                this.loggedUser=response.data;
                if(this.loggedUser.role != 'CUSTOMER'){
                    alert("You don't have a permission to access this site, beacuse you are not a customer!"); 
                    return;            
                }
                } 
            })
            .catch(() => {
                alert('Test login is temporary unavailable')
                return;
                });	

    axios.get('rest/getOrders')
  .then(response => {
         
             this.orders=response.data;
            })
         .catch(() => {
         alert('Something is wrong')
        
         });	
  
 }
});