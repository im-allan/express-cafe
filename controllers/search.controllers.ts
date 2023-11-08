import { Request, Response } from "express";
import { isValidObjectId, mongo } from "mongoose";
import { Category, Product, User } from "../models";

const allowedCollections = [ 'users', 'categories', 'products' ]

const searchUsers = async(term: string, res:Response) => {
  const isMongoID = isValidObjectId(term);

  if (isMongoID) {
    const user = await User.findById(term);
    res.json({
      results: user ? [user] : []
    })
  }

  const regex = new RegExp(term, 'i');

  const users = await User.find({
    $or: [{name: regex}, {email: regex}],
    $and: [{status: true}]
  });

  res.json({
    results: users ? [users] : []
  })
}

const searchCategories = async(term: string, res:Response) => {
  const isMongoID = isValidObjectId(term);

  if (isMongoID) {
    const category = await Category.findById(term);
    res.json({
      results: category ? [category] : []
    })
  }

  const regex = new RegExp(term, 'i');

  const categories = await Category.find({name: regex, status: true});

  res.json({
    results: categories ? [categories] : []
  })
}

const searchProducts = async(term: string, res:Response) => {
  const isMongoID = isValidObjectId(term);
  if (isMongoID) {
    const _id = new mongo.ObjectId(term);
    const product = await Product.find({
      $or: [{_id}, {category: _id}],
      $and: [{status: true}]
    }).populate('category', 'name');

    return res.json({
      results: product ? [product] : []
    })
  }

  const regex = new RegExp(term, 'i');

  const product = await Product.find({
    $or: [{name: regex}, {description: regex}],
    $and: [{status: true}]
  }).populate('category', 'name');


  if (product.length === 0) {

    const category = await Category.findOne({name: regex, status: true});

    if (category) {
      const product = await Product.find({ category: category._id, status: true }).populate('category', 'name');
      return res.status(200).json({
        results: product ? [product] : []
      })
    }
    return res.status(200).json({
      results: []
    })
  }

  return res.json({
    results: (product) ? [product] : []
  })

}

export const search = (req: Request, res: Response) => {
  const { collection, term } = req.params;

  if ( !allowedCollections.includes(collection)) {
    res.status(400).json({
      msg: `${collection} no es una colección permitida`
    })
  }

  switch (collection) {
    case 'users':
      searchUsers(term, res);
      break;
    case 'categories':
      searchCategories(term, res);
      break;
    case 'products': 
      searchProducts(term, res);
      break;

    default:
      res.status(500).json({
        msg: 'Lo sentimos no hemos podido procesar su búsqueda. Por favor, inténtelo más tarde.'
      })
  }
}