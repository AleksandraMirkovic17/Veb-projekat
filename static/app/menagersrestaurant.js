Vue.component("managersrestaurant",{
    data: function(){
        return{
        loggedUser:{},
        thisrestaurant:{},
        restaurantname:'',
        openclosed: '',
        comments: null,

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
        nameUnique:'',

        editartical:'none',
        editarticalobj: null,
        editarticalnewname:'',
        editarticalnewprice:'',
        editarticalnewtype:'',
        editarticalnewdescription:'',
        editarticalnewquantity:'',
        editarticalnewimage:'',
        editarticalImagePreview: null,
        editarticalimage: null
        }
        
    },
    template:
    `
    <div class="manager-content">

    <div class="restaurant-info">
        <div class="post">
            <div class="post-image">
                <img :src="restaurantImageLogo(thisrestaurant)">
            </div>
            <div class="info">
                    <h2>
                        {{thisrestaurant.name}}
                    </h2>
                    &nbsp;
                    <p class="preview-text">
                        <p>Location: {{thisrestaurant.location.street}} {{thisrestaurant.location.houseNumber}}, {{thisrestaurant.location.city}}</p>
                        <p>Type: {{thisrestaurant.typeRestaurant}}</p>
                        <select v-model="openclosed" @change="statusUpload">
                            <option value = "OPEN">Open</option>
                            <option value = "CLOSED">Closed</option>
                        </select>
                        <p>Rating: {{thisrestaurant.rating}}</p>
                    </p>
            </div>
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
            </div> 
            <div class="form">
                <h2>Add a new article</h2>
                <div class="inputfiled">
                    <label>Name*</label>
                    <input type="text" placeholder="Enter a name" v-model="articalName">					
                </div>
                <div class="inputfiled">
                    <label>Price*</label>
                    <input type="number" min=0 name="" v-model="price">					
                </div>
                <div class="inputfiled">
                    <label>Type*</label>
                    <select v-model="type">
                        <option value="DISH" selected="">DISH</option>
                        <option value="DRINK">DRINK</option>
                    </select>
                </div>
                <div class="inputfiled">
                    <label>Quantity</label>
                    <input type="number" v-model="quantity" min="0" name="">					
                </div>
                <div class="inputfiled">
                    <label>Description</label>
                    <textarea v-model="description"></textarea>
                </div>
                <div class="inputfiled">
                    <label>Photo*</label>
                    <input type="file" name="" @change="imageSelected">              
                </div>
                <div class="inputfield">
                <button v-on:click="Validation" class="btn">Add</button>
                </div>
            </div> 
            <!--form-->    
        			
        </div>			
    </div>


    <div class="show-articles">
        <h3>List of articles</h3>
        <div v-for="a in thisrestaurant.articles">
            <div class="post" v-if="editartical!=a.nameArtical">
            <div class="post-image">
            <img :src="loadLogoArtical(a)">
            </div>
            <div class ="info">
                <h2>
                    {{a.nameArtical}}
                </h2>
                &nbsp;
                <p class="preview-text">
                <p>Price: {{a.price}} RSD</p>
                <p>Type: {{a.type}} </p>
                <p v-if="a.description!=''">Description: {{a.description}} </p>
                <p v-if="a.quantity!=-1">Quantity: {{a.quantity}} <span v-if="a.type=='DISH'">gr</span><span v-else-if="a.type=='DRINK'">ml</span></p>
                <div v-if="editartical=='none'">
                    <button v-on:click="editart(a)" class="btn">Edit</button>
                </div>
                   
                </p>
            </div>
            </div>

            <div class="edit" v-else-if="editartical==a.nameArtical">
                    <div class="article-image">
                        <img v-if="editarticalImagePreview!=null" :src=editarticalImagePreview class="post-image">
                        <img v-if="editarticalImagePreview==null" :src="loadLogoArtical(a)">
                    </div>
                <div class="form">
                    <h4>Edit article</h4>
                    <div class="inputfield">
                        <label>Name*</label>
                        <input type="text" placeholder=this.editarticalnewname v-model="editarticalnewname">					
                    </div>
                    <div class="inputfield">
                        <label>Price*</label>
                        <input type="number" min=0 name="" v-model="editarticalnewprice">					
                    </div>
                    <div class="inputfield">
                        <label>Type*</label>
                        <select v-model="editarticalnewtype">
                            <option value="DISH">DISH</option>
                            <option value="DRINK">DRINK</option>
                        </select>
                    </div>
                    <div class="inputfield">
                        <label>Quantity</label>
                        <input type="number" v-model="editarticalnewquantity" min="0" name="">					
                    </div>
                    <div class="inputfield">
                        <label>Description</label>
                        <textarea v-model="editarticalnewdescription"></textarea>
                    </div>
                    <div class="inputfield">
                        <label>Photo*</label>
                        <input type="file" name="" @change="editImageSelected">              
                    </div>
                    <div class="inputfield">
                        <button v-on:click="cancelediting" class="btn">Cancel</button>
                        <button v-on:click="saveediting" class="btn">Save</button>
                    </div>
                </div>
            </div>  
        </div>   
    </div>
    <div class="sidebar">
        <div class="wrapp">
            <h3>Search articles</h3>
            
        </div>
        
    </div>

<div class="menurestaurant  comment-section">
    <div class="section-title wow fadeInUp" data-wow-delay="0.1s">
        <h2>Comments</h2>
    </div>
<div class="comment-table">
<table v-if="comments!=null">
    <tr v-for="comment in comments" v-if="comment.text!='' && (loggedUser.restaurant==thisrestaurant.name)">
        <td class="comment-username">{{comment.customer}} </td>
        <td class="comment-text">"{{comment.text}}"</td>
        <td class="comment-status"  v-if="loggedUser.restaurant==thisrestaurant.name">{{comment.status}}</td>
        <td class="approvesection" v-if="loggedUser.restaurant==thisrestaurant.name && comment.status=='Waiting'">
        <div class="inputfield">
             <button class ="btn" v-on:click="approveComment(comment)">Approve</button>
             <button class ="btn"  v-on:click="disapproveComment(comment)">Disapprove</button>
        </div>
        </td>
    </tr>
</table>
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
        editart: function(r){
            this.editartical = r.nameArtical;
            this.editarticalobj = r;
            this.editarticalnewname = r.nameArtical;
            this.editarticalnewprice = r.price;
            this.editarticalnewdescription = r.description;
            this.editarticalnewquantity = r.quantity;
            this.editarticalnewimage = r.image;
            this.editarticalnewtype = r.type;
        },
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
                        this.thisrestaurant = responsee.data;
                        this.openclosed = this.thisrestaurant.status;
                        alert("Restaurant successfully found!");
                        this.loadComments();
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
        loadComments : function(){
            axios.get('rest/getrestaurantscomments', {
                params:
                {
                    restaurant : this.thisrestaurant.name
                }
            })
            .then(resp =>{
                this.comments = resp.data;
            })
            .catch(function(error){
                alert("It is impossible to load restaurant's comments!")
            })
        },
        Validation: function(){
            if(this.name == '' || this.imageArtical=='' || this.price=='' || this.type=='' ){
                this.allFilled='You must enter all required fields!';
                alert(this.allFilled);
                 return false;
             } else if(this.quantity!="" && this.quantity<1){
                alert("Please enter a valid number for quantity! Quantity cannot be zero or less!");
                return;
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
        editImageSelected: function(e){
            const file= e.target.files[0];
            this.editarticalImagePreview = URL.createObjectURL(file);
            this.onEditUpload(file);
        },
        onEditUpload: function(file){
            const reader= new FileReader();
            reader.onload = (e) =>{
                this.editarticalimage = e.target.result;
                this.editarticalnewimage='';
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
        },
        cancelediting: function(){
            this.editartical ='none';
            this.editarticalobj= null;
            this.editarticalnewname='';
            this.editarticalnewprice='';
            this.editarticalnewtype='';
            this.editarticalnewdescription='';
            this.editarticalnewquantity= '';
            this.editarticalnewimage='';
            this.editarticalImagePreview= null;
            this.editarticalimage= null;
        },
        saveediting: function(){
            if(this.editarticalnewname=='' || this.editarticalnewprice=='' || this.editarticalnewtype=='' || (this.editarticalnewimage=='' && (this.editarticalimage=='' || this.editarticalimage==null))){
                alert("You must enter all required fields!");
                return;
            }
            else if(this.editarticalnewquantity!="" && this.editarticalnewquantity!=-1 && this.editarticalnewquantity<1){
                alert("Please enter a valid number for quantity! Quantity cannot be zero or less!");
                return;
             }
            axios.get('rest/ChangeArticalNameExists', {
                params:
                   {
                       oldname : this.editartical,
                       name : this.editarticalnewname,
                       restaurantname: this.thisrestaurant.name
                   }
            })
               .then(response=>{
                   if(response.data===true){
                       this.nameUnique = 'There is an artical with the same name in the restaurant, please choose another name';
                       alert(this.nameUnique);
                       return false;
                   }
                   else{
                       this.saveArtical();
                   }
                   
               }).catch()
        },
        saveArtical: function(){
            axios.put('rest/changeartical', {"oldNameArtical":this.editartical, 
                                            "newNameArtical": this.editarticalnewname,
                                            "price":this.editarticalnewprice, 
                                            "type":this.editarticalnewtype, 
                                            "restaurant":this.thisrestaurant.name,
                                            "quantity":this.editarticalnewquantity, 
                                            "description":this.editarticalnewdescription,
                                            "oldImage": this.editarticalnewimage,
                                            "newImage":this.editarticalimage })
                .then(response => {
                    alert('The artical is successfully changed!');
                    this.loadRestaurant();
                    this.cancelediting();
                })
                .catch(() => {
                    alert('Changing an artical is temporary unavailable!')
                    });	

        },
        approveComment: function(comment){
            axios.put("rest/approvecomment", {
                "id" : comment.orderId
            })
            .then(response =>{
                alert("Comment is successfully approved!");
                this.loadComments();
            })
            .catch(function(error){
                alert("Server error!")
            })
        },
        disapproveComment: function(comment){
            axios.put("rest/disapprovecomment", {
                "id" : comment.orderId
            })
            .then(response =>{
                alert("Comment is successfully disapproved!");
                this.loadComments();
            })
            .catch(function(error){
                alert("Server error!")
            })
        }
        
    }

}
);