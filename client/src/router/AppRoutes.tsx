import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import {AnimatePresence} from 'framer-motion';
import MainPage from '../pages/main/MainPage';
import HomePage from '../pages/home/HomePage';
import ProfilePage from '../pages/profile/ProfilePage';
import { useStore } from '../stores/store';
import { useEffect } from 'react';
import { Dimmer, Loader } from 'semantic-ui-react';
import NewQuizPage from '../pages/quiz/creator/NewQuizPage';
import PublicQuizesPage from '../pages/quiz/browser/PublicQuizesPage';
import NotFoundPage from '../pages/notFound/NotFoundPage';
import UserQuizzesPage from '../pages/quiz/user-quizes/UserQuizzesPage';
import SavedQuizzesPage from '../pages/quiz/saved-quizzes/SavedQuizzesPage';
import NewSessionPage from '../pages/new-game/NewSessionPage';
import JoinSessionPage from '../pages/session/JoinSessionPage';
import LiveSessionPage from '../pages/session/LiveSessionPage';
import HostingSessionPage from '../pages/session/HostingSessionPage';

export default function AppRoutes(){
    const {userStore, commonStore} = useStore();
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        let pathname = location.pathname === '/' ? '/home' : location.pathname;
        if(pathname === '/session/join') {
            userStore.current()
                .then(() => navigate(pathname))
                .catch((error) => navigate(pathname))
                .finally(() => commonStore.setAppLoaded());
        }
        if (commonStore.token) {
            userStore.current()
                .then(() => navigate(pathname))
                .catch((error) => navigate('/'))
                .finally(() => commonStore.setAppLoaded());
        }
        else {
            commonStore.setAppLoaded();
            navigate('/');
        }
    }, [commonStore, useStore]);

    if(commonStore.loading) return <Dimmer active={true} style={{backgroundColor: 'rgba(0,0,0,0.4)'}}><Loader/></Dimmer>;
    
    return(
        <AnimatePresence mode='wait'>
            <Routes location={location} key={location.pathname}>
                <Route path='/' element={<MainPage/>}/>
                <Route path='/home' element={<HomePage/>}/>
                <Route path='/profile' element={<ProfilePage/>}/>
                <Route path='/create' element={<NewQuizPage/>}/>
                <Route path='/public' element={<PublicQuizesPage/>}/>
                <Route path='/public/:quizId' element={<PublicQuizesPage/>}/>
                <Route path='/my' element={<UserQuizzesPage/>}/>
                <Route path='/saved' element={<SavedQuizzesPage/>}/>
                <Route path='/session/new' element={<NewSessionPage/>}/>
                <Route path='/session/join' element={<JoinSessionPage/>}/>
                <Route path='/session/live' element={<LiveSessionPage/>}/>
                <Route path='/session/hosting' element={<HostingSessionPage/>}/>
                <Route path='*' element={<NotFoundPage/>}/>
            </Routes>
        </AnimatePresence>
    )
}