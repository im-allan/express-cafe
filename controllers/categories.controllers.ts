import { Request, Response } from 'express';
import { Category } from '../models';


export const getCategories = async (req: Request, res: Response) => {
  try {
    const { limit = 5, skip = 0 } = req.query;
    const [total, categories] = await Promise.all([
      Category.countDocuments({status:true}),
      Category.find({status:true})
        .populate('user', 'name')
        .skip(Number(skip))
        .limit(Number(limit))
    ])

    res.status(200).json({
      total,
      categories
    })

  } catch (error) {

    res.status(500).json({
      msg: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.'
    });
    console.log('[GET_CATEGORIES]', error);
  }
}

export const getCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id).populate('user', 'name');
    res.json(category);

  } catch (error) {

    res.status(500).json({
      msg: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.'
    })
    console.log('[GET_CATEGORY]', error);
  }
}

export const newCategory = async(req: any, res: Response) => {
  try {
    const name = req.body.name.toUpperCase();
    const existCategory = await Category.findOne({ name });
  
    if (existCategory) {
      return res.status(400).json({
        msg: `La categoría ${name} ya existe`,
      });
    }
  
    const data = {
      name,
      user: req.user._id
    };
  
    const category = new Category(data);
    await category.save();
  
    res.status(201).json(category); 

  } catch (error) {

    res.status(500).json({
      msg: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.'
    });

    console.log('[NEW_CATEGORY]', error);
  }
}

export const updateCategory = async (req: any, res: Response) => {
  try {
    const { id } = req.params;
    const name = req.body.name.toUpperCase();

    const statusCategory = await Category.findById(id);

    if (!statusCategory) {
      return res.status(400).json({
        msg: `La categoría con ID ${id} no existe.`,
      });
    }

    if (!statusCategory.status) {
      return res.status(400).json({
        msg: `La categoría con ID ${id} ya fue eliminada`,
      });
    }

    const existCategory = await Category.findOne({ name });

    if (existCategory && existCategory._id != id) {
      return res.status(400).json({
        msg: `La categoría ${name} ya existe`,
      });
    }

    const category = await Category.findByIdAndUpdate(id, { name, user: req.user._id }, { new: true }).populate('user', 'name');

    if (!category) {
      return res.status(400).json({
        msg: `No se pudo actualizar la categoría con ID ${id}`,
      });
    }

    res.status(200).json(category);

  } catch (error) {
    res.status(500).json({
      msg: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.',
    });

    console.log('[UPDATE_CATEGORY]', error);
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, {status: false});
    
    res.status(204).json(category);
  
  } catch (error) {
    res.status(500).json({
      msg: 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.'
    })
    console.log('[DELETE_CATEGORY]', error);  
  }
}