
Meteor.users.allow({
    remove() {
        return true;
    }
})


Meteor.methods({
          createUserFromAdmin:function(user){
            Accounts.createUser(user)
        }
     })