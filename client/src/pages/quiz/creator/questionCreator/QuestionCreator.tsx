import { observer } from "mobx-react-lite";
import { useStore } from "../../../../stores/store";
import { Segment } from "semantic-ui-react";
import GeneralForm from "../generalForm/GeneralForm";
import { EnumQuestionType, IGeneral, IOpenQuestion, IQuestion, IRatingQuestion, ISelectionQuestion, ITrueOrFalseQuestion } from "../../../../models/quiz";
import SelectionQuestionForm from "../detailedForms/selection/SelectionQuestionForm";
import RatingQuestionForm from "../detailedForms/rating/RatingQuestionForm";
import TrueOrFalseQuestionForm from "../detailedForms/trueFalse/TrueOrFalseQuestionForm";
import OpenQuestionForm from "../detailedForms/open/OpenQuestionForm";
import QuestionCreatorElement from "./QuestionCreatorElement";
import './QuestionCreator.css';

export default observer(function QuestionCreator(){
    const {quizStore} = useStore();

    const getSpecificQuestionForm = (question: IQuestion): React.ReactNode => {
        switch(question.type) 
        {
            case EnumQuestionType.selection:
                return <SelectionQuestionForm {...(question as ISelectionQuestion)} />;
            case EnumQuestionType.rating:
                return <RatingQuestionForm {...(question as IRatingQuestion)} />;
            case EnumQuestionType.trueOrFalse:
                return <TrueOrFalseQuestionForm {...(question as ITrueOrFalseQuestion)} />;
            case EnumQuestionType.open:
                return <OpenQuestionForm {...(question as IOpenQuestion)} />;
        }
    }

    return(
        <Segment className="quiz-create-main">
            <QuestionCreatorElement 
                id='general' 
                node={<GeneralForm {...(quizStore.quizData?.general as IGeneral)}/>} 
            />

            {quizStore.quizData?.questions.map(question =>
                <QuestionCreatorElement
                    key={question.id}
                    id={question.id} 
                    node={getSpecificQuestionForm(question)} 
                />
            )}                    
        </Segment>
    )
})