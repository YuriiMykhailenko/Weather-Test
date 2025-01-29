import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App';
import { Details } from './pages/details';
import { Provider } from 'react-redux';
import { store } from './store/store';

export const Root = () => {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path=":cityName" element={<Details />} />
        </Routes>
      </Router>
    </Provider>
  );
};
