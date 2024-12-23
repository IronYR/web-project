import {createContext, useEffect, useState} from "react";
import axios from "axios";

export const UserContext = createContext({});

export function UserContextProvider({children}) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('/profile');
      setUser(response.data);
      setReady(true);
    } catch (error) {
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