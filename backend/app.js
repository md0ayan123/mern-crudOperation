const express = require("express")
const app=express()
const db=require('./config/db.connection')
const userRouter=require('./routes/userRouter')
const port = 5000
const cors = require("cors");
app.use(cors());
app.use(express.json());




app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

app.use(userRouter)


