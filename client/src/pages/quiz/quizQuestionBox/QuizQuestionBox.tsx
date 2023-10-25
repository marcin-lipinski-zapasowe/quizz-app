import { Icon, Segment } from "semantic-ui-react";
import './QuizQuestionBox.css'
import PhotoWidgetDropzone from "../../../common/imageUpload/PhotoWidgetDropzone";
import { useEffect, useState } from "react";

interface Props {
    setImage: (blob: Blob | undefined) => void,
    content: string,
    name: string,
    onEditHandler: (key: string, data: string) => void
}

export default function QuizQuestionBox({setImage, content, name, onEditHandler}: Props) {
    const ignoredKeys = ['Backspace', 'Delete', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'];
    const [files, setFiles] = useState<any>([]);

    const handleKeyDown = (evnt: React.KeyboardEvent<HTMLSpanElement>) => {
        if(evnt.currentTarget.textContent!.length === 150 && !ignoredKeys.includes(evnt.key)) evnt.preventDefault();
    }

    const handleInput = (evnt: React.FormEvent<HTMLSpanElement>) => {
        let text = evnt.currentTarget.textContent;
        if(text!.length > 0) evnt.currentTarget.style.backgroundColor = "white";
        else evnt.currentTarget.style.backgroundColor = "transparent";
        console.log(text);
        onEditHandler(name, text!)
    }

    // const handleInput = (evnt: React.FormEvent<HTMLTextAreaElement>) => {
    //     const visibleTextarea = evnt.currentTarget;
    //     if(visibleTextarea.value.length >= 50) visibleTextarea.style.fontSize = "1.35rem";
    //     else visibleTextarea.style.fontSize = "1.5rem";

    //     props.onEditHandler!(props.name, evnt.currentTarget.value);
    // }

    const deleteImage = () => setFiles([]);
    const getBlob = async () => setImage(await fetch(files[0].preview).then(r => r.blob()));

    useEffect(() => {
        if(files.length > 0) getBlob();
        else setImage(undefined)
    }, [files.length])

    return(
        <Segment className="question-content">
            <span className="textarea ghost" role="textarea">Enter question</span>
            <span className="textarea" role="textarea" contentEditable={true} onInput={(evnt) => handleInput(evnt)} onKeyDown={(evnt => handleKeyDown(evnt))}/>
            {files.length === 0 
                ? <PhotoWidgetDropzone setFiles={setFiles}/>
                : <>
                    <div>
                        <img src={files[0].preview}/>
                        <button onClick={deleteImage}><Icon name="delete"/></button>
                    </div>
                  </>
            }
        </Segment>
    )
}