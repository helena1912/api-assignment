const pactum = require('pactum');

module.exports = {
    idGenerator: function () {

        function DateNo() {
            var d = new Date();
            var dd = String(d.getDate());
            var mm = String(d.getMonth() + 1);
            var yyyy = String(d.getFullYear());
            return yyyy + mm + dd;
        }
        function ranNo() {
            return Math.floor(Math.random() * 9000000000)
        };
        return parseInt(DateNo() + ranNo());
    },

    nameGenerator: function (prefix) {
        const num = 10;
        return prefix + '_' + randomName(num);
    },

    tagsGenerator: function (quantity) {
        var tags = []
        const num = 10;
        
        for (let i = 0; i < quantity; i++){
            tagInfo = {
                "id": this.idGenerator(),
                "name": this.nameGenerator('Tag')
            }
            tags[i] =  tagInfo
        }
        
        return tags

    },

    photoGenerator: function(quantity){
        
        const list = [
            "https://unsplash.com/photos/pJILiyPdrXI",
            "https://unsplash.com/photos/DwTZwZYi9Ww",
            "https://unsplash.com/photos/2fl-ocJ5MOA",
            "https://unsplash.com/photos/YnfGtpt2gf4",
            "https://unsplash.com/photos/9VWOr22LhVI",
            "https://unsplash.com/photos/t1mqA3V3-7g",
            "https://unsplash.com/photos/eLUegVAjN7s",
            "https://unsplash.com/photos/kmF_Aq8gkp0",
            "https://unsplash.com/photos/yZf1quatKCA",
            "https://unsplash.com/photos/llYg8Ni43fc",
            "https://unsplash.com/photos/A6S-q3D67Ss",
            "https://unsplash.com/photos/d-Cr8MEW5Uc",
            "https://unsplash.com/photos/xS_RzdD5CFE",
            "https://unsplash.com/photos/asrWX-lU3RE"
        ]
        var imageList = list.slice(0,quantity);
        return imageList
    },

    randomStatus: function(){
        const status = ['available', 'pending', 'sold'];
        return status[Math.floor(Math.random() * status.length)]
    }

    


}

function randomName (num) {
    let name = '';
    for (let i = 0; i < num; i++) {
        const random = Math.floor(Math.random() * 27);
        name += String.fromCharCode(97 + random);
    };
    return name;
};


