const { response } = require('express');
var express = require('express');
var router = express.Router();
var productHelpers=require('../helpers/product-helpers')


/* GET users listing. */
router.get('/', function(req, res, next) {
  productHelpers.getAllProducts().then((products)=>{

    res.render('admin/view-prod',{admin:true,products})
  })


});
router.get('/add-prod',function(req,res){

  res.render('admin/add-prod')
});
router.post('/add-prod/',(req,res)=>{
console.log(req.body);

  console.log(req.files.image);
  
  productHelpers.addProduct(req.body,(id)=>{
   let Image=req.files.image
    
    console.log(id )
     Image.mv('./public/prod-img/'+id+'.jpg',(err,done)=>{
      if(!err){
        res.send('Prouct added successfully')
      }else{
       console.log('error got' +err);
      }
     })
  
  })
  
})
router.get('/delete-prd/:id',(req,res)=>{
  let proId=req.params.id
  console.log(proId);
  productHelpers.deleteProduct(proId).then((response)=>{
    res.redirect('/admin/')
  })
})
router.get('/edit-product/:id', async(req,res)=>{
  let product=await productHelpers.getProductDetails(req.params.id)
  console.log(product);
  res.render('admin/edit-product',{product})
})
router.post('/edit-product/:id',(req,res)=>{
  let id=req.params.id

  productHelpers.updateProduct(req.params.id,req.body).then(()=>{
    res.redirect('/admin')
    if(req.files.image){
      
      let image=req.files.image
      image.mv('./public/prod-img/'+id+'.jpg')
    
    }
  })
})
module.exports = router;
