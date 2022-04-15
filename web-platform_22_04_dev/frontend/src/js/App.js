// TODO download modules ///////////////////////////////////////////////////////////////////////////////////////////////
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// TODO custom modules /////////////////////////////////////////////////////////////////////////////////////////////////
import "../css/App.css";
import "../css/bootstrap_5.1.3/bootstrap.min.css";
import "../css/font_awesome_6_0_0/css/all.min.css";
import "../css/font_zen/style.css";
// TODO default exported pages /////////////////////////////////////////////////////////////////////////////////////////
import { TestPage } from "../test/pages/TestPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { ActionsUserPage } from "../pages/6_moderator/ActionsUserPage";
import { CreateOrChangeUsersPage } from "../pages/6_moderator/CreateOrChangeUsersPage";
import { ExportUsersPage } from "../pages/6_moderator/ExportUsersPage";
import { TerminalRebootPage } from "../pages/6_moderator/TerminalRebootPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { ChangePasswordPage } from "../pages/1_profile/ChangePasswordPage";
import { ChangeProfilePage } from "../pages/1_profile/ChangeProfilePage";
import { LoginPage } from "../pages/1_profile/LoginPage";
import { LogoutPage } from "../pages/1_profile/LogoutPage";
import { NotificationListPage } from "../pages/1_profile/NotificationListPage";
import { RecoverPasswordPage } from "../pages/1_profile/RecoverPasswordPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { HomePage } from "../pages/2_main/HomePage";
import { NewsPage } from "../pages/2_main/NewsPage";
import { TextStudyPage } from "../pages/2_main/TextStudyPage";
import { VideoStudyPage } from "../pages/2_main/VideoStudyPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { RatingsListPage } from "../pages/2_main/RatingsListPage";
import { IdeaChangePage } from "../pages/3_progress/IdeaChangePage";
import { IdeaCreatePage } from "../pages/3_progress/IdeaCreatePage";
import { IdeaDetailPage } from "../pages/3_progress/IdeaDetailPage";
import { IdeaListPage } from "../pages/3_progress/IdeaListPage";
import { IdeaModerateChangePage } from "../pages/3_progress/IdeaModerateChangePage";
import { IdeaModerateListPage } from "../pages/3_progress/IdeaModerateListPage";
import { IdeaRatingListPage } from "../pages/3_progress/IdeaRatingListPage";
import { IdeaSelfListPage } from "../pages/3_progress/IdeaSelfListPage";
import { IdeaTemplatePage } from "../pages/3_progress/IdeaTemplatePage";
import { RationalCreatePage } from "../pages/3_progress/RationalCreatePage";
import { RationalModerateChangePage } from "../pages/3_progress/RationalModerateChangePage";
import { RationalModerateListPage } from "../pages/3_progress/RationalModerateListPage";
import { RationalTemplatePage } from "../pages/3_progress/RationalTemplatePage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { SalaryPage } from "../pages/4_buhgalteria/SalaryPage";
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
import { VacationPage } from "../pages/5_sup/VacationPage";
// TODO default export const page //////////////////////////////////////////////////////////////////////////////////////
export const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/test" element={<TestPage />} />

        <Route path="/admin_actions_user" element={<ActionsUserPage />} />
        <Route
          path="/admin_create_or_change_users"
          element={<CreateOrChangeUsersPage />}
        />
        <Route path="/admin_export_users" element={<ExportUsersPage />} />
        <Route path="/terminal" element={<TerminalRebootPage />} />

        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route path="/change_profile" element={<ChangeProfilePage />} />
        <Route path="/change_password" element={<ChangePasswordPage />} />
        <Route path="/recover_password" element={<RecoverPasswordPage />} />
        <Route path="/notification_list" element={<NotificationListPage />} />

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
        <Route path="/idea_author_list" element={<RatingsListPage />} />
        <Route path="/rational_template" element={<RationalTemplatePage />} />
        <Route path="/rational_create" element={<RationalCreatePage />} />
        <Route
          path="/rational_moderate_change/:id"
          element={<RationalModerateChangePage />}
        />
        <Route
          path="/rational_moderate_list"
          element={<RationalModerateListPage />}
        />
        <Route path="/" element={<HomePage />} exact />
        <Route path="/home" element={<HomePage />} />
        <Route path="/news" element={<NewsPage />} />
        <Route path="/text_study" element={<TextStudyPage />} />
        <Route path="/video_study" element={<VideoStudyPage />} />

        <Route path="/vacation" element={<VacationPage />} />

        <Route path="/salary" element={<SalaryPage />} />
      </Routes>
    </Router>
  );
};
