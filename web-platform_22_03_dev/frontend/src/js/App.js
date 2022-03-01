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
import AdminChangeUserPasswordPage from "../pages/AdminChangeUserPasswordPage";
import AdminCreateOrChangeUsersPage from "../pages/AdminCreateOrChangeUsersPage";
import AdminExportUsersPage from "../pages/AdminExportUsersPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import RationalCreatePage from "../pages/RationalCreatePage";
import RationalListPage from "../pages/RationalListPage";
import RationalDetailPage from "../pages/RationalDetailPage";
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
          <Route
            path="/admin_change_user_password"
            element={<AdminChangeUserPasswordPage />}
          />
          <Route
            path="/admin_create_or_change_users"
            element={<AdminCreateOrChangeUsersPage />}
          />
          <Route
            path="/admin_export_users"
            element={<AdminExportUsersPage />}
          />
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////
          <Route path="/news" element={<NewsPage />} />
          <Route path="/video_study" element={<VideoStudyPage />} />
          <Route path="/text_study" element={<TextStudyPage />} />
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////
          <Route path="/salary" element={<SalaryPage />} />
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////
          <Route path="/rational_create" element={<RationalCreatePage />} />
          <Route path="/rational_list" element={<RationalListPage />} />
          <Route path="/rational_detail/:id" element={<RationalDetailPage />} />
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        </Routes>
      </div>
    </Router>
  );
}

export default App;
