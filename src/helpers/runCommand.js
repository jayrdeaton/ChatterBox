let exec = require('child_process').exec;

module.exports = (command) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (error) reject(stderr);
      resolve(stdout);
    });
  });
};
