const restaurants={template: '<restaurants></restaurants>'}
const registration={template: '<registration></registration>'}
const login={template: '<login></login>'}
const addrestaurant={template:'<addrestaurant></addrestaurant>'}
const profile={template: '<profile></profile>'}
const password={template: '<password></password>'}
const managersrestaurant={template:'<managersrestaurant></managersrestaurant>'}
const seeUsers={template:'<seeUsers></seeUsers>'}
const onerestaurant={template:'<onerestaurant></onerestaurant>'}
const shoppingcart={template:'<shoppingcart></shoppingcart>'}

const customersorders={template:'<customersorders></customersorders>'}

const managersorders={template:'<managersorders></managersorders>'}
const restaurantscustomers={template:'<restaurantscustomers></restaurantscustomers>'}
const readyorders = {template: '<readyorders></readyorders>'}
const deliverersorders = {template: '<deliverersorders></deliverersorders>'}


const router= new VueRouter({
      mode: 'hash',
      routes: [      
      {path: '/', component:restaurants},
      {path: '/registration',component: registration},
      {path: '/login',component: login},
	  {path: '/addrestaurant', component: addrestaurant},
	  {path: '/managersrestaurant', component: managersrestaurant},
	  {path: '/profile',component: profile},
	  {path: '/password', component: password},
	  {path: '/seeUsers',component: seeUsers},
	  {path: '/onerestaurant/:name', component: onerestaurant},
	  {path: '/shoppingcart', component: shoppingcart},
	  {path: '/restaurantscustomers', component: restaurantscustomers},

	  {path: '/customersorders', component: customersorders},

	  {path: '/managersorders', component: managersorders},
	  {path: '/readyorders', component: readyorders},
	  {path: '/deliverersorders', component: deliverersorders}

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
				alert('Login for users is temporary unavailable, please come back later!');
		}
	);
	},
	methods :
	{
		logout: function () {			
			axios.get('rest/logout')
				.then(response => {
					if (response.data === 'OK') {
						alert(this.loggedInUser.name+" you are successfully logged out!");
						this.status ="notLoggedIn";
						this.typeUser='anonymous';
						this.loggedInUser={};
					}
				})
				.catch(function (error) {
					alert('You are unable to logout from your pofile!');
				}
				);

		}
	}

});