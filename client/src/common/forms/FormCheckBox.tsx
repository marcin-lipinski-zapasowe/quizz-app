import { Checkbox, CheckboxProps, Form } from "semantic-ui-react"
import { FormEvent, useState } from "react";

interface Props {
    label: string,
    name: string,
    value: boolean,
    formHandler: (key: string, data: boolean) => void
}

export default function FormCheckbox({label, name, value, formHandler}: Props) {
    const [checked, setChecked] = useState(value);

    const handleChange = (event: FormEvent<HTMLInputElement>, data: CheckboxProps) => {
        setChecked(data.checked as boolean)
        formHandler(name, checked);
    }

    return(
        <Form.Field className="form-checkbox">
            <Checkbox
                slider
                onChange={handleChange}
                checked={checked}
                label={label}
            />
        </Form.Field> 
    )
}