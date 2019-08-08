
const express = require('express')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('/api/getList', (req,res) => {
    var list = ["list1","list2", "list3"]
    res.json(list)
    console.log('Sent list of item')
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname+'client/build/index.html'))
})

const port = process.env.PORT || 5000

app.listen(port)

console.log("App is listening on port " + port)