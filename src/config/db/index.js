const mongoose = require('mongoose');
async function connect () {
    try {
        await mongoose.connect('mongodb://localhost:27017/education_dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connect to MongoDB successfully!");
    }catch(err) {
        console.error("Connect failed !!!",err);
    }
}

module.exports = { connect };