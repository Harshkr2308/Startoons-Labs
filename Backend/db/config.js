const mongoose = require("mongoose");
const uri =
    // "mongodb://0.0.0.0:27017/startoon";
    "mongodb+srv://harshkr5247:Cxiz9XK9y18T0MeU@cluster0.uj40zew.mongodb.net/startoon?retryWrites=true&w=majority&appName=Cluster0"
mongoose
    .connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log("database connected");
    })
    .catch((err) => {
        console.log("Could not connect", err);
    });