import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";
import './QuizzesList.css';
import NewSessionModal from "./NewSessionModal";
import { ISessionQuizPreview } from "../../stores/newSessionStore";

export default observer(function QuizzesList(){
    const {newSessionStore, modalStore} = useStore();

    const openModal = (quiz: ISessionQuizPreview) => {
        modalStore.openModal(<NewSessionModal quiz={quiz}/>);
    }

    return(        
        <div className="quizzes-list">
            {newSessionStore.pagedResult?.items.map(quiz => 
                <div className="element">
                    <span className="element-name">{quiz.title}</span>
                    <button className="element-button" onClick={() => openModal(quiz)}>&#9658;</button>
                </div>    
            )}
        </div>
    )
})