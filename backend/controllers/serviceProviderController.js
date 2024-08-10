const User = require('../models/userModel');
const ServiceProvider = require('../models/serviceProviderModel');
const bcrypt = require('bcrypt');
const sendEmail = require('../utils/sendEmail');
require('dotenv').config();

const addServiceProvider = async (req, res) => {
    const { name, phone, email, password, category } = req.body;

    // Validation checks
    let emptyFields = [];
    if (!name) emptyFields.push('name');
    if (!phone) emptyFields.push('phone');
    if (!email) emptyFields.push('email');
    if (!password) emptyFields.push('password');
    if (!category) emptyFields.push('category');

    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Email already in use' });
        }

        // Create a new user (for authentication purposes)
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ email, password: hashedPassword, role: 'service_provider', verified: true });
        await newUser.save();

        const employeeId = newUser._id;

        // Create a new service provider with a reference to the user
        const serviceProvider = new ServiceProvider({ name, phone, employeeId, category });
        await serviceProvider.save();

        // Send email notification
        const subject = 'Service Provider Account Created';
        const text = `Dear ${name},\n\nYour service provider account has been created successfully. Here are your login details:\n\nEmail: ${email}\nPassword: ${password}\n\nPlease keep this information secure.\n\nBest regards,\nMyle Now.`;

        const emailError = await sendEmail(email, subject, text);
        if (emailError) {
            return res.status(500).json({ error: 'Service provider added, but failed to send email' });
        }

        res.status(201).json({ message: 'Service provider added successfully' });
    } catch (error) {
        console.error('Error adding service provider:', error);
        res.status(500).json({ error: 'Failed to add service provider' });
    }
};

module.exports = { addServiceProvider };
