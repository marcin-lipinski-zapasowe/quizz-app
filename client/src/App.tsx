import { observer } from 'mobx-react-lite';
import { BrowserRouter as Router } from 'react-router-dom';
import ModalContainer from '../src/common/ModelConteiner'
import AppRoutes from './router/AppRoutes';
import DialogFooter from './common/dialogFooter/DialogFooter';
import StickyHeader from './common/stickyHeader/StickyHeader';

export default observer(function App() {
    return (
        <Router>
            <ModalContainer/>
            <StickyHeader/>
            <AppRoutes/>
            <DialogFooter/>
        </Router>
    );
})