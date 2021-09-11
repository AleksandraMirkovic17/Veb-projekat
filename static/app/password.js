Vue.component("password",{
    data: function(){
         return{
           oldpassword: '',
           newpassword: '',
           repeatedpassword: '',
           loggedInUser: {},
           allField:'OK'
  
         }
    },
    template: `
  
    <div class="main">
                
          <div class="profil" v-if="loggedInUser.userName!=null">
             <h3>Change password</h3>
             <div class="profilm">
              <div class="name">
                  <label>Old password:</label>
                  <input type="password" required placeholder="Enter your old password" v-model="oldpassword">
              </div>
              <br>
              <div class="name">
                  <label>New password:</label>
                  <input type="password" required placeholder="Enter a new password" v-model="newpassword" >
              </div>
              <br>
              <div class="name">
                  <label>Repeat new password:</label>
                  <input type="password" required placeholder="Repeat your new password" v-model="repeatedpassword">
              </div>
              <br>

              <div>
                  <input class="button" type="submit" value="Change password" v-on:click="ChangeInformation" >
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
        if(this.oldpassword=="" || this.newpassword=="" || this.repeatedpassword==""){
            alert("All fields must be filled!")
            return;
        }
        else if(this.oldpassword!==this.loggedInUser.password){
            alert("Wrong password!");
            this.oldpassword ="";
            this.newpassword="";
            this.repeatedpassword="";
            return;
        } else if(this.newpassword!==this.repeatedpassword){
            alert("Repeat your password correctly!");
            this.oldpassword ="";
            this.newpassword="";
            this.repeatedpassword="";
        } else{
            axios
            .put('rest/changepassword',{
                "username" : this.loggedInUser.userName,
                "oldpassword" : this.oldpassword,
                "newpassword" : this.newpassword,
                "repeatedpassword" : this.repeatedpassword
            })
            .then(response =>{
                if(response.data === "error1"){
                    alert("Wrong password!");
                } else if(response.data === "error2"){
                    alert("Passwords should be same!")
                } else if(response.data === "error3"){
                    alert("You are not allowed to change the password!")
                } else{
                    this.loadloggeduser();
                    this.oldpassword ="";
                    this.newpassword="";
                    this.repeatedpassword="";
                    alert("Password successfully changed!")
                }
            })
            .catch(function(error){
                alert("Server error, cannot change the password!")
            })
        }      
    }
    }
     });