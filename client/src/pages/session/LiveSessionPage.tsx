import { observer } from "mobx-react-lite";
import { useStore } from "../../stores/store"

export default observer(function LiveSessionPage() {
    const {liveSessionStore} = useStore();

    return(
        <div>
            <ul>
                {liveSessionStore.participants.map(p => <li>{p.username}</li>)}
            </ul>
        </div>
    )
})