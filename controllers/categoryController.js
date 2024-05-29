import { StatusCodes } from 'http-status-codes';
import Category from '../models/CategoryModel.js';
import QRCode from 'qrcode';

export const createCategory = async (req, res) => {
  try {
    const { name, content, status, intro, intro_image } = req.body;
    const newCategory = new Category({
      name,
      content,
      status,
      intro_image,
      intro,
    });
    await newCategory.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create categories' });
  }
};

//get catories info select only image_info and info sort by created date
export const getCategoriesInfo = async (req, res) => {
  try {
    const categories = await Category.find(
      { status: 'published' },
      { name: 1, intro: 1, intro_image: 1 }
    ).sort({ createdAt: 1 });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
};

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      status:
        req.user.role === 'admin'
          ? { $in: ['draft', 'published'] }
          : 'published',
    });

    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
};

export const getCategoriesFilter = async (req, res) => {
  try {
    const { search, status, category, sort } = req.query;

    const queryObject = {};

    if (search) {
      queryObject.$or = [{ title: { $regex: search, $options: 'i' } }];
    }

    if (status && status !== 'all') {
      queryObject.status = status;
    }

    const sortOptions = {
      newest: '-createdAt',
      oldest: 'createdAt',
      'a-z': 'title',
      'z-a': '-title',
    };

    const sortKey = sortOptions[sort] || sortOptions.newest;

    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const categories = await Category.find(queryObject)
      .collation({ locale: 'en' })
      .sort(sortKey)
      .skip(skip)
      .limit(limit);
    const totalCategories = await Category.countDocuments(queryObject);
    const numOfPages = Math.ceil(totalCategories / limit);
    res
      .status(StatusCodes.OK)
      .json({ totalCategories, numOfPages, currentPage: page, categories });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Failed to retrieve categories' });
  }
};

export const getCategoryById = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const qrCode = await generateQRCode(categoryId);
    res.json({ category, qrCode });
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve category' });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const { name, content, intro, intro_image, status } = req.body;
    const updatedCategory = await Category.findByIdAndUpdate(
      categoryId,
      { name, intro, content, intro_image, status },
      { new: true }
    );
    if (!updatedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(updatedCategory);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update category' });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const categoryId = req.params.id;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete category' });
  }
};

const generateQRCode = async (categoryId) => {
  try {
    const url = `${process.env.BASE_URL}/category/${categoryId}`;
    const qrCode = await QRCode.toDataURL(url);
    return qrCode;
  } catch (error) {
    console.log({ error: 'Failed to generate QR code' });
  }
};
