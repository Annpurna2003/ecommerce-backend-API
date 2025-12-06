import pool  from "../db.js";
/**
 * Get all products
 */
export const getAllProducts = async (req, res, next) => {
  try {
    
    const [products] = await pool.query("SELECT * FROM products");
    res.json({ success: true, products });
  } catch (err) {
    next(err);
  }
};

/**
 * Get product by ID
 */
export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query("SELECT * FROM products WHERE id = ?", [id,]);

    if (!rows.length)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, product: rows[0] });
  } catch (err) {
    next(err);
  }
};
