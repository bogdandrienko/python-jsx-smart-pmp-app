"use strict";
// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
// TODO export /////////////////////////////////////////////////////////////////////////////////////////////////////////
var AuthContext = (0, react_1.createContext)(null);
exports.default = AuthContext;
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
