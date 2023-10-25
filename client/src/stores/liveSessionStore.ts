import * as signalR from "@microsoft/signalr";
import { makeAutoObservable, runInAction } from "mobx";

interface ISessionParticipant {
    username: string,
    score: number
}

interface IParticipantJoinSession {
    id: string | null,
    username: string
}

export class LiveSessionStore {
    connection: signalR.HubConnection | null = null;
    participants: ISessionParticipant[] = [];
    settingLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    setUpConnection = async () => {
        runInAction(() => {
            this.settingLoading = true;
            this.connection = new signalR.HubConnectionBuilder()
                .withUrl('http://localhost:5000/livesession')
                .withAutomaticReconnect()
                .build();         
        })    
        await this.connection!.start();

        this.connection?.on('ParticipantJoined', (username: string, score: number) => runInAction(() => this.participants.push({username: username, score: score})));
        this.connection?.on('ParticipantJoinedErrorMaxNumber', () => runInAction(() => console.log("ParticipantJoinedErrorMaxNumber")));
        this.connection?.on('ParticipantJoinedErrorOnlyForSigned', () => runInAction(() => console.log("ParticipantJoinedErrorOnlyForSigned")));
    }

    hostJoinSession = async (sessionPin: string) => {
        runInAction(() => this.settingLoading = true);
        await this.connection!.invoke('HostJoinSession', "pin" + sessionPin)
        runInAction(() => this.settingLoading = false);
    }

    participantJoinSession = async (pin: string, participant: IParticipantJoinSession) => {
        runInAction(() => this.settingLoading = true);
        await this.connection!.invoke('ParticipantJoinSession', "pin" + pin, participant);
        runInAction(() => this.settingLoading = false);
    }
}