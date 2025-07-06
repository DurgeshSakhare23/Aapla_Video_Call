import React, { useEffect, useState } from 'react';
import "../App.css";
import { Link, useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const router = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in (assumes token is stored in localStorage)
    const token = localStorage.getItem("token"); // change key if needed
    setIsLoggedIn(!!token);
  }, []);

  return (
    <div className='landingPageContainer'>
      <nav>
        <div className='navHeader'>
          <h2>Aapla Video Call</h2>
        </div>

        <div className='navlist'>
          <p onClick={() => router("/aljk23")}>Join as Guest</p>

          {!isLoggedIn && (
            <>
              <p onClick={() => router("/auth")}>Register</p>
              <div onClick={() => router("/auth")} role='button'>
                <p>Login</p>
              </div>
            </>
          )}
        </div>
      </nav>

      <div className="landingMainContainer">
        <div>
          <h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved Ones</h1>
          <p>Cover a distance by Aapla Video Call</p>
          <div role='button'>
            <Link to={isLoggedIn ? "/home" : "/auth"}>Get Started</Link>
          </div>
        </div>

        <div>
          <img src="/Mobile.jpg" alt="Video Call Preview" style={{ width: "25vw", height: "auto" }} />
        </div>
      </div>
    </div>
  );
}
