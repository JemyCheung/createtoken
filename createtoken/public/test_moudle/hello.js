  function hello() {
    this.ret01 = 1;
    this.up = function(){
      return 'hello'
    }
  }

var hello = new hello();
module.exports = hello;


// Hello.prototype.up = function(){
//   return 'up function';
// }
//
// exports.HOST = 'ijemy.com';
