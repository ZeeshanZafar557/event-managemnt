const mongoose=require('mongoose');
const bcrypt= require('bcrypt');
const userSchema=mongoose.Schema({
first_name:{
    type:String,
    required:true
},
last_name:{
    type:String,
    required:true
},
email:
{
    type:String,
    required:true
},
password:
{
    type:String,
    required:true
},
phone:{
    type:String,
    required:true
},
user_type:{
    type:String,
    required:true
}

});
userSchema.methods.genereateHash=function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

userSchema.methods.validPassword=function(password){
    return bcrypt.compareSync(password,this.password);
};
const user=module.exports=mongoose.model('User',userSchema);