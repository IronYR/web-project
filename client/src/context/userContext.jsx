import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
            setReady(true); // Set ready to true even if there's no token
            return;
          }
        const response = await axios.get('/profile',
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(response.data);
      setReady(true);
    }
      catch (error) {
        console.error("Error fetching user data:", error);
      }  
      
  };

  const updateUserContext = async () => {
    await fetchUserData();
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <UserContext.Provider value={{user,setUser,ready,updateUserContext}}>
      {children}
    </UserContext.Provider>
  );
}