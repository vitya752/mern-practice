import {useState, useCallback, useEffect} from 'react';

const storageName = 'userData';

export const useAuth = () => {

    const [token, setToken] = useState(null);
    const [userId, setUserId] = useState(null);
    const [ready, setReady] = useState(false);

    const login = useCallback((jwtToken, id, date) => {
        setToken(jwtToken);
        setUserId(id);

        localStorage.setItem(storageName, JSON.stringify({
            userId: id, token: jwtToken, date: date || Date.now()
        }));

    }, []);

    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);

        localStorage.removeItem(storageName);
    }, []);

    const getToken = useCallback(() => {
        const data = JSON.parse(localStorage.getItem(storageName));

        return data.token;

    }, []);

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(storageName));
        const timeNow = Date.now();
        if(data && data.date) {
            const difference = timeNow - data.date;
            console.log(difference);
            const hour = 60 * 60 * 1000;
            if(!(difference > hour)) {
                if(data.token) {
                    login(data.token, data.userId, data.date);
                }
            } else {
                logout();
            }
        }
        setReady(true);
    }, [login, logout]);

    return {
        login,
        logout,
        token,
        userId,
        ready,
        getToken
    }

};