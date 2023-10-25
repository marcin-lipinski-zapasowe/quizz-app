import { Dimmer, Loader, Segment } from "semantic-ui-react";
import { ISelectionQuestion } from "../../../../models/quiz";
import { useState } from "react";

interface Props {
    question: ISelectionQuestion;
}

export default function SelectionQuestion({question}: Props){
    const [loadingImage, setLoadingImage] = useState(true);

    return(
        <>
            <Segment className="question-content">
                <span className="textarea" role="textarea">{question.content}</span>                               
                {question.questionImageUrl !== null 
                    ? <>
                        <Dimmer active={loadingImage} style={{ backgroundColor: 'rgba(0,0,0,0.4)', display: loadingImage ? "block" : "none" }}>
                            <Loader />
                        </Dimmer> 
                        <img
                            src={question.questionImageUrl}
                            style={{ display: !loadingImage ? "block" : "none" }}
                            onLoad={() => setLoadingImage(false)}
                        /> 
                      </>
                    : <></> 
                }
            </Segment>
            <Segment className="selection-question-answers">
                <Segment className="quiz-answer-box">
                    <textarea>{question.answerA}</textarea>
                </Segment>
                <Segment className="quiz-answer-box">
                    <textarea>{question.answerB}</textarea>
                </Segment>
                <Segment className="quiz-answer-box">
                    <textarea>{question.answerC}</textarea>
                </Segment>
                <Segment className="quiz-answer-box">
                    <textarea>{question.answerD}</textarea>
                </Segment>
            </Segment>
        </>
    )
}