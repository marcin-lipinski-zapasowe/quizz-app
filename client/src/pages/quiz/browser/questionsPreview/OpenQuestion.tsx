import { Segment } from "semantic-ui-react";
import { IOpenQuestion } from "../../../../models/quiz";

interface Props {
    question: IOpenQuestion;
}

export default function OpenQuestion({question}:Props){
    return(
        <>
            <Segment className="question-content">
                <span className="textarea" role="textarea">{question.content}</span>
                {question.questionImageUrl !== null ? <img src={question.questionImageUrl}/> : <></> }
            </Segment>
            <Segment className="selection-question-answers open">
                <div className="open-user-answer">User answer</div>
            </Segment>
        </>
    )
}