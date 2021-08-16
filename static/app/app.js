const registration={template: '<registration></registration>'};
const login={template: '<login></login>'};
const restaurants={template: '<restaurants></restaurants>'};

const router= new VueRouter({
      mode: 'hash',
      routes: [
      
      {path: '/registration',component: registration},
      {path: '/login',component: login},
      {path: '/', component:restaurants}
      
      ]
});
var app = new Vue({
    router,
	el: '#firstPage'
});