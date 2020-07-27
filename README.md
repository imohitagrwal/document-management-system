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
      &nbsp;&nbsp;&nbsp;&nbsp;{  
        &nbsp;&nbsp;&nbsp;&nbsp;"accountId" : "DMS_u001",  
        &nbsp;&nbsp;&nbsp;&nbsp;"accountName" : "Automate.io",  
        &nbsp;&nbsp;&nbsp;&nbsp;"uri" : {  
          &nbsp;&nbsp;&nbsp;&nbsp;"dms" : `mongodb://mongo:27017/automate-io`  
        &nbsp;&nbsp;&nbsp;&nbsp;},  
        &nbsp;&nbsp;&nbsp;&nbsp;"active" : true  
      &nbsp;&nbsp;&nbsp;&nbsp;},  
      &nbsp;&nbsp;&nbsp;&nbsp;{  
        &nbsp;&nbsp;&nbsp;&nbsp;"accountId" : "DMS_u002",  
        &nbsp;&nbsp;&nbsp;&nbsp;"accountName" : "test",  
        &nbsp;&nbsp;&nbsp;&nbsp;"uri" : {  
          &nbsp;&nbsp;&nbsp;&nbsp;"dms" : "mongodb://mongo:27017/test"  
        &nbsp;&nbsp;&nbsp;&nbsp;},  
        &nbsp;&nbsp;&nbsp;&nbsp;"active" : true  
      &nbsp;&nbsp;&nbsp;&nbsp;}  
    &nbsp;&nbsp;&nbsp;&nbsp;]  
  
Dummy users data:  
&nbsp;&nbsp;&nbsp;&nbsp;[  
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;provider: 'local',  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: 'Test User',  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email: 'test@example.com',  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password: 'test',  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;accountId: 'DMS_u001',  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;active: true,  
      &nbsp;&nbsp;&nbsp;&nbsp;}, {  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;provider: 'local',  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: 'Test User',  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email: 'test2@example.com',  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password: 'test2',  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;accountId: 'DMS_u002',  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;active: true,  
      &nbsp;&nbsp;&nbsp;&nbsp;},  
      &nbsp;&nbsp;&nbsp;&nbsp;{  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;provider: 'local',  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;name: 'Admin',  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;email: 'admin@example.com',  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;password: 'admin',  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;accountId: 'DMS_u001',  
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;active: true,  
&nbsp;&nbsp;&nbsp;&nbsp;}]  

In mongo passwords are converted to its corresponding salt and hash.  

Since I am not able to run mongo as replica set in docker, move api wont work, as it uses transactions[WIP].  


