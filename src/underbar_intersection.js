//poor performance!
_.intersection = function() {
    var args = Array.prototype.slice.call(arguments, 1);
    var len = args.length + 1;
    var storage = {};
    _.each(arguments[0], function(item){
      storage[item] = {0: true};
    });
    _.each(args, function(arg,i){
      if (!Array.isArray(arg)) { return; }
      _.each(arg, function(item){
        debugger;
        if (storage[item]!== undefined && Object.keys(storage[item]).length === i + 1) {
          
          storage[item][i+1] = true;
        }
      });
    });
    var output = [];
    _.each(storage, function(value, key){
      if (Object.keys(value).length === len) {
        output.push(key);
      };
    });
    return output;
 
  };
