import React, { useState } from 'react';
import '../components/CheckoutPage.css'; 

const CheckoutPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        address: '',
        apt: '',
        city: '',
        state: '',
        zip: '',
        country: 'Canada'
    });

    const cart = [
        { id: 1, name: 'Haircut For Men', price: 100, image: 'massage.png', details: 'Hair Style Package'},
        { id: 2, name: 'Beard Trimming', price: 25, image: 'massage.png', details: 'Beard Trimming' }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleCheckout = (e) => {
        e.preventDefault();
        console.log('Form submitted!', formData);
    };

    return (
        <div className="checkout-page">
            <div className="cart-details">
                <h2>Checkout</h2>
                {cart.map((item) => (
                    <div key={item.id} className="product-card">
                        <img src={item.image} alt={item.name} className="product-img" />
                        <div className="product-info">
                            <div className="product-details">
                                <h3>{item.name}</h3>
                                <p>{item.details}</p>
                                <p>Price: ${item.price}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="checkout-form">
                <h2>Customer Information</h2>
                <form onSubmit={handleCheckout}>
                    <div className="form-group">
                        <label htmlFor="email">Email:</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="firstName">First Name:</label>
                        <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Last Name:</label>
                        <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Phone:</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <textarea id="address" name="address" value={formData.address} onChange={handleInputChange} required></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="apt">Apt / Suite:</label>
                        <input type="text" id="apt" name="apt" value={formData.apt} onChange={handleInputChange} />
                    </div>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <input type="text" id="city" name="city" value={formData.city} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="state">State:</label>
                        <input type="text" id="state" name="state" value={formData.state} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="zip">ZIP Code:</label>
                        <input type="text" id="zip" name="zip" value={formData.zip} onChange={handleInputChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="country">Country:</label>
                        <select id="country" name="country" value={formData.country} onChange={handleInputChange} required>
                            <option value="Canada">Canada</option>
                            <option value="USA">USA</option>
                            {}
                        </select>
                    </div>
                    <button class="btnn" type="submit">Checkout</button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
