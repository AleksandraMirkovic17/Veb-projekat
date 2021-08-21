Vue.component("managersrestaurant",{
    data: function(){
        return{
        loggedUser:{},
        thisrestaurant:{},
        restaurantname:''
        }
        
    },
    template:
    `
    <div id="menagers-page">
    <h1>Menager page</h1>
    <div class="post" v-if="loggedUser!=null">
    <img :src="thisrestaurant.imageRestaurant" class="post-image">
        <div class="post-preview">
            <h2><a href=""> 
                {{thisrestaurant.name}}
            </a></h2>
            &nbsp;
            <p class="preview-text">
                <p>{{thisrestaurant.location.street}} {{thisrestaurant.location.houseNumber}}, {{thisrestaurant.location.city}}</p>
                <p>{{thisrestaurant.typeOfRestaurant}}</p>
                <p>{{thisrestaurant.status}}</p>
                <p>{{thisrestaurant.rating}}</p>
            </p>
        </div>
    </div>
    </div>
    `,
    mounted() {
        axios.get('rest/testlogin')
            .then(response =>
                { if(response.data!= "Err:UserIsNotLoggedIn"){
                    this.loggedUser=response.data;
                    if(this.loggedUser.role == 'MANAGER'){
                        this.loadRestaurant();
                   
                    }
                    } else{
                        alert("You don't have a permission to access this site, beacuse you are not a manager!");
                    }
                })
                .catch(() => {
                    alert('Test login is temporary unavailable')
                    });	

    },
    methods:{
        loadRestaurant: function(){
            axios
            .get('rest/loadrestmanager/',
            {
                params:{
                    restaurantname : this.loggedUser.restaurant
                }
            })
            .then(responsee =>
                {
                    if(responsee.data != "NotExsists"){
                        alert("aa")

                        this.thisrestaurant = responsee.data
                    }
                    else{
                        alert("The restaurant you are looking no loger exsists!")
                    }
                }

            )
            .catch(() => {
                alert('Searching for restaurant is temporary unavailable')
                });	
        }
        
    }

}
);