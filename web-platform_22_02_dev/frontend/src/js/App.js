import "../css/App.css";
import "../css/bootstrap_5.1.3/bootstrap.min.css";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import NewsPage from "../pages/NewsPage";
import ProfilePage from "../pages/ProfilePage";
import SalaryPage from "../pages/SalaryPage";
import VideoStudyPage from "../pages/VideoStudyPage";

// import Home1Page from "../test/Home1Page";
// import ProductPage from "../test/ProductPage";
// import Notes1Page from "../test/Notes1Page";
// import NotesListPage from "../test/NotesListPage";
// import NotePage from "../test/NotePage";
// import Note1Page from "../test/Note1Page";
// import ChatPage from "../test/ChatPage";
// import TestPage from "../test/TestPage";
// import GologramPage from "../test/GologramPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/home" element={<HomePage />} exact />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/salary" element={<SalaryPage />} />
          <Route path="/video_study" element={<VideoStudyPage />} />

          {/*<Route path="/chat" element={<ChatPage />} />*/}
          {/*<Route path="/test" element={<TestPage />} />*/}
          {/*<Route path="/gologram" element={<GologramPage />} />*/}
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
