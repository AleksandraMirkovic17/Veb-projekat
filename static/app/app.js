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
	el: '#firstPage'
});