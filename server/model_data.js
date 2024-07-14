const mongoose = require('mongoose')

const schema = mongoose.Schema;

const uploadschema = new schema({
    username:{
        type:String,
        required:true
    },
    file:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    }
})

const Uploadmodel = mongoose.model('imgdata',uploadschema)
module.exports = Uploadmodel