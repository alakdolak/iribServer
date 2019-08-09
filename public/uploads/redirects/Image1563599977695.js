
module.exports = (sequelize, Sequelize)=>{
 // Definiotion of News Model which contains 'news' as promise, {attributes which 
// contains fileds name and types}, {options which is used to active or deactive createdTime and createdDate 
// or freeze tablename},
const News = sequelize.define('news', 
  
{ 
 

  title :{
    
    type: Sequelize.STRING, 

},
title2 :{
    
  type: Sequelize.STRING, 

},

  
  lead: 
  {
    type:Sequelize.TEXT
  },
  content:
  {
    type: Sequelize.TEXT
  },
  
  wired: 
  {
    type:Sequelize.INTEGER,
    
  },

  creatorId:{

    type:Sequelize.STRING,
  },

  wiredBy:{
    type:Sequelize.STRING,

  },

  publishedBy:{
    
    type:Sequelize.STRING,

  },
  status: 
  {
    type:Sequelize.INTEGER,
    
  },
 
  point: {
    type: Sequelize.INTEGER
},
  score: {
    type: Sequelize.INTEGER,
    defaultValue: 0
},

rows:{
  
  type: Sequelize.INTEGER,
  defaultValue: 0

},

viewed: {
    type: Sequelize.INTEGER,
    defaultValue: 0
},
senderName:{

  type: Sequelize.STRING,
},
senderId:{

  type: Sequelize.STRING,
},
recipientName:{

  type: Sequelize.STRING,
},
recipientId:{

  type: Sequelize.STRING,
},

read :{
    
        type: Sequelize.BOOLEAN ,
         
    
    },
delivered :{
    
    type: Sequelize.BOOLEAN ,
     

},

seen :{
    
    type: Sequelize.BOOLEAN ,
     

},

archived:{

  type: Sequelize.BOOLEAN
},

attachement :{

  type: Sequelize.BOOLEAN ,
}

}, 
 
 
 {    
  
  freezeTableName: true,

  // define the table's name
  tableName: 'news',
  paranoid: true,

  // Enable optimistic locking.  When enabled, sequelize will add a version count attribute
  // to the model and throw an OptimisticLockingError error when stale instances are saved.
  // Set to true or a string with the attribute name you want to use to enable.
  
})

return News;

}