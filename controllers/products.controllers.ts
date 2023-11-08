import { Response } from "express";
import { Category, Product } from "../models";
 
export const getProducts = async(req: any, res: Response) => {
  try {
    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [total, products] = await Promise.all([
      Product.countDocuments(query),
      Product.find(query)
        .populate('user', 'name')
        .populate('category', 'name')
        .skip(Number(from))
        .limit(Number(limit))
    ]);

    res.status(200).json({
      total,
      products
    });
  } catch (error) {

    res.status(500).json({
      msg: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.'
    });

    console.log('[GET_PRODUCTS]', error);
  }
}

export const getProduct = async(req: any, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id).populate('user', 'name').populate('category', 'name');
    res.json(product);

  } catch (error) {

    res.status(500).json({
      msg: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.'
    })

    console.log('[GET_PRODUCT]', error);
  }
}

export const newProduct = async(req: any, res: Response) => {
  try {

  const { price, description, img, category } = req.body;

  const name = req.body.name.toUpperCase();

  const existProduct = await Product.findOne({ name });

  if (existProduct) {
    return res.status(400).json({
      msg: `El producto ${name} ya existe`
    })
  }

  const data = {
    name, 
    user: req.user._id, 
    price, 
    category: category, 
    description,
    img
  };

  const product = new Product(data);
  await product.save();

  res.status(201).json(product); 

  } catch (error) {

  res.status(500).json({
    msg: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.'
  });

  console.log('[NEW_PRODUCT]', error);
  }
}

export const updateProduct = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const body = req.body;

    const existingProduct = await Product.findOne({name: body.name?.toUpperCase()});

    if (existingProduct && !existingProduct._id.equals(id)) {
      return res.status(400).json({
        msg: `El producto ${body.name?.toUpperCase()} ya existe`
      });
    }

    const updatedProduct = {
      ...body,
      user: req.user._id
    };

    const product = await Product.findByIdAndUpdate(id, updatedProduct, { new: true }).populate('category', 'name').populate('user', 'name')

    if (!product) {
      return res.status(404).json({
        msg: 'Lo sentimos se pudo actualizar el producto. Por favor, inténtelo de nuevo más tarde.',
      });
    }

    res.status(200).json(product);

  } catch (error) {
    console.error('[UPDATE_PRODUCT]', error);

    res.status(500).json({
      msg: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.'
    });
  }
};

export const deleteProduct = async(req: any, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, {status: false});

    res.status(204).json(product);
  
  } catch (error) {
    res.status(500).json({
      msg: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.'
    })

    console.log('[DELETE_PRODUCT]', error);  
  }
}


