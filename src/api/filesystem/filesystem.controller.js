const FileSystem = require("./filesystem.model");

async function mkdir(req, res) {
    try {
        const {
            path
        } = req.body;

        if(!path){
            return res.status(400).send("Path is Missing.");
        }
        const FileSystemModel = await FileSystem.getModel(req.user);
        const parent = getParent(path)

        const dirSys = {
            parent,
            path,
            type: "folder",
            createdBy: req.user._id
        }

        await FileSystemModel.create(dirSys)
        return res.status(200).send("Folder created");

    } catch (err) {
        console.error(err)
        return res.status(500).send("internal server error.")
    }
}

async function ls(req, res){
    try{
        const FileSystemModel = await FileSystem.getModel(req.user);
        const { path, cmd } = req.body;
        if(!path){
            path = "/"
        }
        let query = {parent:path}
        
        if (cmd == "file"){
            query["type"] = "file"
        }else if(cmd == "folder"){
            query["type"] = "folder"
        }

        const list = await FileSystemModel.find(query).lean()
        return res.status(200).send(list);
    }catch(err){
        console.error(err)
        return res.status(500).send("internal server error.")
    }
}

async function touch(req, res){
    try{
        const {content, path} = req.body;
        
        if(!content || !path){
            return res.status(400).send("Bad Req.")
        }

        const FileSystemModel = await FileSystem.getModel(req.user);
        let parent = getParent(path)

        const file = {
            parent,
            path,
            type: "file",
            content,
            createdBy: req.user._id
        }

        await FileSystemModel.create(file)
        return res.status(200).send("File created");
    }catch(err){
        console.log(err);
        return res.status(500).send("internal server error.");
    }
}

async function mv(req, res){
    const FileSystemModel = await FileSystem.getModel(req.user);
    let session = await FileSystemModel.startSession();
    session.startTransaction();
    try{

        const opts = {session}
        const {filePath, folderPath} = req.body;
        const [file, folder] = await Promise.all([
            FileSystemModel.findOne({path: filePath, type:"file"}),
            FileSystemModel.findOne({path: folderPath, type:"folder"})
        ])
        if(!file){
            return res.status(400).send("File doesn't exist.")
        }

        if(!folder){
            return res.status(400).send("Folder doesn't exist.");
        }
        const fileName = filePath.split("/").pop()
        const newFilePath = `${folderPath}/${fileName}`;
    
        const newFile = {
            "parent": folderPath,
            "path": newFilePath,
            "type": "file",
            "content": file["content"],
            "createdBy": req.user._id
        }
        await FileSystemModel.create([newFile], opts);
        await FileSystemModel.remove({_id: file["_id"]},opts);
        await session.commitTransaction();
        session.endSession();
        return res.status(200).send("File moved successfully.");
    
    }catch(err){
        console.error(err);
        await session.abortTransaction();
        session.endSession();
        return res.status(500).send(err);
    }
}

function getParent(path){
    const n = path.lastIndexOf('/');
    return path.substring(0, n+1);
}

module.exports = {
    mkdir,
    ls,
    touch,
    mv,
}