import React, { useState } from 'react';
import './Profile.css';

const Profile = () => {
    const [name, setName] = useState('Anushka Roshni');
    const [phoneNumber, setPhoneNumber] = useState('0187719068');
    const [password, setPassword] = useState('1234');

    return (
        <div className="profile-page">
            <img
                src="/Users/anushka/profile-page/src/App Icon.png" /* Replace with your icon URL */
                alt="App Icon"
                className="app-icon"
            />
            <div className="profile-container">
                <img
                    src="https://via.placeholder.com/150"
                    alt="Profile"
                    className="profile-image"
                />
                <h1 className="profile-name">Anushka Roshni</h1>
                <p className="profile-bio">
                    Upcoming Appointment: 12th August, 2024
                </p>
                <div className="profile-details">
                    <label>
                        Name:
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </label>
                    <label>
                        Phone Number:
                        <input
                            type="text"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        />
                    </label>
                    <label>
                        Password:
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </label>
                </div>
                <button className="contact-button" onClick={handleEditClick}>
                    {isEditing ? 'Save' : 'Edit'}
                </button>
            </div>
        </div>
    );
};

export default Profile;

