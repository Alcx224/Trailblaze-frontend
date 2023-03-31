import express from 'express'
import {dirname, join} from 'path'
import { fileURLToPath } from 'url'


const app = express()

const __dirname = dirname(fileURLToPath(import.meta.url))
app.set('views', join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/', (req, res) => res.render('index', {title: 'Home Page Startup'}))
app.get('/about', (req, res) => res.render('about', {title: 'About us'}))
app.get('/contact', (req, res) => res.render('contact', {title: 'Contact Page'}))
app.use(express.static(join(__dirname, 'public')))


app.listen(3000)
console.log('Server is listening in port', 3000)