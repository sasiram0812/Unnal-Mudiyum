import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import "./Profile.css";
import { FaGithub, FaLinkedin, FaInstagram } from "react-icons/fa";

import { auth, db } from "../firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import Loader from "../components/Loader";


function Profile() {
  const user = auth.currentUser;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchData = async () => {
    // If you load profile data from DB, put here
    await new Promise(r => setTimeout(r, 300));
    setLoading(false);
  };

  fetchData();
}, []);

  

  // ---------------------- LOAD PROFILE DATA ----------------------
  useEffect(() => {
    if (!user) return;

    const ref = doc(db, "users", user.uid);

    getDoc(ref).then((snap) => {
      if (snap.exists()) {
        const d = snap.data();
        setName(d.name || "");
        setEmail(d.email || user.email);
        setCollege(d.college || "");
        setDepartment(d.department || "");
        setBio(d.bio || "");
        setProfilePic(d.profilePic || "https://cdn-icons-png.flaticon.com/512/3177/3177440.png");
      } else {
        // create empty profile
        setDoc(ref, {
          name: "",
          email: user.email,
          college: "",
          department: "",
          bio: "",
          profilePic: "",
          createdAt: new Date().toDateString(),
        });
      }
    });
  }, [user]);

  // ---------------------- SAVE PROFILE ----------------------
  const saveProfile = async () => {
    const ref = doc(db, "users", user.uid);

    await setDoc(
      ref,
      {
        name,
        email,
        college,
        department,
        bio,
        profilePic,
      },
      { merge: true }
    );

    alert("Profile updated successfully!");
  };

  // ---------------------- PHOTO UPLOAD (LOCAL ONLY) ----------------------
  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setProfilePic(imgURL);

      alert("Photo preview updated — Firebase Storage upload coming soon!");
    }
  };

  const completion =
    (name && email && college && department && bio ? 100 : 60);

    if (loading) return <Loader />;


  return (
    <div className="profile-container">
      <Navbar />

      {/* Banner */}
      <div className="profile-banner fade-in">
        <h1 className="banner-title">Your Profile</h1>
        <p className="banner-subtitle">Manage your personal information</p>
      </div>

      {/* Profile Card */}
      <div className="profile-card pop">

        <div className="profile-pic-container">
          <img className="profile-pic" src={profilePic} alt="profile" />

          <label className="change-photo-btn">
            Change Photo
            <input type="file" accept="image/*" onChange={handlePhotoUpload} />
          </label>
        </div>

        <h1 className="profile-name">{name || "New User"}</h1>
        <p className="profile-email">{email}</p>

        <div className="profile-badges">
          <span className="badge">🎖 Level 1</span>
          <span className="badge">⚡ XP Coming</span>
          <span className="badge">📅 Since {new Date().getFullYear()}</span>
        </div>

        {/* Completion */}
        <div className="completion-section">
          <p>Profile Completion</p>
          <div className="completion-bar">
            <div className="completion-fill" style={{ width: `${completion}%` }}></div>
          </div>
          <p className="completion-percent">{completion}% Completed</p>
        </div>

        <div className="profile-stats slide-up">
          <div className="stat-card">
            <h6>Update Soon...</h6>
            <p>Study Hours</p>
          </div>
          <div className="stat-card">
            <h6>Update Soon...</h6>
            <p>Tasks Done</p>
          </div>
          <div className="stat-card">
            <h6>Update Soon...</h6>
            <p>Workouts</p>
          </div>
        </div>

        <div className="social-section slide-left">
          <h3>Social Profiles</h3>
          <div className="social-icons">
            <FaGithub className="social-icon"/>
            <FaLinkedin className="social-icon" />
            <FaInstagram className="social-icon" />
          </div>
        </div>

        <div className="profile-form fade-in">
          <h3>Edit Information</h3>

          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />

          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} />

          <label>College</label>
          <input value={college} onChange={(e) => setCollege(e.target.value)} />

          <label>Department</label>
          <input value={department} onChange={(e) => setDepartment(e.target.value)} />

          <label>Bio</label>
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} />

          <button className="primary-btn save-btn" onClick={saveProfile}>
            Save Changes
          </button>
        </div>

        {/* Danger */}
        <div className="danger-zone slide-left">
          <h3>⚠ Danger Zone</h3>
          <p>Deleting your account removes all data permanently.</p>
          <button className="delete-btn">Delete Account</button>
        </div>
      </div>

      <footer className="footer">
        © 2025 Onal Mudiyum — User Profile 
        <h1></h1>
        Created by SASIRAM V
      </footer>
    </div>
  );
}

export default Profile;
