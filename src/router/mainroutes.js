import express from 'express'
const router = express.Router()

router.get('/', (req, res) => res.render('index', { title: 'Home Page Startup' }))
router.get('/about', (req, res) => res.render('about', { title: 'About us' }))
router.get('/contact', (req, res) => res.render('contact', { title: 'Contact Page' }))


export default router;
