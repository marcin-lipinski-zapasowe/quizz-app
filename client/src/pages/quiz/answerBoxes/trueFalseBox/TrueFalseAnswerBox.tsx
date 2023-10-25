import { Segment } from "semantic-ui-react";
import "./TrueFalseAnswerBox.css";

interface Props {
    correctAnswer: boolean
    placeholder: string,
    name: string,
    onClickHandler?: () => void,
    onEditHandler?: (name: string, data: boolean) => void
}

export default function TrueFalseAnswerBox(props: Props) {
    const checked = props.correctAnswer=== (props.placeholder === 'True' ? true : false);

    const handleCheckboxClick = (evnt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let curr = props.placeholder === 'True' ? true : false;
        let newval;

        if(props.correctAnswer === curr) {
            newval = !curr;
            evnt.currentTarget.classList.remove('active');
        }
        else {
            newval = curr
            evnt.currentTarget.classList.add('active');
        }
        props.onEditHandler!(props.name, newval);
    }

    return(
        <Segment className="quiz-answer-box">
            <span style={{paddingLeft: props.onEditHandler !== undefined ? '15px' : '8px'}}>{props.placeholder}</span>
            <div 
                className={`correct-answer-checkbox ${props.placeholder === 'True' ? 'left': 'right'} ${checked ? 'active' : ''}`} 
                onClick={(evnt) => handleCheckboxClick(evnt)}
            />
        </Segment>
    )
}