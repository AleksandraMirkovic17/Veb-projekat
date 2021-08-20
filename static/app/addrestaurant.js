Vue.component("addrestaurant",{
    data: function(){
        return{
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
            nameUnique:""

            
        }
    },
    template:
    `
    <div class="restaurant-registration-m">
    <div class="restaurant-registration">
    <div class="regrest"><h1>Register a restaurant</h1></div>
    <div class="main">
        <h2 class="name">Name</h2>
        <input type="text" class="restaurantsname" v-model="name" name="name" placeholder="Enter restaurant's name..."><br>
        <h2 class="nameselection">Type</h2>
        <select class="input selection" v-model="type">
            <option value="ITALIAN">Italian</option>
            <option value="BARBECUE">Barbecue</option>
            <option value="CHINESE">Chinese</option>
        </select>
        <h2 class="nameselection">Manager</h2>
        <div class="input selection">
            <div v-if="newMenagerAdded==false">
                <select v-model=menager id="menagerslist" class="input selection-second">
                    <option v-for="m in freemenagers" v-bind:value="m.userName">
                        {{m.name}} {{m.surname}}
                    </option>
                </select>
            </div>
            <div v-else-if="newMenagerAdded==true">
            <input type=text disabled placeholder="this.firstname this.lastname">
            </input>
            </div>
        <button v-if="freemenagers==null" v-on:click=MenagerRequired id="addmenager">Add new</button>
        </div>
        <div class="location">
        <h2 class="location">Location</h2>
        <h2 class="name">Longitude</h2>
        <input type="text" class="input" v-model="longitude" name="longitude" placeholder="Enter longitude..."><br>
        <h2 class="name">Latitude</h2>
        <input type="text" class="input" v-model="latitude" name="latitude" placeholder="Enter latitude..."><br>
        <h2 class="name">Street</h2>
        <input type="text" class="input" v-model="street" name="street" placeholder="Enter street name..."><br>
        <h2 class="name">House number</h2>
        <input type="text" class="input" v-model="houseNumber" name="houseNumber" placeholder="Enter house number..."><br>
        <h2 class="name">City</h2>
        <input type="text" class="input" v-model="city" name="city" placeholder="Enter city name..."><br>
        <h2 class="name">Postal code</h2>
        <input type="text" class="input" v-model="postalCode" name="postalCode" placeholder="Enter postal code..."><br>
        <h2 class="name">Restaurant's image</h2>
        <div class="container input">
            <div class="wrapper">
                <div class="image">
                    <img src="">
                </div>
                <div class="content">
                    <i class="fas fa-cloud-upload-alt"></i>
                    <div class="text">No file choosen, yet!</div>

                </div>
                <div id="cancel-btn"><i class="fas fa-times">x</i></div>
            <div class="file-name"><i class="fas fa-times">File name here</i></div>
            </div>
            
            <input id="custom-btn" type="file" >
        </div>
        </div class="button">
        <input type="submit" value="Register" v-on:click=ValidationRestaurant>
    </div>
    </div>
   
    <div class="registation-menager" v-if="newMenagerRequired==true"> 
    <div class="registration_form clearfix">
            <div><h3>Register a new manager</h3>
            </div>
                <div class="user-details">
                    <div class="input-box">
                        <label class="letters">First name*</label>
                        <input type="text" required placeholder="Enter your first name" v-model="firstname">
                    </div>
                    <div class="input-box">
                        <label class="letters">Last name*</label>
                        <input type="text" required placeholder="Enter your last name" v-model="surname">
                    </div>
                    <div class="input-box">
                        <label class="letters">Date of birth*</label>
                        <input type="date" value="1950-01-01" placeholder="dd-mm-yyyy" v-model="date" />
                    </div>
                    <div class="input-box">
                        <label class="letters">Username*</label>
                        <input type="text" required placeholder="Enter a unique username" v-model="userName" />
                    </div>
                    <div class="input-box">
                        <label class="letters">Password*</label>
                        <input type="text" required placeholder="Enter your password" required="" v-model="password"/>
                    </div>
                    <div class="input-box">
                        <label class="letters">Confirm password*</label>
                        <input type="text" required placeholder="Confirm your password" required="" v-model="confirmPassword"/>
                    </div>
                     <br>
                    <label class="letters">Select gender*</label>
            <select class="gender-selection" v-model="gender" >
               <option value="" disabled selected hidden>Gender</option>
               <option value = "MALE">Male</option>
               <option value = "FEMALE">Female</option>
            </select>
            <br>
                <div class="button">
                    <input type="submit" value="Register" v-on:click=Validation>
                </div>
            </div>
    </div>
    </div> 
    </div>

    `,
    mounted(){
        axios.get('rest/freeMenagers')
        .then(response => (this.freemenagers = response.data));
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
        axios.post('rest/registerRestaurant/', {"name":this.name, "menager":this.menager, 
                                "type":this.type, "latitude":this.latitude, "longitude":this.longitude, 
                                "street":this.street,"houseNumber":this.houseNumber, "city":this.city,
                                "postalCode":this.postalCode,"imageRestaurant":this.imageRestaurant })
        .then(response => {
               alert('Successful restaurant registration!');
               this.emptyFields();
        });
    },
    emptyFields: function(){
        this.name = "";
        this.type = "ITALIAN";
        this.freemenagers = null;
        this.imageRestaurant= "";
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

        this.allFilled = "";
        this.nameUnique= "";
    }

}
}
);