import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import { Button, Divider, Header, Menu, Segment } from "semantic-ui-react";
import { useStore } from "../../../../stores/store";
import QuizCreatorQuestionTypeChoose from "../quizCreatorQuestionTypeChoose/QuizCreatorQuestionTypeChoose";
import { useEffect, useState } from "react";
import { IQuestion } from "../../../../models/quiz";
import MoveTo from "moveto";

export default observer(function NewQuizMenu(){
    const {quizStore, modalStore} = useStore();
    const [activeItem, setActiveItem] = useState('general');
    const navigate = useNavigate();
    let moveTo: MoveTo | null = null;

    useEffect(() => {
        moveTo = new MoveTo({
            container: document.querySelector(".quiz-create-main") as HTMLElement,
            duration: 100
        })
    })

    const deleteQuestion = (evnt: React.MouseEvent<HTMLButtonElement, MouseEvent>, question: IQuestion) => {
        evnt.stopPropagation();
        quizStore.deleteQuestion(question.id);
        if(activeItem === question.title) {
            if(quizStore.quizData?.questions.length === 0) {
                setActiveItem('general');
            }
            else setActiveItem(quizStore.quizData!.questions[0].title)
        }
    }

    function handleListClick(id: string) {
        let target = document.getElementById(id) as HTMLElement;
        let targetPos = id === 'general' ? 1 : quizStore.quizData!.questions.findIndex(x => x.id === id) + 2;
        let currentPos = activeItem === 'general' ? 1 : quizStore.quizData!.questions.findIndex(x => x.id === activeItem) + 2;
        
        moveTo!.options.duration = Math.abs(targetPos - currentPos) * -300;
        moveTo!.move(target);
        setActiveItem(id);
    }

    const addQuestionModal = () => {
        modalStore.openModal(<QuizCreatorQuestionTypeChoose/>);
    }

    const leftCreator = () => {
        quizStore.clearQuizForm();
        navigate("/home");
    }
    
    return (
        <Menu secondary vertical className="quiz-create-menu">
            <div className="menu-elements">
                <div className={activeItem === 'general' ? "item active" : "item"} onClick={() => handleListClick('general')}>
                    <Header>General</Header>
                </div>
                <Divider />
                {quizStore.quizData?.questions.map((question, index) => 
                    <div className={activeItem === question.id ? "item active" : "item"} onClick={() => handleListClick(question.id)}>
                        <Header>{question.title }</Header>
                        <Button icon="trash" size="small" onClick={(evnt) => deleteQuestion(evnt, question)}/>
                    </div>
                )}
                <div className="add-question-button">
                    <Button icon='plus' size="tiny" onClick={addQuestionModal}/>
                </div>
            </div>
            <Segment className="quiz-create-buttons">
                <Button content="Save" onClick={() => quizStore.saveQuestion(quizStore.quizData!)}/>
                <Button content="Cancel" onClick={leftCreator}/>
            </Segment>
        </Menu>
    )
})