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
       }
  },
  template: ` <div class="registration_form">
            
                <div class="user-details">
                    <div class="input-box">
                        <label class="letters">First name*</label>
                        <input type="text" required placeholder="Enter your first name">
                    </div>
                    <div class="input-box">
                        <label class="letters">Last name*</label>
                        <input type="text" required placeholder="Enter your lat name">
                    </div>
                    <div class="input-box">
                        <label class="letters">Date of birth*</label>
                        <input type="date" value="1950-01-01" placeholder="dd-mm-yyyy" />
                    </div>
                    <div class="input-box">
                        <label class="letters">Username*</label>
                        <input type="text" required placeholder="Enter a unique username" />
                    </div>
                    <div class="input-box">
                        <label class="letters">Password*</label>
                        <input type="text" required placeholder="Enter your password" required="" />
                    </div>
                    <div class="input-box">
                        <label class="letters">Confirm password*</label>
                        <input type="text" required placeholder="Confirm your password" required="" />
                    </div>
                    <div class="gender-details" >
                        <input type="radio" name="gender" id="rb1">
                        <input type="radio" name="gender" id="rb2">
                        <label class="letters">Gender</label>
                        <div class="gender_selection">
                            <div class="category">
                                <label for="rb1">
                                    <span class="radio_button"></span>
                                    <span class="gender">Male</span>
                                </label>
                                 <label for="rb2">
                                    <span class="radio_button"></span>
                                    <span class="gender">Female</span>
                                </label>                           
                            </div>
                        </div>                  
                    </div>
                    <div class="button">
                        <input type="submit" value="Register">
                    </div>
                </div>
        </div>
   `
});