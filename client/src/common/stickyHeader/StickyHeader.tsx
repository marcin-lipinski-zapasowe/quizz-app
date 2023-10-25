import { observer } from "mobx-react-lite";
import { Button, Segment } from "semantic-ui-react";
import { useStore } from "../../stores/store";
import { useNavigate } from "react-router-dom";
import './StickyHeader.css'

export default observer(function StickyHeader() {
    const {userStore} = useStore();
    const navigate = useNavigate();

    return(
        <Segment className={userStore.isLoggedIn ? "sticky-header" : "sticky-header hidden"}>
            <Button id="logout-button" content={'Log out'} onClick={() => userStore.logout().then(() => navigate('/'))}/>
        </Segment>
    )
});