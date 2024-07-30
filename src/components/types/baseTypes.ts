export interface BaseLeague {
    name: string;
    slug: string;
}

export interface BaseStrategy {
    count: 1 | 3 | 5;
}

export interface CustomTeam {
    id: string;
    side: "blue" | "red";
}

export interface DetailsFrame {
    rfc460Timestamp: Date;
    participants: Participant[];
}

export interface Event {
    blockName: string;
    league: BaseLeague;
    match: Match;
    startTime: Date;
    state: "completed" | "unstarted" | "inProgress";
    type: "match" | "show";
}

export interface EventDetails {
    id: string;
    league: SimpleLeague;
    match: Match;
    streams?: ExtendedVod[];
    tournament: Tournament;
    type: "match" | "show"
}

export interface ExtendedGame {
    id: string;
    number: 1 | 2 | 3 | 4 | 5;
    state: "completed" | "unstarted" | "inProgress" | "unneeded";
    teams: CustomTeam[];
    vods: ExtendedVod[];
}

export interface ExtendedVod {
    coStreamer?: boolean;
    locale: string;
    offset: number;
    parameter: string;
    provider: "youtube" | "twitch" | "huya" | "afreecatv";
    mediaLocale: {
        englishName: string;
        translatedName: string;
        locale: string;
    }
}

export interface GameMetadata {
    patchVersion: string;
    blueTeamMetadata: TeamMetadata;
    redTeamMetadata: TeamMetadata;
}

export interface Match {
    games: ExtendedGame[];
    strategy: BaseStrategy;
    teams: Team[];
}

export interface Pages {
    newer: string;
    older: string;
}

export interface Participant {
    participantId: number;
    level: number;
    kills: number;
    deaths: number;
    assists: number;
    totalGoldEarned: number;
    creepScore: number;
    killParticipation: number;
    championDamageShare: number;
    wardsPlaced: number;
    wardsDestroyed: number;
    attackDamage: number;
    abilityPower: number;
    criticalChance: number;
    attackSpeed: number;
    lifeSteal: number;
    armor: number;
    magicResistance: number;
    tenacity: number;
    items: number[];
    perkMetadata: PerkMetadata;
    abilities: string[];
}

export interface ParticipantMetadata {
    participantId: number;
    esportsPlayerId: string;
    summonerName: string;
    championId: string;
    role: string;
}

export interface PerkMetadata {
    styleId: 8000 | 8100 | 8200 | 8300 | 8400;
    subStyleId: 8000 | 8100 | 8200 | 8300 | 8400;
    perks: number[];
}

export interface Ranking {
    ordinal: number;
    teams: RankingTeam[]
}

export interface RankingTeam {
    code: string;
    id: string;
    image: string;
    name: string;
    record?: Record;
    slug: string;
}

export interface Record {
    losses: number;
    wins: number;
}

export interface Result {
    gameWins: number;
    outcome?: "loss" | "win"
}

export interface Outcome {
    outcome: `win` | `loss` | undefined,
}

export interface Schedule {
    events: ScheduleEvent[];
    pages: Pages;
    updated: Date;
}

export interface ScheduleEvent {
    blockName?: string;
    league: BaseLeague;
    match: ScheduleMatch;
    startTime: Date;
    state: "completed" | "unstarted" | "inProgress";
    type: "match" | "show";
}

export interface ScheduleMatch {
    id: string;
    strategy: Strategy;
    teams: ScheduleTeam[];
}

export interface ScheduleTeam {
    code: string;
    image: string;
    name: string;
    record?: Record;
    result: Result;
}

export interface Section {
    matches: SectionMatch[];
    name: string;
    rankings: Ranking[];
}

export interface SectionMatch {
    events: Event[];
    id: string;
    pages: Pages;
    previousMatchIds?: string[];
    state: "completed" | "unstarted" | "inProgress"
    teams: SectionMatchTeam[];
}

export interface SectionMatchTeam {
    code: string;
    id: string;
    image: string;
    name: string;
    result: Result;
    slug: string;
}

export interface SimpleLeague {
    id: string;
    image: string;
    name: string;
    slug: string;
}

export interface Stage {
    name: string;
    type: "groups" | "bracket";
    slug: string;
    sections: Section[];
}

export interface Standing {
    stages: Stage[];
}

export interface Strategy {
    count: 1 | 3 | 5;
    type: "bestOf";
}

export interface Team {
    code: string;
    image: string;
    name: string;
    result: Result;
    id: string;
}

export interface TeamMetadata {
    esportsTeamId: string;
    participantMetadata: ParticipantMetadata[];
}

export interface TeamStats {
    totalGold: number;
    inhibitors: number;
    towers: number;
    barons: number;
    totalKills: number;
    dragons: string[];
    participants: WindowParticipant[];
}

export interface Tournament {
    id: string;
}

export interface Window {
    esportsGameId: string;
    esportsMatchId: string;
    gameMetaData: GameMetadata;
    frames: WindowFrame[]
}

export interface WindowFrame {
    blueTeam: TeamStats;
    gameState: "in_game" | "finished";
    rfc460Timestamp: string;
    redTeam: TeamStats;
}

export interface WindowParticipant {
    participantId: number;
    totalGold: number;
    level: number;
    kills: number;
    deaths: number;
    assists: number;
    creepScore: number;
    currentHealth: number;
    maxHealth: number;
}

export interface Item {
    name: string;
    description: string;
    colloq: string;
    plaintext: string;
    into: string[];
    gold: Gold;
}

export interface Rune {
    icon: string;
    id: number;
    key: string;
    name: string;
    slots: Array<Slot>;
}

export interface Slot {
    runes: Array<SlottedRune>;
}

export interface SlottedRune {
    icon: string;
    id: number;
    key: string;
    longDesc: string;
    name: string;
    shortDesc: string;
}

interface Gold {
    base: string;
    purchaseable: boolean;
    total: string;
    sell: string;
}