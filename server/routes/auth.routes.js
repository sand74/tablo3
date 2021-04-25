import express from 'express'

const router = express.Router()

router.post('/signin', (req, res, next) => {
    res.send('signin');
});

router.get('/signout', (req, res, next) => {
    res.send('signout');
});

export default router
