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
            fetch('https://vigilant-api-a2xyukeyka-uc.a.run.app/Account/me', {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => {
                if (!response.ok && response.status === 401) {
                    console.error("Token inválido ou expirado");
                    localStorage.removeItem('token');
                } else {
                    return response.json();
                }
            })
            .then(data => setCurrentUser({ fullName: data.fullName, token }))
            .catch(error => console.error("Erro ao validar o token", error));
        }
    }, []);
    
    const login = async (username, password) => {
        try {
            const response = await fetch('https://vigilant-api-a2xyukeyka-uc.a.run.app/Account/Login', {
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
                setCurrentUser({ fullName: data.fullName, token: data.token });
            } else {
                const data = await response.json();
                console.error(data.message);
                throw new Error(data.message);
            }
        } catch (error) {
            console.error("Erro ao fazer login", error);
            throw error;
        }
    };

    const adminLogin = async (username, password) => {
        try {
            const response = await fetch('https://vigilant-api-a2xyukeyka-uc.a.run.app/Account/AdminLogin', {
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
                setCurrentUser({ fullName: data.fullName, token: data.token, isAdmin: true });
            } else {
                const data = await response.json();
                console.error(data.message);
                throw new Error(data.message);
            }
        } catch (error) {
            console.error("Erro ao fazer login como administrador", error);
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
            const response = await fetch('https://vigilant-api-a2xyukeyka-uc.a.run.app/Account/Register', {
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
                console.error(data.errors);
                throw data.errors;
            }
        } catch (error) {
            console.error("Erro ao registrar", error);
            throw error;
        }
    };
    
    
    

    const value = {
        currentUser,
        login,
        adminLogin,
        logout,
        register,
    };

    return (
        <AuthenticationContext.Provider value={value}>
            {children}
        </AuthenticationContext.Provider>
    );
};
