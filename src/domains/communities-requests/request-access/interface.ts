import { RequestAccessToCommunityParams } from "./types";

export interface IRequestAccessToCommunity {
	execute(params: RequestAccessToCommunityParams): Promise<void>
}
