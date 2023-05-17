import express from 'express'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import mongoose from "mongoose"
import router from './router/mainroutes.js'
import dbroute from './router/Users.js'
import bodyParser from 'body-parser'


const app = express()
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
const port = 3000;



const URI = "mongodb+srv://testuser2:IYtkj9Z6eCXJKJBv@cluster0.axqc2ob.mongodb.net/userspage?retryWrites=true&w=majority"
mongoose
  .connect(URI, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log('MongoDB connected')
  })
  .catch(err => console.log(err));

const __dirname = dirname(fileURLToPath(import.meta.url))
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(express.static(join(__dirname, 'public')))
app.use('/', router)
app.use('/users', dbroute)
app.use((req, res, next) => {
  res.status(404).render("404", {
    Title: "404"
  })
})


app.listen(port)
console.log('Server is listening in port', port)