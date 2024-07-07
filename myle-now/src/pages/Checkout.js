import React, { useState } from 'react';
import '../components/CheckoutPage.css'; 
import '../components/CartItems.css';

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
            <section class="cartSummary">
                <h2 class="cartSummaryHeading">SUMMARY</h2>
                <div class="subtotal">
                    <p class="p1">Subtotal (1 Items)</p>
                    <p class="p2">50 CAD</p>
                </div>
                <div class="subtotal">
                    <p class="p1">Shipping and Handling</p>
                    <p class="p2">5 CAD</p>
                </div>
                <div class="subtotal">
                    <p class="p1">Tax (Calculated At Checkout)</p>
                    <p class="p2">0 CAD</p>
                </div>
                <hr></hr>
                <div class="subtotal">
                    <p class="bold">TOTAL</p>
                    <p class="bold">55 CAD</p>
                </div>
            </section>
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
                        </select>
                    </div>
                    <button class="btnn" type="submit">Checkout</button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
