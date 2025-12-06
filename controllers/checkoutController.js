import pool from "../db.js";
/*
Checkout the cart: creates order + order_items then clears cart
 */
export const checkout = async (req, res, next) => {
    // get a connection from pool
  const conn = await pool.getConnection();
  // to ensure atomicity
  try {
    const userId = req.user.id;

    // fetch all the items from user cart
    const [cartItems] = await conn.query(
      `
      SELECT ci.product_id, ci.quantity, p.price
      FROM cart_items ci
      JOIN products p ON ci.product_id = p.id
      WHERE ci.user_id = ?
    `,
      [userId]
    );
//if cart is empty,stop checkout
    if (!cartItems.length)
      return res.status(400).json({ success: false, message: "Cart is empty" });

    // calculate total amount
    const totalAmount = cartItems.reduce(
      (sum, item) => sum + item.quantity * item.price,
      0
    );
//begin transaction
    await conn.beginTransaction();

    // insert into orders
    const [orderResult] = await conn.query(
      "INSERT INTO orders (user_id, total_amount) VALUES (?, ?)",
      [userId, totalAmount]
    );
//getting the inserted order id
    const orderId = orderResult.insertId;

    // insert each cart item into order_items table
    for (const item of cartItems) {
      await conn.query(
        `
        INSERT INTO order_items (order_id, product_id, quantity, price_each)
        VALUES (?, ?, ?, ?)
        `,
        [orderId, item.product_id, item.quantity, item.price]
      );
    }

    // clear user cart
    await conn.query("DELETE FROM cart_items WHERE user_id = ?", [userId]);
//commit transaction
    await conn.commit();
//response
    res.json({success: true,message: "Checkout successful",orderId,totalAmount,});
  } catch (err) {
    // rollback on error
    await conn.rollback();
    //pass the error to error handling middleware
    next(err);
  } finally {
    // release connection back to pool
    conn.release();
  }
};
