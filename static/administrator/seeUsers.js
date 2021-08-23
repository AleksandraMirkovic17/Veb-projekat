Vue.component("seeUsers",{
   data: function(){
         return{
         users: null
         }
      },
  template:
  ` 
  <div>
    <h1> Preview all users</h1> 
    <hr>
    <table>
        <tr id="heder">
            <th>Name</th>
            <th>Surname</th>
            <th>Date</th>
            <th>Gender</th>
            <th>Username</th>
            <th>Role</th>
        </tr>
        <tr v-for="u in users">
            <td>{{u.name}}</td>
            <td>{{u.surname}}</td>
            <td>{{u.date}}</td>
            <td>{{u.gender}}</td>
            <td>{{u.username}}</td>
            <td>{{u.role}}</td>
        </tr>

    </table>
  </div>
  `,
       mounted(){
        axios.get('rest/seeUsers')
        .then(response =>(this.users = response.data));
    }
});      
  