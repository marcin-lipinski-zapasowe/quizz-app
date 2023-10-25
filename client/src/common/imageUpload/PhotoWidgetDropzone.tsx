import { useCallback } from "react";
import {useDropzone} from 'react-dropzone';
import { Header, Icon } from "semantic-ui-react";

interface Props {
    setFiles: (files: any) => void
}

export default function PhotoWidgetDropzone({setFiles}: Props) {
    const dropzoneStyles = {
        borderRadius: '5px',
        textAlign: 'center' as 'center',
        height: '80%',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        color: '#8e8e8e'
    };

    const dropzoneActive = {
        borderColor: "green"
    }

    const onDrop = useCallback((acceptedFiles: any) => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    }, [setFiles]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return(
        <div {...getRootProps()} style={isDragActive ? {...dropzoneStyles, ...dropzoneActive} : dropzoneStyles}>
            <input {...getInputProps()}/>
            <div>
                <Icon name="upload" size="huge"/>
                <Header content="Drop here or click to add image" style={{color: '#8e8e8e'}}/>
            </div>
        </div>
    )
}
