let express = require('express');
let mongoose = require('mongoose');
let bodyParser = require('body-parser');
let path = require('path');
let postRouter = require('./routes/post');

let port = process.env.PORT || 3000;
let clientPath = path.join(__dirname, 'client');

mongoose.connect('mongodb://admin:secret@localhost/blog', {
    useNewUrlParser: true
})

    .then(() => {
        console.log('database connected')
    })
    .catch(err => {
        console.log(err)
    });

let app = express();
app.use(bodyParser.json());
app.use('/api/post', postRouter);
app.use(express.static(clientPath));

app.listen(port, () => {
    console.log(`Server started on port ${port}`)
});



