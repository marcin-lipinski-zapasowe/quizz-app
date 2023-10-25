import { useEffect } from "react";
import { useStore } from "../../stores/store"
import './HostingSessionPage.css';
import { observer } from "mobx-react-lite";

export default observer(function HostingSessionPage(){
    const {newSessionStore, liveSessionStore} = useStore();

    return(
        <div className="hossting-session-page" style={{color: 'white'}}>
            <header>{newSessionStore.quiz?.title}</header>
            <header>{newSessionStore.quiz?.pin}</header>
            <ul>
                {liveSessionStore.participants.map(p => <li>{p.username}</li>)}
            </ul>
        </div>
    )
})