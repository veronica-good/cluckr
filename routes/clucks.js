const express = require('express')
const router = express.Router()
const knex = require('../db/client')
const app = express();

// new cluck
router.get('/new', (request, response) => {
    response.render('clucks/new')
})

// index
router.get('/index', (req,res)=>{
    knex('clucks')
    .orderBy('created_at', 'desc')
    .then(clucks=>{
        res.render('clucks/index', {clucks: clucks});
    })

});

// create cluck
router.post('/', (req, res) => {
    knex('clucks')
      .insert({
        username: req.cookies.username,
        content: req.body.content,
        image_url: req.body.image_url
      })
      .returning('*')
      .then(clucks => {
        // knex usually returns an array of objects.
        // so we use posts[0] to make sure we grab the object we want
        const cluck = clucks[0];
        res.redirect(`/clucks/index`);
      });
    let data=req.body.content;
//     if(data.includes('#')){
//       let arr=data.split(' ')
//     // console.log(data);
//       for(let d of arr){
//         if(d.includes('#')){
//         knex('hashtags')
//         .insert({
//         hashtag: d,
//         counter: 1
//          })
//          .returning('*')
//          .then(hashtags=>{
//            const hashtag = hashtags[0];
//            res.redirect(`/clucks/index`);
//          })
//     }
// }
//       }
  });


module.exports = router;