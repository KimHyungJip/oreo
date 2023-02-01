const express = require('express');
const app = express()



app.get('/', (req, res) => {
    res.send('Hello Wolrd')
})

app.listen(5000)

