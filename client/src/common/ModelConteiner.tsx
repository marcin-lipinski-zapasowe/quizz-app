import { observer } from 'mobx-react-lite';
import { Segment } from 'semantic-ui-react';
import { useStore } from '../stores/store';
import './ModalContainer.css';

export default observer(function ModalContainer() {
    const { modalStore } = useStore();

    return (
        <Segment className={modalStore.modal.visible ? 'fullscreen modal visible' : 'fullscreen modal hidden'}>
            {modalStore.modal.body}
        </Segment>
    );
});
