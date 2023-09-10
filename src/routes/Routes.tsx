import { Route, Routes } from 'react-router-dom';
import HomePage from 'pages/HomePage/HomePage.tsx';
import CharacterDetailsPage from 'pages/CharacterDetailsPage/CharacterDetailsPage.tsx';
import Page404 from 'pages/Page404/Page404.tsx';

export const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/"
        element={<HomePage/>}
      />
      <Route path="/character/:id"
        element={<CharacterDetailsPage/>}
      />
      <Route path="*"
        element={<Page404/>}
      />
    </Routes>
  )
}
