import ReactDOM from 'react-dom/client';
import 'semantic-ui-css/semantic.min.css';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { StoreContext, store } from './stores/store';
import './helpers/extensions/stringExtensions';
import App from './App';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);
root.render(
    <StoreContext.Provider value={store}>
        <App/>
    </StoreContext.Provider>
);

reportWebVitals();