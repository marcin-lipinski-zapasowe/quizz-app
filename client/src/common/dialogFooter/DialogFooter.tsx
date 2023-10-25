import { Container, Header } from "semantic-ui-react";
import './DialogFooter.css';
import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store";

export default observer(function DialogFooter() {
    const {warningFooterStore} = useStore();

    const generateClassname = () => {
        let result = warningFooterStore.positive ? "success " : "error ";
        result += warningFooterStore.visible ? "visible" : "hidden";
        return result
    }
    
    return (
        <Container id='warning-container' className={generateClassname()}>
            <Header as="h2" content={warningFooterStore.positive ? "Success!" : "Error!"}/>
            <Header as="h3" content={warningFooterStore.text}/>
        </Container>
    );
})