import { observer } from "mobx-react-lite";
import { useStore } from "../../../stores/store";
import OpinionsModal from "./OpinionsModal";
import { Dimmer, Loader } from "semantic-ui-react";
import './ResultArea.css'
import QuizPreview from "./questionsPreview/QuizPreview";
import { useNavigate } from "react-router-dom";

export default observer(function ResultArea(){    
    const {modalStore, quizDetailsStore, quizBrowserStore} = useStore();
    const navigate = useNavigate();
    
    const clickHandler = (quizId: string) => {
        quizBrowserStore.buttonFunction(quizId);
    }

    const showOpinionsModal = (quizId: string) => {
        modalStore.openModal(<OpinionsModal quizId={quizId}/>);
    }

    const showPreview = (quizId: string) => {
        if(quizId){
            quizDetailsStore.getQuizDetails(quizId)
                .then(() => modalStore.openModal(<QuizPreview quizId={quizId}/>))
                .catch(() => navigate('/notfound'))
        }
    }

    if(quizBrowserStore.loading) return <Dimmer active={true} style={{backgroundColor: 'rgba(0,0,0,0.4)'}}><Loader/></Dimmer>;


    return(
        <div className="result-area">
            {quizBrowserStore.quizzes?.items.map(quiz => 
                <div key={quiz.id}>
                    <div className="title">
                        <div className="sub-comp-title">TITLE</div>
                        <div style={{padding: '2px 10px 0px 10px'}}>{quiz.title}</div>
                    </div>
                    <div className="author">
                        <div className="sub-comp-title">AUTHOR</div>
                        <span style={{padding: '2px 10px 0px 10px'}}>{quiz.authorName}</span>
                    </div>
                    <div className="description-action">
                        <div className="description">
                            <div className="sub-comp-title">DESCRIPTION</div>
                            <div>{quiz.description}</div>
                        </div>
                        <div className="actions">    
                            <div className="sub-comp-title">ACTIONS</div>                    
                            <span>{quiz.sessionsAmount} sessions</span>
                            <span>{quiz.questionsAmount} {quiz.questionsAmount === 1 ? "question" : "questions"}</span>
                            <button className="see-opinions-button" onClick={() => showOpinionsModal(quiz.id)}>
                                <span>★</span>
                                {Math.round(quiz.averageOpinion * 10) / 10}
                            </button>
                            <button className="see-preview-button" onClick={() => showPreview(quiz.id)}>&#x1F441; Preview</button>
                            <button className="add-to-saved-button" onClick={() => clickHandler(quiz.id)}>
                                {quizBrowserStore.addFavouriteLoading
                                    ? <Loader/>
                                    : quizBrowserStore.buttonFunction.name.split('.')[1] === 'buttonFunction' 
                                        ? <><span>✎</span>Edit</>
                                        : <>
                                            <span className={quiz.isFavourite ? "saved" : "save"}>❤</span>
                                            {quiz.isFavourite ? "Saved" : "Save"}
                                          </>                                     
                                }
                            </button>
                        </div>
                    </div>                            
                </div>
            )}
        </div>
    )
})