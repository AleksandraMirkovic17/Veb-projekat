const restaurants={template: '<restaurants></restaurants>'};
const registration={template: '<registration></registration>'};
const login={template: '<login></login>'};

const router= new VueRouter({
      mode: 'hash',
      routes: [
      {path: '/', component:  restaurants},
      {path: '/registration',component: registration},
      {path: '/login',component: login}
      ]
});
var app = new Vue({
    router,
	el: '#firstPage',
	data: {
		status: 'notLoggedIn',
		typeUser: 'anonymous',
		loggedInUser: {}
	},
	mounted()
	{
	 axios 
	 .get('rest/testlogin')
	 .then(response =>
	 {
	 if(response.data !="Err:UserIsNotLoggedIn")
	     {
	       this.loggedInUser=response.data;
	       this.status='loggedIn';
	       this.typeUser=this.loggedInUser.role;
	     }
	    })
			.catch(function (error) {
				alert('Login for users is temporary unavailable');
		}
	);
}
});