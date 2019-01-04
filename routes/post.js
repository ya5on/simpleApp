let express = require('express');
let router = express.Router();
let Post = require('../models/PostSchema')

//http://localhost:3000/api/post получить
router.get('/', async(req, res) => {
    let posts = await Post.find({})
    res.status(200).json(posts)
});

//http://localhost:3000/api/post добавить
router.post('/', async(req, res) => {
    let postData = {
        title: req.body.title,
        text: req.body.text
    };

    let post = new Post(postData);
    await post.save();
    res.status(201).json(post)
});

//http://localhost:3000/api/post удалить
router.delete('/:id', async(req, res) => {
    await Post.remove({_id: req.params.id})
    res.status(200).json({
        message: 'deleted'
    })
});

module.exports = router;