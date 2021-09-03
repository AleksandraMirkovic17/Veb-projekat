Vue.component("login",{
   data: function(){
         return{
         userName: '',
         password: '',
         allFilled:'OK'
         }
      },
  template: `
  <div class="main">
  <div class="profil">
           <h3>Log in</h3>
           <br>
           <br>
           <div class="profilm">
            <div class="name">
                <label c>Username:</label>
                <input type="text" required placeholder="Enter a unique username" v-model="userName" />
            </div>
            <br>
            <br>
               <div class="name">
                <label c>Password:</label>
                <input type="text" required placeholder="Enter a password" v-model="password"/>
            </div>

            <br>
            <div>
                <input class="button" type="submit" value="Login" v-on:click="LoginUser" >
            </div>
        </div>
</div>
 
  </div> `,
    methods: {
    LoginUser: function(){
      if(this.userName==''){
            this.allFilled='You must enter a username!';
            alert(this.allFilled);
            return false;
        }
         if(this.password == ''){
            this.allFilled='You must enter a password!';
            alert(this.allFilled);
             return false;
         }
    axios.get('rest/login',{
    params:
    {
       userName: this.userName,
       password: this.password
    }
  })
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
         window.location.href = "/";
         });	
  
 }}
});      
  