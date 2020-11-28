const express = require("express")
const path = require('path')

const router = new express.Router()

const linkHandlers = require("./modules/link")

router.get("/not-found", (req, res) => {
    res.send(`<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Not Found</title>
    </head>
    <style>
        .not-found {
            font-family: "Proxima Nova", Arial, sans-serif;
            text-align: center;
            margin-top: 100px;
            color: #36383b;
        }
    
        .not-found-img {
            width: 200px;
            height: auto;
            padding: 0px 0px 50px 0px;
        }
    
        .not-found-info {
            margin: 0px 300px;
            text-align: center;
        }
    
        @media only screen and (min-width: 768px) and (max-width: 1023px) {
            .not-found-info {
                margin: 0px 200px;
            }
        }
    
        @media only screen and (min-width: 360px) and (max-width: 768px) {
            .not-found-info {
                margin: 0px 0px;
            }
        }
    
        .not-found-title {
            padding: 0px 0px 16px 0px;
            margin: 0px;
        }
    
        .not-found-title h1 {
            font-size: 64px;
        }
    
        .not-found-content {
            font-size: 20px;
            font-weight: 500;
            line-height: 1.2;
            opacity: .7;
            padding: 0px 50px 0px 50px;
            margin: 0 auto;
        }
    </style>
    
    <body>
        <div class="not-found">
            <img src="assets/img/dinosaur.ed5c82c5e2ec346b340fac180c27be9d.png" alt="dinosaur-not-found" class="not-found-img"></img>
            <div class="not-found-info">
                <div class="not-found-title">
                    <h1>Có sự nhầm lẫn ở đây!</h1>
                </div>
                <div class="not-found-content">
                    <p>Đây là lỗi 404, dường bạn đã click vào 1 đường link không đúng. Hãy kiểm tra lại nó, hoặc bạn có thể
                        tìm thấy sự giúp đỡ <a href=${process.env.DOMAIN}>tại đây</a></p>
                </div>
            </div>
        </div>
    </body>
    
    </html>`)
})

router.post("/qrcode", linkHandlers.plusCountQRDownload)

router.get('/statistical', linkHandlers.findMany)

router.get("/recentLinks", linkHandlers.GetRecentLinks)

router.get('/links/:id', linkHandlers.findByID)

router.get("/:shortLink", linkHandlers.findOne)

router.post('/', linkHandlers.create)

router.get("/", (res, req) => {
    res.send(index.html)
})

module.exports = router