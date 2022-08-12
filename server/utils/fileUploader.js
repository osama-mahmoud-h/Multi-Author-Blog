
const fs =require('fs');

const uploadfile = async(file,oldPath,newPath)=>{

     //generate random number
     const random = Math.floor(Math.random()*10e9);
     //new unique name
     file.newFilename =  random+file.originalFilename;
     //new path
      newPath+= file.newFilename;

    const fileCopying = await new Promise((fill,reject)=>{
        fs.copyFile(oldPath,newPath,(err)=>{
            if(err)
              reject(new Error("image uploading error"));
              fill("copied successfully");
        })
       });
}

module.exports = uploadfile ;