let express = require("express");
let router = express.Router();
// let top = 0;

const News = require("../database/models/news");
const Module = require("../database/models/modules");
const ModuleNews = require("../database/models/module_news");
const Design = require("../database/models/design");
const mainRows = require("../database/models/mainRows");
const rowColumns = require("../database/models/rowColumns");
const columnModules = require("../database/models/columnModules");
const Page = require("../database/models/pages");
const Category = require("../database/models/category");
const subCategory = require("../database/models/subCategory");
const headerDesign = require("../database/models/headerDesign");
const footerDesign = require("../database/models/footerDeisng");
const lives = require("../database/models/lives");
const footerList = require("../database/models/footerLists");
const role = require("../database/models/roles");
const siteUser = require("../database/models/siteUsers");
const Share = require("../database/models/share");
const Weather = require("../database/models/weather");
const breakingDesign = require("../database/models/breakingDesign");

router.get("/", async function (req, res) {
  for (let i = 0; i < 10; i++) {
    let title = "Title " + (i + 1);
    let description = "#" + (i + 1);
    description +=
      "Lorem ipsum dolor sit amet, his lobortis abhorreant ne, eum cu mazim tritani. Qui ne nusquam fabellas voluptaria, ut alia simul pertinax vel, qui an quot facilis. Per prodesset efficiendi ea, \n aeterno officiis vis ea, cu eros blandit conceptam his. No qui bonorum reprimique persequeris. In recusabo praesent vis, pri tempor sensibus facilisis ei.\n Dico epicuri an est, at his hinc admodum mnesarchum.";
    let point = Math.floor(Math.random() * 11);
    let title2 = "Title2 for news id  " + (i + 1);
    let lead = "lead for news id  " + (i + 1);

    await News.create({
      title: title,
      content: description,
      point: point,
      lead: lead,
      title2: title2,
      status: 2
    });
  }

  lives.create({
    url: "http://wpc.785F5.zetacdn.net/24785F5/kurdish/kurdishStream.m3u8",
    name: "test2"
  });
  lives.create({
    url: "http://wpc.785F5.zetacdn.net/24785F5/azeri/azeriStream.m3u8",
    name: "ALalam"
  });

  // header and footer design initializing
  await headerDesign.create();
  await footerDesign.create();
  await breakingDesign.create();

  await role.create({
    name: "admin",
    description: "admin"
  });
  await role.create({
    name: "test",
    description: "just testing here"
  });

  await Weather.create();

  await siteUser.create({
    username: "admin",
    name: "Saman Ahmadian Rad",
    password: "$2a$10$aoalzHlmc2qHefXCq/2YjOhdaeANwsxcLicotJ2pkXNbLTUeS/Axi",
    siteRoleId: 1
  });
  await siteUser.create({
    username: "test",
    name: "test",
    password: "$2a$10$aoalzHlmc2qHefXCq/2YjOhdaeANwsxcLicotJ2pkXNbLTUeS/Axi",
    siteRoleId: 1
  });

  for (let i = 0; i < 3; i++) {
    footerList.create({
      title: "title"
    });
  }

  await Page.create({
    name: "main",
    type: 0,
    redirectable: true
  });

  await Page.create({
    name: "details",
    type: 1,
    redirectable: false
  });

  await Page.create({
    name: "Tags",
    type: 0,
    redirectable: false
  });

  await Page.create({
    name: "Sub Categories",
    type: 0,
    redirectable: false
  });


  await Module.create({
    name: "Tags Data",
    type: 4
  });

  await Module.create({
    name: "Sub Categories Data",
    type: 5
  });

  await Module.create({
    name: "Comments",
    type: 1
  });
  await Module.create({
    name: "Tags",
    type: 2
  });
  await Module.create({
    name: "Related Articles",
    type: 3
  });



  let top = await Module.create({
    name: "Top 10 News"
  });
  let trending = await Module.create({
    name: "Trending News"
  });

  for (let i = 0; i < 6; i++) {
    await ModuleNews.create({
      moduleId: top.id,
      newsId: i + 1,
      status: 1
    });
  }

  for (let i = 0; i < 6; i++) {
    await ModuleNews.create({
      moduleId: trending.id,
      newsId: i + 1,
      status: 1
    });
  }

  await Design.create({
    pageId: 2,
    sidebar: false,
    sidebar_size: 1,
    direction: false
  });

  shares = [
    {
      name: "email",
      title: "Email",
      icon: "fa-envelope"
    },
    {
      name: "facebook",
      title: "Facebook",
      icon: "fa-facebook"
    },
    {
      name: "googleplus",
      title: "Google +",
      icon: "fa-google-plus"
    },
    {
      name: "linkedin",
      title: "LinkedIn",
      icon: "fa-linkedin"
    },
    {
      name: "pinterest",
      title: "Pinterest",
      icon: "fa-pinterest"
    },
    {
      name: "reddit",
      title: "Reddit",
      icon: "fa-reddit"
    },
    {
      name: "skype",
      title: "Skype",
      icon: "fa-skype"
    },
    {
      name: "telegram",
      title: "Telegram",
      icon: "fa-telegram"
    },
    {
      name: "twitter",
      title: "Twitter",
      icon: "fa-twitter"
    },
    {
      name: "vk",
      title: "VKontakte",
      icon: "fa-vk"
    },
    {
      name: "weibo",
      title: "Weibo",
      icon: "fa-weibo"
    },
    {
      name: "whatsapp",
      title: "Whatsapp",
      icon: "fa-whatsapp"
    }
  ];
  for (let i = 0; i < shares.length; i++) Share.create(shares[i]);

  res.send("done");
});

