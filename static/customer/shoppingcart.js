Vue.component("shoppingcart",{
    data: function(){
        return{
            loggedUser : null,
            shoppingcart : null

        }
    },
    template:
    `  
      <main class="scart">
            <div class="basket">
            <h2>{{loggedUser.name}}'s shopping cart</h2>
            <div class="basket-labels">
                <ul>
                <li class="item item-heading">Item</li>
                <li class="price">Price</li>
                <li class="quantity">Quantity</li>
                <li class="subtotal">Subtotal</li>
                </ul>
            </div>
            <div class="basket-product" v-for="a in shoppingcart.items">
                    <div class="item">
                        <div class="product-image">
                            <img :src="loadLogoItem(a)" alt="Placholder Image 2" class="product-frame">
                        </div>
                        <div class="product-details">
                            <h1><strong><span class="item-quantity">{{a.quantity}}</span> x {{a.artical.nameArtical}}</strong> </h1>
                            <p><strong>{{a.artical.nameArtical}}</strong></p>
                            <p>From restaurant: <strong>{{a.artical.restaurant}}</strong></p>
                        </div>
                    </div>
                    <div class="price">{{a.artical.price}}</div>
                    <div class="quantity">
                    <input type="number" v-on:change="changeQuantityInCart(a)" onkeydown="return false" v-bind:id="a.artical.nameArtical+a.artical.restaurant+'q'"  v-bind:value=a.quantity min="1" class="quantity-field">
                    </div>
                    <div class="subtotal"><span>{{a.artical.price * a.quantity}}</span></div>
                    <div class="remove">
                    <button v-on:click="removeArtical(a)">Remove</button>
                    </div>
            </div>
            </div>
        <aside>
          <div class="summary">
            <div class="summary-total-items"><span class="total-items"></span> Items in your Bag</div>
            <div class="summary-subtotal">
              <div class="subtotal-title">Subtotal</div>
              <div class="subtotal-value final-value" id="basket-subtotal">{{shoppingcart.price}}</div>
              <div class="summary-promo hide"></div>
            </div>
            <div class="summary-subtotal">
              <div class="subtotal-title">Discount</div>
              <div class="discount-value">{{loggedUser.discount}}</div>
              <div class="summary-promo hide"></div>
            </div>
            <div class="summary-total">
              <div class="total-title">Total</div>
              <div class="total-value final-value" id="basket-total">{{shoppingcart.price * ((100-loggedUser.discount)/100)}}</div>
            </div>
            <div class="summary-checkout">
              <button v-on:click="checkout()" class="checkout-cta">Checkout</button>
            </div>
          </div>
        </aside>
      </main>

    
    
    `,
    mounted(){
        axios.get('rest/testlogin')
        .then(response =>
            { if(response.data!= "Err:UserIsNotLoggedIn"){
                this.loggedUser=response.data;
                if(this.loggedUser.role != 'CUSTOMER'){
                    alert("You don't have a permission to access this site, beacuse you are not a customer!"); 
                    return;            
                }
                } 
            })
            .catch(() => {
                alert('Test login is temporary unavailable')
                return;
                });	

            axios.get('rest/getShoppingCart')
                .then(response =>
                    { if(response.data!= "Error"){
                        this.shoppingcart=response.data;
                        if(this.loggedUser.role != 'CUSTOMER'){
                            alert("You don't have a permission to access this site, beacuse you are not a customer!");
                            return;             
                        }
                        } 
                    })
                    .catch(() => {
                        alert('Getting shopping cart is not foundable!');
                        return;
                        });	
    },
    methods:{
        loadLogoItem: function(a){          
            return a.artical.image;
        },
        loadPrices: function(a){

        },
        calculateSubsum: function(a){
            let labelTotalPrice = document.getElementById(a.artical.nameArtical+a.artical.restaurant+'l');
            let totalPrice = a.artical.price * a.quantity;
            labelTotalPrice.innerHTML = totalPrice.toString();
        },
        changeQuantityInCart: function(a){
            let inputQuantity = document.getElementById(a.artical.nameArtical+a.artical.restaurant+'q');
            let quantity = inputQuantity.value;
            axios.put('rest/changeQuantityInShoppingCart', {"username":this.loggedUser.userName, 
                                                "articalname": a.artical.nameArtical,
                                                "restaurantname":a.artical.restaurant, 
                                                "quantity":quantity})
            .then(response => {
                this.updateShoppingCart();
            })
            .catch(() => {
            alert('Changing a quantity is temporary unavailable!')
            });	

        },
        removeArtical: function(a){
            axios.put('rest/DeleteInShoppingCart', {"username":this.loggedUser.userName, 
                                                "articalname": a.artical.nameArtical,
                                                "restaurantname":a.artical.restaurant})
            .then(response => {
                this.updateShoppingCart();
            })
            .catch(() => {
            alert('Deleting an artical is temporary unavailable!')
            });	


        },
        updateShoppingCart: function(){
            axios.get('rest/getShoppingCart')
            .then(response =>
                { if(response.data!= "Error"){
                    this.shoppingcart=response.data;
                    } 
                })
                .catch(() => {
                    alert('Getting shopping cart is not possible!');
                    return;
                    });	
        },
        checkout: function(){
            if(this.loggedUser.role!='CUSTOMER'){
                alert("You don't have the permission to checkout!")
                return;
            }
            axios.post('rest/checkout', this.loggedUser.userName)
            .then(response=>{
                if(response.data!="Error"){
                    this.updateShoppingCart();
                }
            })
            .catch(() => {
                alert('Checkout is temporary unavailable!');
                return;
                });	
        }

    }
});