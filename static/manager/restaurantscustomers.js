Vue.component("restaurantscustomers",{
    data: function(){
          return{
            loggedUser: null,
            customers: null,
            customer: null,
            user: null,
            mode: false
          }
       },
   template: `
   <div class= "seeusers">
   <div class = "other">
       <div class="profiln" v-if="mode=='TRUE'">
                <h3>Customer's information</h3>                 
                <br>
                <div class="form">
                       <div class="inputfield">
                           <label >Name:</label>
                           <label>{{user.name}}</label>
                       </div>                     
                       <br>
                           <div class="inputfield">
                           <label >Surename:</label>
                           <label>{{user.surname}}</label>
                       </div>
                       
                       <br>
                        <div class="inputfield">
                           <label >Username:</label>
                           <label>{{user.userName}}</label>
                       </div>
                       <br>
                       <div class = "inputfield">
                       <label >Type:</label>                        
                       <label>{{user.customerType}}</label>
                       <br>
                       </div>
                       <div class = "inputfield">
                       <label >Score:</label>                        
                       <label>{{user.points}}</label>
                       <br>
                       </div>
                       <div class = "inputfield">
                       <label >Discount:</label>                        
                       <label>{{user.discount}}%</label>
                       <br>
                       </div>
               </div> <!--form-->
       </div> <!--profiln-->
  </div>

<!--other-->
<div class="listofusers">
           <table>
               <tr id="heder">
                   <th>Name</th>
                   <th>Surname</th>
                   <th>Date</th>
                   <th>Gender</th>
                   <th>Username</th>
                   <th>Customer type</th>
                   <th>Block</th>
               </tr>
               <tr v-for="u in customers" v-on:click="selectedUser(u)">
                   <td>{{u.name}}</td>
                   <td>{{u.surname}}</td>
                   <td>{{u.date}}</td>
                   <td>{{u.gender}}</td>
                   <td>{{u.userName}}</td>
                   <td><label v-if="u.role=='CUSTOMER'"> {{u.customerType}} </label></td>
                   <td v-if="u.blocked==false">Not blocked</td>
                   <td v-if="u.blocked==true">Blocked</td>
               </tr>    
           </table>
</div>
</div> 
   `,
   mounted(){
    axios.get('rest/testlogin')
        .then(response => {
        this.loggedInUser = response.data;
        if(this.loggedInUser.role == 'MANAGER'){
            axios.get('rest/restaurantscustomers', {
                params : {
                    "username" : this.loggedInUser.userName
                }
            })
            .then( response =>{
                if(response.data == "err1"){
                    "You don't have a restaurant yet!"
                } else{
                    this.customers = response.data;
                }
            })
            .catch(function(error){
                alert("It is immpossible to load restaurant's customers!")
            });
        }
        else{
            alert("You don't have a permission to access this page, because you're not a manager!")
        }
        });
},
methods: {
    selectedUser: function(user1)
    {
    this.user=user1;
    this.mode='TRUE';
    },
    
block: function(user){
  alert(user.userName)
axios
.put("rest/blockuser", {
    "id": user.userName
})
.then(response =>{
    if(response.data == "Err"){
        alert("You don't have a permission to block users!")
    } else{
        alert("Successfully blocked!")
    }
})
.catch(function(error){
    alert("Server error! Blocking users is temporery unavailable!")
})
}
}
 });      
   