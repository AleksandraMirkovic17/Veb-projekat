Vue.component("addrestaurant",{
    data: function(){
        return{
            placesAutocomplete:null,
            loggedInUser: {},
            name: "",
            type: "ITALIAN",
            location: {},
            imageRestaurant: "",
            menager: "no",
            freemenagers: null,
            latitude: "",
            longitude: "",
            city: "",
            houseNumber: "",
            street: "",
            postalCode: "",
            newMenagerRequired: false,
            newMenagerAdded: false,

            role:"MANAGER",
            firstname:"",
            surname:"",
            date:"",
            userName:"",
            password:"",
            confirmPassword:"",
            gender:"",

            allFilled: "",
            nameUnique:"",

            image: null,
            imagePreview: null,
            file:'',
            mode:'false'

            
        }
    },
    template:
    `
   <div>
    <div class="restaurant-registration-m" v-if="loggedInUser.role=='ADMINISTRATOR'">
        <div class="restaurant-registration">
            <div class="title">Register a restaurant</div>
            <div class="form">
                <div class="inputfield">
                    <label>Name</label>
                    <input type="text" class="input" required placeholder="Enter your restaurant's name" v-model="name" v-bind:disabled="mode=='false'" >
                </div>
                <div class="inputfield">
                <label>Type</label>
                    <div class="custom_select">
                        <select v-model="type" v-bind:disabled="mode=='false'" >
                            <option value="ITALIAN">Italian</option>
                            <option value="BARBECUE">Barbecue</option>
                            <option value="CHINESE">Chinese</option>
                        </select>
                    </div>
                </div>
                <div class="inputfield">
                <label>Manager</label>
                    <div class="custom_select" v-if="newMenagerAdded==false"  >
                        <select v-model="menager">
                            <option v-for="m in freemenagers" v-bind:value="m.userName">
                                    {{m.name}} {{m.surname}}
                            </option>
                        </select>
                    </div>
                    <div class="custom_select" v-else-if="newMenagerAdded==true" v-bind:disabled="mode=='true'">
                        <select>
                            <option selected>{{this.firstname}} {{this.surname}}</option>
                        </select>
                    </div>
                    <button v-if="freemenagers==null" v-on:click="MenagerRequired" id="addmenager">Add new</button>
                </div>   
                <div class="location">
                    <h2>Location</h2>
                    <div class="inputfield">
                        <label>Search address</label>
                        <input type="search" id="searchAddress" class="input"/>
                    </div>
                    <div class="inputfield">
                        <label>Longitude</label>
                        <input type="text" class="input" required v-model="longitude" disabled="true" id="longitude" placeholder="Enter longitude">
                    </div>
                    <div class="inputfield">
                        <label>Latitude</label>
                        <input type="text" class="input" required v-model="latitude" disabled="true" id="latitude" placeholder="Enter latitude">
                    </div>
                    <div class="inputfield">
                        <label>Street</label>
                        <input type="text" class="input" required v-model="street" disabled="true" id="street" placeholder="Enter street name">
                    </div>
                    <div class="inputfield">
                        <label>House number</label>
                        <input type="text" class="input" required v-model="houseNumber" id="houseNumber" placeholder="Enter house number">
                    </div>
                    <div class="inputfield">
                        <label>City</label>
                        <input type="text" class="input" required v-model="city" disabled="true" id="city" placeholder="Enter city name">
                    </div>
                    <div class="inputfield">
                        <label>Postal code</label>
                        <input type="text" class="input" required v-model="postalCode" disabled="true" id="postalCode" placeholder="Enter postal code">
                    </div>
                    <div class="inputfield">
                        <label>Restaurant's image</label>
                                <div class="container input">
                                    <div class="wrapper" v-bind:disabled="mode=='true'" >
                                            <div class="image">
                                                <img :src=this.imagePreview >
                                            </div>
                                            <div class="content">
                                                <i class="fas fa-cloud-upload-alt"></i>
                                                <div class="text">No file choosen, yet!</div>
                                            </div>
                                    </div>           
                                <input id="custom-btn" type="file" @change="imageSelected">
                                </div>
                    </div>
                </div>
                <div class="inputfield">
                                    <input type="submit" value="Save location" class="btn" v-on:click="Save">
                  </div>
                <div class="inputfield">
                    <input type="submit" value="Register" v-bind:disabled="mode=='false'"  class="btn" v-on:click="ValidationRestaurant">
                </div>   
            </div>
            
            </div>
                
    
        <div class="registation-menager" v-if="newMenagerRequired==true"> 
            <div class="registration_form">
                <div  class="wrapper">
                        <div v-if="loggedInUser.role!='ADMINISTRATOR'" class="title">
                        Registration Form
                        </div>
                        <div v-else-if="loggedInUser.role=='ADMINISTRATOR'" class="title">
                            Register a new manager
                        </div>
                        <div class="form">
                                <div class="inputfield">
                                    <label>First Name</label>
                                    <input type="text" class="input" required placeholder="Enter your first name" v-model="firstname">
                                </div>  
                                <div class="inputfield">
                                    <label>Last Name</label>
                                    <input type="text" class="input" required placeholder="Enter your last name" v-model="surname">
                                </div> 
                                <div class="inputfield">
                                    <label>Username</label>
                                    <input type="text" class="input" required placeholder="Enter username" v-model="userName">
                                </div> 
                                <div class="inputfield">
                                        <label class="letters">Date of birth</label>
                                        <input type="date"  class="input"  value="1950-01-01" placeholder="dd-mm-yyyy" v-model="date" />
                                </div>
                                <div class="inputfield">
                                    <label>Password</label>
                                    <input type="password" class="input" required placeholder="Enter your password" required="" v-model="password">
                                </div>  
                                <div class="inputfield">
                                    <label>Confirm Password</label>
                                    <input type="password" class="input" required placeholder="Confirm your password" required="" v-model="confirmPassword">
                                </div> 
                                <div class="inputfield">
                                    <label>Gender</label>
                                    <div class="custom_select">
                                        <select v-model="gender">
                                        <option value="">Select</option>
                                        <option value="MALE">Male</option>
                                        <option value="FEMALE">Female</option>
                                        </select>
                                    </div>
                                </div> 
                                <div class="inputfield">
                                    <input type="submit" value="Register" class="btn" v-on:click="Validation">
                                </div>
                        </div>
                </div>	
            </div>        
        </div> 
    <br><br>
    </div>
    <div id="js-map" style="height:500px; width:50%;"></div>
    </div>
    `,
    mounted(){
        axios.get('rest/testlogin')
        .then(response => {
        this.loggedInUser = response.data;
        if(this.loggedInUser.role == 'ADMINISTRATOR'){
            axios.get('rest/freeMenagers')
            .then(response => (this.freemenagers = response.data));
        }
        else{
            alert("You don't have a permission to access this page, because you're not an administrator!")
        }
        });

      init();
        
    },
    methods: {
        MenagerRequired: function(){
            this.newMenagerRequired = true;
			$('#menagerslist').prop('disabled', true);
            $('#addmenager').prop('disabled', true)
        },
    Validation: function(){

        if(this.firstname == ''){
           this.allFilled='You must enter a name!';
           alert(this.allFilled);
            return false;
        }
        if(this.surname == ''){
           this.allFilled='You must enter a surname!';
           alert(this.allFilled);
            return false;
        }
        if(this.date == ''){
           this.allFilled='Please select a birthday!';
           alert(this.allFilled);
            return false;
        }
        if(this.userName==''){
           this.allFilled='You must enter a username!';
           alert(this.allFilled);
           return false;
       }
        if(this.gender == ''){
           this.allFilled='Please select your gender!';
           alert(this.allFilled);
            return false;
        }
        if(this.password == ''){
           this.allFilled='Please enter a password!';
           alert(this.allFilled);

            return false;
        }
        if(this.password != this.confirmPassword){
           this.correctRepeatedPassword='Passwords should be same!';
           alert(this.correctRepeatedPassword);
            return false;
        }

        axios.post('rest/usernameExists', this.userName)
           .then(response=>{
               if(response.data===true){
                   this.userNameUnique = 'There is a user with the same username, please enter a unique username!';
                   alert(this.userNameUnique);
                   return false;
               }
               else{
                   this.RegisterMenager();
               }

           }).catch()
        
    },
     Save: function(){
    this.longitude=document.getElementById("longitude").value;
	this.latitude=document.getElementById("latitude").value;

	this.city=document.getElementById("city").value;
	this.street=document.getElementById("street").value;
	this.houseNumber=document.getElementById("houseNumber").value;
	this.postalCode=document.getElementById("postalCode").value;
    alert("Pretvaram u true")
	this.mode='true';
    },

    RegisterMenager: function(){
        axios.post('rest/CustomerReg/', {"userName":this.userName, "name":this.firstname, "surname":this.surname, "password":this.password, "date":this.date, "gender":this.gender,"role":this.role })
        .then(response => {
               alert('Successful manager registration!');
        });
        $('#addmenager').prop('visible', false);
        this.menager= this.userName;
        this.newMenagerRequired = false;
        this.newMenagerAdded = true;
    },

    ValidationRestaurant: function(){
        if(this.name == ''){
            this.allFilled="You must enter the restaurant's name!";
            alert(this.allFilled);
             return false;
         }
         alert(this.name);
         if(this.street == '' || this.houseNumber=='' || this.city=='' || this.longitude=='' || this.latitude=='' || this.postalCode=='' ){
            this.allFilled='You must enter all location fields!';
            alert(this.allFilled);
             return false;
         }
        
         if(this.type==''){
            this.allFilled='You must choose the restaurants type!';
            alert(this.allFilled);
            return false;
        }

        if(this.imageRestaurant==''){
            alert("You must add restaurant's logo!");
            return false;
        }

        if(this.menager=='no'){
            this.allFilled='You must choose the restaurants manager!';
            alert(this.allFilled);
            return false;
        }

         axios.get('rest/RestourantsNameExists', {
             params:
                {
                    name : this.name
                }
         })
            .then(response=>{
                if(response.data===true){
                    this.nameUnique = 'There is a restaurant with the same name please choose a unique name for the restaurant';
                    alert(this.nameUnique);
                    return false;
                }
                else{
                    this.RegisterRestaurant();
                }
                
            }).catch()
            },
    RegisterRestaurant: function(){
        axios.post('rest/registerRestaurant/', {"name":this.name, 
                                                "menager":this.menager, 
                                "type":this.type, 
                                "latitude":this.latitude, "longitude":this.longitude, 
                                "street": this.translate(this.street),
                                "houseNumber": this.houseNumber, 
                                "city": this.translate(this.city),
                                "postalCode":this.postalCode,
                                "imageRestaurant": this.imageRestaurant })
        .then(response => {
               alert('Successful restaurant registration!');
                       //upload an image

               this.emptyFields();
        });

    },
    emptyFields: function(){
        this.name = "";
        this.type = "ITALIAN";
        this.freemenagers = null;
        this.imageRestaurant= "";
        this.imagePreview="",
        this.menager= "no";
        this.latitude= "";
        this.longitude= "";
        this.city = "";
        this.houseNumber = "";
        this.street = "";
        this.postalCode= "";
        this.newMenagerRequired = false;
        this.newMenagerAdded = false;

        this.role ="MANAGER";
        this.firstname= "";
        this.surname ="";
        this.date ="";
        this.userName = "";
        this.password ="";
        this.confirmPassword ="";
        this.gender="";
        this.imageRestaurant="";

        this.allFilled = "";
        this.nameUnique= "";
    },
    imageSelected: function(e){
        const file = e.target.files[0];
        this.imagePreview = URL.createObjectURL(file);
        this.onUpload(file);
    },
    onUpload: function(file){
        const reader= new FileReader();
        reader.onload = (e) =>{
            this.imageRestaurant = e.target.result;
        }
        reader.readAsDataURL(file);
    },
    translate: function(string){
        var cyrillic = 'А_Б_В_Г_Д_Ђ_Е_Ё_Ж_З_И_Й_Ј_К_Л_Љ_М_Н_Њ_О_П_Р_С_Т_Ћ_У_Ф_Х_Ц_Ч_Џ_Ш_Щ_Ъ_Ы_Ь_Э_Ю_Я_а_б_в_г_д_ђ_е_ё_ж_з_и_й_ј_к_л_љ_м_н_њ_о_п_р_с_т_ћ_у_ф_х_ц_ч_џ_ш_щ_ъ_ы_ь_э_ю_я'.split('_')
        var latin = 'A_B_V_G_D_Dj_E_Ë_Z_Z_I_J_J_K_L_Lj_M_N_Nj_O_P_R_S_T_C_U_F_H_C_C_Dz_S_Ŝ_ʺ_Y_ʹ_È_Û_Â_a_b_v_g_d_dj_e_ë_z_z_i_j_j_k_l_lj_m_n_nj_o_p_r_s_t_c_u_f_h_c_c_dz_s_s_ʺ_y_ʹ_è_û_â'.split('_')
    
        return string.split('').map(function(char) {
          var index = cyrillic.indexOf(char)
          if (!~index)
            return char
          return latin[index]
        }).join('')
    }
}
}
);
function init(){
	const map = new ol.Map({
		view: new ol.View({
			center: [2208254.0327390945,5661276.834908611],
			zoom: 15
		}),
		layers: [
			new ol.layer.Tile({
				source: new ol.source.OSM()
			})
		],
		target: 'js-map'
	})
	var previousLayer = null;
	map.on('click', function(e){
		if(previousLayer!=null) {map.removeLayer(previousLayer)}
		var latLong = ol.proj.transform(e.coordinate, 'EPSG:3857', 'EPSG:4326');
		console.log(latLong);
		this.longitude = latLong[0]
		this.latitude = latLong[1]
		
		var layer = new ol.layer.Vector({
			source: new ol.source.Vector({
				features: [
					new ol.Feature({
						geometry: new ol.geom.Point(ol.proj.fromLonLat(latLong))
					})
				]
			})
		});	
		previousLayer = layer;
		map.addLayer(layer);
	   simpleReverseGeocoding(this.longitude, this.latitude)
	})
}

function simpleReverseGeocoding(lon, lat) {
	fetch('http://nominatim.openstreetmap.org/reverse?format=json&lon=' + lon + '&lat=' + lat).then(function(response) {
	  	return response.json();
	}).then(function(json) {
		writeAdress(json, lon, lat);
	})
  }
  function writeAdress(json, lon, lat) {
	var adresa = json.address;
	document.getElementById("longitude").value = lon;
	document.getElementById("latitude").value = lat;
	var city = adresa.city
	if(city.includes("City")){
		city = city.replace(' City', "")
	}else if(city.includes("Municipality")){
		city = city.replace(' Municipality', "")
	}
	document.getElementById("city").value = city;
	document.getElementById("street").value = adresa.road;
	document.getElementById("houseNumber").value = adresa.house_number;
	document.getElementById("postalCode").value = adresa.postcode;

}



