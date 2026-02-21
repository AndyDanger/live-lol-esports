import axios from "axios";

//export const ITEMS_URL = "https://ddragon.leagueoflegends.com/cdn/14.3.1/img/item/"
// export const CHAMPIONS_URL = "https://ddragon.bangingheads.net/cdn/14.3.1/img/champion/"
// const ITEMS_JSON_URL = `https://ddragon.leagueoflegends.com/cdn/14.3.1/data/en_US/item.json`
export const ITEMS_URL = "https://ddragon.leagueoflegends.com/cdn/PATCH_VERSION/img/item/"
export const CHAMPIONS_URL = "https://ddragon.leagueoflegends.com/cdn/PATCH_VERSION/img/champion/"
export const RUNES_JSON_URL = "https://ddragon.leagueoflegends.com/cdn/PATCH_VERSION/data/en_US/runesReforged.json"
export const ITEMS_JSON_URL = `https://ddragon.leagueoflegends.com/cdn/PATCH_VERSION/data/en_US/item.json`

const API_URL_PERSISTED = "https://esports-api.lolesports.com/persisted/gw"
const API_URL_LIVE = "https://feed.lolesports.com/livestats/v1"
const API_KEY = "0TvQnueqKa5mxJntVWt0w4LpLfEkrV1Ta8rQBb9Z"

let secondDelay = 60
let count = 0
let failureCount = 0

export function getScheduleResponse() {
    return axios.get(`${API_URL_PERSISTED}/getSchedule?hl=en-US`, {
        headers: {
            "x-api-key": API_KEY,
        },
    })
}

export function getWindowResponse(gameId: string, date?: string) {
    return axios.get(`${API_URL_LIVE}/window/${gameId}`, {
        params: {
            "startingTime": date,
        },
        headers: {
        },
    }).catch(function (error) {
        if (error.response) {
            // Request made and server responded
            console.error(error.response.data);
            //   console.error(error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
        }
    })
}

export function getGameDetailsResponse(gameId: string, date: string, lastFrameSuccess: boolean) {
    if (count++ % 10 === 0) {
        failureCount = 0
        secondDelay -= 10
    }
    if (lastFrameSuccess) {
        failureCount = 0
    } else {
        failureCount++
    }
    return axios.get(`${API_URL_LIVE}/details/${gameId}`, {
        params: {
            "startingTime": date,
        },
        headers: {
        },
    }).catch(function (error) {
        if (error.response) {
            // Request made and server responded
            console.error(error.response.data);
            if (!error.response.data.message.includes(`window with end time less than`) || failureCount < 6) return
            count = 1
            failureCount = 0
            secondDelay += 10
        } else if (error.request) {
            // The request was made but no response was received
            console.error(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error', error.message);
        }
    })
}

export function getEventDetailsResponse(gameId: string) {
    return axios.get(`${API_URL_PERSISTED}/getEventDetails`, {
        params: {
            "hl": "en-US",
            "id": gameId,
        },
        headers: {
            "x-api-key": API_KEY,
        },
    })
}

export function getStandingsResponse(tournamentId: string) {
    return axios.get(`${API_URL_PERSISTED}/getStandings`, {
        params: {
            "hl": "en-US",
            "tournamentId": tournamentId,
        },
        headers: {
            "x-api-key": API_KEY,
        },
    })
}

export function getDataDragonResponse(JSON_URL: string, formattedPatchVersion: string) {
    return axios.get(JSON_URL.replace(`PATCH_VERSION`, formattedPatchVersion))
}

export function getISODate() {
    const date = new Date();
    date.setMilliseconds(0);
    date.setSeconds(date.getSeconds() - secondDelay);
    return date.toISOString();
}

export function getISODateMultiplyOf10() {
    const date = new Date();
    date.setMilliseconds(0);

    if (date.getSeconds() % 10 !== 0) {
        date.setSeconds(date.getSeconds() - (date.getSeconds() % 10));
    }

    date.setSeconds(date.getSeconds() - secondDelay);

    return date.toISOString();
}

export function getFormattedPatchVersion(patchVersion: string) {
    return patchVersion.split(`.`).slice(0, 2).join(`.`) + `.1`
}
