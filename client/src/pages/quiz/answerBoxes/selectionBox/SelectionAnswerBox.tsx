import { Segment } from "semantic-ui-react";
import "./SelectionAnswerBox.css";

interface Props {
    content: string,
    correctAnswer: string,
    editable: boolean,
    placeholder: string,
    name: string,
    onClickHandler?: () => void,
    onEditHandler?: (name: string, data: string) => void
}

export default function SelectionAnswerBox(props: Props) {
    //const [checked, setChecked] = useState(false);

    const handleInput = (evnt: React.FormEvent<HTMLTextAreaElement>) => {
        const visibleTextarea = evnt.currentTarget;
        if(visibleTextarea.value.length >= 50) visibleTextarea.style.fontSize = "1.35rem";
        else visibleTextarea.style.fontSize = "1.5rem";

        props.onEditHandler!(props.name, evnt.currentTarget.value);
    }

    const handleCheckboxClick = (evnt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        let temp = props.correctAnswer;
        if(temp.contains(props.name.slice(-1))) {
            temp = temp.replace(props.name.slice(-1), '');
            evnt.currentTarget.classList.remove('active');
        }
        else {
            temp += props.name.slice(-1);
            evnt.currentTarget.classList.add('active');
        }
        props.onEditHandler!('correctAnswers', temp);
    }

    return(
        <Segment className="quiz-answer-box">
            <textarea onInput={(evnt) => handleInput(evnt)} maxLength={75} placeholder={props.placeholder} style={{paddingLeft: props.onEditHandler !== undefined ? '15px' : '8px'}}/>
            <div
                className={`correct-answer-checkbox ${props.name === 'answerA' || props.name === 'answerC' ? 'left': 'right'}`} 
                onClick={(evnt) => handleCheckboxClick(evnt)}
            />
        </Segment>
    )
}