Vue.component("login",{
   data: function(){
         return{
         userName: '',
         password: ''
         }
      },
  template:
  ` <div class="log">
        <img src="loginAvatar.bmp" class="avatar">
        <h1>Login Here</h1>
        <div class="txt_field">
          <input type="text" required v-model="userName">
          <span></span>
          <label>Username</label>
        </div>
        <div class="txt_field">
          <input type="password" required v-model="password">
          <span></span>
          <label>Password</label>
        </div>
        <input type="submit" value="Login"  v-on:click="LoginUser">
        <div class="signup_link">
          Not a member? <a href="#/registration">Signup</a>
        </div>
    </div> `,
    methods: {
    LoginUser: function(){
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
  