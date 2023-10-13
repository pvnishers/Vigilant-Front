import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthenticationContext';
import logo from '../../images/vigilant-logo-blue-white-cut.png';

function RegisterComponent() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errors, setErrors] = useState(null);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(username, password, confirmPassword, fullName);
            navigate('/login');
        } catch (error) {
            console.error(error);
            setErrors(error);
        }
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="container-fluid background-color pt-5">
            <img className='mx-auto d-block mb-5' src={logo} alt="Your App" width="200" />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card">
                        <div className="card-body">
                            <h3 className="card-title">Register</h3>
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label htmlFor="fullName" className="form-label">Full Name</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="fullName" 
                                        value={fullName} 
                                        onChange={(e) => setFullName(e.target.value)} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="username" className="form-label">Username</label>
                                    <input 
                                        type="text" 
                                        className="form-control" 
                                        id="username" 
                                        value={username} 
                                        onChange={(e) => setUsername(e.target.value)} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="password" 
                                        value={password} 
                                        onChange={(e) => setPassword(e.target.value)} 
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input 
                                        type="password" 
                                        className="form-control" 
                                        id="confirmPassword" 
                                        value={confirmPassword} 
                                        onChange={(e) => setConfirmPassword(e.target.value)} 
                                    />
                                </div>
                                {errors && (
                                    <div className="alert alert-danger px-4">
                                        <ul>
                                            {errors.message && <li>{errors.message}</li>}
                                            {errors.errors && (
                                                Array.isArray(errors.errors)
                                                    ? errors.errors.map((error, index) => <li key={index}>{error}</li>)
                                                    : Object.values(errors.errors).map((error, index) => <li key={index}>{error}</li>)
                                            )}
                                        </ul>
                                    </div>
                                )}
                                <button type="submit" className="btn btn-primary mx-auto d-block">Register</button>
                            </form>
                        </div>
                    </div>
                    <div className='register-sec text-center my-5'>
                        <p>Already have an account? Login now</p>
                        <button type="button" className="btn btn-secondary" onClick={handleLogin}>Login</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default RegisterComponent;
