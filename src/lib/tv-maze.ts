import { Injectable } from 'angular2/core';
import { Http } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import { Show } from './contracts/show';

const BASE_URL = 'http://api.tvmaze.com/';

@Injectable()
class TVMaze {

    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    searchShow(query: string): Observable<Show[]> {
        return this.http
            .get(`${BASE_URL}search/shows?q=${query}`)
            .retry(3) // Naive
            .map(res => res.json())
            .map((shows: Array<{show: Show}>) => shows.map(show => show.show));
    }

    getShow(showId: number): Observable<Show> {
        return this.http
            .get(`${BASE_URL}shows/${showId}?embed=episodes`)
            .retry(3) // Naive
            .map(res => res.json())
            .map((show: Show) => {
                show.episodes = show._embedded.episodes;
                show._embedded = undefined;
                return show;
            });
    }

}

export { TVMaze };
export default TVMaze;