/* GET home page. */
router.get("/news", async function (req, res, next) {
  for (let i = 0; i < 10; i++) {
    let title = "Title " + (i + 1);
    let description = "#" + (i + 1);
    description +=
      "Lorem ipsum dolor sit amet, his lobortis abhorreant ne, eum cu mazim tritani. Qui ne nusquam fabellas voluptaria, ut alia simul pertinax vel, qui an quot facilis. Per prodesset efficiendi ea, \n aeterno officiis vis ea, cu eros blandit conceptam his. No qui bonorum reprimique persequeris. In recusabo praesent vis, pri tempor sensibus facilisis ei.\n Dico epicuri an est, at his hinc admodum mnesarchum.";
    let point = Math.floor(Math.random() * 11);

    await News.create({
      title: title,
      content: description,
      point: point,
      status: 2
    });
  }

  for (let i = 0; i < 10; i++) {
    await ModuleNews.create({
      moduleId: top.id,
      newsId: i + 1,
      status: 0
    });
  }

  for (let i = 0; i < 6; i++) {
    await ModuleNews.create({
      moduleId: trending.id,
      newsId: i + 1,
      status: 0
    });
  }

  res.send("done");
});

router.get("/modules", function (req, res, next) {
  Module.create({
    name: "comments",
    type: true
  });
  Module.create({
    name: "Related Articles",
    type: true
  });
  Module.create({
    name: "Comments"
  });
  Module.create({
    name: "Top 10 News"
  });
  Module.create({
    name: "Trending News"
  });

  res.send("done");
});

router.get("/moduleNews", function (req, res, next) {
  for (let i = 0; i < 30; i++) {
    ModuleNews.create({
      moduleId: 1,
      newsId: i + 1,
      status: 0
    });
  }
  res.send("done");
});

