import { Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Search from './pages/search';
import Favorites from './pages/favorites';
import Album from './pages/album';
import Layout from './components/Layout';
import Profile from './pages/profile';
import NotFound from './components/NotFound';
import ProfileEdit from './pages/profileEdit';

function App() {
  return (
    <Routes>
      <Route index element={ <Login /> } />
      <Route path="/" element={ <Layout /> }>
        <Route path="/search" element={ <Search /> } />
        <Route path="/album/:id" element={ <Album /> } />
        <Route path="/favorites" element={ <Favorites /> } />
        <Route path="/profile" element={ <Profile /> } />
        <Route path="/profile/edit" element={ <ProfileEdit /> } />
      </Route>
      <Route path="/*" element={ <NotFound /> } />
    </Routes>
  );
}

export default App;
