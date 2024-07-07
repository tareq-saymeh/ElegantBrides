const express = require("express");
// const mongoose = require("mongoose");
const cors = require("cors");


const app = express();

app.use(cors());



// mongoose.connect("mongodb://127.0.0.1:27017/clothes-printer", {
//     useNewUrlParser: true,
//     useUnifiedTopology: true
// })
// .then(() => console.log("Connected to DB"))
// .catch(error => console.error("Connection to DB failed:", error));






const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}/`));