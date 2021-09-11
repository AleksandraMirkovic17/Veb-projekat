Vue.component("profile",{
  data: function(){
       return{
         userName: '',
         name: '',
         surname: '',
         date: '',
         gender: '',
         loggedInUser: {},
         mode: 'FALSE',
         allField:'OK'

       }
  },
  template: `

  <div class="main">
              
        <div class="profil">
           <h3>Profil</h3>
           <div class="profilm">
            <div class="name">
                <label>First name:</label>
                <input type="text" required placeholder="Enter your first name" v-model="loggedInUser.name" v-bind:disabled="mode=='TRUE'">
            </div>
            <br>
            <div class="name">
                <label >Last name:</label>
                <input type="text" required placeholder="Enter your last name" v-model="loggedInUser.surname" v-bind:disabled="mode=='TRUE'">
            </div>
            <br>
            <div class="name">
                <label >Role:</label>
                <label>{{loggedInUser.role}}</label>
            </div>
            <br>
            <div v-if="loggedInUser.role == 'MANAGER'">
              <label >Restaurant:</label>
              <label>{{loggedInUser.restaurant}}</label>
            </div>
            <div v-if="loggedInUser.role == 'CUSTOMER'">
              <label >Type:</label>
              <label>{{loggedInUser.customerType}}</label>
            </div>
            <br>
            <div class="name">
                <label >Date of birth:</label>
                <input type="date"  v-model="loggedInUser.date" v-bind:disabled="mode=='TRUE'"/>
            </div>
            <br>
           <div class="name">
            <label >Select gender:</label>
     
            <select class="gender-selection" v-model="loggedInUser.gender" v-bind:disabled="mode=='TRUE'">
               <option value="" disabled selected hidden>Gender</option>
               <option value = "MALE">Male</option>
               <option value = "FEMALE">Female</option>
            </select>
            </div>
              <br>
            <div class="name">
                <label c>Username:</label>
                <input type="text" required placeholder="Enter a unique username" v-model="loggedInUser.userName" v-bind:disabled="mode=='TRUE'"/>
            </div>

            <br>
            <div>
                <input class="button" type="submit" value="Change information" v-on:click="ChangeInformation" v-bind:disabled="mode=='TRUE'" >
            </div>
        </div>
        </div>
 
  </div>
            
   `,
    	mounted()
	{
	 axios 
	 .get('rest/testlogin')
	 .then(response =>
	 {
	 if(response.data !="Err:UserIsNotLoggedIn")
	     {
	       this.loggedInUser=response.data;
	     }
	    })
},
methods: {
  loadloggeduser: function(){
    axios
    .get('rest/testlogin')
    .then(response =>
    {
    if(response.data !="Err:UserIsNotLoggedIn")
        {
          this.loggedInUser=response.data;
        }
       })
  },
  ChangeInformation: function () {
 
    axios
    .put('rest/ChangeInformation/', { 
          "name": this.loggedInUser.name, 
          "userName" : this.loggedInUser.userName,
          "surname" : this.loggedInUser.surname,
          "gender": this.loggedInUser.gender,
          "date": this.loggedInUser.date })
        .then(response => {

      if(response.data == "Username exists"){
         alert('Username exists');
    }
    else if(response.data == "OK")
    {
     alert('Successful user change profile');
     this.mode='TRUE';
     this.loadloggeduser();
     }
     else
     {
      alert('Error');
     }
     

  });       

  }
  }
   });