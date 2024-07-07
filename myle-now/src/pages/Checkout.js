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
            <section className="cartSummary">
                <h2 className="cartSummaryHeading">SUMMARY</h2>
                <div className="subtotal">
                    <p className="p1">Subtotal (1 Items)</p>
                    <p className="p2">50 CAD</p>
                </div>
                <div className="subtotal">
                    <p className="p1">Shipping and Handling</p>
                    <p className="p2">5 CAD</p>
                </div>
                <div className="subtotal">
                    <p className="p1">Tax (Calculated At Checkout)</p>
                    <p className="p2">0 CAD</p>
                </div>
                <hr />
                <div className="subtotal">
                    <p className="bold">TOTAL</p>
                    <p className="bold">55 CAD</p>
                </div>
            </section>
            <div className="checkout-form">
                <h2>Customer Information</h2>
                <form onSubmit={handleCheckout}>
                    <div className="form-group">
                        <input 
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="Email" 
                            value={formData.email} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="firstName" 
                            name="firstName" 
                            placeholder="First Name" 
                            value={formData.firstName} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="lastName" 
                            name="lastName" 
                            placeholder="Last Name" 
                            value={formData.lastName} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="tel" 
                            id="phone" 
                            name="phone" 
                            placeholder="Phone" 
                            value={formData.phone} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="address" 
                            name="address" 
                            placeholder="Address" 
                            value={formData.address} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="apt" 
                            name="apt" 
                            placeholder="Apt / Suite" 
                            value={formData.apt} 
                            onChange={handleInputChange} 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="city" 
                            name="city" 
                            placeholder="City" 
                            value={formData.city} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="state" 
                            name="state" 
                            placeholder="State" 
                            value={formData.state} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <input 
                            type="text" 
                            id="zip" 
                            name="zip" 
                            placeholder="ZIP Code" 
                            value={formData.zip} 
                            onChange={handleInputChange} 
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <select 
                            id="country" 
                            name="country" 
                            value={formData.country} 
                            onChange={handleInputChange} 
                            required 
                        >
                            <option value="Canada">Canada</option>
                            <option value="USA">USA</option>
                        </select>
                    </div>
                    <p>
                        By clicking "Checkout," I agree to the terms and conditions.
                    </p>
                    <button className="btnn" type="submit">Checkout</button>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
