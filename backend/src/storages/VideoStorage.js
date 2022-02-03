let videoListStorage = [];

module.exports = {

    get () {
        return videoListStorage;
    },

    getTags() {
        const output = [];

        for (let key in videoListStorage) {
            output.push(key);
        }

        return output;
    },

    getTutorials(tag) {

        if (typeof videoListStorage[tag] === 'undefined') {
            return null;
        }

        const output = [];

        for (let key in videoListStorage[tag]) {
            output.push(key);
        }

        return output;
    },

    add(tag, tutorial, lesson, video) {
        if (typeof videoListStorage[tag] === 'undefined') {
            videoListStorage[tag] = [];
        }
        if (typeof videoListStorage[tag][tutorial] === 'undefined') {
            videoListStorage[tag][tutorial] = [];
        }
        if (typeof videoListStorage[tag][tutorial][lesson] === 'undefined') {
            videoListStorage[tag][tutorial][lesson] = [];
        }

        let elements = videoListStorage[tag][tutorial][lesson];
        elements.push(video);
        videoListStorage[tag][tutorial][lesson] = Array.from(new Set(elements));

    },

    clear() {
        videoListStorage = []
    }


};
