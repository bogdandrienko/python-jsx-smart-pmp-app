import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import "../css/App.css";
import "../css/bootstrap_5.1.3/bootstrap.min.css";
import "../css/font_awesome_6_0_0/css/all.min.css";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import LogoutPage from "../pages/LogoutPage";
import ChangeProfilePage from "../pages/ChangeProfilePage";
import ChangePasswordPage from "../pages/ChangePasswordPage";
import RecoverPasswordPage from "../pages/RecoverPasswordPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import NewsPage from "../pages/NewsPage";
import VideoStudyPage from "../pages/VideoStudyPage";
import TextStudyPage from "../pages/TextStudyPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import SalaryPage from "../pages/SalaryPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import RationalCreatePage from "../pages/RationalCreatePage";
import RationalListPage from "../pages/RationalListPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import AdminChangeUserPasswordPage from "../pages/AdminChangeUserPasswordPage";
import TodoPage from "../pages/TodoPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import GologramPage from "../test/GologramPage";
// import UsersListPage from "../pages/UsersListPage";
// import ProfilePage from "../pages/ProfilePage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// import Home1Page from "../test/Home1Page";
// import ProductPage from "../test/ProductPage";
// import Notes1Page from "../test/Notes1Page";
// import NotesListPage from "../test/NotesListPage";
// import NotePage from "../test/NotePage";
// import Note1Page from "../test/Note1Page";
// import ChatPage from "../test/ChatPage";
// import TestPage from "../test/TestPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

function App() {
  return (
    <Router>
      <div className="container-fluid text-center m-0 p-0">
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/home" element={<HomePage />} exact />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/logout" element={<LogoutPage />} />
          <Route path="/change_profile" element={<ChangeProfilePage />} />
          <Route path="/change_password" element={<ChangePasswordPage />} />
          <Route path="/recover_password" element={<RecoverPasswordPage />} />
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////
          <Route path="/news" element={<NewsPage />} />
          <Route path="/video_study" element={<VideoStudyPage />} />
          <Route path="/text_study" element={<TextStudyPage />} />
          <Route path="/salary" element={<SalaryPage />} />
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////
          <Route path="/rational_create" element={<RationalCreatePage />} />
          <Route path="/rational_list" element={<RationalListPage />} />
          <Route
            path="/admin_change_user_password"
            element={<AdminChangeUserPasswordPage />}
          />
          <Route path="/todo" element={<TodoPage />} />
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////
          <Route path="/gologram" element={<GologramPage />} />
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////
          {/*<Route path="/users_list" element={<UsersListPage />} />*/}
          {/* <Route path="/profile" element={<ProfilePage />} /> */}
          {/*<Route path="/chat" element={<ChatPage />} />*/}
          {/*<Route path="/test" element={<TestPage />} />*/}
          {/*<Route path="/shop" element={<Home1Page />} />*/}
          {/*<Route path="/product/:id" element={<ProductPage />} />*/}
          {/*<Route path="/notes" element={<Notes1Page />} />*/}
          {/*<Route path="/notes/:id" element={<NotePage />} />*/}
          {/*<Route path="/chat_react" element={<NotesListPage />} />*/}
          {/*<Route path="/chat_react/note/:id" element={<NotePage />} />*/}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
