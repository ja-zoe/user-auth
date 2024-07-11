import express from "express"
import mongoose from "mongoose"
import cors from "cors"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
require('dotenv').config()
import usersCollection from "./models/userSchema"

// Connect to MongoDB and start Express server
const app = express()
async function connectAndRun() {
    try {
        if(process.env.MONGO_URI) {
            await mongoose.connect(process.env.MONGO_URI)
            console.log("Successfully Connected to MongoDB!")
        } else {
            throw new Error("MONGO_URI not defined in environment variables")
        }
        app.listen(3001, () => console.log("Server listening on port 3001"))
    } catch(error) {
        console.error("There was an error starting up the server: ", error)
        process.exit(1)
    }
}
connectAndRun()

// Middleware
app.use(express.json())
app.use(cors())

// Routes
// Create User
app.post('/register', async (req, res) => {
    try {
        const { email, userName, password } = req.body
        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = new usersCollection({ email, userName, password: hashedPassword })
        await newUser.save()
        res.status(201).json({message: "User create successfully"})
    } catch(error) {
        res.status(500).json({error: "Error creating user"})
    }
})

// Fetch all users
app.get('/users', async (req,res) => {
    try {
        const users = await usersCollection.find()
        res.status(201).json(users)
    } catch(error) {
        res.status(400).json({error: "Error fetching users"})
    }
})

// Login User
app.post('/login', async (req,res) => {
    try {
        const { userName, password } = req.body
        const user = await usersCollection.findOne({ userName })
        console.log('yuh')
        if(!user) {
            console.log('no user')
            return res.status(401).json({error: "User not found"})
        }
        console.log('user')
        const isPasswordValid = await bcrypt.compare(password, user!.password)
        if(!isPasswordValid){
            return res.status(401).json({message: "Invalid credentials"})
        }
        if(process.env.SECRET_KEY){
            const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, { expiresIn: "1hr" })
        } else {
            console.log("Secret Key not defined in environment variables")
            throw new Error("There's a problem on our end")
        }
        res.status(200).json({message: `User ${userName} logged in`})
    } catch(error) {
        if(error instanceof Error){
            res.status(500).json({message: error.message})
        } else {
            res.status(500).json({message: "Error of type unknown occured"})
        }
    }
})

// Update one user
app.put('/user/:id', (req,res) => {

})

// Delete one user
app.delete('/user/:id', (req, res) => {

})