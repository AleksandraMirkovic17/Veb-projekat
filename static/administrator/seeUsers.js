Vue.component("seeUsers",{
   data: function(){
         return{
         users: null,
         name: '',
         surname:'',
         userName: '',
         role: 'ALL'
         }
      },
  template:
  ` 
    <div>
       
        <hr>
        <table>
            <tr id="heder">
                <th>Name</th>
                <th>Surname</th>
                <th>Date</th>
                <th>Gender</th>
                <th>Username</th>
                <th>Role</th>
            </tr>
            <tr v-for="u in users">
                <td>{{u.name}}</td>
                <td>{{u.surname}}</td>
                <td>{{u.date}}</td>
                <td>{{u.gender}}</td>
                <td>{{u.userName}}</td>
                <td>{{u.role}}</td>
            </tr>
    
        </table>
      
          <div class="mainn">
            <div class="profiln">
                     <h3>Searh users</h3>
                  
                     <br>
                     <div class="profilmn">
                      <div class="namen">
                          <label >Name:</label>
                          <input type="text" required placeholder="" v-model="name"/>
                      </div>
                    
                      <br>
                         <div class="namen">
                          <label >Surename:</label>
                          <input type="text" required placeholder="" v-model="surname"/>
                      </div>
                     
                      <br>
                         <div class="namen">
                          <label >Username:</label>
                          <input type="text" required placeholder="" v-model="userName"/>
                      </div>
                      <br>
                       <label >Roles:</label>
                         
                   <select  v-model="role" >
               
                  <option value = "ALL" selected> ALL</option>
                  <option value = "CUSTOMER"> CUSTOMER</option>
                  <option value = "DELIVERER"> DELIVERER</option>
                  <option value = "MANAGER"> MANAGER</option>
                  </select>
                  <br>
                      <br>
                      <div>
                          <button  v-on:click="searchUsers" >Search</button>    
                      </div>
                  </div>
          </div>
           
      </div>
    </div>
  
  `,
       mounted(){
        axios.get('rest/seeUsers')
        .then(response =>(this.users = response.data));
    },
    methods: {
       searchUsers: function () {
			axios.get('rest/searchUsers', { 
			params: {
				 "name": this.name,
				 "surname": this.surname,
				 "userName": this.userName,
				 "role": this.role
			} 
			})
				.then(response => (this.users = response.data))
                    .catch(function (error) {
					    alert('Something is wrong with searching for users!');
				});	

		}
    }
});      
  