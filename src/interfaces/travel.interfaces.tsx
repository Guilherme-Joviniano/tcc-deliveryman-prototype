export interface IntentOfTravel {
    routes: any,
    order: any
}

export interface IRoute {
    origin: number[],
    arrived: number[],
    waypoints: number[][] | null
}