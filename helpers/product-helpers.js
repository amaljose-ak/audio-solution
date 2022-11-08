var db=require('../config/connection')
var collection=require('../config/collection');
const { response } = require('express');
var objectId=require('mongodb').ObjectId
module.exports={

    addProduct:(product,callback)=>{
      console.log(product);
      db.get().collection('product').insertOne(product).then((data)=>{
        console.log(data);
        callback(data.insertedId)

      })
    },
    getAllProducts:()=>{
      return new Promise(async(resolve,reject)=>{
        let products= await db.get().collection(collection.PRODUCT_COLLECTION).find().toArray()
        resolve(products)
      })

    },
    deleteProduct:(proId)=>{
      return new Promise((resolve,reject)=>{
        console.log(proId);
        console.log(objectId(proId))
        db.get().collection(collection.PRODUCT_COLLECTION).deleteOne({_id:objectId(proId)}).then((response)=>{
         // console.log(response)
          resolve(response)
        })
      })

    },
    getProductDetails:(proId)=>{
      return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTION).findOne({_id:objectId(proId)}).then((product)=>{
          resolve(product)
        })
      })
    },
    updateProduct:(proId,proDetails)=>{
      return new Promise((resolve,reject)=>{
        db.get().collection(collection.PRODUCT_COLLECTION).updateOne({_id:objectId(proId)},{
          $set:{
            name:proDetails.name,
            Category:proDetails.Category,
            Description:proDetails.Description,
            Price:proDetails.Price

          }
        }).then((response)=>{
          resolve()
        })
      })
    }
}