const VideoStorage = require('../storages/VideoStorage');

const fs = require('fs');
const path = require('path');


module.exports = {

    scan() {
        VideoStorage.clear();

        let fileList = this.getFileList(this.getVideoFolderPath(), 0);
        this.fillStorages(fileList);
    },

    fillStorages(fileList) {
        let that = this;


        fileList.forEach((value) => {
            if (value.type === 'video') {
                that.fillStoragesForVideoFile(value.file.replace(that.getVideoFolderPath(true), ''));
            }
        });
    },

    fillStoragesForVideoFile(file) {
        const parts = file.split('/');

        if (parts.length === 3) {
            VideoStorage.add(parts[0], parts[1], 'default', parts[3])
        } else if (parts.length === 4) {
            VideoStorage.add(parts[0], parts[1], parts[2], parts[3])
        }

    },

    getFileList(dir, level) {
        let results = [];
        let list = fs.readdirSync(dir);
        let that = this;
        list.forEach(function(file) {
            file = dir + '/' + file;
            let stat = fs.statSync(file);
            if (stat && stat.isDirectory()) {
                results = results.concat(that.getFileList(file, level+1));
            } else {
                const extension = path.extname(file);
                if (that.getSupportedExtensions().includes(extension)) {
                    results.push({
                        type: 'video',
                        file: file
                    });
                }
            }
        });
        return results;
    },

    getVideoFolderPath(withEndingSlash = false) {
        return './../videos' + (withEndingSlash ? '/' : '');
    },

    getSupportedExtensions() {
        return [
            '.ogg',
            '.mp4',
            '.avi'
        ];
    },

};