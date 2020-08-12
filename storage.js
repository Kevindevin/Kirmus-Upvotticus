const STORAGE = require('node-persist');

class Storage {
    init = async () => {
        await STORAGE.init({dir: './'});
    }

     upvote = async () => {
        let currScore = await this.score();
        STORAGE.setItem('score', ++currScore)
    }

    downvote = async () => {
        let currScore = await this.score();
        STORAGE.setItem('score', --currScore)
    }

    score = async () => {
        let currScore = await STORAGE.getItem('score');
        return currScore || 0;
    }

}

module.exports = new Storage()
