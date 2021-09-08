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
         role:"CUSTOMER",
         loggedInUser: {},
         allFilled: "OK",
         userNameUnique: "OK",
         correctRepeatedPassword: "OK"
       }
  },
  template: ` 
  <div class="registration_form">
    <div  class="wrapper">
        <div v-if="loggedInUser.role!='ADMINISTRATOR'" class="title">
        Registration Form
        </div>
        <div v-else-if="loggedInUser.role=='ADMINISTRATOR'" class="title">
            Register a new manager or deliverer
        </div>
        <div class="form">
                    <div v-if="loggedInUser.role =='ADMINISTRATOR'" class="inputfield">
                        <label>Role</label>
                        <select v-model="role" >
                            <option value="" disabled selected hidden>Select role</option>
                            <option value = "DELIVERER"> Deliverer</option>
                            <option value = "MANAGER"> Manager</option>
                        </select>
                    </div>
                <div class="inputfield">
                    <label>First Name</label>
                    <input type="text" class="input" required placeholder="Enter your first name" v-model="name">
                </div>  
                <div class="inputfield">
                    <label>Last Name</label>
                    <input type="text" class="input" required placeholder="Enter your last name" v-model="surname">
                </div> 
                <div class="inputfield">
                    <label>Username</label>
                    <input type="text" class="input" required placeholder="Enter username" v-model="userName">
                </div> 
                <div class="inputfield">
                        <label class="letters">Date of birth</label>
                        <input type="date"  class="input"  value="1950-01-01" placeholder="dd-mm-yyyy" v-model="date" />
                </div>
                <div class="inputfield">
                    <label>Password</label>
                    <input type="password" class="input" required placeholder="Enter your password" required="" v-model="password">
                </div>  
                <div class="inputfield">
                    <label>Confirm Password</label>
                    <input type="password" class="input" required placeholder="Confirm your password" required="" v-model="confirmPassword">
                </div> 
                    <div class="inputfield">
                    <label>Gender</label>
                    <div class="custom_select">
                        <select v-model="gender">
                        <option value="">Select</option>
                        <option value="MALE">Male</option>
                        <option value="FEMALE">Female</option>
                        </select>
                    </div>
                </div> 
                <div class="inputfield">
                    <input type="submit" value="Register" class="btn" v-on:click="Validation">
                </div>
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
     Validation: function(){

         if(this.name == ''){
            this.allFilled='You must enter your name!';
            alert(this.allFilled);
             return false;
         }
         if(this.surname == ''){
            this.allFilled='You must enter your surname!';
            alert(this.allFilled);
             return false;
         }
         if(this.date == ''){
            this.allFilled='Please select your birthday!';
            alert(this.allFilled);
             return false;
         }
         if(this.userName==''){
            this.allFilled='You must enter a username!';
            alert(this.allFilled);
            return false;
        }
         if(this.gender == ''){
            this.allFilled='Please select your gender!';
            alert(this.allFilled);
             return false;
         }
         if(this.password == ''){
            this.allFilled='Please enter a password!';
            alert(this.allFilled);

             return false;
         }
         if(this.password != this.confirmPassword){
            this.correctRepeatedPassword='Passwords should be same!';
            alert(this.correctRepeatedPassword);
             return false;
         }

         axios.post('rest/usernameExists', this.userName)
            .then(response=>{
                if(response.data===true){
                    this.userNameUnique = 'There is a user with the same username, please enter a unique username!';
                    alert(this.userNameUnique);
                    return false;
                }
                else{
                    this.RegisterCustomer();
                }

            }).catch()
         
     },
     RegisterCustomer: function(){
 	axios.post('rest/CustomerReg/', {"userName":this.userName, "name":this.name, "surname":this.surname, "password":this.password, "date":this.date, "gender":this.gender,"role":this.role })
 		.then(response => {
                alert('Successful customer registration!');
                if(this.role==="CUSTOMER"){
                axios.post('rest/login',
                    {
                    "userName": this.userName,
                    "password": this.password
                    }
                )
               .then(response => {
                    if (response.data == 'YOUR ACCOUNT DOES NOT EXIST IN THE SYSTEM, PLEASE REGISTER!') {
                    alert('Err: YOUR ACCOUNT DOES NOT EXIST IN THE SYSTEM, PLEASE REGISTER');
                    }
                    else{
                    alert('Successful user login!')
                    window.location.href = "/";
                    }
                    
                    })
               .catch(() => {
                    alert('Login for users is temporary unavailable')
                    window.location.href = "/"});
               }
        })
        .catch(() => {
            alert('Registration for customers is temporary unavailable!')
            window.location.href = "/";
            });	
    },
        Validation: function(){

         if(this.name == ''){
            this.allFilled='You must enter your name!';
            alert(this.allFilled);
             return false;
         }
         if(this.surname == ''){
            this.allFilled='You must enter your surname!';
            alert(this.allFilled);
             return false;
         }
         if(this.date == ''){
            this.allFilled='Please select your birthday!';
            alert(this.allFilled);
             return false;
         }
         if(this.userName==''){
            this.allFilled='You must enter a username!';
            alert(this.allFilled);
            return false;
        }
         if(this.gender == ''){
            this.allFilled='Please select your gender!';
            alert(this.allFilled);
             return false;
         }
         if(this.password == ''){
            this.allFilled='Please enter a password!';
            alert(this.allFilled);

             return false;
         }
         if(this.password != this.confirmPassword){
            this.correctRepeatedPassword='Passwords should be same!';
            alert(this.correctRepeatedPassword);
             return false;
         }

         axios.post('rest/usernameExists', this.userName)
            .then(response=>{
                if(response.data===true){
                    this.userNameUnique = 'There is a user with the same username, please enter a unique username!';
                    alert(this.userNameUnique);
                    return false;
                }
                else{
                    this.RegisterCustomer();
                }

            }).catch()
         
     }
}
});