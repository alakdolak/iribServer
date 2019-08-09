const Category = require('../database/models/category');
const subCategory = require('../database/models/subCategory');
const moduleCategories = require('../database/models/moduleCategories');
const moduleSubCategories = require('../database/models/moduleSubCategories');
const sequelize = require("../database/config");

module.exports = {
    async getAll(req, res) {
        try {
            let [categories, subCategories] = await Promise.all([
                Category.findAll(),
                subCategory.findAll()
            ]);
            res.send({
                categories: categories,
                subCategories: subCategories
            })
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: e
            })
        }
    },
    async getModuleData(req, res) {
        let moduleId = req.body.moduleId;
        try {
            let [categories, subCategories] = await Promise.all([
                moduleCategories.findAll({where: {moduleId: moduleId}, include: [Category]}),
		sequelize.query("select distinct(s.id), s.englishTitle, s.title, c.categoryId from Category_Subcategory c, moduleSubCategories m, subcategories s where m.moduleId = '" + moduleId + "' and m.subcategoryId = s.id and c.subcategoryId = s.id", {
			type: sequelize.QueryTypes.SELECT
		})
//		sequelize.query("select s.id, s.englishTitle, s.title, c.categoryId from Category_Subcategory c, moduleSubCategories m, subcategories s where 1", {
//			type: sequelize.QueryTypes.SELECT
//		})

                //moduleSubCategories.findAll({where: {moduleId: moduleId}, include: [subCategory]})
            ]);

		let out = [];
		let counter = 0;

		for(let i = 0; i < subCategories.length; i++) {
			
			let allow = true;
			for(let j = 0; j < out.length; j++) {
				if(out[j].id == subCategories[i].id) {
					allow = false;
					break;
				}
			}

			if(allow)
				out[counter++] = subCategories[i];

		}

            res.send({
                categories: categories,
                subCategories: out
            })
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: e
            })
        }

    },
};
