// const fs = require('fs')

import { promises as fs } from "fs"

export default class ProductManager{

    constructor(){
        this.patch = "./productos.json"
        this.products = []
    }

    static id = 0

    addProduct = async ( title, description, precio, thumbnail, code, stock ) => {

        //Valida que los campos sean Obligatorios. 
        if (!title || !precio || !description || !thumbnail || !code || !stock ) return 

        // Valida que el codigo no sea repetido
        if ( this.products.some( product => product.code === code) ) return 

        ProductManager.id++

        let newProduct = { 
            title, 
            precio, 
            description, 
            thumbnail, 
            code, 
            stock, 
            id: ProductManager.id
        }
        this.products.push(newProduct)
        await fs.writeFile(this.patch, JSON.stringify(this.products))
    }

    readData = async ()=>{
        let data = await fs.readFile(this.patch, "utf-8")
        return JSON.parse(data)
    }
    
    getProducts = async() => {
        let dataProduct = await this.readData()
        return console.log(dataProduct)
    }

    getProductById = async(id) => {
        let dataId = await this.readData()
        if(!dataId.find(product=> product.id === id)){
            console.log("Producto no encontrado")
        }else{
            console.log(dataId.find(product=> product.id === id))
        }
    }
    
    updateProduct = async({id,  ...product})=>{
        await this.deleteProduct(id)
        let dataProduct = await this.readData()
        let updateProd =[
            {id, ...product}, ...dataProduct]
        await fs.writeFile(this.patch, JSON.stringify(updateProd))
        return console.log(updateProd)
    }


    deleteProduct = async (id) =>{
        let dataDelete = await this.readData()
        let productDelete = dataDelete.filter(products => products.id != id)
        await fs.writeFile(this.patch, JSON.stringify(productDelete))
        console.log("producto Eliminado")
    }

}

// const product = new ProductManager

// product.addProduct("Heladera", "Description1", 4000, "Thumbnail1", "55AU7000", 1)
// product.addProduct("TV Smart", "Description2", 3000, "Thumbnail2", "78AU7000", 2)
// product.addProduct("Cafetera", "Description3", 6000, "Thumbnail3", "h5AFASD00", 3)
// product.addProduct("Microondas", "Description4", 1000, "Thumbnail4", "fXFVAU7000", 4)
// product.addProduct("Licuadora", "Description5", 1230, "Thumbnail5", "GHRL000", 5)
// product.addProduct("Aire Acondicionado", "Description6", 2000, "Thumbnail6", "MRIKL7000", 6)
// product.addProduct("Ventilador", "Description7", 4000, "Thumbnail7", "RTYP000", 7)
// product.addProduct("Notebook", "Description8", 4300, "Thumbnail8", "F788SJD", 8)
// product.addProduct("Play Station", "Description9", 8000, "Thumbnail9", "fTTOPY0", 9)
// product.addProduct("Minipimer", "Description10", 9800, "Thumbnail10", "NZK7000", 10)

// product.getProducts()



// product.getProductById(4)



// product.updateProduct({
//     title: 'Titulo1',
//     precio: 4567,
//     description: 'Description Modificado',
//     thumbnail: 'Thumbnail1',
//     code: 'ABC123',
//     stock: 30,
//     id: 1
// })



// product.deleteProduct(2) 