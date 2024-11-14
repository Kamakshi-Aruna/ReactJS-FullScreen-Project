import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import screenfull from 'screenfull';
import './Navbar.css';

function Navbar() {
  const [usersData, setUsersData] = useState([]);
  const [fullScreenMode, setFullScreenMode] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const response = await axios.get('https://randomuser.me/api/?results=6');
        const users = response.data.results.map((user, index) => ({
          id: user.login.uuid,
          name: `${user.name.first} ${user.name.last}`,
          avatar: user.picture.large,
          score: 52375,
          number: index + 1,
          email: user.email,
        }));
        setUsersData(users);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUsersData();
  }, []);

  const toggleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(containerRef.current);
      setFullScreenMode(!fullScreenMode);
    }
  };

  if (usersData.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div ref={containerRef} className={`navbar ${fullScreenMode ? 'full-screen' : ''}`}>
      <button className="fullscreen-toggle" onClick={toggleFullScreen}>
        {fullScreenMode ? (
          <i className="fas fa-compress" /> 
        ) : (
          <i className="fas fa-expand" /> 
        )}
      </button>
      {usersData.map((user) => (
        <div 
          key={user.id} 
          className={`profile ${fullScreenMode ? 'profile-fullscreen' : ''}`}
          style={{ width: fullScreenMode ? '90%' : '700px' }} 
        >
          <div className="number">{user.number}</div>
          <div className="avatar">
            <img src={user.avatar} alt="User Avatar" />
          </div>
          <div className="info">
            <div className="name">{user.name}</div>
            <div className="email">{user.email}</div>
          </div>
          <div className="score">&pound; {user.score.toLocaleString()}</div>
        </div>
      ))}
    </div>
  );
}

export default Navbar;

