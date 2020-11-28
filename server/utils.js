module.exports = {
    PushRecentLink: (req, item) => {
        if(!req.session.recentLinks.link1) {
            return req.session.recentLinks.link1 = item
        }
        if(!req.session.recentLinks.link2) {
            return req.session.recentLinks.link2 = item
        }
        if(!req.session.recentLinks.link3) {
            return req.session.recentLinks.link3 = item
        }
        else {
            let oldLink1 = req.session.recentLinks.link1
            let oldLink2 = req.session.recentLinks.link2
            req.session.recentLinks.link1 = item
            req.session.recentLinks.link2 = oldLink1
            req.session.recentLinks.link3 = oldLink2
            return
        }
    },

    validURL: (str) => {
        var pattern = new RegExp('^(https?:\\/\\/)?' + // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
            '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
            '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator
        return !!pattern.test(str);
    }
}
