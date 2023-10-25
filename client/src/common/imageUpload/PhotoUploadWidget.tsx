import { useEffect, useState } from "react";
import { Button } from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone";
import PhotoWidgetCropper from "./PhotoWidgetCropper";
import './PhotoUploadWidget.css';

interface Props {
    loading: boolean;
    uploadPhoto: (file: Blob) => void
}

export default function PhotoUploadWidget({loading, uploadPhoto}: Props){
    const [files, setFiles] = useState<any>([]);
    const [cropper, setCropper] = useState<Cropper>();

    function onCrop() {
        if(cropper) {
            cropper.getCroppedCanvas().toBlob(blob => uploadPhoto(blob!));
            setFiles([]);
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview));
        }
    }, [files])

    return(
        <>
            {files.length === 0 
                ? <PhotoWidgetDropzone setFiles={setFiles}/>
                : <>{files && files.length > 0 && 
                        (
                            <>
                                <PhotoWidgetCropper setCropper={setCropper} imagePreview={files[0].preview}/>
                                <Button loading={loading} onClick={onCrop} icon='check'/>
                                <Button disabled={loading} onClick={() => setFiles([])} icon='close'/>
                            </>
                        )
                    }</>
            }
        </>
    )
}