router.get("/design", async function (req, res, next) {

  await mainRows.create({
    pageId: 1,
    title: "",
    order: 2,
    fluid: 1,
    type: 0
  });

  await mainRows.create({
    pageId: 1,
    title: "Editor's Choice",
    order: 3,
    fluid: 0,
    type: 0
  });

  await mainRows.create({
    pageId: 1,
    title: "",
    order: 1,
    fluid: 0,
    type: 1,
    height: 1450,
    width: 350,
    right: 10,
    top: 380
  });
  await mainRows.create({
    pageId: 1,
    title: "MODULE TITLE | CATEGORY 1",
    order: 4,
    fluid: 0,
    type: 0
  });
  await rowColumns.create({
    size: 12,
    module_type: 0,
    column_type: 0,
    mainRowId: 1
  });
  await rowColumns.create({
    size: 10,
    module_type: 0,
    column_type: 1,
    mainRowId: 2
  });
  await rowColumns.create({
    size: 2,
    module_type: 0,
    column_type: 0,
    mainRowId: 2
  });
  await rowColumns.create({
    size: 4,
    module_type: 0,
    column_type: 0,
    mainRowId: 3
  });
  await rowColumns.create({
    size: 4,
    module_type: 0,
    column_type: 0,
    mainRowId: 4
  });
  await rowColumns.create({
    size: 8,
    module_type: 0,
    column_type: 2,
    mainRowId: 4
  });
  await columnModules.create({
    module_type: 4,
    show_title: 0,
    rowColumnId: 1,
    moduleId: 6
  });
  await columnModules.create({
    module_type: 3,
    show_title: 0,
    rowColumnId: 2,
    moduleId: 6
  });
  await columnModules.create({
    module_type: 3,
    show_title: 0,
    rowColumnId: 2,
    moduleId: 6
  });
  await columnModules.create({
    module_type: 3,
    show_title: 0,
    rowColumnId: 2,
    moduleId: 6
  });
  await columnModules.create({
    module_type: 3,
    show_title: 0,
    rowColumnId: 2,
    moduleId: 6
  });
  await columnModules.create({
    module_type: 3,
    show_title: 0,
    rowColumnId: 2,
    moduleId: 6
  });
  await columnModules.create({
    module_type: 3,
    show_title: 0,
    rowColumnId: 2,
    moduleId: 6
  });
  await columnModules.create({
    module_type: 0,
    show_title: 1,
    rowColumnId: 4,
    moduleId: 6
  });
  await columnModules.create({
    module_type: 0,
    show_title: 1,
    rowColumnId: 4,
    moduleId: 6
  });
  await columnModules.create({
    module_type: 0,
    show_title: 1,
    rowColumnId: 4,
    moduleId: 6
  });
  await columnModules.create({
    module_type: 0,
    show_title: 1,
    rowColumnId: 4,
    moduleId: 6
  });
  await columnModules.create({
    module_type: 4,
    show_title: 0,
    rowColumnId: 6,
    moduleId: 6
  });
  await columnModules.create({
    module_type: 4,
    show_title: 0,
    rowColumnId: 6,
    moduleId: 6
  });
  await columnModules.create({
    module_type: 4,
    show_title: 0,
    rowColumnId: 6,
    moduleId: 6
  });
  await columnModules.create({
    module_type: 4,
    show_title: 0,
    rowColumnId: 6,
    moduleId: 6
  });
  await columnModules.create({
    module_type: 4,
    show_title: 0,
    rowColumnId: 6,
    moduleId: 6
  });
  await columnModules.create({
    module_type: 4,
    show_title: 0,
    rowColumnId: 6,
    moduleId: 6
  });
  await columnModules.create({
    module_type: 4,
    show_title: 0,
    rowColumnId: 6,
    moduleId: 6
  });
  await columnModules.create({
    module_type: 1,
    show_title: 0,
    rowColumnId: 5,
    moduleId: 7
  });

  res.send("done");
});

router.get("/share", function (req, res) {
  shares = [
    {
      name: "email",
      title: "Email",
      icon: "fa-envelope"
    },
    {
      name: "facebook",
      title: "Facebook",
      icon: "fa-facebook"
    },
    {
      name: "googleplus",
      title: "Google +",
      icon: "fa-google-plus"
    },
    {
      name: "linkedin",
      title: "LinkedIn",
      icon: "fa-linkedin"
    },
    {
      name: "pinterest",
      title: "Pinterest",
      icon: "fa-pinterest"
    },
    {
      name: "reddit",
      title: "Reddit",
      icon: "fa-reddit"
    },
    {
      name: "skype",
      title: "Skype",
      icon: "fa-skype"
    },
    {
      name: "telegram",
      title: "Telegram",
      icon: "fa-telegram"
    },
    {
      name: "twitter",
      title: "Twitter",
      icon: "fa-twitter"
    },
    {
      name: "vk",
      title: "VKontakte",
      icon: "fa-vk"
    },
    {
      name: "weibo",
      title: "Weibo",
      icon: "fa-weibo"
    },
    {
      name: "whatsapp",
      title: "Whatsapp",
      icon: "fa-whatsapp"
    }
  ];
  for (let i = 0; i < shares.length; i++) Share.create(shares[i]);
  res.send("done");
});

module.exports = router;
