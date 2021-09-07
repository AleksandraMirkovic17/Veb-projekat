Vue.component("seeUsers",{
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
         mode: 'FALSE'
         }
      },
  template:
  ` 
    <div class= "seeusers">
       
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
            <tr v-for="u in users" v-on:click="selectedUser(u)">
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
 
    <div class="mainnn" v-if="mode=='TRUE'">
        <div class="profilnnn" >
           <h3>Profil</h3>
           <div class="profilmnn">
            <div class="namennn">
                <label>First name:</label>
                <input type="text" required placeholder="Enter your first name" v-model="user.name">
            </div>
            <br>
            <div class="name">
                <label >Last name:</label>
                <input type="text" required placeholder="Enter your last name" v-model="user.surname" >
            </div>
            <br>
            <div class="name">
                <label >Date of birth:</label>
                <input type="date" v-model="user.date" />
            </div>
            <br>
           <div class="name">
            <label >Select gender:</label>
     
            <select class="gender-selection" v-model="user.gender">
               <option value="" disabled selected hidden>Gender</option>
               <option value = "MALE">Male</option>
               <option value = "FEMALE">Female</option>
            </select>
            </div>
              <br>
            <div class="name">
                <label c>Username:</label>
                <input type="text" required placeholder="Enter a unique username" v-model="user.userName"/>
            </div>

            <br>
            <div>
                <input class="button" type="submit" value="Change information"  v-on:click="ChangeInformation" >
            </div>
             <div>
                <input class="button" type="submit" value="Delete user" v-on:click="DeleteUser">
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

		},
		selectedUser: function(user1)
		{
		this.user=user1;
		this.mode='TRUE';
		this.user2=user1.userName;
		},
		
		 ChangeInformation: function () {
 
    axios
    .put('rest/ChangeInformationUsers/', { "name": this.user.name, "userName" : this.user.userName,"surname" : this.user.surname,"gender": this.user.gender,"date": this.user.date,"userName1":this.user2})
        .then(response => {

      if(response.data == "Username exists"){
         alert('Username exists');
    }
    else if(response.data=="ERR"){
     alert('Something wrong');
    }
    else
    {
        this.mode='FALSE';
        this.users=response.data;
    
    }     
  });       

  },
  	 DeleteUser: function () {
 
    axios
    .put('rest/DeleteUser/', {"name": this.user.name, "userName" : this.user.userName,"surname" : this.user.surname,"gender": this.user.gender,"date": this.user.date,"userName1":this.user2})
        .then(response => {

      if(response.data == "Err"){
   
     alert('Something wrong');
    }
    else
    {
        this.mode='FALSE';
        this.users=response.data;
    
    }     
  });       

  }
    }
});      
  