import { Navigate, Route, Routes } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import MainLayout from './layouts/MainLayout';
import AuthPage from './pages/AuthPages';
import FeedPage from './pages/FeedPage';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';
import BookmarksPage from './pages/BookmarksPage';
import SuggestionsPage from './pages/SuggestionsPage';
import NotificationsPage from './pages/NotificationsPage';
import SettingsPage from './pages/SettingsPage';
import { Loading } from './components/Feedback';
function Protected({children}) { const {token,loading}=useAuth(); if(loading)return <Loading/>; return token?children:<Navigate to="/login" replace/>; }
export default function App() { return <Routes><Route path="/login" element={<AuthPage/>}/><Route path="/register" element={<AuthPage signup/>}/><Route element={<Protected><MainLayout/></Protected>}><Route path="/feed" element={<FeedPage/>}/><Route path="/explore" element={<FeedPage explore/>}/><Route path="/posts/:id" element={<PostPage/>}/><Route path="/profile" element={<ProfilePage/>}/><Route path="/users/:id" element={<ProfilePage/>}/><Route path="/bookmarks" element={<BookmarksPage/>}/><Route path="/suggestions" element={<SuggestionsPage/>}/><Route path="/notifications" element={<NotificationsPage/>}/><Route path="/settings" element={<SettingsPage/>}/></Route><Route path="*" element={<Navigate to="/feed" replace/>}/></Routes>; }
