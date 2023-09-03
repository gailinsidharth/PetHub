const express = require('express')
const authenticateToken = require('../middleware/auth')
const { breedRequest, viewRequest,deleteReq } = require('../controller/breedRequestController')
const router = express.Router()


router.get('/breed-requests/:breederId',viewRequest)
router.delete('/breed-requests/:requestId',authenticateToken,deleteReq)
router.post('/breed-requests',authenticateToken,breedRequest)


module.exports = router
