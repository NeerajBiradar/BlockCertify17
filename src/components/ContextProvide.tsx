import { createContext, useState, ReactNode, FC, useEffect } from 'react';
import axios from 'axios';

type ContextProps = {
  loggedIn: boolean;
  setLoggedIn: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  institute: any;
  setInstitute: React.Dispatch<React.SetStateAction<any>>;
};

export const Context12 = createContext<ContextProps | undefined>(undefined);

export const ContextProvide: FC<{ children: ReactNode }> = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [institute,setInstitute] = useState("");
  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await axios.get('https://blockcertifybackend.onrender.com/api/verify-token', {
            headers: { Authorization: token },
          });

          if (response.status === 200) {
            setInstitute(response.data.user.userId.institute)
            setLoggedIn(true);
          } else {
            localStorage.removeItem('token');
            setLoggedIn(false);
          }
        } catch (error) {
          if (axios.isAxiosError(error)) {
            console.error("Token verification failed:", error.message);
            localStorage.removeItem('token');
            setLoggedIn(false);
          } else {
            console.error("An unexpected error occurred:", error);
          }
        }
      }
      setLoading(false);
    };

    verifyToken();
  }, [loggedIn]);

  return (
    <Context12.Provider value={{ loggedIn, setLoggedIn, loading, setLoading, user, setUser, institute, setInstitute}}>
      {children}
    </Context12.Provider>
  );
};
