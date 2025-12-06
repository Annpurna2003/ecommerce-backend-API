
import  pool from "../db.js";

/**
 * Add a product to cart OR update quantity if it exists
 */
export const addToCart = async (req, res, next) => {
  try {
    const userId = req.user.id; // logged-in user
    //extracting product details from frontend
    const { product_id, quantity } = req.body;

    // Check if product exists
    const [product] = await pool.query(
      "SELECT stock FROM products WHERE id = ?",
      [product_id]
    );
//if product not found
    if (!product.length)
      return res.status(404).json({ success: false, message: "Product not found" });

    // Insert or Update cart
    await pool.query(
      `
      INSERT INTO cart_items (user_id, product_id, quantity)
      VALUES (?, ?, ?)
      ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)
    `,
      [userId, product_id, quantity]
    );

    res.json({ success: true, message: "Added to cart" });
  } catch (err) {
    // Log and pass error to main error handler
    console.error('Add to Cart Error:', err);
    next(err);
  }
};

/**
 * Get all cart items with total price
 */
export const getCartItems = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const [rows] = await pool.query(
      `
      SELECT ci.id, ci.product_id, ci.quantity,
             p.name, p.price,
             (ci.quantity * p.price) AS total
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `,
      [userId]
    );

    const totalAmount = rows.reduce((sum, item) => sum + item.total, 0);

    res.json({ success: true, items: rows, totalAmount });
  } catch (err) {
    next(err);
  }
};

/**
 * Remove item from cart
 */
export const removeItem = async (req, res, next) => {
  try {
    const { id } = req.params;

    await pool.query("DELETE FROM cart_items WHERE id = ?", [id]);

    res.json({ success: true, message: "Item removed" });
  } catch (err) {
    next(err);
  }
};
