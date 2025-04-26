import { createContext, useContext, useState, useEffect } from "react";
import supabase from "./client";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(()=> {


        const initAuth = async () => {
            try {
                const {
                    data: { session },
                    error
                } = await supabase.auth.getSession()

                if (error) throw error

                setUser(session?.user ?? null)
            } catch (err) {
                console.error(err)
                setUser(null)
            } finally {
                setLoading (false)
            }
        }

        initAuth();

        const {
          data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null)
        });

        return () => {
          subscription?.unsubscribe();
        };
        
    }, [])


    return (
        <AuthContext.Provider value={{ user, loading }} >
            {children}
        </AuthContext.Provider>
    )

}

export const useAuth = () => useContext(AuthContext);