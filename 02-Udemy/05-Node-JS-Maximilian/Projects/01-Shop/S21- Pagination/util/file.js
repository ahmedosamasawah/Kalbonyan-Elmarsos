const fileSystem = require("fs");

const deleteFile = (filePath) => {
  fileSystem.unlink(filePath, (error) => {
    if (error) throw error;
  });
};

exports.deleteFile = deleteFile;
