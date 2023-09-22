import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthenticationContext = createContext();

export const useAuth = () => {
    return useContext(AuthenticationContext);
};

export const AuthenticationProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            fetch('https://vigilant-api-a2xyukeyka-uc.a.run.app/me', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => response.json())
            .then(data => setCurrentUser(data))
            .catch(error => console.error("Erro ao validar o token", error));
        }
    }, []);

    const login = async (username, password) => {
        try {
            const response = await fetch('https://vigilant-api-a2xyukeyka-uc.a.run.app/authentication/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                console.log(data.Message);
                localStorage.setItem('token', data.token);
                setCurrentUser(data.fullName);
            } else {
                const data = await response.json();
                console.error(data.Message);
                throw new Error('Falha ao autenticar');
            }
        } catch (error) {
            console.error("Erro ao fazer login", error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            localStorage.removeItem('token');
            setCurrentUser(null);
        } catch (error) {
            console.error("Erro ao fazer logout", error);
            throw error;
        }
    };


    const register = async (username, password, fullName) => {
        try {
            const response = await fetch('https://vigilant-api-a2xyukeyka-uc.a.run.app/authentication/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, fullName }),
            });
    
            if (response.ok) {
                console.log("Registro bem-sucedido!");
                setCurrentUser(username); 
            } else {
                const data = await response.json();
                console.error(data);
                throw new Error('Falha ao registrar');
            }
        } catch (error) {
            console.error("Erro ao registrar", error);
            throw error;
        }
    };
    
    

    const value = {
        currentUser,
        login,
        logout,
        register,
    };

    return (
        <AuthenticationContext.Provider value={value}>
            {children}
        </AuthenticationContext.Provider>
    );
};
