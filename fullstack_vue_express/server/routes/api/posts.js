
const express = require('express');
const mongodb = require('mongodb');

// const mongodbAPIKey = 'd49b58b5-ca44-4466-9a3c-6f6b2635c3d2';

const router = express.Router();

//Get posts
router.get('/', async(req, res) =>{
    try {

        const posts = await loadPostsCollection();
        res.send(await posts.find({}).toArray());

    } catch (err) {
        console.error(err);
    }
});

//Add posts
router.post('/', async(req, res) =>{
    try {

        const posts = await loadPostsCollection();
        await posts.insertOne({
            text: req.body.text,
            date: new Date()
        });
        res.status(201).send();

    } catch (error) {
        console.error(error);
    }
});


//Delete posts
router.delete('/:id', async(req, res) =>{
    try {

        const posts = await loadPostsCollection();
        await posts.deleteOne({_id: new mongodb.ObjectID(req.params.id)});
        res.status(200).send();

    } catch (err) {
        console.error(err);
    }
});


//Connect to mongoDB database asynchronously 
async function loadPostsCollection(){

    const uri = "mongodb+srv://aghose001:aghose001@cluster0.p4dgu.azure.mongodb.net/test?retryWrites=true&w=majority";
    const client = await mongodb.MongoClient.connect(
       uri , {useNewUrlParser: true}
    );
    
    return client.db('vue_express').collection('posts');
}

module.exports = router;