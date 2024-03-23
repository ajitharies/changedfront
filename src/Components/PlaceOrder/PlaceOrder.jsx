import React, { useState } from 'react';
import './placeorder.css';
import india from './india.json';
import axios from 'axios';

function PlaceOrder({ close }) {
    const [formData, setFormData] = useState({
        fullName: '',
        phoneNumber: '',
        streetAddress: '',
        selectedState: '',
        selectedDistrict: ''
    });

    const [districtList, setDistrictList] = useState([]);

    const stateSelectHandler = (e) => {
        e.preventDefault();
        const selectedState = e.target.options[e.target.selectedIndex].text;
        const array = e.target.value.split(',');
        setDistrictList(array);
        setFormData({
            ...formData,
            selectedState: selectedState
        });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     console.log();
    //     // Here you can add logic to submit the form data
    // };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const authToken = localStorage.getItem('auth-token');
    
            const response = await axios.post(
                'http://localhost:4000/addorderdetails', // Replace this with your backend endpoint
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': authToken
                    }
                }
            );
    
            console.log(response.data); // Log the response from the server
            return response.data; // Return the response data if needed
        } catch (error) {
            console.error('Error adding order details:', error);
            throw error; // Rethrow the error to handle it in the calling function
        }
    };

    return (
        <>
            <div className='bgblur'>
                <section className="container">
                    <header>Customer Details</header>
                    <form className="form" onSubmit={handleSubmit}>
                        <div className="input-box">
                            <label>Full Name</label>
                            <input
                                required
                                placeholder="Enter full name"
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="column">
                            <div className="input-box">
                                <label>Phone Number</label>
                                <input
                                    required
                                    placeholder="Enter phone number"
                                    type="tel"
                                    name="phoneNumber"
                                    value={formData.phoneNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                        </div>
                        <div className="input-box address">
                            <label>Address</label>
                            <input
                                required
                                placeholder="Enter street address"
                                type="text"
                                name="streetAddress"
                                value={formData.streetAddress}
                                onChange={handleInputChange}
                            />
                            <div className="column">
                                <div className="select-box">
                                    <select onChange={stateSelectHandler}>
                                        <option hidden="">State</option>
                                        {india.states.map((item, index) => (
                                            <option key={index} value={item.districts}>
                                                {item.state}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="select-box">
                                    <select
                                        name="selectedDistrict"
                                        value={formData.selectedDistrict}
                                        onChange={handleInputChange}
                                    >
                                        <option hidden="">District</option>
                                        {districtList.map((item, index) => (
                                            <option key={index}>{item}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <button type="submit">Proceed to Checkout</button>
                        <button onClick={close}>Cancel</button>
                    </form>
                </section>
            </div>
        </>
    );
}

export default PlaceOrder;
