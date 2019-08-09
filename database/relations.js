const News = require("./models/news");
const Module = require("./models/modules");
const ModuleNews = require("./models/module_news");
const Design = require("./models/design");
const User = require("./models/ugc");
const Comment = require("./models/comments");
const pageModules = require("./models/pageModules");
const mainRow = require("./models/mainRows");
const rowColumn = require("./models/rowColumns");
const columnModules = require("./models/columnModules");
const Image = require("./models/Images");
const Tag = require("./models/tag");
const Page = require("./models/pages");
const Category = require("./models/category");
const Subcategory = require("./models/subCategory");
const moduleCategory = require("./models/moduleCategories");
const moduleSubCategories = require("./models/moduleSubCategories");
const headerDesign = require("./models/headerDesign");
const headerImages = require("./models/headerImages");
const lives = require("./models/lives");
const footerDesign = require("./models/footerDeisng");
const footerLists = require("./models/footerLists");
const footerListItems = require("./models/footerListItems");
const siteUser = require("./models/siteUsers");
const Role = require("./models/roles");
const Banner = require("./models/banner");
const Share = require("./models/share");
const Redirect = require("./models/redirects");
const Attachement = require("./models/Attachments");
const breakingDesign = require("./models/breakingDesign");
const Language = require('./models/Language');
const Video = require('./models/Video');
const MainPhoto = require('./models/mainPhoto');
const sequelize = require("./config");

Module.hasMany(ModuleNews);
News.hasMany(ModuleNews);
User.hasMany(Comment);
Comment.belongsTo(User);
News.hasMany(Comment);
Comment.belongsTo(News);
pageModules.belongsTo(Module);
ModuleNews.belongsTo(Module);
ModuleNews.belongsTo(News);
mainRow.hasMany(rowColumn);
columnModules.belongsTo(rowColumn);
columnModules.belongsTo(Module);
rowColumn.hasMany(columnModules);
Module.hasMany(columnModules);
Page.hasMany(mainRow);
mainRow.belongsTo(Page);
Design.belongsTo(Page);
Page.hasMany(Design);

pageModules.belongsTo(Design);
Design.hasMany(pageModules);


//footer deisng relations
footerLists.hasMany(footerListItems);
footerListItems.belongsTo(footerLists);
footerListItems.belongsTo(Category);
footerListItems.belongsTo(Subcategory);
footerListItems.belongsTo(Page);

//module category relations
moduleCategory.belongsTo(Module);
Module.hasMany(moduleCategory);
moduleSubCategories.belongsTo(Module);
Module.hasMany(moduleSubCategories);
Category.hasMany(moduleCategory);
moduleCategory.belongsTo(Category);
Subcategory.hasMany(moduleSubCategories);
moduleSubCategories.belongsTo(Subcategory);


News.hasOne(MainPhoto);
MainPhoto.belongsTo(News);
News.belongsToMany(Image, { through: 'News_Image' });
Image.belongsToMany(News, { through: 'News_Image' });

News.belongsToMany(Video, { through: 'News_Video' });
Video.belongsToMany(News, { through: 'News_Video' });

News.belongsToMany(Attachement, { through: 'News_Attachement' });
Attachement.belongsToMany(News, { through: 'News_Attachement' })

News.belongsToMany(Category, { through: 'News_Category' });
Category.belongsToMany(News, { through: 'News_Category' });

News.belongsToMany(Subcategory, { through: 'News_Subcategory' });
Subcategory.belongsToMany(News, { through: 'News_Subcategory' });

Tag.belongsToMany(Language, { through: 'Tag_Language' });
Language.belongsToMany(Tag, { through: 'Tag_Language' });

Category.belongsToMany(Subcategory, { through: 'Category_Subcategory' });
Subcategory.belongsToMany(Category, { through: 'Category_Subcategory' });

Tag.belongsToMany(News, { through: 'News_Tag' });
News.belongsToMany(Tag, { through: 'News_Tag' });

//user roles
siteUser.belongsTo(Role);
Role.hasMany(siteUser);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch(err => {
    console.error("Unable to connect to the database:", err);
  });

sequelize
  .sync()
  .then(() => {
    console.log("created successfullly");
  })
  .catch(err => {
    console.log("someting went wrong trying to create database tables");
  });
