const Statistic = require('../database/models/statistics');

let self = module.exports = {
    async getStatistcs(req, res) {
        let [statistics, totalVisits] = await Promise.all([
            Statistic.findAll({
                order: [['currentDate', 'DESC']],
                limit: 5
            }),
            self.findOrCreateDaily()
        ]);
        res.send({
            statistics: statistics.reverse(),
            totalVisits: totalVisits.totalVisits
        })
    },
    async addDaily(req, res) {
        try {
            let statistic = await self.findOrCreateDaily();
            statistic.totalVisits += 1;
            await statistic.save();
            res.send({
                count: statistic.totalVisits
            })
        } catch (e) {
            res.send({
                error: e
            })
        }
    },
    findOrCreateDaily() {
        return new Promise(function (resolve, reject) {
            let datetime = new Date();
            let today = datetime.toISOString().slice(0, 10);
            Statistic.findOne({where: {currentDate: today}})
                .then(async statistic => {
                    if (statistic) {
                        resolve(statistic)
                    } else {
                        resolve(await self.fillDays(5));

                    }
                }).catch(err => {
                reject(err)
            });
        });
    },
    fillDays(days = 5) {
        return new Promise(function (resolve, reject) {
            Statistic.count()
                .then(async c => {
                    if (c < days) {
                        let statistics = [];
                        for (let i = 0; i < days - c; i++) {
                            let datetime = new Date();
                            datetime.setDate(datetime.getDate() - i);
                            let date = datetime.toISOString().slice(0, 10);
                            statistics[i] = await Statistic.create({
                                currentDate: date,
                                totalVisits: 0
                            });
                            if (i === days - c - 1)

                                resolve(statistics)
                        }
                    } else {
                        let datetime = new Date();
                        let date = datetime.toISOString().slice(0, 10);
                        await Statistic.create({
                            currentDate: date,
                            totalVisits: 0
                        });
                        resolve(true)
                    }
                }).catch(err => {
                reject(err)
            })
        });
    }
};