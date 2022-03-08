import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import "../css/App.css";
import "../css/bootstrap_5.1.3/bootstrap.min.css";
import "../css/font_awesome_6_0_0/css/all.min.css";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import HomePage from "../pages/base/HomePage";
import LoginPage from "../pages/user/LoginPage";
import LogoutPage from "../pages/user/LogoutPage";
import ChangeProfilePage from "../pages/user/ChangeProfilePage";
import ChangePasswordPage from "../pages/user/ChangePasswordPage";
import RecoverPasswordPage from "../pages/user/RecoverPasswordPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import NewsPage from "../pages/base/NewsPage";
import VideoStudyPage from "../pages/base/VideoStudyPage";
import TextStudyPage from "../pages/base/TextStudyPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import SalaryPage from "../pages/salary/SalaryPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import AdminChangeUserPasswordPage from "../pages/admin/AdminChangeUserPasswordPage";
import AdminCreateOrChangeUsersPage from "../pages/admin/AdminCreateOrChangeUsersPage";
import AdminExportUsersPage from "../pages/admin/AdminExportUsersPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import RationalCreatePage from "../pages/rational/RationalCreatePage";
import RationalListPage from "../pages/rational/RationalListPage";
import RationalDetailPage from "../pages/rational/RationalDetailPage";
import VacancyListPage from "../pages/vacancy/VacancyListPage";
import VacancyCreatePage from "../pages/vacancy/VacancyCreatePage";
import VacancyChangePage from "../pages/vacancy/VacancyChangePage";
import VacancyDetailPage from "../pages/vacancy/VacancyDetailPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import ResumeListPage from "../pages/resume/ResumeListPage";
import ResumeCreatePage from "../pages/resume/ResumeCreatePage";
import ResumeDetailPage from "../pages/resume/ResumeDetailPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import IdeaCreatePage from "../pages/idea/IdeaCreatePage";
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
          <Route path="/vacancy_list" element={<VacancyListPage />} />
          <Route path="/vacancy_detail/:id" element={<VacancyDetailPage />} />
          <Route path="/vacancy_create" element={<VacancyCreatePage />} />
          <Route path="/vacancy_change/:id" element={<VacancyChangePage />} />
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////
          <Route path="/resume_create/:id" element={<ResumeCreatePage />} />
          <Route path="/resume_list" element={<ResumeListPage />} />
          <Route path="/resume_detail/:id" element={<ResumeDetailPage />} />
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////
          <Route path="/idea_create" element={<IdeaCreatePage />} />
          //////////////////////////////////////////////////////////////////////////////////////////////////////////////
        </Routes>
      </div>
    </Router>
  );
}

export default App;
