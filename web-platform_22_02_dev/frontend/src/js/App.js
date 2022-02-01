import "../css/App.css";
import "../css/bootstrap_5.1.3/bootstrap.min.css";

import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import ProfilePage from "../pages/ProfilePage";
import SalaryPage from "../pages/SalaryPage";
import VideoStudyPage from "../pages/VideoStudyPage";

import HomeScreen from "../screens/HomeScreen";
import ProductScreen from "../screens/ProductScreen";
import NotesScreen from "../screens/NotesScreen";
import NoteScreen from "../screens/NoteScreen";

import NotesListPage from "../pages/NotesListPage";
import NotePage from "../pages/NotePage";
import ChatPage from "../pages/ChatPage";
import TestPage from "../pages/TestPage";
import GologramPage from "../pages/GologramPage";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container-fluid">
        <Routes>
          <Route path="/" element={<HomePage />} exact />
          <Route path="/home" element={<HomePage />} exact />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/salary/" element={<SalaryPage />} />
          <Route path="/video_study/" element={<VideoStudyPage />} />

          <Route path="/shop" element={<HomeScreen />} exact />
          <Route path="/product/:id" element={<ProductScreen />} />

          <Route path="/notes" element={<NotesScreen />} />
          <Route path="/notes/:id" element={<NoteScreen />} />

          <Route path="/chat_react" element={<NotesListPage />} />
          <Route path="/chat_react/note/:id" element={<NotePage />} />

          <Route path="/chat" element={<ChatPage />} />

          <Route path="/test" element={<TestPage />} />

          <Route path="/gologram" element={<GologramPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
