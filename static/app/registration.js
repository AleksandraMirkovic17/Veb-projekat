Vue.component("registration",{
  data: function(){
       return{
         userName: '',
         password:'',
         name: '',
         surname: '',
         date: '',
         role: "Customer",
         confirmPassword:'',
         gender: '',
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
            <select class="gender-selection" v-model="gender" >
               <option value="" disabled selected hidden>Gender</option>
               <option value = "MALE">Male</option>
               <option value = "FEMALE">Female</option>
            </select>
            <br>
                    <div class="button">
                        <input type="submit" value="Register">
                    </div>
                </div>
        </div>        
   `
 ,
 methods : {
 	axios.post('rest/CustomerRegistration/', {"userName":this.userName, "name":this.name, "surname":this.surname, "password":this.password, "date":this.date, "gender":this.gender })
 		.then(response => {
 			alert('Successful customer registration!');
 		});		
 }
});