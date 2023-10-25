import { observer } from "mobx-react-lite";
import { Dimmer, Grid, Loader, Segment } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import './HomePage.css';
import { useState } from "react";

const kafles = {
    1: {
        //edycja profilu
        url: require("../../assets/profile.png"),
        text: 'Your profile',
        route: '/profile'
     },
    2: {
        //utworzenie quizu
        url: require("../../assets/edit.png"),
        text: 'Create a quiz',
        route: '/create'
    },
    3: {
        //utworzone quizy
        url: require("../../assets/database-management-yellow.png"),
        text: 'Your quizes',
        route: '/my'
    },
    4: {
        //dołacz do gry
        url: require("../../assets/trophy.png"),
        text: 'Join the game',
        route: '/session/join'
    },
    5: {
        //przeglądaj publiczne
        url: require("../../assets/globe.png"),
        text: 'Browse public quizes',
        route: '/public'
    },
    6: {
        //Zapisane
        url: require("../../assets/diskette.png"),
        text: 'Saved quizes',
        route: '/saved'
    },
    7: {
        //nowa gra
        url: require("../../assets/play-button.png"),
        text: 'Start new game',
        route: '/session/new'
    },
    8: {
        //przeprowadzone
        url: require("../../assets/laptop.png"),
        text: 'Carried out games',
        route: 'profile'
    }
}

type ImagesLoadingObject = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean]

export default observer(function HomePage() {
    const { userStore } = useStore();
    const navigate = useNavigate();
    const [loadingImages, setLoadingImages] = useState<ImagesLoadingObject>([true, true, true, true, true, true, true, true]);

    return (
        <motion.div initial={{ marginTop: '100%' }} animate={{ marginTop: 0, transition: { duration: 0.6 } }} exit={{ marginTop: '100%', transition: { duration: 0.6 } }}>
            <Segment className="menu-cont">
                <Segment className="welcome">
                    <img src={userStore.user?.profileImageUrl} className="profile-photo-home" alt="user-profile" />
                    <div> Welcome back,<br/>{userStore.user?.username}</div>
                </Segment>
                <Grid className="home-grid">
                    {Object.values(kafles).map((entry, index) => (
                        <Grid.Column className="home-column kafel" key={index}>
                            <Segment className="kurła" onClick={() => navigate(entry.route)}>
                                <Dimmer active={loadingImages[index]} style={{ backgroundColor: 'rgba(0,0,0,0.4)', display: loadingImages[index] ? "block" : "none" }}>
                                    <Loader />
                                </Dimmer>
                                <img
                                    src={entry.url}
                                    alt="profile"
                                    className="kafel-photo"
                                    style={{ display: !loadingImages[index] ? "block" : "none" }}
                                    onLoad={() => setLoadingImages(loadingImages => [...loadingImages.slice(0, index), false, ...loadingImages.slice(index + 1)] as ImagesLoadingObject)}
                                />
                                <h2 style={{ display: !loadingImages[index] ? "block" : "none" }}>{entry.text}</h2>
                            </Segment>
                        </Grid.Column>
                    ))}
                </Grid>
            </Segment>
        </motion.div>
    );
});