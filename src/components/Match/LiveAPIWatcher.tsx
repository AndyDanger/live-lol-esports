import './styles/playerStatusStyle.css'

import { GameMetadata, Team, WindowFrame, WindowParticipant } from "../types/baseTypes";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import useSound from "use-sound";

const firstblood = require("../../assets/audios/first_blood.ogg");
const kill = require("../../assets/audios/champion_slain.ogg");
const tower_blue = require("../../assets/audios/blue_turret_destroyed.ogg");
const tower_red = require("../../assets/audios/red_turret_destroyed.ogg");
const dragon_blue = require("../../assets/audios/blue_dragon_slain.ogg");
const dragon_red = require("../../assets/audios/red_dragon_slain.ogg");
const baron_blue = require("../../assets/audios/blue_baron_slain.ogg");
const baron_red = require("../../assets/audios/red_baron_slain.ogg");
const inib_blue = require("../../assets/audios/blue_inhibitor_destroyed.ogg");
const inib_red = require("../../assets/audios/red_inhibitor_destroyed.ogg");

type Props = {
    lastWindowFrame: WindowFrame,
    gameIndex: number,
    gameMetadata: GameMetadata,
    championsUrlWithPatchVersion: string,
    blueTeam: Team,
    redTeam: Team,
}

type StatusWatcher = {
    inhibitors: {
        blue: number,
        red: number
    }
    dragons: {
        blue: number,
        red: number
    }
    towers: {
        blue: number,
        red: number
    }
    barons: {
        blue: number,
        red: number
    }
    participants: {
        blue: WindowParticipant[]
        red: WindowParticipant[]
    }
    gameIndex: number
}

