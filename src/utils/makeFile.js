const fs = require('fs');

const filesFn = {
  checkFile: (path) => {
    debugger
    fs.readFile(path,function(error,stats){
      if(error){
        console.log(error);
        return false;
      }
      console.log('文件：'+stats.isFile());
      console.log('目录：'+stats.isDirectory());
    })
  }
};

export default filesFn;
