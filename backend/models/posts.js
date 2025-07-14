import mongoose from 'mongoose';

const postschema = new mongoose.Schema({
    
    title:String,
    author:{
        type:mongoose.Types.ObjectId,
        ref:'User'
    },
    content:String,
    
    category:String,
    image:String,
    

 
},{timestamps:true});
const post = mongoose.model('Post',postschema)
export default post