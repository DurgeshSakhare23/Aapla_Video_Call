import {useNavigate} from 'react-router-dom';
import React , {useEffect} from 'react';

const withAuth = (WrappedComponent) => {
    const AuthComponent = (props) => {
        const router  = useNavigate();

        const isAuthenticate = () => {
            const token = localStorage.getItem('token');
            if (!token) {
                return false;
            }
            return true;
        }
        
        useEffect(() => {
            if(!isAuthenticate()) {
                router('/auth');
            }
        }, []);

        return <WrappedComponent {...props} />;
    }
    return AuthComponent;
}

export default withAuth;