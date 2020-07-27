# document-management-system
A Document management system written using Nodejs and Mongodb  

Prerequisite: docker and docker-compose.  

Steps to run the application:  
1) docker build -t dms .  
2) docker pull mongo  
3) docker-compose up -d  

It will start the server on 8080 and will connect to tenantregistry-dev[Mongo Db].  

Upon the start dummy data will be seeded based on the seed flag present in config files.  

If seed is set to true dummy data will be inserted to accounts collection and users collection in mongo.  

Accounts collection maintain the account info like mongo tenant to connect to and users collection contains info like email, pasword and accountId to which user belongs to.  

Dummy accounts data: [  
      {  
        "accountId" : "DMS_u001",  
        "accountName" : "Automate.io",  
        "uri" : {  
          "dms" : `mongodb://mongo:27017/automate-io`  
        },  
        "active" : true  
      },  
      {  
        "accountId" : "DMS_u002",  
        "accountName" : "test",  
        "uri" : {  
          "dms" : "mongodb://mongo:27017/test"  
        },  
        "active" : true  
      }  
    ]  
  
Dummy users data:  
[  
      {  
        provider: 'local',  
        name: 'Test User',  
        email: 'test@example.com',  
        password: 'test',  
        accountId: 'DMS_u001',  
        active: true,  
      }, {  
        provider: 'local',  
        name: 'Test User',  
        email: 'test2@example.com',  
        password: 'test2',  
        accountId: 'DMS_u002',  
        active: true,  
      },  
      {  
        provider: 'local',  
        name: 'Admin',  
        email: 'admin@example.com',  
        password: 'admin',  
        accountId: 'DMS_u001',  
        active: true,  
}]  

In mongo passwords are converted to its corresponding salt and hash.  

Since I am not able to run mongo as replica set in docker, move api wont work, as it uses transactions[WIP].  


