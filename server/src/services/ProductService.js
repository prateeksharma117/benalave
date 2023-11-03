import Category from "../models/CategoryModel.js"
import Product from "../models/ProductModel.js"



export const createProduct = async (reqData) => {
    console.log(reqData);

    // Use the category name from reqData
    const category = reqData.category;

    // Find or create the top-level category
    let topLevel = await Category.findOne({ name: category });

    if (!topLevel) {
        topLevel = new Category({
            name: category,
            level: 1
        });
        await topLevel.save();
    }
    const product = new Product({
        title: reqData.title,
        color: reqData.color,
        description: reqData.description,
        discountedPrice: reqData.discountedPrice,
        discountedPercent: reqData.discountedPercent,
        imageUrl: reqData.imageUrl,
        brand: reqData.brand,
        price: reqData.price,
        size: reqData.size,
        quantity: reqData.quantity,
        category: topLevel._id,
        highlights: reqData.highlights,
    });

    return await product.save();
}

export const deleteProduct = async(productId)=>{
    const product = await findProductById(productId)
    await product.findByIdAndDelete(productId)
    return "product deleted successfully"
}

export const updateProduct = async(productId,reqData)=>{
    return await Product.findByIdAndUpdate(productId,reqData)
}

export const findProductById = async(id)=>{
    const product = await Product.findById(id).populate('category').exec();
    if (!product) {
        throw new Error("Product not found")
    }
    return product
}

export const getAllProduct = async(reqQuery)=>{
    let {category,color,size,minPrice,maxPrice,minDiscount,sort,stock,pageNumber,pageSize} = reqQuery

    pageSize=pageSize|| 12;

    let query=Product.find().populate("category")
    if (category) {
        const existCategory=await Category.findOne({name: category})
        if (existCategory) {
            query=query.where("category").equals(existCategory._id)
        }else{
            return{content:[],currentPage:1,totalPages:0}
        }
    }

    if (color) {
        const colorSet=new Set(color.split(",").map(color=>color.trim().toLowerCase()))

        const colorRegex=colorSet.size>0?new RegExp([...colorSet].join("|"),"i"):null

        query=query.where("color").regex(colorRegex)
    }


    if (size) {
        const sizeSet=new Set(size)
        query=query.where("size.name").in([...sizeSet])
    }
    
    if (minPrice && maxPrice) {
        query=query.where("price").gte(minPrice).lte(maxPrice)
    }

    if (minDiscount) {
        query= query.where("discountedPercent").gt(minDiscount)
    }

    if (stock) {
        if(stock==="in_stock"){
            query= query.where("quantity").gt(0)
        }
        else if(stock==="out_of_stock"){
            query= query.where("quantity").lt(1)
        }
    }

    if (sort) {
        const sortDirection=sort==="price_high_to_low"?-1:1
        query=query.sort({price:sortDirection})
    }

    const totalProducts=await Product.countDocuments(query)
    const skip=(pageNumber-1)*pageSize
    query=query.skip(skip).limit(pageSize)
    
    const products = await query.exec()

    const totalPages=Math.ceil(totalProducts/pageSize)

    return {content:products,currentPage:pageNumber,totalPages:totalPages}

}


export const createMultipleProduct=async(products)=>{
    for (let product of products) {
        await createProduct(product)
    }
} 