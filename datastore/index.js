const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err,id)=>{
    if(err){
      // throw ("Error creating");
      callback(err);
    } else {
      fs.writeFile(`${exports.dataDir}/${id}.txt`,text, (err) => {
        if (err) {
          // throw ("Error writing file");
          callback(err);
        } else {
          //items[id] = text;
          callback(null, { id, text });
        }
      });
    }
  });
};
exports.readAll = (callback) => {

  fs.readdir(exports.dataDir, (err,files) => {
    if (err) {
      // throw ("Error readiing all");
      callback(err);
    } else {
      files = files.map(file => {
        let id = file.substring(0, file.length - 4);
        return {id: id, text: id}; 
      });
      callback(null,files);
    }
  });

  // var files = _.map(dataDir, (text, id) => {
  //   return { id, text };
  // });
  // callback(null, files);
};

exports.readOne = (id, callback) => {
  //use id to locate correct file
  //call rs.readFile on the correct file
  //use our callback to read content
  fileEnd = id + ".txt";
  file = path.join(exports.dataDir, fileEnd);
  fs.readFile(file, (err,text) => {
    if (err) {
      callback(err);
    } else {
      callback(null, { id:id, text: text.toString() });
    }
  });
};

exports.update = (id, text, callback) => {
  // find the file by id 
  // overwrite the text //fs write file

  //fileEnd = id + ".txt";
  //file = path.join(exports.dataDir, fileEnd);
  fs.readFile(path.join(exports.dataDir, id )+'.txt', (err) => {
    if (err) {
      callback(err);
    } else {
      fs.writeFile(path.join(exports.dataDir, id )+'.txt', text, (err)=> {
        if (err){
          callback(err);
        } else {
          callback(null, { id, text});
        }
      });
    }
  });
};

exports.delete = (id, callback) => {
  fileEnd = id + ".txt";
  file = path.join(exports.dataDir, fileEnd);
  fs.unlink(file,callback);

  // var item = items[id];
  // delete items[id];
  // if (!item) {
  //   // report an error if item not found
  //   callback(new Error(`No item with id: ${id}`));
  // } else {
  //   callback();
  // }
};

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
