import { League } from "./league.interface";

export interface FixturesResponseData {
	errors: [],
	get: string,
	paging: {
    current: number,
    total: number
  },
	parameters: {
    last: string
    season: string,
		team: string
  },
	response: FixturesResponse[],
	results: number
}

export interface FixturesResponse {
	teams: { home: TeamModel; away: TeamModel };
	goals: { home: number; away: number };
	league: League;
	fixture: FixtureModel;
}

export interface TeamModel {
	id: number;
	name: string;
	logo: string;
	winner?: boolean;
}

export interface FixtureModel {
	id: number,
	referee?: string,
	timezone: string,
	date: string,
	timestamp: number,
	periods: {
		first: number,
		second?: number
	},
	venue: {
		id: number,
		name: string,
		city: string
	},
	status: {
		long: string,
		short: string,
		elapsed: number
	}
}