export function LiveAPIWatcher({ lastWindowFrame, gameIndex, gameMetadata, championsUrlWithPatchVersion, blueTeam, redTeam }: Props) {
    let trueBlueTeam = blueTeam
    let trueRedTeam = redTeam
    let swapTeams = blueTeam.id !== gameMetadata.blueTeamMetadata.esportsTeamId
    if (swapTeams) {
        trueBlueTeam = redTeam
        trueRedTeam = blueTeam
    }

    const [status, setStatus] = useState<StatusWatcher>({
        dragons: { blue: lastWindowFrame.blueTeam.dragons.length, red: lastWindowFrame.redTeam.dragons.length },
        gameIndex: gameIndex,
        inhibitors: { blue: lastWindowFrame.blueTeam.inhibitors, red: lastWindowFrame.redTeam.inhibitors },
        towers: { blue: lastWindowFrame.blueTeam.towers, red: lastWindowFrame.redTeam.towers },
        barons: { blue: lastWindowFrame.blueTeam.barons, red: lastWindowFrame.redTeam.barons },
        participants: { blue: lastWindowFrame.blueTeam.participants, red: lastWindowFrame.redTeam.participants }
    })

    const [firstBloodPlay] = useSound(firstblood);
    // const [initialized, setInitialized] = useState<Boolean>(false);

    useEffect(() => {
        const soundData = localStorage.getItem("sound");
        let isMuted = false;
        if (soundData) {
            if (soundData === "mute") {
                isMuted = true;
            } else if (soundData === "unmute") {
                isMuted = false;
            }
        }

        // Topo = prioridade para o som
        let isPlaying = isMuted;
        let toastArray = []

        if (status.gameIndex === gameIndex) {
            if (status.inhibitors.blue !== lastWindowFrame.blueTeam.inhibitors) {
                toastArray.push(() => { createToast(true, isPlaying, inib_red.default, "Destroyed an inhibitor", trueBlueTeam.image) })
                isPlaying = true
            }

            if (status.inhibitors.red !== lastWindowFrame.redTeam.inhibitors) {
                toastArray.push(() => { createToast(false, isPlaying, inib_blue.default, "Destroyed an inhibitor", trueRedTeam.image) })
                isPlaying = true
            }

            if (status.barons.blue !== lastWindowFrame.blueTeam.barons) {
                toastArray.push(() => { createToast(true, isPlaying, baron_blue.default, "Defeated the baron", trueBlueTeam.image) })
                isPlaying = true
            }

            if (status.barons.red !== lastWindowFrame.redTeam.barons) {
                toastArray.push(() => { createToast(false, isPlaying, baron_red.default, "Defeated the baron", trueRedTeam.image) })
                isPlaying = true
            }

            if (status.dragons.blue !== lastWindowFrame.blueTeam.dragons.length) {
                toastArray.push(() => { createToast(true, isPlaying, dragon_blue.default, "Defeated the dragon", trueBlueTeam.image) })
                isPlaying = true
            }

            if (status.dragons.red !== lastWindowFrame.redTeam.dragons.length) {
                toastArray.push(() => { createToast(false, isPlaying, dragon_red.default, "Defeated the dragon", trueRedTeam.image) })
                isPlaying = true
            }

            if (status.towers.blue !== lastWindowFrame.blueTeam.towers) {
                toastArray.push(() => { createToast(true, isPlaying, tower_red.default, "Destroyed a turret", trueBlueTeam.image) })
                isPlaying = true
            }

            if (status.towers.red !== lastWindowFrame.redTeam.towers) {
                toastArray.push(() => { createToast(false, isPlaying, tower_blue.default, "Destroyed a turret", trueRedTeam.image) })
                isPlaying = true
            }

            for (let i = 0; i < status.participants.blue.length; i++) {
                if (status.participants.blue[i].kills !== lastWindowFrame.blueTeam.participants[i].kills) {
                    toastArray.push(() => { createToast(true, isPlaying, kill.default, "Killed an enemy", `${championsUrlWithPatchVersion}${gameMetadata.blueTeamMetadata.participantMetadata[status.participants.blue[i].participantId - 1].championId}.png`, lastWindowFrame.blueTeam.participants[i].kills - status.participants.blue[i].kills) })
                    isPlaying = true
                }
            }

            for (let i = 0; i < status.participants.red.length; i++) {
                if (status.participants.red[i].kills !== lastWindowFrame.redTeam.participants[i].kills) {
                    toastArray.push(() => { createToast(false, isPlaying, kill.default, "Killed an enemy", `${championsUrlWithPatchVersion}${gameMetadata.redTeamMetadata.participantMetadata[status.participants.red[i].participantId - 6].championId}.png`, lastWindowFrame.redTeam.participants[i].kills - status.participants.red[i].kills) })
                    isPlaying = true
                }
            }
        }

        setStatus({
            dragons: { blue: lastWindowFrame.blueTeam.dragons.length, red: lastWindowFrame.redTeam.dragons.length },
            gameIndex: gameIndex,
            inhibitors: { blue: lastWindowFrame.blueTeam.inhibitors, red: lastWindowFrame.redTeam.inhibitors },
            towers: { blue: lastWindowFrame.blueTeam.towers, red: lastWindowFrame.redTeam.towers },
            barons: { blue: lastWindowFrame.blueTeam.barons, red: lastWindowFrame.redTeam.barons },
            participants: { blue: lastWindowFrame.blueTeam.participants, red: lastWindowFrame.redTeam.participants },
        })

        toastArray.forEach(toastFunction => toastFunction())

    }, [lastWindowFrame.blueTeam.totalKills, lastWindowFrame.blueTeam.dragons.length, lastWindowFrame.blueTeam.inhibitors, lastWindowFrame.redTeam.totalKills, lastWindowFrame.redTeam.dragons.length, lastWindowFrame.redTeam.inhibitors, firstBloodPlay, status.dragons.blue, status.dragons.red, status.barons.blue, status.barons.red, status.inhibitors.blue, status.inhibitors.red, status.towers.blue, status.towers.red, status.participants.blue, status.participants.red, lastWindowFrame.blueTeam.barons, lastWindowFrame.blueTeam.towers, lastWindowFrame.blueTeam.participants, lastWindowFrame.redTeam.barons, lastWindowFrame.redTeam.towers, lastWindowFrame.redTeam.participants, gameMetadata.blueTeamMetadata.participantMetadata, gameMetadata.redTeamMetadata.participantMetadata, trueBlueTeam.image, trueRedTeam.image]);

    return (
        <ToastContainer limit={10}/>
    );
}

function createToast(blueTeam: boolean, soundIsPlaying: boolean, sound: string, message: string, image: string, diff?: number) {
    if (!soundIsPlaying) {
        let audio = new Audio(sound);
        audio.load();
        audio.volume = 0.20;
        audio.play();
    }

    let toastId = `${blueTeam}_${image}_${message}_${diff}`;
    if (blueTeam) {
        toast.info(
            <div className="toast-watcher">
                <div className="toast-image">
                    <img src={image} alt="blue team" />
                </div>
                <h4 style={{ color: "#FFF" }}>{message}</h4>
            </div>
            , {
                icon: false,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
                position: toast.POSITION.TOP_LEFT,
                toastId: toastId,
                theme: "colored"
            }
        )
    } else {
        toast.error(
            <div className="toast-watcher">
                <img className="toast-image" src={image} alt="red team" />
                <h4 style={{ color: "#FFF" }}>{message}</h4>
            </div>
            , {
                icon: false,
                pauseOnHover: false,
                pauseOnFocusLoss: false,
                position: toast.POSITION.TOP_RIGHT,
                toastId: toastId,
                theme: "colored"
            }
        )
    }
}