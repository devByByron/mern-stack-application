import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
	try {
		const products = await Product.find({});
		res.status(200).json({ success: true, data: products });
	} catch (error) {
		console.log("Error in fetching products:", error.message);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const createProduct = async (req, res) => {
	const { title, price, description, image } = req.body;

	if (!title || !price || !description || !image) {
		return res
			.status(400)
			.json({ success: false, message: "Please provide all fields" });
	}

	const newProduct = new Product({
		title,
		price,
		description,
		image,
	});

	try {
		await newProduct.save();
		res.status(201).json({ success: true, data: newProduct });
	} catch (error) {
		console.error("Error in Create product:", error);
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const updateProduct = async (req, res) => {
	const { id } = req.params;

	const product = req.body;

	try {
		const updatedProduct = await Product.findByIdAndUpdate(id, product, {
			new: true,
		});
		res.status(200).json({ success: true, data: updatedProduct });
	} catch (error) {
		console.error("Error in updating product:");
		res.status(500).json({ success: false, message: "Server Error" });
	}
};

export const deleteProduct = async (req, res) => {
	const { id } = req.params;
	try {
		await Product.findByIdAndDelete(id);
		res.status(200).json({ success: true, message: "Product deleted" });
	} catch (error) {
		console.error("Error in deleting product:");
		res.status(500).json({ success: false, message: "Server Error" });
	}
};
