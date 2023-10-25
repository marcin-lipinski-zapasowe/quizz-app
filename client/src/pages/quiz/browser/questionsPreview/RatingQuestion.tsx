import { Segment } from "semantic-ui-react";
import { IRatingQuestion } from "../../../../models/quiz";

interface Props {
    question: IRatingQuestion; 
}

export default function RatingQuestion({question}: Props){
    const value = (question.min + question.max) / 2;

    return(
        <>
            <Segment className="question-content">
                <span className="textarea" role="textarea">{question.content}</span>
                {question.questionImageUrl !== null ? <img src={question.questionImageUrl}/> : <></> }
            </Segment>                
            <Segment className="rating-question-answers">
                <div className="rating-own">
                    <div>
                        <span id="rangeValue">{value}</span>
                        <input className="range" type="range" value={value} min={question.min} max={question.max} step={question.step} disabled/> 
                        <div className="inputs">
                            <div className="left">
                                <label>MIN</label>  
                                <input type="number" defaultValue={question.min} disabled/>
                            </div>
                            <div className="center">
                                <label>STEP</label>
                                <input type="number" defaultValue={question.step} disabled/>
                            </div>
                            <div className="right">
                                <label>MAX</label>
                                <input type="number" defaultValue={question.max} disabled/>
                            </div>
                        </div>
                    </div>
                </div>
            </Segment>            
        </>
    )
}