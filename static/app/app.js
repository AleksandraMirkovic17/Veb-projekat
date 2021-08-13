const registration={template: '<registration></registration>'};
const router= new VueRouter({
      mode: 'hash',
      routes: [
      
      {path: '/registration',component: registration}
      
      ]
});
var app = new Vue({
    router,
	el: '#firstPage'
});