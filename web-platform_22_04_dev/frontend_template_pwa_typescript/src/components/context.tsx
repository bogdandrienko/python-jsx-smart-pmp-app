// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////

import React, { createContext } from "react";

// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////

const AuthContext = createContext(null);

export default AuthContext;

// function App() {
//   const [isAuth, setIsAuth] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   useEffect(() => {
//     if (localStorage.getItem("auth")) {
//       setIsAuth(true);
//     }
//     setIsLoading(false);
//   });
//   if (isLoading) {
//     return <h5>Download...</h5>;
//   }
//   return (
//     <AuthContext.Provider value={{ isAuth, setIsAuth: setIsAuth, isLoading }}>
//       <BrowserRouter>
//         <Routers {...isAuth} />
//       </BrowserRouter>
//     </AuthContext.Provider>
//   );
// }
