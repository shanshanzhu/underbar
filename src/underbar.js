/*jshint eqnull:true, expr:true*/

var _ = { };

(function() {

  /**
   * COLLECTIONS
   * ===========
   *
   * In this section, we'll have a look at functions that operate on collections
   * of values; in JavaScript, a 'collection' is something that can contain a
   * number of values--either an array or an object.
   */

  // Return an array of the first n elements of an array. If n is undefined,
  // return just the first element.
  _.first = function(array, n) {
    if (!Array.isArray(array)) {return;}
    return n === undefined || typeof n !== 'number' ? array[0] : array.slice(0,n);
  };

  // Like first, but for the last elements. If n is undefined, return just the
  // last element.
  _.last = function(array, n) {
    if (!Array.isArray(array)) {return;}
    if (array.length < n) { return array;}
    return n === undefined || typeof n !== 'number' ? array[array.length - 1] : array.slice(array.length - n,array.length);
  };

  // Call iterator(value, key, collection) for each element of collection.
  // Accepts both arrays and objects.
  _.each = function(collection, iterator, context) {
    if (Array.isArray(collection)) {
      collection.forEach(function(value, index){
        iterator.call(context, value, index, collection);
      });
    } else if (Array.prototype.toString.call(collection) === '[object Object]') {
      for (var key in collection) {
        iterator.call(context, collection[key], key, collection);
      }
    } 
  };

  // Returns the index at which value can be found in the array, or -1 if value
  // is not present in the array.
  _.indexOf = function(array, target){
    // TIP: Here's an example of a function that needs to iterate, which we've
    // implemented for you. Instead of using a standard `for` loop, though,
    // it uses the iteration helper `each`, which you will need to write.
    var res = -1;
    _.each(array, function(item, index){
      if (item === target && res === -1) {
        res = index;
      }
    });
    return res;
  };

  // Return all elements of an array that pass a truth test.
  _.filter = function(collection, iterator, context) {
    var results = [];
    _.each(collection,function(item,index,collection){
      if (iterator.call(context, item, index, collection)) {
        results.push(item);
      }
    })
    return results;
  };

  // Return all elements of an array that don't pass a truth test.
  _.reject = function(collection, iterator, context) {
    // TIP: see if you can re-use _.select() here, without simply
    // copying code in and modifying it
    return _.filter(collection, function(item, index, collection){
      return !iterator.apply(context, arguments);
    })
  };

  // Produce a duplicate-free version of the array.
  _.uniq = function(array) {
    var seen = {};
    var res = [];
    _.each(array, function(item, index, collection) {
      if (!seen[item]) {
        seen[item] = true;
        res.push(item);
      }
    });
    return res;
  };


  // Return the results of applying an iterator to each element.
  _.map = function(array, iterator, context) {
    // map() is a useful primitive iteration function that works a lot
    // like each(), but in addition to running the operation on all
    // the members, it also maintains an array of results.
    var res = [];
    _.each(array, function(item, index, collection) {
      res.push(iterator.call(context, item, index, collection)); 
    })
    return res;
  };

  /*
   * TIP: map is really handy when you want to transform an array of
   * values into a new array of values. _.pluck() is solved for you
   * as an example of this.
   */

  // Takes an array of objects and returns and array of the values of
  // a certain property in it. E.g. take an array of people and return
  // an array of just their ages
  _.pluck = function(array, propertyName) {
    // TIP: map is really handy when you want to transform an array of
    // values into a new array of values. _.pluck() is solved for you
    // as an example of this.
    return _.map(array, function(value){
      return value[propertyName];
    });
  };

  // Calls the method named by methodName on each value in the list.
  _.invoke = function(list, methodName, args) {
    var argus = Array.prototype.slice.call(arguments, 2, arguments.length);
    return _.map(list, function(item, value, collection){
      if (typeof methodName === 'function') {
        return methodName.apply(item, argus);
      } else if (typeof methodName === 'string') {
        return item[methodName].apply(item, argus);
      }
    });
  };

  // Reduces an array or object to a single value by repetitively calling
  // iterator(previousValue, item) for each item. previousValue should be
  // the return value of the previous iterator call.
  //
  // You can pass in an initialValue that is passed to the first iterator
  // call. Defaults to 0.
  //
  // Example:
  //   var numbers = [1,2,3];
  //   var sum = _.reduce(numbers, function(total, number){
  //     return total + number;
  //   }, 0); // should be 6
  //
  _.reduce = function(collection, iterator, initialValue, context) {
    var initialValue = (initialValue !== undefined) ? initialValue : 0;
    _.each(collection, function(item, index, collection) {
      initialValue = iterator.call(context, initialValue, item, index, collection);
    });

    return initialValue;
  };

  // Determine if the array or object contains a given value (using `===`).
  _.contains = function(collection, target) {
    // TIP: Many iteration problems can be most easily expressed in
    // terms of reduce(). Here's a freebie to demonstrate!
    return _.reduce(collection, function(found, item) {
      if (found) {
        return found;
      }
      return item === target;
    }, false);
  };


  // Determine whether all of the elements match a truth test.
  _.every = function(collection, iterator, context) {
    // TIP: Try re-using reduce() here.
    iterator = iterator || function(a) {
      return a;
    };
    return _.reduce(collection, function(match, item){
      return (iterator.call(context, item) && match)? true : false;
    }, true);
  };

  // Determine whether any of the elements pass a truth test. If no iterator is
  // provided, provide a default one
  _.some = function(collection, iterator, context) {
    iterator = iterator || function(a) {
      return a;
    };
    return !_.every(collection, function(item, index, collection) {
      return !iterator.call(context, item, index, collection);
    });
    // TIP: There's a very clever way to re-use every() here.
  };


  /**
   * OBJECTS
   * =======
   *
   * In this section, we'll look at a couple of helpers for merging objects.
   */

  // Extend a given object with all the properties of the passed in
  // object(s).
  //
  // Example:
  //   var obj1 = {key1: "something"};
  //   _.extend(obj1, {
  //     key2: "something new",
  //     key3: "something else new"
  //   }, {
  //     bla: "even more stuff"
  //   }); // obj1 now contains key1, key2, key3 and bla
  _.extend = function(obj) {
    if (obj.length <= 1) {
      return obj;
    }
    var toExtends = Array.prototype.slice.call(arguments, 1);
    _.each(toExtends, function(toExtend, index){
      _.each(toExtend, function(value, key){
        obj[key] = value;
      });
    });
    return obj;
  };

  // Like extend, but doesn't ever overwrite a key that already
  // exists in obj
  _.defaults = function(obj) {
    if (obj.length <= 1) {
      return obj;
    }
    var toExtends = Array.prototype.slice.call(arguments, 1);
    _.each(toExtends, function(toExtend, index){
      _.each(toExtend, function(value, key){
        if (obj[key] === undefined) { obj[key] = value; }
      });
    });
    return obj;

  };


  /**
   * FUNCTIONS
   * =========
   *
   * Now we're getting into function decorators, which take in any function
   * and return out a new version of the function that works somewhat differently
   */

  // Return a function that can be called at most one time. Subsequent calls
  // should return the previously returned value.
  _.once = function(func) {
    // TIP: These variables are stored in a "closure scope" (worth researching),
    // so that they'll remain available to the newly-generated function every
    // time it's called.
    var alreadyCalled = false;
    var result;
    // TIP: We'll return a new function that delegates to the old one, but only
    // if it hasn't been called before.
    return function(){
      if(!alreadyCalled){
        // TIP: .apply(this, arguments) is the standard way to pass on all of the
        // infromation from one function call to another.
        result = func.apply(this, arguments);
        alreadyCalled = true;
      }
      // The new function always returns the originally computed result.
      return result;
    };
  };

  // Memoize an expensive function by storing its results. You may assume
  // that the function takes only one argument and that it is a primitive.
  //
  // Memoize should return a function that when called, will check if it has
  // already computed the result for the given argument and return that value
  // instead if possible.
  _.memoize = function(func) {
    var computed = {};
    return function() {
      var key = JSON.stringify(arguments);//or some hash function passed in as 2nd arg
      if (computed[key] === undefined) {
        computed[key] = func.apply(this, arguments);
      }
      return computed[key];
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  //
  // The arguments for the original function are passed after the wait
  // parameter. For example _.delay(someFunction, 500, 'a', 'b') will
  // call someFunction('a', 'b') after 500ms
  _.delay = function(func, wait) {
    var args = Array.prototype.slice.call(arguments, 2);
    setTimeout(function(){
      func.apply(this, args);
    }, wait);
  };


  /**
   * ADVANCED COLLECTION OPERATIONS
   * ==============================
   */

  // Shuffle an array.
  _.shuffle = function(array) {
    //in place shuffle.
    var getRand = function(start,end) {
      if (end < start) { return 0; }
      return  Math.floor(Math.random() * (end-start)) + start;
    }
    for (var i = 0, len = array.length; i < len; i++) {
      var j = getRand(i,len);
      array[i] = [array[j], array[j] = array[i]][0];//swap
    };
    return array.slice();
    // to nochanging input shuffle, slice an array and do inplace;

  };


  /**
   * Note: This is the end of the pre-course curriculum. Feel free to continue,
   * but nothing beyond here is required.
   */


  // Sort the object's values by a criterion produced by an iterator.
  // If iterator is a string, sort objects by that property with the name
  // of that string. For example, _.sortBy(people, 'name') should sort
  // an array of people by their name.
  _.sortBy = function(collection, iterator) {
    
    var newIterator;
    if (typeof iterator === 'string') {
      newIterator = function(obj) {
        return obj[iterator];
      }
    } else if (typeof iterator === 'function') {
      newIterator = iterator;
    } else {
      newIterator = function(a) {
        return a;
      };
    }
    //bubble sort 
    /*
    var newCollection = collection.slice();
    for (var i = 0; i < newCollection.length; i ++) {
      for(var j = 0; j < newCollection.length - 1 - i; j ++) {
        var left = newIterator.call(this, newCollection[j]);  
        var right = newIterator.call(this, newCollection[j+1]);
        if (left > right || left === undefined) {
          if (right !== undefined){
            newCollection[j] = [newCollection[j+1], newCollection[j+1]= newCollection[j]][0]
            //swap
          }
        }
      }
    }
    return newCollection;
    */

    //merge sort: here I use slice in mergesort so it creats nLogN + n space complexity
    //if I use index in mergesort function, I can save nLogN and only use n space complexity.
    //how can I add gater(infinity) for iterator function.
    var merge = function(left, right) {
      var res = [];
      while(left.length > 0 && right.length > 0) {
        var leftC = newIterator.call(this, left[0]);  
        var rightC = newIterator.call(this, right[0]);  
        if (leftC <= rightC || rightC === undefined) {
          res.push(left.shift());
        } else {
          res.push(right.shift());
        }
      }
      while(left.length > 0) {res.push(left.shift());}
      while(right.length > 0) {res.push(right.shift());}

      return res;

    };
    var mergeSort = function(newArray) {
      if (newArray.length <= 1) {
        return newArray;
      }
      var mid = Math.floor(newArray.length/2);
      var left = newArray.slice(0, mid);
      var right = newArray.slice(mid, newArray.length);
      return merge(mergeSort(left), mergeSort(right));
    };

    return mergeSort(collection);
    /*
    //native sort --wrong answer 
    newCollection.sort(function(left, right) {
        var leftC = newIterator.call(this, left);  
        var rightC = newIterator.call(this, right);
        debugger;
        if (leftC !== rightC){
          if (leftC < rightC || rightC === undefined) {
            return -1;
          }
          if (leftC > rightC || leftC === undefined) {
            return 1;
          }
        }
          return 0;//still not working !!
    })
    */


//the sort function use randomized sort and see underscorejs for raw code of sortby;
  };

  // Zip together two or more arrays with elements of the same index
  // going together.
  //
  // Example:
  // _.zip(['a','b','c','d'], [1,2,3]) returns [['a',1], ['b',2], ['c',3], ['d',undefined]]
  _.zip = function() {
    var output = [];
    var args = Array.prototype.slice.call(arguments);
    var max = args[0].length;
    for (var i = 0; i < max; i++) {
      output[i] = output[i] || [];
      for (var j = 0; j < args.length; j ++) {
        max = args[j].length > max ? args[j].length : max;
        output[i].push(args[j][i]);
      }
    };
    return output;
  };

  // Takes a multidimensional array and converts it to a one-dimensional array.
  // The new array should contain all elements of the multidimensional array.
  //
  // Hint: Use Array.isArray to check if something is an array
  _.flatten = function(nestedArray) {
    var output = [];
    var goDeep = function(toFlat) {
      if(!Array.isArray(toFlat)) {
        output.push(toFlat);
      } else {
        toFlat.forEach(function(item){
          goDeep(item);
        })
      }
    };
    goDeep(nestedArray);
    return output;
  };

  // Takes an arbitrary number of arrays and produces an array that contains
  // every item shared between all the passed-in arrays.
  _.intersection = function() {
    var args = Array.prototype.slice.call(arguments);
    var len = args.length;
    var storage = {};
    _.each(args, function(arg,i){
      if (!Array.isArray(arg)) { return; }
      _.each(arg, function(item){
        storage[item] = storage[item] === undefined ? {}: storage[item];
        storage[item][i] = true;
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

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {

  };


  /**
   * MEGA EXTRA CREDIT
   * =================
   */

  // Return an object that responds to chainable function calls for map, pluck,
  // select, etc.
  //
  // See the Underbar readme for details.
  _.chain = function(obj) {
  };

  // EXTRA CREDIT:
  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  //
  // See the Underbar readme for details.
  _.throttle = function(func, wait) {
  };

}).call(this);
