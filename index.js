const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Express server is running on 3000 port");
});

mongoose.connect("mongodb+srv://anishajain:12345@cluster0.slwensz.mongodb.net/week02Day06?appName=Cluster0")  
.then(()=> console.log("MongoDB connected successfully"))
.catch((error)=> console.log("MongoDB connection failed :- " , error))


const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
},
{
  versionKey: false,
  timestamps: false
});

const User = mongoose.model("User", userSchema);

app.get("/users", async (req,res)=>{

        const data = await User.find({});
        res.status(200).json(data);
    
})

app.get("/users/:id", async (req,res)=>{

        const data = await User.findById(req.params.id);
        res.status(200).json(data);
    
})

app.post("/addUser", async (req,res)=>{

    const user = new User(req.body);
    await user.save();

    res.status(201).json({
        message:"User added"
    })
})

app.post("/addUsers", async (req,res)=>{

    const users = await User.insertMany(req.body);
    
    res.status(201).json({
        message:"Users added"
    })
})

app.put("/users/:id", async (req,res)=>{

        const updatedUser = await User.findByIdAndUpdate(
            req.params.id, 
            req.body
        );

        res.status(200).json({
            message: "User updated successfully"
        });

});

//by id deletion
app.delete("/users/:id", async (req,res)=>{
    const user = await User.findByIdAndDelete(
        req.params.id
    )

    res.status(200).json({
        message: "User deleted successfully"
    })
})

app.listen(3000, () => {
  console.log("Server started on port 3000");
});