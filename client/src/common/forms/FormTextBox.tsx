import { Form, Icon, InputOnChangeData, SemanticICONS } from "semantic-ui-react"

interface Props {
    required: boolean,
    value: string,
    error: string | null,
    iconName?: SemanticICONS,
    placeholder: string,
    inputType?: string,
    name: string
    formHandler: (key: string, data: string) => void
}

export default function FormTextBox({required, value, name, error, inputType, iconName, placeholder, formHandler}: Props) {

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>, data: InputOnChangeData) => {
        formHandler(name, data.value);        
    }

    const setClassName = (): string => {
        let result = required ? "required" : "";
        result += error === null ? "" : "invalid";
        return result;
    }

    return(
        <div>
            <Form.Input
                className={setClassName()}
                icon={iconName !== undefined ? <Icon name={iconName} size='large' /*inverted circular*//> : <></>}
                iconPosition="left"
                onChange={handleChange}
                autoComplete="off" 
                placeholder={placeholder}
                type={inputType !== undefined ? inputType : "text"} 
                value={value}
            />

            <div className='error-message-wrapper'>
                {error}
            </div>     
        </div>
    )
}