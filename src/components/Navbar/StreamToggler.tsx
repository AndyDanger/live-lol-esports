import {useEffect, useState} from "react";
import './styles/navbarStyle.css'
import TagManager from 'react-gtm-module'

// Anti ESA na live do Baiano
export function StreamToggler() {
    const [toggled, setToggled] = useState(false);

    useEffect(() => {
        const streamData = localStorage.getItem("stream");
        if(streamData) {
            if (streamData === "mute") {
                setToggled(false);
            } else if (streamData === "unmute") {
                setToggled(true)
            }
        }
    }, [])

    const handleClick = () => {
        if(toggled) {
            localStorage.setItem("stream", "mute");
            TagManager.dataLayer({ dataLayer: { event: 'stream_toggled', action: 'muted'} })
        }else{
            localStorage.setItem("stream", "unmute");
            TagManager.dataLayer({ dataLayer: { event: 'stream_toggled', action: 'unmuted' } })
        }

        // let videoPlayer = document.querySelector(`#video-player`)
        // if (videoPlayer) {
        //     videoPlayer.removeAttribute(`added`)
        // }

        setToggled((s) => !s);
    }

    return (
        <div className="toggle-container">
            <div onClick={handleClick} className={`stream-toggle${toggled ? " muted" : ""}`}>
                <div className="notch">{`${toggled ? "✅" : "❌"}`}</div>
            </div>
        </div>
    );
}