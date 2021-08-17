Vue.component("registration",{
  data: function(){
       return{
         userName: '',
         password:'',
         name: '',
         surname: '',
         date: '',
         confirmPassword:'',
         gender: '',
         role:'',
         loggedInUser: {}
       }
  },
  template: ` <div class="registration_form">
            
                <div class="user-details">
                    <div class="input-box">
                        <label class="letters">First name*</label>
                        <input type="text" required placeholder="Enter your first name" v-model="name">
                    </div>
                    <div class="input-box">
                        <label class="letters">Last name*</label>
                        <input type="text" required placeholder="Enter your last name" v-model="surname">
                    </div>
                    <div class="input-box">
                        <label class="letters">Date of birth*</label>
                        <input type="date" value="1950-01-01" placeholder="dd-mm-yyyy" v-model="date" />
                    </div>
                    <div class="input-box">
                        <label class="letters">Username*</label>
                        <input type="text" required placeholder="Enter a unique username" v-model="userName" />
                    </div>
                    <div class="input-box">
                        <label class="letters">Password*</label>
                        <input type="text" required placeholder="Enter your password" required="" v-model="password"/>
                    </div>
                    <div class="input-box">
                        <label class="letters">Confirm password*</label>
                        <input type="text" required placeholder="Confirm your password" required="" v-model="confirmPassword"/>
                    </div>
                     <br>
             <div v-if="loggedInUser.role =='ADMINISTRATOR'">
               <select  v-model="role" >
                  <option value="" disabled selected hidden>Role</option>
                  <option value = "DELIVERER"> DELIVERER</option>
                  <option value = "MANAGER"> MANAGER</option>
               </select>
            </div>
                          <br>
            <select class="gender-selection" v-model="gender" >
               <option value="" disabled selected hidden>Gender</option>
               <option value = "MALE">Male</option>
               <option value = "FEMALE">Female</option>
            </select>
            <br>
                    <div class="button">
                        <input type="submit" value="Register" v-on:click="RegisterCustomer">
                    </div>
                </div>
        </div>        
   `
 ,
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
			.catch(function (error) {
				alert('Login for users is temporary unavailable');
		}
	);
},
 methods : {
     RegisterCustomer: function(){
 	axios.post('rest/CustomerReg/', {"userName":this.userName, "name":this.name, "surname":this.surname, "password":this.password, "date":this.date, "gender":this.gender,"role":this.role })
 		.then(response => {
 			alert('Successful customer registration!');
 		})
         .catch(() => {alert('Registration for customers is temporary unavailable')});		
 }
}
});