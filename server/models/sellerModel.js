const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const sellerSchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    bankName:{type:String,required:true},
    accountNumber:{type:String,required:true},
    joinedDate: { type: Date, default: Date.now },
    approved: Boolean,
})


sellerSchema.pre('save', async function (next){

    try {
        

        if(!this.isModified('password')) return next()

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password,salt);
        this.password = hashedPassword;
        next()

    } catch (error) {

        return next(error)
        
    }

})


module.exports = mongoose.model('Seller',sellerSchema);