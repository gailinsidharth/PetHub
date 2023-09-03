const express = require('express')
const { createBreeder, BreederLogin, getBreederById, getBreederDetails, viewBreederById, getBreederWithBreeds, approveBreeder, blockBreeder } = require('../controller/breederController')
const authenticateToken = require('../middleware/auth')
const router = express.Router()


router.get('/getbreeder',getBreederDetails)
router.post('/breeder',createBreeder)
router.post('/breederlogin',BreederLogin)
router.get('/getbreederbyid/:id',viewBreederById)
router.post('/:id/approve', approveBreeder);
router.delete('/:id',blockBreeder);
router.get('/getbreederwithbreeds/:id',getBreederWithBreeds)
router.get('/getbreederbyid',authenticateToken,getBreederById)



module.exports= router;