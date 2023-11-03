import { createMultipleProduct, createProduct, deleteProduct, findProductById, getAllProduct, updateProduct } from "../services/ProductService.js"


export const createProducts=async(req,res)=>{
    try {
        const product=await createProduct(req.body)
        return res.status(201).send(product)
    } catch (e) {
        return res.status(500).send({error: e.message})
    }
}   

export const deleteProducts=async(req,res)=>{
    const productId=await req.params.id
    try {
        const product=await deleteProduct(productId)
        return res.status(201).send(product)
    } catch (e) {
        return res.status(500).send({error: e.message})
    }
}   

export const updateProducts=async(req,res)=>{
    const productId=await req.params.id
    try {
        const product=await updateProduct(productId,req.body)
        return res.status(201).send(product)
    } catch (e) {
        return res.status(500).send({error: e.message})
    }
}   

export const findProductWithId=async(req,res)=>{
    const productId=await req.params.id
    try {
        const product=await findProductById(productId)
        return res.status(201).send(product)
    } catch (e) {
        return res.status(500).send({error: e.message})
    }
}   

export const getAllProducts=async(req,res)=>{
    try {
        const product=await getAllProduct(req.query)
        return res.status(201).send(product)
    } catch (e) {
        return res.status(500).send({error: e.message})
    }
}  

export const createMultipleProducts=async(req,res)=>{
    try {
        const product=await createMultipleProduct(req.body)
        return res.status(201).send({message:"Products created successfully"})
    } catch (e) {
        return res.status(500).send({error: e.message})
    }
}  