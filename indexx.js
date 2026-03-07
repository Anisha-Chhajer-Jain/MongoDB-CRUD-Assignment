const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Express server is running on 3000 port");
});

mongoose.connect("mongodb+srv://anishajain:12345@cluster0.slwensz.mongodb.net/week02Day06?appName=Cluster0")
    .then(() => console.log("MongoDB connected successfully"))
    .catch((error) => console.log("MongoDB connection failed :- ", error))

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    age: {
        type: Number,
        required: true,
        min: 18
    },
    role: {
        type: String,
        enum: ["Student", "Mentor", "Admin"],
        default: "Student"
    },
    course: {
        type: String,
        enum: ["MERN", "Java", "Python", "Data Science"]
    },
    isActive: {
        type: Boolean,
        default: true
    }
})


const Student = mongoose.model("Student", studentSchema);

app.post("/students", async (req, res) => {
    try {
        const student = new Student(req.body)
        const save = await student.save()
        res.status(201).json(save)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.post("/students/bulk", async (req, res) => {
    try {
        const students = await Student.insertMany(req.body)
        res.status(201).json(students)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.get("/students", async (req, res) => {
    const data = await Student.find({});
    res.status(200).json(data);
})


app.get("/students/:id", async (req, res) => {
    try {
        const student = await Student.findById(req.params.id)
        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }
        res.status(200).json(studentS)
    }
    catch (err) {
        res.status(500).json({ error: err.message })
    }
})

// app.get("/students/course/:courseName", async (req, res) => {
//     try {
//         const students = await Student.find({ course: req.params.courseName })
//         res.status(200).json(st)
//     }
//     catch (err) {
//         res.status(500).json({ error: err.message })
//     }
// })

app.get('/students/course/:courseName', async (req, res) => {
    const courseName = req.params.courseName;
    const students = await Student.find({ course: courseName });
    res.json(students); // use the correct variable name
});

app.put("/students/:id", async (req, res) => {
    try {
        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        )
        if (!student) {
            return res.status(404).json({ message: "Student not found" })
        }
        res.status(200).json(student)
    }
    catch (err) {
        res.status(400).json({ error: err.message })
    }
})

app.delete("/students/:id", async(req,res)=>{
    try{
        const student = await Student.findByIdAndDelete(req.params.id)
        if(!student){
            return res.status(404).json({message:"Student not found"})
        }
        res.status(200).json(student)
    }
    catch(err){
        res.status(500).json({error:err.message})
    }
})

app.listen(3000, () => {
    console.log("Server started on 3000 port");
});






























