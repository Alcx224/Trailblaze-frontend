import express from 'express'
const dbroute = express.Router()
import User from '../models/user.js'


dbroute.get('/', async (req, res) => {
    try {
        const arrayUserDB = await User.find()
        res.render("users", {
            arrayUser : arrayUserDB
        })
    } catch (error) {
        console.log(error)
    }
})

dbroute.get('/create', (req, res) => {
    res.render('create')
})

dbroute.post("/", async (req, res) =>{
    const body = req.body
    try {
        const UserDB = new User(body)
        await UserDB.save()

        res.redirect("./users")

        console.log(UserDB)
    } catch (error) {
        console.log(error)
    }
})

dbroute.get("/:id", async(req, res) =>{
    const id = req.params.id

    try {
        const UserDB = await User.findOne({_id: id})
        
        res.render('details', {
            User: UserDB,
            error: false
        })
    } catch (error) {
        console.log(error)
        res.render('details', {
            error: true,
            message: 'User does not exist'
        })
    }
})

dbroute.delete("/:id", async(req, res) => {
    const id = req.params.id

    try {
        const UserDB = await User.findByIdAndDelete({_id: id})

        if(UserDB) {
            res.json({
                status: true,
                message: 'deleted'
            })

        } else {
            res.json({
                status: false,
                message: 'delete failed'
        })
    }
    } catch (error) {
        console.log(error)
    }
})

dbroute.put("/:id", async (req,res) =>{
    const id = req.params.id
    const body = req.body

    try {
        
        const UserDB = await User.findByIdAndUpdate(
            id, body, {useFindAndModify: false}
        )
        
        res.json({
            status: true,
            message: 'updated'
        })
        
    } catch (error) {
        console.log(error)
        res.json({
            status: false,
            message: 'cannot update'
        })
    }
})




export default dbroute;
