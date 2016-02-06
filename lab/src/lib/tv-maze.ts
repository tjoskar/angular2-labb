import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Observable} from 'rxjs/Observable';

const BASE_URL = 'http://api.tvmaze.com/';

@Injectable()
class TVMaze {

    http: Http;

    constructor(http: Http) {
        this.http = http;
    }

    searchShow(query: string): Observable<any> {
        return this.http
            .get(`${BASE_URL}search/shows?q=${query}`)
            .map(res => res.json())
            .map((shows: Array<{show: any}>) => shows.map(show => show.show))
            .map((shows: any[]) => shows.map(show => {
                show.premiered = new Date(show.premiered);
                return show;
            }));
    }

}

export {TVMaze};
export default TVMaze;
