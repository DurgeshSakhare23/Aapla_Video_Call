import React, { createContext} from 'react';
import axios from 'axios';

export const AuthContext = createContext({});


const client = axios.create({
  baseURL: "http://localhost:8080/api/v1/users",
})




// You should implement handleLogin and handleRegister in your AuthProvider and wrap your app with it.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AuthProvider = ({children}) =>{

  const [userData, setUserData] = useState(null);

  const router = useNavigate();

  const handleRegister = async (name, username, password) => {
    try {
      const request = await client.post('/register', {
        name, username, password
      });
      if(request.status === 201) {
        setUserData(request.data);
        router('/auth');
        return "Registration successful";
      }
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  };

  const handleLogin = async (username, password) => {
    try {
      const request = await client.post('/login', {
        username, password
      });
      if(request.status === 200) {  
        localStorage.setItem('token', request.data.token);
        localStorage.setItem('user', JSON.stringify(request.data.user));
        setUserData(request.data);
        router('/home');
        return "Login successful";
      }
    } catch (error) {
      console.error("Login failed:", error);
      if(error.response && error.response.status === 401) {
        return "Invalid username or password";
      }
      throw error;
    }
  };

  const getHistoryOfUser = async () =>{
    
    try{
      let request = await client.post("/get_all_activities", {
        
          token: localStorage.getItem('token')
        
      });
      return request.data;

    } catch(e){
      throw e;
    }

  }

  const addToUserhistory = async(meetingCode) => {
    try{
      let request = await client.post("/add_to_activity", {
        meetingCode: meetingCode,
        token: localStorage.getItem('token')
      });
      return request.data;
    } catch(e){
      throw e;
    }
  }

  const data = {
    userData, setUserData, handleLogin, handleRegister, getHistoryOfUser,
    addToUserhistory
  }

  return (
    <AuthContext.Provider value={data}>
      {children}
    </AuthContext.Provider>
  );

};
