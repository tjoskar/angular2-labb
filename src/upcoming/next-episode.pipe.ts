import {Pipe} from 'angular2/core';

@Pipe({
    name: 'nextEpisode'
})
class NextEpisodePipe {

    transform(episodes) {
        const now = Date.now();
        const nextEpisode = episodes.find(episode => {
            return (new Date(episode.airdate)).getTime() > now;
        });

        if (nextEpisode === undefined) {
            return `I don't know :(`;
        }

        return `${nextEpisode.airdate} ${this.generateEpisodeNumber(nextEpisode.season, nextEpisode.number)} ${nextEpisode.name}`;
    }

    generateEpisodeNumber(season, episode) {
        return `S${('0' + season).slice(-2)}E${('0' + episode).slice(-2)}`;
    }

}

export default NextEpisodePipe;
export {NextEpisodePipe};
