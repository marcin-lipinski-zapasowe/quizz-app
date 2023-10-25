import { Segment } from "semantic-ui-react";
import { ITrueOrFalseQuestion } from "../../../../models/quiz";

interface Props {
    question: ITrueOrFalseQuestion;
}

export default function TrueFalseQuestion({question}:Props){
    return(
        <>
             <Segment className="question-content">
                <span className="textarea" role="textarea">{question.content}</span>
                {question.questionImageUrl !== null ? <img src={question.questionImageUrl}/> : <></> }
            </Segment>                
            <Segment className="selection-question-answers">
                <Segment className="quiz-answer-box">
                    <span>True</span>
                </Segment>
                <Segment className="quiz-answer-box">
                    <span>False</span>
                </Segment>
            </Segment>
        </>
    )
}