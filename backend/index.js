
import express from 'express'
import  { loginschema, Postinput, userInput } from './routes/index.js'
import bcrypt from 'bcrypt'
import connectDB from './db.js'
import User from './models/user.js'
import jwt from 'jsonwebtoken'
import cors from 'cors'
import post from './models/posts.js'

const app = express()
app.use(express.json())

connectDB()
const port = 3000
const secretKey ="hhhhff"
let coreOptions = {
  origin:["http://localhost:4200"],
}
app.use(cors(coreOptions))


function middleware(req,res,next){
  const authheader = req.headers['authorization']
  let token;
  if(authheader && authheader.startsWith('Bearer')){
    token = authheader.split(' ')[1]
  }
  console.log(token)
  try {
  const tokenverify= jwt.verify(token,secretKey)
 console.log(tokenverify)
 req.userId=tokenverify.id

next()
    
  } catch (error) {
    res.json({message:"error"})
    
  }

  
}

app.post('/register',async(req,res)=>{
  const input = userInput.safeParse(req.body)
  
  if(!input.success){
    return res.status(422).json({message:input.error.issues})
  }
  const {email,password,username} = input.data

try {
   const {username,email,password}=req.body
   const user=await User.findOne({email})
   if(user){
      return res.status(409).json({message:"already exist"})
   }
   const hashedpassword=await bcrypt.hash(password,10)
   const newuser=await User.create({username,password:hashedpassword,email})
   const token = jwt.sign({id:newuser.id},secretKey)

   return res.status(201).json({message:"user created",token},)
   
} catch (error) {
   console.log(error)
   res.json({message:"error"})
   
}
})
app.post('/login',async(req,res)=>{
  const input = loginschema.safeParse(req.body)
  
  if(!input.success){
    return res.status(422).json({message:input.error.issues})
  }
  const {email,password} = input.data
  try {
    const user=await User.findOne({email})
    if(!user){
      return res.status(404).json({message:"user not found"})
    }
    const passwordvalid = await bcrypt.compare(password,user.password)
    if(!passwordvalid){
      return res.status(401).json({message:"password incorrect"})
    }
    const token = jwt.sign({id:user.id},secretKey)
    return res.status(200).json({message:"login success",token})
  } catch (error) {
    console.log(error)
    return res.json({message:"error"})  
  } 
 })  
 app.post('/postend',middleware,async(req,res)=>{
  
 const input = Postinput.safeParse(req.body)
 if(!input.success){
  return res.status(422).json({message:input.error.issues})
 }
   try{
 const {title,content,category}=input.data
 const user = await User.findById(req.userId)
 
 const newblog = await post.create({title,content,category,author:user})
 return res.status(201).json({message:"post created",newblog})
  
    
  } catch (error) {
    console.log(error)
    return res.status(400).json({message:"error creating post"})
    
  }
 })
 app.get('/postshow',middleware,async(req,res)=>{
  try {
  const blog = await post.find().populate('author','username email')
  console.log(blog)
  res.json(blog)
    
  } catch (error) {
    res.status(400).json({message:"error"})
    
  }
 })
 app.get('/form/:id',middleware,async(req,res)=>{
  try {
    const postid=req.params.id
  const blog = await post.findById(postid).populate('author','username email')
  if(!blog){
    return res.json({message:"post not found"})
  }
  console.log(blog)
  res.json(blog)
    
  } catch (error) {
    res.status(400).json({message:"error"})
    
  }
 })
 app.delete('/postdelete/:id',middleware,async(req,res)=>{
  try {
    const postid=req.params.id
    const blogdelete = await post.findById(postid).populate('author','email')
    if(!blogdelete){
      return res.json({message:"post not found"})

    }
    if(blogdelete.author.id!==req.userId){
    return res.json({message:"can't delete this post"})
    }
    await post.findByIdAndDelete(postid)
    return res.json({message:"blog deleted"})
    
  } catch (error) {
    return res.json({message:"error deleting post"})  
  }
 })
 app.put('/edit/:id',middleware,async(req,res)=>{
  try {
    const postid=req.params.id
    const blogupdate= await post.findById(postid).populate('author','email')
    if(!blogupdate){
      return res.json({message:"post not found"})

    }
    if(blogupdate.author.id!==req.userId){
    return res.json({message:"can't edit  this post"})
    }
    const {title,content,category}=req.body
    await post.findByIdAndUpdate(postid,{title,content,category})
    return res.json({message:"blog updated"})
    
  } catch (error) {
    console.log(error)
    return res.json({message:"error editing post"})  
  }
 })
 app.get('/myblogs',middleware,async(req,res)=>{
  try{
  const myblog=await post.find({author : req.userId}).populate('author','username email')
  if(!myblog){
     return res.json({message:"There is no post"}) 

  }
  return res.json(myblog)
  }
  
  catch(error){
    console.log(error)
    return res.json({message:"Error showing blogs"}) 


  }

 })
  
 

app.get("/me",middleware ,async(req,res)=>{
  res.json({message:"user logged in"})

})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
