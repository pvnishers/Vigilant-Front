import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthenticationContext = createContext();

export const useAuth = () => {
    return useContext(AuthenticationContext);
};

export const AuthenticationProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const savedUser = JSON.parse(localStorage.getItem('currentUser'));
        if (savedUser) {
            setCurrentUser(savedUser);
        }
        setLoading(false);
    }, []);

    const login = async (username, password) => {
        try {
            const response = await fetch('https://vigilant-api-a2xyukeyka-uc.a.run.app/Account/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const data = await response.json();
                console.log(data.Message);
                const user = { fullName: data.name };
                setCurrentUser(user);
                localStorage.setItem('currentUser', JSON.stringify(user));
                console.log(currentUser);
              } else {
                console.error();
                throw new Error("Invalid credentials");
            }
        } catch (error) {
            console.error(error);
            throw error;
        }
    };

    const logout = async () => {
        try {
            setCurrentUser(null);
            localStorage.removeItem('currentUser');
        } catch (error) {
            throw error;
        }
    };


    const register = async (username, password, confirmPassword, fullName) => {
      try {
          const response = await fetch('https://vigilant-api-a2xyukeyka-uc.a.run.app/Account/Register', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({ username, password, confirmPassword, fullName }),
          });
      
          const data = await response.json();
      
          if (response.ok) {
              console.log(data.message);
          } else {
              console.error(data.message);
              throw data;
          }
      } catch (error) {
          console.error(error);
          throw error;
      }
  };

  const value = {
      currentUser,
      login,
      logout,
      register,
      loading,
  };

  return (
      <AuthenticationContext.Provider value={value}>
          {children}
      </AuthenticationContext.Provider>
  );
};
