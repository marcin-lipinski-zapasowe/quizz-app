import { Form } from "semantic-ui-react";
import FormTextBox from "../../../../../common/forms/FormTextBox";
import "./SharedQuestionForm.css"

interface Props {
    title: string,
    error: string,
    handleFormChange: (key: string, data: string) => void
}

export default function SharedQuestionForm({title, error, handleFormChange}: Props) {
    return(
        <>
            <Form>
                <FormTextBox
                    required={true}
                    placeholder="Title"
                    name='title'
                    value={title}
                    error={error}
                    formHandler={handleFormChange}
                />
                {/* <FormTextBox
                    required={true}
                    placeholder="Desciption"
                    dataProps={formState.content}
                    formHandler={handleFormChange}
                /> */}
            </Form>
        </>
    )
}