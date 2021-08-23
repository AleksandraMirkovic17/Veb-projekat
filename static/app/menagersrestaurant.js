Vue.component("managersrestaurant",{
    data: function(){
        return{
        loggedUser:{},
        thisrestaurant:{},
        restaurantname:'',
        openclosed: '',

        articalName:'',
        price:'',
        type:'DISH',
        description:'',
        quantity:'',
        imageArtical:'',
        
        image: null,
        imagePreview: null,
        file:'',
        allFilled:'',
        nameUnique:''
        }
        
    },
    template:
    `
    <div class="manager-content clearfix">

    <div class="restaurant-info">
        <div class="post">
            <img :src="restaurantImageLogo(thisrestaurant)" class="post-image">
                <h2>
                    {{thisrestaurant.name}}
                </h2>
                &nbsp;
                <p class="preview-text">
                    <p>{{thisrestaurant.location.street}} {{thisrestaurant.location.houseNumber}}, {{thisrestaurant.location.city}}</p>
                    <p>{{thisrestaurant.typeRestaurant}}</p>
                    <select v-model="openclosed" @change="statusUpload">
                        <option value = "OPEN">Open</option>
                        <option value = "CLOSED">Closed</option>
                    </select>
                    <p>{{thisrestaurant.rating}}</p>
                </p>
            </div>				
        </div>
        
    
    <div class="add-article">
        <div class="post">
            <div class="wrapper">
            <div class="article-image">
                <img :src=this.imagePreview>
            </div>
            <div class="content">
                <i class="fas fa-cloud-upload-alt"></i>
                <div class="text">No file choosen, yet!</div>

            </div>
            <div id="cancel-btn"><i class="fas fa-times">x</i></div>
        </div> 
            <h2>Add a new article</h2>
            <div class="input">
                <label>Name*</label>
                <input type="text" placeholder="Enter a name" v-model="articalName">					
            </div>
            <div class="input">
                <label>Price*</label>
                <input type="number" min=0 name="" v-model="price">					
            </div>
            <div class="input">
                <label>Type*</label>
                <select v-model="type">
                    <option value="DISH" selected="">DISH</option>
                    <option value="DRINK">DRINK</option>
                </select>
            </div>
            <div class="input">
                <label>Quantity</label>
                <input type="number" v-model="quantity" min="0" name="">					
            </div>
            <div class="input">
                <label>Description</label>
                <textarea v-model="description"></textarea>
            </div>
            <div class="input">
                <label>Photo*</label>
                <input type="file" name="" @change="imageSelected">
                
            </div>
            <button v-on:click="Validation">Add</button>    
        			
        </div>			
    </div>


    <div class="show-articles">
        <h3>List of articles</h3>
        <div v-for="a in thisrestaurant.articles">
            <div class="post">
            <img :src="loadLogoArtical(a)" class="post-image">
                <h2>
                    {{a.nameArtical}}
                </h2>
                &nbsp;
                <p class="preview-text">
                <p>Price: {{a.price}} RSD</p>
                <p>Type: {{a.type}} </p>
                <p>Description: {{a.description}} </p>
                <p>Quantity: {{a.quantity}} <span v-if="a.type=='DISH'">gr</span><span v-else-if="a.type=='DRINK'">ml</span></p>
                   
                </p>
            </div>     
        </div>   
    </div>
    <div class="sidebar">
        <div class="wrapp">
            <h3>Search articles</h3>
            
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
        restaurantImageLogo: function(r){
            if(r.imageRestaurant === 'None'){
                return "../images/podrazumevani-logo-restorana.jpg";
            } else{
                return r.imageRestaurant;
            }
        },
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

                        this.thisrestaurant = responsee.data;
                        this.openclosed = this.thisrestaurant.status;
                    }
                    else{
                        alert("The restaurant you are looking no loger exsists!")
                        alert("Dont exists restaurant!")
                    }
                }

            )
            .catch(() => {
                alert('Searching for restaurant is temporary unavailable')
                });	
        },
        Validation: function(){
            if(this.name == '' || this.imageArtical=='' || this.price=='' || this.type=='' ){
                this.allFilled='You must enter all required fields!';
                alert(this.allFilled);
                 return false;
             }
             axios.get('rest/ArticalNameExists', {
                params:
                   {
                       name : this.articalName,
                       restaurantname: this.thisrestaurant.name
                   }
            })
               .then(response=>{
                   if(response.data===true){
                       this.nameUnique = 'There is an articale with the same name in the restaurant, please choose another name';
                       alert(this.nameUnique);
                       return false;
                   }
                   else{
                       this.addArtical();
                   }
                   
               }).catch()
               

        },
        addArtical: function(){
            axios.post('rest/addArticle/', {"nameArtical":this.articalName, "price":this.price, 
                                "type":this.type, "restaurant":this.thisrestaurant.name,
                                "quantity":this.quantity, "description":this.description,
                                 "image": this.imageArtical })
        .then(response => {
               alert('The artical is successfully added!');
                       //upload an image

               this.loadRestaurant();
               this.emptyFields();
        });
        },
        emptyFields: function(){
            this.articalName = '';
            this.price ='';
            this.type ='DISH';
            this.description ='';
            this.quantity = '';
            this.imageArtical = '';
            this.image = null;
            this.imagePreview = null;
            this.file='';
            this.allFilled='';
            this.nameUnique='';
        },
        imageSelected: function(e){
            const file = e.target.files[0];
            this.imagePreview = URL.createObjectURL(file);
            this.onUpload(file);
        },
        onUpload: function(file){
            const reader= new FileReader();
            reader.onload = (e) =>{
                this.imageArtical = e.target.result;
            }
            reader.readAsDataURL(file);
        },
        statusUpload: function(){
            axios.put("rest/changerestaurantstatus", {restaurantName: this.thisrestaurant.name, newStatus: this.openclosed})
            .then(response =>
                { if(response.data!= "Err:No permission"){
                    alert("Successfully updated!");
                    }
                     else{
                        alert("You dont have a permession!");
                    }
                })
                .catch(() => {
                    alert('Change restaurant state is temporary unavailable')
                    });	
        },
        loadLogoArtical: function(r){
            if(r.imageRestaurant === 'None'){
                return "../images/artical.png";
            } else{
                return r.image;
            }
        }
        
    }

}
);