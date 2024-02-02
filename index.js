const express = require("express");
const mongoose = require("mongoose"); 
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const app = express();
dotenv.config();
const port = process.env.PORT || 8000;

const username = process.env.MONGODB_USERNAME;
const password = process.env.MONGODB_PASSWORD;

//mongodb+srv://poornashri2703:<password>@cluster0.yf8lv6q.mongodb.net/?retryWrites=true&w=majority
mongoose.connect('mongodb+srv://knvikram2004:BWJ6titnzJSZwb0G@cluster0.us2e3gg.mongodb.net/regitrationFormDB', 
//mongodb+srv://knvikram2004:BWJ6titnzJSZwb0G@cluster0.us2e3gg.mongodb.net/regitrationFormDB
{
    useNewUrlParser: true,
    useUnifiedTopology: true
}
);

// registration schema
const registrationSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

// model of registration schema
const Registration = mongoose.model("Registration", registrationSchema);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/Frontend/index.html");
});

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await Registration. findOne({ email: email });
        // check for existing user
        if (!existingUser) {
            const registrationData = new Registration({
                name,
                email,
                password,
            });
            await registrationData.save();
            res.redirect("/success");
        } 
        else{
            
        alert("User already exist");
        res.redirect("/error");
        }

    } 
    catch (error) {
        console.error(error);
        res.redirect("/error");
    }
});

app.get("/success", (req, res) => {
    res.sendFile(__dirname + "/Frontend/success.html");
});

app.get("/error", (req, res) => {
    res.sendFile(__dirname + "/Frontend/error.html");
});

app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});


