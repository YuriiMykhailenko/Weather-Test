import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';

import { DetailsPage } from './pages/DetailsPage';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { HomePage } from './pages/HomePage';

export const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<HomePage />} />
            <Route path=":cityName" element={<DetailsPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};
