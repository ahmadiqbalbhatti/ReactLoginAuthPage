import React, {useContext} from 'react';

import Login from './components/Login/Login';
import Home from './components/Home/Home';
import MainHeader from './components/MainHeader/MainHeader';
import AuthContext from "./context/auth-context";

function App() {
    // const [isLoggedIn, setIsLoggedIn] = useState(false);
    //
    // useEffect(key => {
    //     const localStorageUserInformation = localStorage.getItem('isLoggedIn');
    //
    //     if (localStorageUserInformation === '1') {
    //         setIsLoggedIn(true);
    //     }
    //
    // }, [isLoggedIn])
    //
    // const loginHandler = (email, password) => {
    //     // We should of course check email and password
    //     // But it's just a dummy/ demo anyway
    //     setIsLoggedIn(true);
    // };
    //
    // const logoutHandler = () => {
    //     setIsLoggedIn(false);
    // };

    const context = useContext(AuthContext);
    return (
        // <AuthContext.Provider value={{
        //     isLoggedIn: isLoggedIn,
        //     onLogout: logoutHandler,
        // }}>
        <React.Fragment>
            <MainHeader/>
            {/*<MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler}/>*/}
            <main>
                {!context.isLoggedIn && <Login/>}
                {context.isLoggedIn && <Home/>}
            </main>
        </React.Fragment>
        // </AuthContext.Provider>
    );
}

export default App;
