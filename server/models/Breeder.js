const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')


const breederSchema = new mongoose.Schema({
    firstname:{type:String,required:true},
    lastname:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String,required:true},
    phone:{type:String,required:true},
    imageUrl: { type: String, required: true },
    location: { type: String, required: true  }, // Store the pet added date
    joinedDate: { type: Date, default: Date.now },
    approved: {
        type: Boolean,
        default: false,
      },
    
})


breederSchema.pre('save', async function (next){

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


module.exports = mongoose.model('Breeder',breederSchema);