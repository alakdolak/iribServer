const path = require('path')
const fs = require('fs')

module.exports = {
    // 1 --> banners
    // 2 --> redirects
    // 3 --> header
    serveImages(req, res) {
        let type = parseInt(req.query.type)
        let name = req.query.name
        let filePath = ''
        switch (type) {
            case 1:
                filePath = path.resolve(global.staticPath, 'uploads', 'banners', name)
                if (fs.existsSync(filePath))
                    res.sendFile(filePath)
                else
                    res.send({
                        file: null
                    })
                break;
            case 2:
                filePath = path.resolve(global.staticPath, 'uploads', 'redirects', name)
                if (fs.existsSync(filePath))
                    res.sendFile(filePath)
                else
                    res.send({
                        file: null
                    })
                break;
                break;
            case 3:
                filePath = path.resolve(global.staticPath, 'uploads', 'headers', name)
                if (fs.existsSync(filePath))
                    res.sendFile(filePath)
                else
                    res.send({
                        file: null
                    })
                break;
                break;
            default:
                res.send({
                    file: null
                })
        }

    }
};