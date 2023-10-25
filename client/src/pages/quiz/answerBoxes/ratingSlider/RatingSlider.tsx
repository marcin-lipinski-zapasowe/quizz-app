import { useState } from "react";
import { IRatingQuestion } from "../../../../models/quiz";
import './RatingSlider.css'

interface Props {
    question: IRatingQuestion, 
    setMinMaxStepValue: (text: string, val: number) => void
}

export default function RatingSlider({question, setMinMaxStepValue}: Props) {
    const [value, setValue] = useState((question.min + question.max) / 2)

    const handleChange = (evnt: React.ChangeEvent<HTMLInputElement>) => {
        let prop = evnt.currentTarget.previousSibling!.textContent!.toLowerCase();
        let val = Number(evnt.currentTarget.value);
        setMinMaxStepValue(prop, val);
        setValue((question.min + question.max) / 2);
    }

    const check = (evnt: React.KeyboardEvent<HTMLInputElement>, input: string) => {
        let currVal = evnt.currentTarget.value;
        if(evnt.key === '-' && input === 'step') evnt.preventDefault();
        if(!evnt.key.contains("0123456789")) return;

        let number = Number(currVal + evnt.key);
        console.log(question.min + " " + question.step + " " + question.max)
        if(input === 'min' && number > question.max - question.step) evnt.preventDefault()
        if(input === 'step' && number <= 0) evnt.preventDefault()
        if(input === 'max' && number < question.min + question.step) evnt.preventDefault()
    }

    return (
        <div>
            <span id="rangeValue">{value}</span>
            <input className="range" type="range" value={value} min={question.min} max={question.max} step={question.step} disabled/> 
            <div className="inputs">
                <div className="left">
                    <label>MIN</label>  
                    <input type="number" defaultValue={question.min} onChange={handleChange} max={question.max - question.step} onKeyDown={(evnt) => check(evnt, 'min')}/>
                </div>
                <div className="center">
                    <label>STEP</label>
                    <input type="number" defaultValue={question.step} onChange={handleChange} min={0} onKeyDown={(evnt) => check(evnt, 'step')}/>
                </div>
                <div className="right">
                    <label>MAX</label>
                    <input type="number" defaultValue={question.max} onChange={handleChange} min={question.min + question.step} onKeyDown={(evnt) => check(evnt, 'max')}/>
                </div>
            </div>
        </div>
    )
}