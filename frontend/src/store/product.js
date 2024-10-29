import { create } from "zustand";

export const useProductStore = create((set) => ({
	products: [],
	setProducts: () => set({ products }),
	createProduct: async (newProduct) => {
		if (
			!newProduct.title ||
			!newProduct.price ||
			!newProduct.description ||
			!newProduct.image
		) {
			return { success: false, message: "Please fill in all fields" };
		}

		const res = await fetch("/api/products", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newProduct),
		});

		const data = await res.json(); //This line is saying: "Wait for the response (res) to be converted to JSON format, and once it's done, store the resulting object in the variable data."
		set((state) => ({ products: [...state.products, data.data] })); // Update the state
		return { success: true, message: "Product created successfully" };
	},

	fetchProducts: async () => {
		const res = await fetch("/api/products");
		const data = await res.json();
		set({ products: data.data });
	},

	deleteProduct: async (pid) => {
		const res = await fetch(`/api/products/${pid}`, { method: "DELETE" });
		const data = await res.json();
		if (!data.success) {
			return { success: false, message: data.message };
		}

		// Update the user interface immediately without needing to refresh
		set((state) => ({
			products: state.products.filter((product) => product._id !== pid),
		}));

		return { success: true, message: data.message };
	},

	updateProduct: async (pid, updatedProduct) => {
		const res = await fetch(`/api/products/${pid}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedProduct),
		});
		const data = await res.json();
		if (!data.success) return { success: false, message: data.message };

		// update the ui immediately, without needing a refresh
		set((state) => ({
			products: state.products.map((product) =>
				product._id === pid ? data.data : product
			),
		}));

		return { success: true, message: data.message };
	},
}));
