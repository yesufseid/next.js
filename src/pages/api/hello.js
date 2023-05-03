const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()


export default async function handler(req, res) {
  console.log(req.method);
  if (req.method==="POST") {
    const {title,content}=req.query
    try {
      const risult=await prisma.Note.create({
        data:{
          title,
          content
        }
      })
      res.status(200).json(risult)
    } catch (error){
      console.log(error);
    }
    console.log(req.query)
    res.status(200).json({title:title,content:content})
  }
  if (req.method==="GET") {
    try {
     const note=await prisma.Note.findMany({
      // where:{
      //    id:1
      // },
      select:{
       title:true,
        content:true
      }
     })
     res.status(200).json(note)
    } catch (error) {
      console.log(error);
    }
    
  }
 
}
