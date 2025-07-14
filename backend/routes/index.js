

import {z} from 'zod'

const userInput = z.object({
   username:z.string(),
   email:z.string().email("inavlid email format"),
   password:z.string().min(6,"minimum 6 requires")
   
})
const Postinput = z.object({
   title:z.string(),
   content:z.string(),
   category:z.string()
     
})
const loginschema = userInput.omit({username:true})

 export  {userInput,loginschema,Postinput};