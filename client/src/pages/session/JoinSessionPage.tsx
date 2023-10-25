import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import './JoinSessionPage.css';

export default observer(function JoinSessionPage(){
    const {userStore, liveSessionStore} = useStore();
    const [pin, setPin] = useState('');
    const navigate = useNavigate();
    const [participant, setParticipant] = useState({id: '', username: 'dupa'});

    const numericInputKeyDownHandler = (evnt: React.KeyboardEvent<HTMLInputElement>) => {
        if(evnt.key === '-' || evnt.key === '+') evnt.preventDefault();
    }

    const trimValue = (evnt: React.ChangeEvent<HTMLInputElement>) => {
        setPin(evnt.currentTarget.value.substring(0, 6));
    }

    const joinButtonClickHandler = () => {
        liveSessionStore.setUpConnection()
            .then(() => {
                liveSessionStore.participantJoinSession(pin, participant)
                    .then(() => navigate("/session/live"));
            })
            .catch(err => console.log(err));  
    }

    const handleClick = (evnt: React.ChangeEvent<HTMLInputElement>) => {
        let value = evnt.currentTarget.value;
        value ? setParticipant({id: userStore.user!.id, username: userStore.user!.id})
                : setParticipant({id: '', username: 'dupa'});
    }

    return (
        <div className="join-session-page">
            <header>Join session</header>
            <div>
                {userStore.isLoggedIn
                    ? <Fragment>
                        <img src={userStore.user?.profileImageUrl}/>
                        <span>{userStore.user?.username}</span>
                      </Fragment>
                    : <span>Anonymous user</span>
                }             
            </div>
            <input type="checkbox" onChange={handleClick}/>
            <div>
                <input placeholder="Type Session PIN" type="number" onKeyDown={numericInputKeyDownHandler} onChange={trimValue} value={pin}/>
                <button onClick={joinButtonClickHandler}>JOIN</button>
            </div>
        </div>
    )
})