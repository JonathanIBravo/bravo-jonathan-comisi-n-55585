import express from "express"
import ProductManager from "./components/desafio02.js "


const app = express()
app.use(express.urlencoded({extended : true}))

const product = new ProductManager
const readData = product.readData()

app.get("/product", async (req,res)=> {
    let limit = parseInt(req.query.limit)
    if(!limit) return res.send(await readData)
    let dataproductos = await readData
    let dataLimit = dataproductos.slice(0, limit)
    res.send(dataLimit)
}) 

app.get("/product/:id", async (req,res) => {
    let id = parseInt(req.params.id)
    let dataproductos = await readData
    let dataById = dataproductos.find( product => product.id === id)
    res.send(dataById)
})

const PORT = 8080

const server = app.listen(PORT, ()  => {
    console.log(`Express por local host ${server.address().port}`)
})

server.on("error", (error) => console.log(`Error del servidor ${error}`))