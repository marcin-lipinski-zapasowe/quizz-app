import { useState } from "react";
import { useStore } from "../../stores/store";
import './NewSessionModal.css';
import { useNavigate } from "react-router-dom";
import { ISessionQuizPreview } from "../../stores/newSessionStore";



export interface INewSessionsSettings {
    quiz: ISessionQuizPreview,
    onlyForSigned: boolean,
    questionsOnHostScreenOnly: boolean,
    isMaxParticipantsNumber: boolean,
    maxParticipantsNumber: number,
    generateQRCode: boolean,
    sendEmailInvitations: boolean,
    emailsInvitationsList: string[],
    showScoreAfterEveryQuestion: boolean,
    showScoreAfterAllQuestions: boolean,
}

const SettingsLabels = {
    onlyForSigned: "Is session only for signed in users?",
    questionsOnHostScreenOnly: "Are questions only displayed on the host screen?",
    isMaxParticipantsNumber: "Whether the number of participants is limited?",
    generateQRCode: "Generate QR code?",
    sendEmailInvitations: "Send e-mail invitations?",
    showScoreAfterEveryQuestion: "Show results after each question?",
    showScoreAfterAllQuestions: "Show results after last question?",
}

interface Props {
    quiz: ISessionQuizPreview
}

export default function NewSessionModal({quiz}: Props) {
    const {newSessionStore, modalStore, liveSessionStore} = useStore();
    const [settings, setSettings] = useState<INewSessionsSettings>({
        quiz: quiz,
        onlyForSigned: false,
        questionsOnHostScreenOnly: false,
        isMaxParticipantsNumber: false,
        maxParticipantsNumber: 1,
        generateQRCode: false,
        sendEmailInvitations: false,
        emailsInvitationsList: [],
        showScoreAfterEveryQuestion: false,
        showScoreAfterAllQuestions: false,
    });
    const navigate = useNavigate();

    //if(quizBrowserStore.opinionsLoading) return <Dimmer active={true} style={{backgroundColor: 'rgba(0,0,0,0.4)'}}><Loader/></Dimmer>;

    const closeModal = () => {
        modalStore.closeModal();
    }

    const handleCheckboxChange = (key: string, value: boolean) => {
        (settings[key as keyof INewSessionsSettings] as boolean) = !settings[key as keyof INewSessionsSettings];
        setSettings(Object.assign({}, settings));
    }

    const participantsNumberChange = (evnt: React.ChangeEvent<HTMLInputElement>) => {
        settings.maxParticipantsNumber = Number(evnt.currentTarget.value);
        setSettings(Object.assign({}, settings));
    }

    const checkMaxParticipantsNumber = (evnt: React.KeyboardEvent<HTMLInputElement>) => {
        let currVal = evnt.currentTarget.value;
        if((evnt.key === '0' && currVal.length < 1) || evnt.key === '-') evnt.preventDefault();
        if(Number(currVal + evnt.key) > 50) evnt.preventDefault();
    }

    const addEmailToList = (evnt: React.MouseEvent<HTMLButtonElement>) => {
        let email = (evnt.currentTarget.previousElementSibling as HTMLInputElement).value;
        if(!email.isCorrectEmail()) return;
        if(settings.emailsInvitationsList.includes(email)) return;
        settings.emailsInvitationsList.push(email);
        setSettings(Object.assign({}, settings));
    }

    const removeEmailFromList = (evnt: React.MouseEvent<HTMLButtonElement>) => {
        let email = (evnt.currentTarget.previousElementSibling as HTMLSpanElement).textContent;
        settings.emailsInvitationsList = [...settings.emailsInvitationsList.filter(em => em !== email)];
        setSettings(Object.assign({}, settings));
    }

    const createSession = () => {
        newSessionStore.createSession(settings)
            .then(() => {
                liveSessionStore.setUpConnection()
                    .then(() => {
                        liveSessionStore.hostJoinSession(newSessionStore.quiz!.pin)
                            .then(() => {
                                modalStore.closeModal();
                                navigate('/session/hosting');
                            })
                            .catch(err => {throw new Error((err as Error).message)})
                    })
                    .catch(err => {throw new Error((err as Error).message)})
            }) 
            .catch(error => console.log(error));
    }

    return( 
        <div className="new-session-modal">
            <div className="sticky-bar">
                <button onClick={closeModal}>✖</button>
            </div>
            <header>New session settings</header>
            <div className="divider"/>
            <div className="new-session-settings">
                <div className="form-checkbox" >
                    <div className={`correct-answer-checkbox ${settings["onlyForSigned"] ? 'active' : ''}`} 
                         onClick={() => handleCheckboxChange("onlyForSigned", settings["onlyForSigned"] ? false : true)}/>
                    <span>{SettingsLabels["onlyForSigned"]}</span>
                </div>

                <div className="form-checkbox" >
                    <div className={`correct-answer-checkbox ${settings["questionsOnHostScreenOnly"] ? 'active' : ''}`} 
                         onClick={() => handleCheckboxChange("questionsOnHostScreenOnly", settings["questionsOnHostScreenOnly"] ? false : true)}/>
                    <span>{SettingsLabels["questionsOnHostScreenOnly"]}</span>
                </div>

                <div className="form-checkbox" >
                    <div className={`correct-answer-checkbox ${settings["generateQRCode"] ? 'active' : ''}`} 
                         onClick={() => handleCheckboxChange("generateQRCode", settings["generateQRCode"] ? false : true)}/>
                    <span>{SettingsLabels["generateQRCode"]}</span>
                </div>

                <div className="form-checkbox" >
                    <div className={`correct-answer-checkbox ${settings["showScoreAfterEveryQuestion"] ? 'active' : ''}`} 
                         onClick={() => handleCheckboxChange("showScoreAfterEveryQuestion", settings["showScoreAfterEveryQuestion"] ? false : true)}/>
                    <span>{SettingsLabels["showScoreAfterEveryQuestion"]}</span>
                </div>

                <div className="form-checkbox" >
                    <div className={`correct-answer-checkbox ${settings["showScoreAfterAllQuestions"] ? 'active' : ''}`} 
                         onClick={() => handleCheckboxChange("showScoreAfterAllQuestions", settings["showScoreAfterAllQuestions"] ? false : true)}/>
                    <span>{SettingsLabels["showScoreAfterAllQuestions"]}</span>
                </div>
                
                <div className="form-checkbox isMaxParticipantsNumber" >
                    <div className={`correct-answer-checkbox ${settings["isMaxParticipantsNumber"] ? 'active' : ''}`} 
                        onClick={() => handleCheckboxChange("isMaxParticipantsNumber", settings["isMaxParticipantsNumber"] ? false : true)}/>
                    <span>{SettingsLabels["isMaxParticipantsNumber"]}</span>
                    <input
                        disabled={!settings.isMaxParticipantsNumber}
                        className={settings.isMaxParticipantsNumber ? 'active' : ''}
                        type="number" 
                        defaultValue={settings.isMaxParticipantsNumber ? settings.maxParticipantsNumber : ''}
                        onChange={participantsNumberChange} 
                        min={1}
                        max={50}
                        onKeyDown={checkMaxParticipantsNumber}
                    />
                </div>

                <div className="form-checkbox sendEmailInvitations" >
                    <div className={`correct-answer-checkbox ${settings["sendEmailInvitations"] ? 'active' : ''}`} 
                        onClick={(evnt) => {
                            (evnt.currentTarget.nextElementSibling?.nextElementSibling as HTMLInputElement).value = '';
                            handleCheckboxChange("sendEmailInvitations", settings["sendEmailInvitations"] ? false : true);
                        }}/>
                    <span>{SettingsLabels["sendEmailInvitations"]}</span>
                    <input
                        disabled={!settings.sendEmailInvitations}
                        className={settings.sendEmailInvitations ? 'active' : ''}
                        type="email"
                        autoComplete="false"
                    />
                    <button 
                        disabled={!settings.sendEmailInvitations} 
                        className={settings.sendEmailInvitations ? 'active' : ''}
                        onClick={addEmailToList}
                        >
                        +
                    </button>
                    <div className="email-list" style={{display: settings.sendEmailInvitations ? 'flex' : 'none'}}>
                        {settings.emailsInvitationsList.map(email => 
                            <div className="email-list-element">
                                <span>{email}</span>
                                <button onClick={removeEmailFromList}>
                                    🗙
                                </button>
                            </div>    
                        )}
                    </div>
                </div>
            </div>
            <div>
                <button className="create-session-button" onClick={createSession}>Create</button>
            </div>
        </div>
    )
}