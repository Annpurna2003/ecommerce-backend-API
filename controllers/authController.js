import  pool  from '../db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

export const register = async (req, res, next) => {
    try {
        // Extracting user details from frontend 
        const { name, email, password, house_no, street_no, post_office, district, pincode, mobile_no } = req.body;

        // 1. Check if user is already registered
        const [rows] = await pool.query(
            'SELECT id FROM users WHERE email = ?', 
            [email]
        );

        if (rows.length)
            return res.status(409).json({ success: false, message: 'Email already registered' });

        // 2. Hashing the password
        const hash = await bcrypt.hash(password, saltRounds);

        // 3. Inserting user into database
        const insertSql = 
            'INSERT INTO users (name, email, password, house_no, street_no, post_office, district, pincode, mobile_no) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)';
        
        const insertValues = [name, email, hash, house_no, street_no, post_office, district, pincode, mobile_no];
       //execute query 
        const [result] = await pool.query(insertSql, insertValues);
  
        const newUserId = result.insertId;

        // 4. Generate the JWT (JSON Web Token)
        const token = jwt.sign(
            { id: newUserId, email: email }, // Payload (data to store in the token)
            process.env.JWT_SECRET,          // Secret Key from .env
            { expiresIn: '1h' }              // Token expiration time
        );

        // 5. Send the token in the response
        return res.status(201).json({
            success: true,
            message: 'Registered successfully',
            userId: newUserId,
            token: token // <-- The token is included here!
        });

    } catch (err) {
        // Log the detailed error and pass it to the main error handler
        console.error('Registration Error:', err);
        next(err);
    }
};

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Basic Input Validation
        if (!email || !password) {
            return res.status(400).json({ success: false, message: 'Please provide email and password.' });
        }

        // 1. Find the user by email
        const [rows] = await pool.query(
            'SELECT id, password FROM users WHERE email = ?',
            [email]
        );

        // Check if user was found
        if (rows.length === 0) {
            return res.status(401).json({ success: false, message: 'Invalid credentials (User not found).' });
        }

        const user = rows[0];
        const storedHash = user.password; // Retrieve the hashed password from the database

        // 2. Compare the submitted password with the stored hash
        const isMatch = await bcrypt.compare(password, storedHash);

        if (!isMatch) {
            return res.status(401).json({ success: false, message: 'Invalid credentials (Password mismatch).' });
        }

        // 3. Generate the JWT upon successful login
        const token = jwt.sign({ id: user.id, email: email }, // Payload
       process.env.JWT_SECRET,          // Secret Key
            { expiresIn: '1h' }              // Token expiration
        );

        // 4. Send success response with token
        return res.json({
            success: true,
            message: 'Login successful',
            userId: user.id,
            token: token // Send the JWT back to the client
        });

    } catch (err) {
        // Pass the error to the main error handling middleware
        console.error('Login Error:', err);
        next(err);
    }
};