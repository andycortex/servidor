const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('ruta de ordenes')
})

module.exports = router;