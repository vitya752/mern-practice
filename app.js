const express = require('express');
const mongoose = require('mongoose');
const keys = require('./keys');
const path = require('path');
const authRouters = require('./routes/auth');
const linkRouters = require('./routes/link');
const redirectRouters = require('./routes/redirect');

const app = express();
const PORT = process.env.PORT || 5000;

// app.use(express.urlencoded({extended: true}));
// app.use(flash());
app.use(express.json({ extended: true }));

//routes
app.use('/api/auth', authRouters);
app.use('/api/link', linkRouters);
app.use('/t', redirectRouters);

if(process.env.NODE_ENV === 'production') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')));
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
}

const start = async () => {
    try {
        await mongoose.connect(keys.MONGODB_URI, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true
            // userFindAndModify: false
        });
    
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        })
    } catch(e) {
        console.log(e);
    }

};

start();