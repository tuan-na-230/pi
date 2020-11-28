const model = require('./model')
const shortid = require('shortid')
const utils = require('../../utils')
const { json } = require('body-parser')

const handlers = {
    async findMany(req, res, next) {
        let { count } = req.query
        if (count) {
            try {
                let count = await model.countDocuments()
                let countDownload = await model.countDocuments({
                    QR: true,
                })
                let data = { count, countDownload }
                return res.status(200).json(data)
            } catch (err) {
                next(err)
            }
        }
        if (!count) {
            try {
                let link = await model.find({})
                return res.status(200).json(link)
            } catch (err) {
                next(err)
            }
        }
    },
    async findOne(req, res, next) {
        try {
            let shortLink = process.env.DOMAIN + req.params.shortLink
            let item = await model.find({ shortLink: shortLink })
            if (!item[0]) {
                return res.redirect('/not-found')
            }
            if (item) {
                return res.redirect(item[0].fullLink)
            }
        } catch (err) {
            next(err)
        }
    },
    async create(req, res, next) {
        if (utils.validURL(req.body.fullLink)) {
            try {
                let fullLink = req.body.fullLink
                shortid.characters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ@&');
                let shortLink = process.env.DOMAIN + shortid.generate()
                let data = {
                    fullLink: fullLink,
                    shortLink: shortLink
                }
                let item = await model.create(data)
                if (!req.session.recentLinks) {
                    req.session.recentLinks = {
                        "link1": null,
                        "link2": null,
                        "link3": null,
                    }
                }
                utils.PushRecentLink(req, item)
                res.status(200).json(item)
            } catch (err) {
                next(err)
            }
        }
        else {
            return res.status(500)
        }
    },
    async findByID(req, res, next) {
        try {
            let id = req.params.id
            let item = await model.findById(id)
            return res.status(200).json(item)
        } catch (err) {
            next(err)
        }
    },
    async GetRecentLinks(req, res, next) {
        try {
            if (req.session.recentLinks) {
                let { link1, link2, link3 } = req.session.recentLinks
                let list = [link1, link2, link3]
                return res.send(list)
            }
            else {
                return res.send([])
            }
        } catch (err) {
            next(err)
        }
    },
    async plusCountQRDownload(req, res, next) {
        let id = req.body.id
        try {
            let link = await model.findById(id);
            let count = link.count;
            try {
                await model.findByIdAndUpdate(id, { count: count + 1, QR: true })
                return res.status(200);
            }
            catch (err) {
                next(err)
            }
        }
        catch (err) {
            next(err)
        }
    }
}

module.exports = handlers