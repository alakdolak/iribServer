const Weather = require('../database/models/weather');

module.exports = {
    getWeather(req, res) {
        Weather.findByPk(1)
            .then(data => {
                res.send({
                    weather: data
                })
            }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    },
    updateWeather(req, res) {
        let {backgroundColor, color, ipLocationUrl, ipLocationEnable, locationAutomatic, location, appKey} = req.body;
        Weather.findByPk(1)
            .then(weather => {
                weather.backgroundColor = backgroundColor;
                weather.color = color;
                weather.ipLocationUrl = ipLocationUrl;
                weather.ipLocationEnable = ipLocationEnable;
                weather.locationAutomatic = locationAutomatic;
                weather.location = location;
                weather.appKey = appKey;
                weather.save()
                    .then(data => {
                        res.send({
                            weather: data
                        })
                    }).catch(err => {
                    console.log(err);
                    res.status(500).send({
                        error: err
                    });
                })
            }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    }
};