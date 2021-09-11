Vue.component("seesus",{
   data: function(){
         return{
         user:null,
         user2:'',
         users: null,
         name: '',
         surname:'',
         userName: '',
         userName1: '',
         role: 'ALL',
         customerType:'ALL',
         mode: 'FALSE'
         }
      },
  template:
  ` 
  <div class= "seeusers">
  <div class = "other">

<div class="listofusers">
          <table>
              <tr id="heder">
                  <th>Name</th>
                  <th>Surname</th>
                  <th>Usernam</th>
                  <th>Order cancellation number </th>
                  <th>Points</th>
                  <th>Block</th>
              </tr>
              <tr v-for="u in users">
                  <td>{{u.name}}</td>
                  <td>{{u.surname}}</td>
                  <td>{{u.userName}}</td>
                  <td>{{u.numberCenc}}</td>
                  <td>{{u.points}}</td>
                  <td v-if="u.role!='ADMINISTRATOR' && (u.blocked==false || u.blocked==null)"><button class="btn" v-on:click="block(u)">Block</button></td>
                        <td v-else-if="u.blocked==true">Blocked</td>
                  
              </tr>    
          </table>
          </div>
          </div>
</div>
  `,
  mounted(){
    axios.get('rest/seeSus')
    .then(response =>(this.users = response.data));
},
methods:{
loadusers: function(){
    axios.get('rest/seeSus')
    .then(response =>(this.users = response.data));
},
block: function(user){
      alert(user.userName)
    axios
    .put("rest/blockuserS", {
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
    axios
    .put("rest/blockuser", {
        "id": user.userName
    })
    .then(response =>{
        if(response.data == "Err"){
            alert("You don't have a permission to block users!")
        } else{
            alert("Successfully blocked!");
            this.loadusers();
        }
    })
    .catch(function(error){
        alert("Server error! Blocking users is temporery unavailable!")
    })

  }
    }
  });