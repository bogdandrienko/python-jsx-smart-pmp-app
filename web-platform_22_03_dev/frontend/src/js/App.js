///////////////////////////////////////////////////////////////////////////////////////////////////TODO download modules
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
/////////////////////////////////////////////////////////////////////////////////////////////////////TODO custom modules
import "../css/App.css";
import "../css/bootstrap_5.1.3/bootstrap.min.css";
import "../css/font_awesome_6_0_0/css/all.min.css";
/////////////////////////////////////////////////////////////////////////////////////////////TODO default exported pages
import { HomePage } from "../pages/base/HomePage";
import { VideoStudyPage } from "../pages/study/VideoStudyPage";
import { TextStudyPage } from "../pages/study/TextStudyPage";
import { NewsPage } from "../pages/base/NewsPage";
import { NotificationListPage } from "../pages/base/NotificationListPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { LoginPage } from "../pages/user/LoginPage";
import { LogoutPage } from "../pages/user/LogoutPage";
import { ChangeProfilePage } from "../pages/user/ChangeProfilePage";
import { ChangePasswordPage } from "../pages/user/ChangePasswordPage";
import { RecoverPasswordPage } from "../pages/user/RecoverPasswordPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { SalaryPage } from "../pages/salary/SalaryPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { AdminChangeUserPasswordPage } from "../pages/admin/AdminChangeUserPasswordPage";
import { AdminCreateOrChangeUsersPage } from "../pages/admin/AdminCreateOrChangeUsersPage";
import { AdminExportUsersPage } from "../pages/admin/AdminExportUsersPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { RationalTemplatePage } from "../pages/rational/RationalTemplatePage";
import { RationalCreatePage } from "../pages/rational/RationalCreatePage";
import { RationalModerateListPage } from "../pages/rational/RationalModerateListPage";
import { RationalModerateDetailPage } from "../pages/rational/RationalModerateDetailPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { IdeaTemplatePage } from "../pages/idea/IdeaTemplatePage";
import { IdeaCreatePage } from "../pages/idea/IdeaCreatePage";
import { IdeaListPage } from "../pages/idea/IdeaListPage";
import { IdeaDetailPage } from "../pages/idea/IdeaDetailPage";
import { IdeaModerateListPage } from "../pages/idea/IdeaModerateListPage";
import { IdeaModerateChangePage } from "../pages/idea/IdeaModerateChangePage";
import { IdeaSelfListPage } from "../pages/idea/IdeaSelfListPage";
import { IdeaChangePage } from "../pages/idea/IdeaChangePage";
import { IdeaRatingListPage } from "../pages/idea/IdeaRatingListPage";
import { IdeaAuthorListPage } from "../pages/idea/IdeaAuthorListPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { VacancyListPage } from "../pages/vacancy/VacancyListPage";
import { VacancyCreatePage } from "../pages/vacancy/VacancyCreatePage";
import { VacancyChangePage } from "../pages/vacancy/VacancyChangePage";
import { VacancyDetailPage } from "../pages/vacancy/VacancyDetailPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { ResumeListPage } from "../pages/resume/ResumeListPage";
import { ResumeCreatePage } from "../pages/resume/ResumeCreatePage";
import { ResumeDetailPage } from "../pages/resume/ResumeDetailPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { TerminalRebootPage } from "../pages/terminal/TerminalRebootPage";
//////////////////////////////////////////////////////////////////////////////////////////TODO default export const page
export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/change_profile" element={<ChangeProfilePage />} />
        <Route path="/change_password" element={<ChangePasswordPage />} />
        <Route path="/recover_password" element={<RecoverPasswordPage />} />

        <Route path="/notification_list" element={<NotificationListPage />} />

        <Route
          path="/admin_change_user_password"
          element={<AdminChangeUserPasswordPage />}
        />
        <Route
          path="/admin_create_or_change_users"
          element={<AdminCreateOrChangeUsersPage />}
        />
        <Route path="/admin_export_users" element={<AdminExportUsersPage />} />

        <Route path="/news" element={<NewsPage />} />
        <Route path="/video_study" element={<VideoStudyPage />} />
        <Route path="/text_study" element={<TextStudyPage />} />

        <Route path="/salary" element={<SalaryPage />} />

        <Route path="/rational_template" element={<RationalTemplatePage />} />
        <Route path="/rational_create" element={<RationalCreatePage />} />
        <Route
          path="/rational_moderate_list"
          element={<RationalModerateListPage />}
        />
        <Route
          path="/rational_moderate_detail/:id"
          element={<RationalModerateDetailPage />}
        />

        <Route path="/idea_template" element={<IdeaTemplatePage />} />
        <Route path="/idea_create" element={<IdeaCreatePage />} />
        <Route path="/idea_list" element={<IdeaListPage />} />
        <Route path="/idea_detail/:id" element={<IdeaDetailPage />} />
        <Route path="/idea_moderate_list" element={<IdeaModerateListPage />} />
        <Route
          path="/idea_moderate_change/:id"
          element={<IdeaModerateChangePage />}
        />
        <Route path="/idea_self_list" element={<IdeaSelfListPage />} />
        <Route path="/idea_change/:id" element={<IdeaChangePage />} />
        <Route path="/idea_rating" element={<IdeaRatingListPage />} />
        <Route path="/idea_author_list" element={<IdeaAuthorListPage />} />

        <Route path="/vacancy_list" element={<VacancyListPage />} />
        <Route path="/vacancy_detail/:id" element={<VacancyDetailPage />} />
        <Route path="/vacancy_create" element={<VacancyCreatePage />} />
        <Route path="/vacancy_change/:id" element={<VacancyChangePage />} />

        <Route path="/resume_create/:id" element={<ResumeCreatePage />} />
        <Route path="/resume_list" element={<ResumeListPage />} />
        <Route path="/resume_detail/:id" element={<ResumeDetailPage />} />

        <Route path="/terminal" element={<TerminalRebootPage />} />
      </Routes>
    </Router>
  );
};
