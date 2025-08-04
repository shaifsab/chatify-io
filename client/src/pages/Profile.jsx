// src/pages/Profile.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { updateUserThunk } from '../store/slices/authSlice';
import { FaArrowLeft, FaPen, FaSave, FaTimes } from 'react-icons/fa'; 
import "../styles/Profile.css";  
import { useTheme } from "../context/ThemeContext";


const UserProfile = () => {
     const { theme, toggleTheme } = useTheme();
    const dispatch = useDispatch();
    const [editMode, setEditMode] = useState(false);
    const user = useSelector((state) => state.authSlice.user);
    const [userEditedData, setUserEditedData] = useState({
        fullName: user.fullName,
        password: "",
        avatar: ""
    });

    // Handle user profile update
    const handleUpdate = () => {
        dispatch(updateUserThunk(userEditedData));
        setUserEditedData({
            fullName: user.fullName,
            password: "",
            avatar: ""
        });
        setEditMode(false);
    };

    return (
        <>
            <div className={`profile ${theme === "dark" ? "dark-mode" : ""}`}>
                <div className="profile__card">

                    <div className="profile__card-btn">
                    <button onClick={() => setEditMode(!editMode)} className="profile__edit-btn">
                        <FaPen className="profile__icon" /> Edit
                    </button>
                    
                    <Link to="/chat" className="profile__back-link">
                        <FaArrowLeft className="profile__icon" /> Back
                    </Link>
                    </div>
                    
                    <div className="profile__avatar-container">
                        <img src={user?.avatar} alt="Profile" className="profile__avatar" />
                        {editMode && (
                            userEditedData.avatar ? (
                                <img className="profile__avatar-edit" src={URL.createObjectURL(userEditedData.avatar)} alt="Updated Avatar" />
                            ) : (
                                <label className="profile__avatar-upload" htmlFor="avatar">
                                    <span>Upload +</span>
                                    <input
                                        onChange={(e) => setUserEditedData((prev) => ({ ...prev, avatar: e.target.files[0] }))}
                                        name="image"
                                        id="avatar"
                                        type="file"
                                    />
                                </label>
                            )
                        )}
                    </div>
                    <input
                        onChange={(e) => setUserEditedData((prev) => ({ ...prev, fullName: e.target.value }))}
                        type="text"
                        value={editMode ? userEditedData.fullName : user.fullName}
                        className="profile__name-input"
                    />
                    <input type="text" value={user.email} className="profile__email-input" disabled />

                    {editMode && (
                        <input
                            onChange={(e) => setUserEditedData((prev) => ({ ...prev, password: e.target.value }))}
                            type="password"
                            placeholder="New Password"
                            className="profile__password-input"
                        />
                    )}

                    {editMode && (
                        <div className="profile__actions">
                            <button onClick={handleUpdate} className="profile__save-btn">
                                <FaSave className="profile__icon" /> Save
                            </button>
                            <button onClick={() => setEditMode(false)} className="profile__cancel-btn">
                                <FaTimes className="profile__icon" /> Cancel
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default UserProfile;
