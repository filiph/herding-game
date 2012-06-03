function Isolate() {}
init();

var $ = Isolate.$isolateProperties;
Isolate.$defineClass("ExceptionImplementation", "Object", ["_msg"], {
 toString$0: function() {
  if (this._msg === (void 0)) {
    var t0 = 'Exception';
  } else {
    t0 = 'Exception: ' + $.stringToString(this._msg);
  }
  return t0;
 }
});

Isolate.$defineClass("FutureImpl", "Object", ["_exceptionHandlers", "_listeners", "_exceptionHandled", "_exception", "_value", "_isComplete"], {
 _setException$1: function(exception) {
  if (exception === (void 0)) {
    throw $.captureStackTrace($.IllegalArgumentException$1((void 0)));
  } else {
  }
  if (this._isComplete === true) {
    throw $.captureStackTrace($.FutureAlreadyCompleteException$0());
  } else {
  }
  this._exception = exception;
  this._complete$0();
 },
 _setValue$1: function(value) {
  if (this._isComplete === true) {
    throw $.captureStackTrace($.FutureAlreadyCompleteException$0());
  } else {
  }
  this._value = value;
  this._complete$0();
 },
 _complete$0: function() {
  this._isComplete = true;
  if (!(this._exception === (void 0))) {
    for (var t0 = $.iterator(this._exceptionHandlers); t0.hasNext$0() === true; ) {
      if ($.eqB(t0.next$0().$call$1(this._exception), true)) {
        this._exceptionHandled = true;
        break;
      } else {
      }
    }
  } else {
  }
  if (this.get$hasValue() === true) {
    for (var t1 = $.iterator(this._listeners); t1.hasNext$0() === true; ) {
      t1.next$0().$call$1(this.get$value());
    }
  } else {
    var t2 = this._exceptionHandled !== true;
    if (t2) {
      var t3 = $.gtB($.get$length(this._listeners), 0);
    } else {
      t3 = t2;
    }
    if (t3) {
      throw $.captureStackTrace(this._exception);
    } else {
    }
  }
 },
 handleException$1: function(onException) {
  if (this._exceptionHandled === true) {
    return;
  } else {
  }
  if (this._isComplete === true) {
    if (!$.eqNullB(this._exception)) {
      this._exceptionHandled = onException.$call$1(this._exception);
    } else {
    }
  } else {
    $.add$1(this._exceptionHandlers, onException);
  }
 },
 then$1: function(onComplete) {
  if (this.get$hasValue() === true) {
    onComplete.$call$1(this.get$value());
  } else {
    if (this.get$isComplete() !== true) {
      $.add$1(this._listeners, onComplete);
    } else {
      if (this._exceptionHandled !== true) {
        throw $.captureStackTrace(this._exception);
      } else {
      }
    }
  }
 },
 get$hasValue: function() {
  var t0 = this.get$isComplete() === true;
  if (t0) {
    var t1 = this._exception === (void 0);
  } else {
    t1 = t0;
  }
  return t1;
 },
 get$isComplete: function() {
  return this._isComplete;
 },
 get$value: function() {
  if (this.get$isComplete() !== true) {
    throw $.captureStackTrace($.FutureNotCompleteException$0());
  } else {
  }
  if (!(this._exception === (void 0))) {
    throw $.captureStackTrace(this._exception);
  } else {
  }
  return this._value;
 }
});

Isolate.$defineClass("CompleterImpl", "Object", ["_futureImpl"], {
 completeException$1: function(exception) {
  this._futureImpl._setException$1(exception);
 },
 complete$1: function(value) {
  this._futureImpl._setValue$1(value);
 },
 get$future: function() {
  return this._futureImpl;
 }
});

Isolate.$defineClass("HashMapImplementation", "Object", ["_numberOfDeleted", "_numberOfEntries", "_loadLimit", "_values", "_keys?"], {
 toString$0: function() {
  return $.mapToString(this);
 },
 containsKey$1: function(key) {
  return !$.eqB(this._probeForLookup$1(key), -1);
 },
 getValues$0: function() {
  var t0 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t0.list_1 = list;
  t0.i_2 = 0;
  this.forEach$1(new $.Closure26(t0));
  return t0.list_1;
 },
 getKeys$0: function() {
  var t0 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t0.list_1 = list;
  t0.i_2 = 0;
  this.forEach$1(new $.Closure32(t0));
  return t0.list_1;
 },
 forEach$1: function(f) {
  var length$ = $.get$length(this._keys);
  for (var i = 0; $.ltB(i, length$); i = i + 1) {
    var key = $.index(this._keys, i);
    var t0 = !(key === (void 0));
    if (t0) {
      var t1 = !(key === $.CTC7);
    } else {
      t1 = t0;
    }
    if (t1) {
      f.$call$2(key, $.index(this._values, i));
    } else {
    }
  }
 },
 get$length: function() {
  return this._numberOfEntries;
 },
 isEmpty$0: function() {
  return $.eq(this._numberOfEntries, 0);
 },
 remove$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.geB(index, 0)) {
    this._numberOfEntries = $.sub(this._numberOfEntries, 1);
    var value = $.index(this._values, index);
    $.indexSet(this._values, index, (void 0));
    $.indexSet(this._keys, index, $.CTC7);
    this._numberOfDeleted = $.add(this._numberOfDeleted, 1);
    return value;
  } else {
  }
  return;
 },
 operator$index$1: function(key) {
  var index = this._probeForLookup$1(key);
  if ($.ltB(index, 0)) {
    return;
  } else {
  }
  return $.index(this._values, index);
 },
 operator$indexSet$2: function(key, value) {
  this._ensureCapacity$0();
  var index = this._probeForAdding$1(key);
  var t0 = $.index(this._keys, index) === (void 0);
  if (!t0) {
    var t1 = $.index(this._keys, index) === $.CTC7;
  } else {
    t1 = t0;
  }
  if (t1) {
    this._numberOfEntries = $.add(this._numberOfEntries, 1);
  } else {
  }
  $.indexSet(this._keys, index, key);
  $.indexSet(this._values, index, value);
 },
 clear$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  var length$ = $.get$length(this._keys);
  for (var i = 0; $.ltB(i, length$); i = i + 1) {
    $.indexSet(this._keys, i, (void 0));
    $.indexSet(this._values, i, (void 0));
  }
 },
 _grow$1: function(newCapacity) {
  $.assert($._isPowerOfTwo(newCapacity));
  var capacity = $.get$length(this._keys);
  this._loadLimit = $._computeLoadLimit(newCapacity);
  var oldKeys = this._keys;
  if (typeof oldKeys !== 'string' && (typeof oldKeys !== 'object'||oldKeys.constructor !== Array)) return this._grow$1$bailout(newCapacity, 1, capacity, oldKeys);
  var oldValues = this._values;
  if (typeof oldValues !== 'string' && (typeof oldValues !== 'object'||oldValues.constructor !== Array)) return this._grow$1$bailout(newCapacity, 2, oldKeys, capacity, oldValues);
  this._keys = $.List(newCapacity);
  var t0 = $.List(newCapacity);
  $.setRuntimeTypeInfo(t0, ({E: 'V'}));
  this._values = t0;
  for (var i = 0; $.ltB(i, capacity); i = i + 1) {
    var t1 = oldKeys.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var t2 = oldKeys[i];
    var t3 = t2 === (void 0);
    if (!t3) {
      var t4 = t2 === $.CTC7;
    } else {
      t4 = t3;
    }
    if (t4) {
      continue;
    } else {
    }
    var t5 = oldValues.length;
    if (i < 0 || i >= t5) throw $.ioore(i);
    var t6 = oldValues[i];
    var newIndex = this._probeForAdding$1(t2);
    $.indexSet(this._keys, newIndex, t2);
    $.indexSet(this._values, newIndex, t6);
  }
  this._numberOfDeleted = 0;
 },
 _grow$1$bailout: function(newCapacity, state, env0, env1, env2) {
  switch (state) {
    case 1:
      capacity = env0;
      oldKeys = env1;
      break;
    case 2:
      oldKeys = env0;
      capacity = env1;
      oldValues = env2;
      break;
  }
  switch (state) {
    case 0:
      $.assert($._isPowerOfTwo(newCapacity));
      var capacity = $.get$length(this._keys);
      this._loadLimit = $._computeLoadLimit(newCapacity);
      var oldKeys = this._keys;
    case 1:
      state = 0;
      var oldValues = this._values;
    case 2:
      state = 0;
      this._keys = $.List(newCapacity);
      var t0 = $.List(newCapacity);
      $.setRuntimeTypeInfo(t0, ({E: 'V'}));
      this._values = t0;
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, capacity)) break L0;
        c$0:{
          var key = $.index(oldKeys, i);
          var t1 = key === (void 0);
          if (!t1) {
            var t2 = key === $.CTC7;
          } else {
            t2 = t1;
          }
          if (t2) {
            break c$0;
          } else {
          }
          var value = $.index(oldValues, i);
          var newIndex = this._probeForAdding$1(key);
          $.indexSet(this._keys, newIndex, key);
          $.indexSet(this._values, newIndex, value);
        }
        i = i + 1;
      }
      this._numberOfDeleted = 0;
  }
 },
 _ensureCapacity$0: function() {
  var newNumberOfEntries = $.add(this._numberOfEntries, 1);
  if ($.geB(newNumberOfEntries, this._loadLimit)) {
    this._grow$1($.mul($.get$length(this._keys), 2));
    return;
  } else {
  }
  var numberOfFree = $.sub($.sub($.get$length(this._keys), newNumberOfEntries), this._numberOfDeleted);
  if ($.gtB(this._numberOfDeleted, numberOfFree)) {
    this._grow$1($.get$length(this._keys));
  } else {
  }
 },
 _probeForLookup$1: function(key) {
  for (var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys)), numberOfProbes = 1; true; hash = hash0, numberOfProbes = numberOfProbes0) {
    var existingKey = $.index(this._keys, hash);
    if (existingKey === (void 0)) {
      return -1;
    } else {
    }
    if ($.eqB(existingKey, key)) {
      return hash;
    } else {
      var numberOfProbes1 = numberOfProbes + 1;
    }
    var hash1 = $._nextProbe(hash, numberOfProbes, $.get$length(this._keys));
    var numberOfProbes0 = numberOfProbes1;
    var hash0 = hash1;
  }
 },
 _probeForAdding$1: function(key) {
  var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
  if (hash !== (hash | 0)) return this._probeForAdding$1$bailout(key, 1, hash);
  for (var numberOfProbes = 1, hash0 = hash, insertionIndex = -1; true; numberOfProbes = numberOfProbes0, hash0 = hash1, insertionIndex = insertionIndex0) {
    var existingKey = $.index(this._keys, hash0);
    if (existingKey === (void 0)) {
      if ($.ltB(insertionIndex, 0)) {
        return hash0;
      } else {
      }
      return insertionIndex;
    } else {
      if ($.eqB(existingKey, key)) {
        return hash0;
      } else {
        var t0 = $.ltB(insertionIndex, 0);
        if (t0) {
          var t1 = $.CTC7 === existingKey;
        } else {
          t1 = t0;
        }
        if (t1) {
          var insertionIndex0 = hash0;
        } else {
          insertionIndex0 = insertionIndex;
        }
        var numberOfProbes1 = numberOfProbes + 1;
      }
    }
    var hash2 = $._nextProbe(hash0, numberOfProbes, $.get$length(this._keys));
    var numberOfProbes0 = numberOfProbes1;
    var hash1 = hash2;
  }
 },
 _probeForAdding$1$bailout: function(key, state, env0) {
  switch (state) {
    case 1:
      hash = env0;
      break;
  }
  switch (state) {
    case 0:
      var hash = $._firstProbe($.hashCode(key), $.get$length(this._keys));
    case 1:
      state = 0;
      var numberOfProbes = 1;
      var hash0 = hash;
      var insertionIndex = -1;
      L0: while (true) {
        if (!true) break L0;
        var existingKey = $.index(this._keys, hash0);
        if (existingKey === (void 0)) {
          if ($.ltB(insertionIndex, 0)) {
            return hash0;
          } else {
          }
          return insertionIndex;
        } else {
          if ($.eqB(existingKey, key)) {
            return hash0;
          } else {
            var t0 = $.ltB(insertionIndex, 0);
            if (t0) {
              var t1 = $.CTC7 === existingKey;
            } else {
              t1 = t0;
            }
            if (t1) {
              var insertionIndex0 = hash0;
            } else {
              insertionIndex0 = insertionIndex;
            }
            var numberOfProbes0 = numberOfProbes + 1;
          }
        }
        var hash1 = $._nextProbe(hash0, numberOfProbes, $.get$length(this._keys));
        var numberOfProbes1 = numberOfProbes0;
        var hash2 = hash1;
        numberOfProbes = numberOfProbes1;
        hash0 = hash2;
        insertionIndex = insertionIndex0;
      }
  }
 },
 HashMapImplementation$0: function() {
  this._numberOfEntries = 0;
  this._numberOfDeleted = 0;
  this._loadLimit = $._computeLoadLimit(8);
  this._keys = $.List(8);
  var t0 = $.List(8);
  $.setRuntimeTypeInfo(t0, ({E: 'V'}));
  this._values = t0;
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("HashSetImplementation", "Object", ["_backingMap?"], {
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t0 = $.HashSetIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  return t0;
 },
 get$length: function() {
  return $.get$length(this._backingMap);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._backingMap);
 },
 filter$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  var result = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  t0.result_2 = result;
  $.forEach(this._backingMap, new $.Closure40(t0));
  return t0.result_2;
 },
 map$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  t0.result_2 = $.HashSetImplementation$0();
  $.forEach(this._backingMap, new $.Closure39(t0));
  return t0.result_2;
 },
 forEach$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  $.forEach(this._backingMap, new $.Closure38(t0));
 },
 removeAll$1: function(collection) {
  $.forEach(collection, new $.Closure37(this));
 },
 addAll$1: function(collection) {
  $.forEach(collection, new $.Closure36(this));
 },
 remove$1: function(value) {
  if (this._backingMap.containsKey$1(value) !== true) {
    return false;
  } else {
  }
  this._backingMap.remove$1(value);
  return true;
 },
 contains$1: function(value) {
  return this._backingMap.containsKey$1(value);
 },
 add$1: function(value) {
  $.indexSet(this._backingMap, value, value);
 },
 clear$0: function() {
  $.clear(this._backingMap);
 },
 HashSetImplementation$0: function() {
  this._backingMap = $.HashMapImplementation$0();
 },
 is$Set: true,
 is$Collection: function() { return true; }
});

Isolate.$defineClass("HashSetIterator", "Object", ["_nextValidIndex", "_entries"], {
 _advance$0: function() {
  var length$ = $.get$length(this._entries);
  var entry = (void 0);
  do {
    var t0 = $.add(this._nextValidIndex, 1);
    this._nextValidIndex = t0;
    if ($.geB(t0, length$)) {
      break;
    } else {
    }
    entry = $.index(this._entries, this._nextValidIndex);
    var t1 = entry === (void 0);
    if (!t1) {
      var t2 = entry === $.CTC7;
    } else {
      t2 = t1;
    }
  } while (t2);
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  } else {
  }
  var res = $.index(this._entries, this._nextValidIndex);
  this._advance$0();
  return res;
 },
 hasNext$0: function() {
  if ($.geB(this._nextValidIndex, $.get$length(this._entries))) {
    return false;
  } else {
  }
  if ($.index(this._entries, this._nextValidIndex) === $.CTC7) {
    this._advance$0();
  } else {
  }
  return $.lt(this._nextValidIndex, $.get$length(this._entries));
 },
 HashSetIterator$1: function(set_) {
  this._advance$0();
 }
});

Isolate.$defineClass("_DeletedKeySentinel", "Object", [], {
});

Isolate.$defineClass("KeyValuePair", "Object", ["value=", "key?"], {
});

Isolate.$defineClass("LinkedHashMapImplementation", "Object", ["_map", "_lib3_list"], {
 toString$0: function() {
  return $.mapToString(this);
 },
 clear$0: function() {
  $.clear(this._map);
  $.clear(this._lib3_list);
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 get$length: function() {
  return $.get$length(this._map);
 },
 containsKey$1: function(key) {
  return this._map.containsKey$1(key);
 },
 forEach$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  $.forEach(this._lib3_list, new $.Closure30(t0));
 },
 getValues$0: function() {
  var t0 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'V'}));
  t0.list_1 = list;
  t0.index_2 = 0;
  $.forEach(this._lib3_list, new $.Closure29(t0));
  $.assert($.eq(t0.index_2, $.get$length(this)));
  return t0.list_1;
 },
 getKeys$0: function() {
  var t0 = ({});
  var list = $.List($.get$length(this));
  $.setRuntimeTypeInfo(list, ({E: 'K'}));
  t0.list_1 = list;
  t0.index_2 = 0;
  $.forEach(this._lib3_list, new $.Closure33(t0));
  $.assert($.eq(t0.index_2, $.get$length(this)));
  return t0.list_1;
 },
 remove$1: function(key) {
  var entry = this._map.remove$1(key);
  if (entry === (void 0)) {
    return;
  } else {
  }
  entry.remove$0();
  return entry.get$element().get$value();
 },
 operator$index$1: function(key) {
  var entry = $.index(this._map, key);
  if (entry === (void 0)) {
    return;
  } else {
  }
  return entry.get$element().get$value();
 },
 operator$indexSet$2: function(key, value) {
  if (this._map.containsKey$1(key) === true) {
    $.index(this._map, key).get$element().set$value(value);
  } else {
    $.addLast(this._lib3_list, $.KeyValuePair$2(key, value));
    $.indexSet(this._map, key, this._lib3_list.lastEntry$0());
  }
 },
 LinkedHashMapImplementation$0: function() {
  this._map = $.HashMapImplementation$0();
  var t0 = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(t0, ({E: 'KeyValuePair<K, V>'}));
  this._lib3_list = t0;
 },
 is$Map: function() { return true; }
});

Isolate.$defineClass("DoubleLinkedQueueEntry", "Object", ["_lib3_element?", "_next=", "_previous="], {
 get$element: function() {
  return this._lib3_element;
 },
 previousEntry$0: function() {
  return this._previous._asNonSentinelEntry$0();
 },
 _asNonSentinelEntry$0: function() {
  return this;
 },
 remove$0: function() {
  var t0 = this._next;
  this._previous.set$_next(t0);
  var t1 = this._previous;
  this._next.set$_previous(t1);
  this._next = (void 0);
  this._previous = (void 0);
  return this._lib3_element;
 },
 prepend$1: function(e) {
  var t0 = $.DoubleLinkedQueueEntry$1(e);
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  t0._link$2(this._previous, this);
 },
 _link$2: function(p, n) {
  this._next = n;
  this._previous = p;
  p.set$_next(this);
  n.set$_previous(this);
 },
 DoubleLinkedQueueEntry$1: function(e) {
  this._lib3_element = e;
 }
});

Isolate.$defineClass("_DoubleLinkedQueueEntrySentinel", "DoubleLinkedQueueEntry", ["_lib3_element", "_next", "_previous"], {
 get$element: function() {
  throw $.captureStackTrace($.CTC8);
 },
 _asNonSentinelEntry$0: function() {
  return;
 },
 remove$0: function() {
  throw $.captureStackTrace($.CTC8);
 },
 _DoubleLinkedQueueEntrySentinel$0: function() {
  this._link$2(this, this);
 }
});

Isolate.$defineClass("DoubleLinkedQueue", "Object", ["_sentinel"], {
 toString$0: function() {
  return $.collectionToString(this);
 },
 iterator$0: function() {
  var t0 = $._DoubleLinkedQueueIterator$1(this._sentinel);
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  return t0;
 },
 filter$1: function(f) {
  var other = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(other, ({E: 'E'}));
  for (var entry = this._sentinel.get$_next(); !(entry === this._sentinel); entry = entry0) {
    var nextEntry = entry.get$_next();
    if (f.$call$1(entry.get$_lib3_element()) === true) {
      other.addLast$1(entry.get$_lib3_element());
    } else {
    }
    var entry0 = nextEntry;
  }
  return other;
 },
 map$1: function(f) {
  var other = $.DoubleLinkedQueue$0();
  for (var entry = this._sentinel.get$_next(); !(entry === this._sentinel); entry = entry0) {
    var nextEntry = entry.get$_next();
    other.addLast$1(f.$call$1(entry.get$_lib3_element()));
    var entry0 = nextEntry;
  }
  return other;
 },
 forEach$1: function(f) {
  for (var entry = this._sentinel.get$_next(); !(entry === this._sentinel); entry = entry0) {
    var nextEntry = entry.get$_next();
    f.$call$1(entry.get$_lib3_element());
    var entry0 = nextEntry;
  }
 },
 clear$0: function() {
  var t0 = this._sentinel;
  this._sentinel.set$_next(t0);
  var t1 = this._sentinel;
  this._sentinel.set$_previous(t1);
 },
 isEmpty$0: function() {
  return this._sentinel.get$_next() === this._sentinel;
 },
 get$length: function() {
  var t0 = ({});
  t0.counter_1 = 0;
  this.forEach$1(new $.Closure28(t0));
  return t0.counter_1;
 },
 lastEntry$0: function() {
  return this._sentinel.previousEntry$0();
 },
 last$0: function() {
  return this._sentinel.get$_previous().get$element();
 },
 first$0: function() {
  return this._sentinel.get$_next().get$element();
 },
 get$first: function() { return new $.Closure42(this, 'first$0'); },
 removeFirst$0: function() {
  return this._sentinel.get$_next().remove$0();
 },
 removeLast$0: function() {
  return this._sentinel.get$_previous().remove$0();
 },
 addAll$1: function(collection) {
  for (var t0 = $.iterator(collection); t0.hasNext$0() === true; ) {
    this.add$1(t0.next$0());
  }
 },
 add$1: function(value) {
  this.addLast$1(value);
 },
 addLast$1: function(value) {
  this._sentinel.prepend$1(value);
 },
 DoubleLinkedQueue$0: function() {
  var t0 = $._DoubleLinkedQueueEntrySentinel$0();
  $.setRuntimeTypeInfo(t0, ({E: 'E'}));
  this._sentinel = t0;
 },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_DoubleLinkedQueueIterator", "Object", ["_currentEntry", "_sentinel"], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  } else {
  }
  this._currentEntry = this._currentEntry.get$_next();
  return this._currentEntry.get$element();
 },
 hasNext$0: function() {
  return !(this._currentEntry.get$_next() === this._sentinel);
 },
 _DoubleLinkedQueueIterator$1: function(_sentinel) {
  this._currentEntry = this._sentinel;
 }
});

Isolate.$defineClass("StringBufferImpl", "Object", ["_length", "_buffer"], {
 toString$0: function() {
  if ($.get$length(this._buffer) === 0) {
    return '';
  } else {
  }
  if ($.get$length(this._buffer) === 1) {
    return $.index(this._buffer, 0);
  } else {
  }
  var result = $.concatAll(this._buffer);
  $.clear(this._buffer);
  $.add$1(this._buffer, result);
  return result;
 },
 clear$0: function() {
  var t0 = $.List((void 0));
  $.setRuntimeTypeInfo(t0, ({E: 'String'}));
  this._buffer = t0;
  this._length = 0;
  return this;
 },
 addAll$1: function(objects) {
  for (var t0 = $.iterator(objects); t0.hasNext$0() === true; ) {
    this.add$1(t0.next$0());
  }
  return this;
 },
 add$1: function(obj) {
  var str = $.toString(obj);
  var t0 = str === (void 0);
  if (!t0) {
    var t1 = $.isEmpty(str) === true;
  } else {
    t1 = t0;
  }
  if (t1) {
    return this;
  } else {
  }
  $.add$1(this._buffer, str);
  this._length = $.add(this._length, $.get$length(str));
  return this;
 },
 isEmpty$0: function() {
  return this._length === 0;
 },
 get$length: function() {
  return this._length;
 },
 StringBufferImpl$1: function(content$) {
  this.clear$0();
  this.add$1(content$);
 }
});

Isolate.$defineClass("JSSyntaxRegExp", "Object", ["ignoreCase?", "multiLine?", "pattern?"], {
 allMatches$1: function(str) {
  $.checkString(str);
  return $._AllMatchesIterable$2(this, str);
 },
 hasMatch$1: function(str) {
  return $.regExpTest(this, $.checkString(str));
 },
 firstMatch$1: function(str) {
  var m = $.regExpExec(this, $.checkString(str));
  if (m === (void 0)) {
    return;
  } else {
  }
  var matchStart = $.regExpMatchStart(m);
  var matchEnd = $.add(matchStart, $.get$length($.index(m, 0)));
  return $.MatchImplementation$5(this.pattern, str, matchStart, matchEnd, m);
 },
 JSSyntaxRegExp$_globalVersionOf$1: function(other) {
  $.regExpAttachGlobalNative(this);
 },
 is$JSSyntaxRegExp: true
});

Isolate.$defineClass("MatchImplementation", "Object", ["_groups", "_end", "_start", "str", "pattern?"], {
 operator$index$1: function(index) {
  return this.group$1(index);
 },
 group$1: function(index) {
  return $.index(this._groups, index);
 }
});

Isolate.$defineClass("_AllMatchesIterable", "Object", ["_str", "_re"], {
 iterator$0: function() {
  return $._AllMatchesIterator$2(this._re, this._str);
 }
});

Isolate.$defineClass("_AllMatchesIterator", "Object", ["_done", "_next=", "_str", "_re"], {
 hasNext$0: function() {
  if (this._done === true) {
    return false;
  } else {
    if (!$.eqNullB(this._next)) {
      return true;
    } else {
    }
  }
  this._next = this._re.firstMatch$1(this._str);
  if ($.eqNullB(this._next)) {
    this._done = true;
    return false;
  } else {
    return true;
  }
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  } else {
  }
  var next = this._next;
  this._next = (void 0);
  return next;
 }
});

Isolate.$defineClass("DateImplementation", "Object", ["_isUtc", "value?"], {
 _asJs$0: function() {
  return $.lazyAsJsDate(this);
 },
 add$1: function(duration) {
  $.checkNull(duration);
  return $.DateImplementation$fromEpoch$2($.add(this.value, duration.get$inMilliseconds()), this.isUtc$0());
 },
 toString$0: function() {
  var t0 = new $.Closure4();
  var t1 = new $.Closure5();
  var t2 = new $.Closure6();
  var y = t0.$call$1(this.get$year());
  var m = t2.$call$1(this.get$month());
  var d = t2.$call$1(this.get$day());
  var h = t2.$call$1(this.get$hours());
  var min = t2.$call$1(this.get$minutes());
  var sec = t2.$call$1(this.get$seconds());
  var ms = t1.$call$1(this.get$milliseconds());
  if (this.isUtc$0() === true) {
    return '' + $.stringToString(y) + '-' + $.stringToString(m) + '-' + $.stringToString(d) + ' ' + $.stringToString(h) + ':' + $.stringToString(min) + ':' + $.stringToString(sec) + '.' + $.stringToString(ms) + 'Z';
  } else {
    return '' + $.stringToString(y) + '-' + $.stringToString(m) + '-' + $.stringToString(d) + ' ' + $.stringToString(h) + ':' + $.stringToString(min) + ':' + $.stringToString(sec) + '.' + $.stringToString(ms);
  }
 },
 isUtc$0: function() {
  return this._isUtc;
 },
 get$milliseconds: function() {
  return $.getMilliseconds(this);
 },
 get$seconds: function() {
  return $.getSeconds(this);
 },
 get$minutes: function() {
  return $.getMinutes(this);
 },
 get$hours: function() {
  return $.getHours(this);
 },
 get$day: function() {
  return $.getDay(this);
 },
 get$month: function() {
  return $.getMonth(this);
 },
 get$year: function() {
  return $.getYear(this);
 },
 hashCode$0: function() {
  return this.value;
 },
 operator$ge$1: function(other) {
  return $.ge(this.value, other.get$value());
 },
 operator$gt$1: function(other) {
  return $.gt(this.value, other.get$value());
 },
 operator$le$1: function(other) {
  return $.le(this.value, other.get$value());
 },
 operator$lt$1: function(other) {
  return $.lt(this.value, other.get$value());
 },
 operator$eq$1: function(other) {
  if (!((typeof other === 'object') && !!other.is$DateImplementation)) {
    return false;
  } else {
  }
  return $.eq(this.value, other.value);
 },
 DateImplementation$now$0: function() {
  this._asJs$0();
 },
 is$DateImplementation: true
});

Isolate.$defineClass("ListIterator", "Object", ["list", "i"], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.NoMoreElementsException$0());
  } else {
  }
  var value = (this.list[this.i]);
  this.i = $.add(this.i, 1);
  return value;
 },
 hasNext$0: function() {
  return $.lt(this.i, (this.list.length));
 }
});

Isolate.$defineClass("StackTrace", "Object", ["stack"], {
 toString$0: function() {
  if (!$.eqNullB(this.stack)) {
    var t0 = this.stack;
  } else {
    t0 = '';
  }
  return t0;
 }
});

Isolate.$defineClass("Closure43", "Object", [], {
 toString$0: function() {
  return 'Closure';
 }
});

Isolate.$defineClass("MetaInfo", "Object", ["set?", "tags", "tag?"], {
});

Isolate.$defineClass("StringMatch", "Object", ["pattern?", "str", "_lib5_start"], {
 group$1: function(group_) {
  if (!$.eqB(group_, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(group_));
  } else {
  }
  return this.pattern;
 },
 operator$index$1: function(g) {
  return this.group$1(g);
 }
});

Isolate.$defineClass("Object", "", [], {
 toString$0: function() {
  return $.objectToString(this);
 }
});

Isolate.$defineClass("IndexOutOfRangeException", "Object", ["_index"], {
 toString$0: function() {
  return 'IndexOutOfRangeException: ' + $.stringToString(this._index);
 }
});

Isolate.$defineClass("NoSuchMethodException", "Object", ["_existingArgumentNames", "_arguments", "_functionName", "_receiver"], {
 toString$0: function() {
  var sb = $.StringBufferImpl$1('');
  for (var i = 0; $.ltB(i, $.get$length(this._arguments)); i = i + 1) {
    if (i > 0) {
      sb.add$1(', ');
    } else {
    }
    sb.add$1($.index(this._arguments, i));
  }
  if (this._existingArgumentNames === (void 0)) {
    return 'NoSuchMethodException : method not found: \'' + $.stringToString(this._functionName) + '\'\nReceiver: ' + $.stringToString(this._receiver) + '\nArguments: [' + $.stringToString(sb) + ']';
  } else {
    var actualParameters = sb.toString$0();
    var sb0 = $.StringBufferImpl$1('');
    for (var i0 = 0; $.ltB(i0, $.get$length(this._existingArgumentNames)); i0 = i0 + 1) {
      if (i0 > 0) {
        sb0.add$1(', ');
      } else {
      }
      sb0.add$1($.index(this._existingArgumentNames, i0));
    }
    var formalParameters = sb0.toString$0();
    return 'NoSuchMethodException: incorrect number of arguments passed to method named \'' + $.stringToString(this._functionName) + '\'\nReceiver: ' + $.stringToString(this._receiver) + '\nTried calling: ' + $.stringToString(this._functionName) + '(' + $.stringToString(actualParameters) + ')\nFound: ' + $.stringToString(this._functionName) + '(' + $.stringToString(formalParameters) + ')';
  }
 }
});

Isolate.$defineClass("ObjectNotClosureException", "Object", [], {
 toString$0: function() {
  return 'Object is not closure';
 }
});

Isolate.$defineClass("IllegalArgumentException", "Object", ["_arg"], {
 toString$0: function() {
  return 'Illegal argument(s): ' + $.stringToString(this._arg);
 }
});

Isolate.$defineClass("StackOverflowException", "Object", [], {
 toString$0: function() {
  return 'Stack Overflow';
 }
});

Isolate.$defineClass("BadNumberFormatException", "Object", ["_s"], {
 toString$0: function() {
  return 'BadNumberFormatException: \'' + $.stringToString(this._s) + '\'';
 }
});

Isolate.$defineClass("NullPointerException", "Object", ["arguments", "functionName"], {
 get$exceptionName: function() {
  return 'NullPointerException';
 },
 toString$0: function() {
  if ($.eqNullB(this.functionName)) {
    return this.get$exceptionName();
  } else {
    return '' + $.stringToString(this.get$exceptionName()) + ' : method: \'' + $.stringToString(this.functionName) + '\'\nReceiver: null\nArguments: ' + $.stringToString(this.arguments);
  }
 }
});

Isolate.$defineClass("NoMoreElementsException", "Object", [], {
 toString$0: function() {
  return 'NoMoreElementsException';
 }
});

Isolate.$defineClass("EmptyQueueException", "Object", [], {
 toString$0: function() {
  return 'EmptyQueueException';
 }
});

Isolate.$defineClass("UnsupportedOperationException", "Object", ["_message"], {
 toString$0: function() {
  return 'UnsupportedOperationException: ' + $.stringToString(this._message);
 }
});

Isolate.$defineClass("IllegalJSRegExpException", "Object", ["_errmsg", "_pattern"], {
 toString$0: function() {
  return 'IllegalJSRegExpException: \'' + $.stringToString(this._pattern) + '\' \'' + $.stringToString(this._errmsg) + '\'';
 }
});

Isolate.$defineClass("ExpectException", "Object", ["message?"], {
 toString$0: function() {
  return this.message;
 },
 is$ExpectException: true
});

Isolate.$defineClass("FutureNotCompleteException", "Object", [], {
 toString$0: function() {
  return 'Exception: future has not been completed';
 }
});

Isolate.$defineClass("FutureAlreadyCompleteException", "Object", [], {
 toString$0: function() {
  return 'Exception: future already completed';
 }
});

Isolate.$defineClass("AssertionError", "Object", [], {
});

Isolate.$defineClass("TypeError", "AssertionError", ["msg"], {
 toString$0: function() {
  return this.msg;
 }
});

Isolate.$defineClass("_AbstractWorkerEventsImpl", "_EventsImpl", ["_ptr"], {
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); }
});

Isolate.$defineClass("_AudioContextEventsImpl", "_EventsImpl", ["_ptr"], {
 get$complete: function() {
  return this._get$1('complete');
 },
 complete$1: function(arg0) { return this.get$complete().$call$1(arg0); }
});

Isolate.$defineClass("_BatteryManagerEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_BodyElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 },
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); }
});

Isolate.$defineClass("_DOMApplicationCacheEventsImpl", "_EventsImpl", ["_ptr"], {
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); }
});

Isolate.$defineClass("_DedicatedWorkerContextEventsImpl", "_WorkerContextEventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_DeprecatedPeerConnectionEventsImpl", "_EventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_DocumentEventsImpl", "_ElementEventsImpl", ["_ptr"], {
 get$keyUp: function() {
  return this._get$1('keyup');
 },
 keyUp$1: function(arg0) { return this.get$keyUp().$call$1(arg0); },
 get$keyDown: function() {
  return this._get$1('keydown');
 },
 keyDown$1: function(arg0) { return this.get$keyDown().$call$1(arg0); },
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); }
});

Isolate.$defineClass("FilteredElementList", "Object", ["_childNodes", "_node"], {
 last$0: function() {
  return $.last(this.get$_filtered());
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this.get$_filtered(), element, start);
 },
 getRange$2: function(start, rangeLength) {
  return $.getRange(this.get$_filtered(), start, rangeLength);
 },
 iterator$0: function() {
  return $.iterator(this.get$_filtered());
 },
 operator$index$1: function(index) {
  return $.index(this.get$_filtered(), index);
 },
 get$length: function() {
  return $.get$length(this.get$_filtered());
 },
 isEmpty$0: function() {
  return $.isEmpty(this.get$_filtered());
 },
 filter$1: function(f) {
  return $.filter(this.get$_filtered(), f);
 },
 map$1: function(f) {
  return $.map(this.get$_filtered(), f);
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    result.remove$0();
  } else {
  }
  return result;
 },
 clear$0: function() {
  $.clear(this._childNodes);
 },
 removeRange$2: function(start, rangeLength) {
  $.forEach($.getRange(this.get$_filtered(), start, rangeLength), new $.Closure10());
 },
 addLast$1: function(value) {
  this.add$1(value);
 },
 addAll$1: function(collection) {
  $.forEach(collection, this.get$add());
 },
 add$1: function(value) {
  $.add$1(this._childNodes, value);
 },
 get$add: function() { return new $.Closure44(this, 'add$1'); },
 set$length: function(newLength) {
  var len = $.get$length(this);
  if ($.geB(newLength, len)) {
    return;
  } else {
    if ($.ltB(newLength, 0)) {
      throw $.captureStackTrace($.CTC6);
    } else {
    }
  }
  this.removeRange$2($.sub(newLength, 1), $.sub(len, newLength));
 },
 operator$indexSet$2: function(index, value) {
  this.operator$index$1(index).replaceWith$1(value);
 },
 forEach$1: function(f) {
  $.forEach(this.get$_filtered(), f);
 },
 get$first: function() {
  for (var t0 = $.iterator(this._childNodes); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (typeof t1 === 'object' && t1.is$Element()) {
      return t1;
    } else {
    }
  }
  return;
 },
 first$0: function() { return this.get$first().$call$0(); },
 get$_filtered: function() {
  return $.List$from($.filter(this._childNodes, new $.Closure8()));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_ChildrenElementList", "Object", ["_childElements", "_element?"], {
 last$0: function() {
  return this._element.get$$$dom_lastElementChild();
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._element.$dom_removeChild$1(result);
  } else {
  }
  return result;
 },
 clear$0: function() {
  this._element.set$text('');
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap$1($.getRange2(this, start, rangeLength, []));
 },
 addAll$1: function(collection) {
  for (var t0 = $.iterator(collection); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    this._element.$dom_appendChild$1(t1);
  }
 },
 iterator$0: function() {
  return $.iterator(this._toList$0());
 },
 addLast$1: function(value) {
  return this.add$1(value);
 },
 add$1: function(value) {
  this._element.$dom_appendChild$1(value);
  return value;
 },
 set$length: function(newLength) {
  throw $.captureStackTrace($.CTC5);
 },
 operator$indexSet$2: function(index, value) {
  this._element.$dom_replaceChild$2(value, $.index(this._childElements, index));
 },
 operator$index$1: function(index) {
  return $.index(this._childElements, index);
 },
 get$length: function() {
  return $.get$length(this._childElements);
 },
 isEmpty$0: function() {
  return $.eqNull(this._element.get$$$dom_firstElementChild());
 },
 map$1: function(f) {
  var out = [];
  for (var t0 = this.iterator$0(); t0.hasNext$0() === true; ) {
    $.add$1(out, f.$call$1(t0.next$0()));
  }
  return out;
 },
 filter$1: function(f) {
  var t0 = ({});
  t0.f_1 = f;
  var output = [];
  this.forEach$1(new $.Closure9(t0, output));
  return $._FrozenElementList$_wrap$1(output);
 },
 forEach$1: function(f) {
  for (var t0 = $.iterator(this._childElements); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
 },
 get$first: function() {
  return this._element.get$$$dom_firstElementChild();
 },
 first$0: function() { return this.get$first().$call$0(); },
 _toList$0: function() {
  var output = $.List($.get$length(this._childElements));
  for (var len = $.get$length(this._childElements), i = 0; $.ltB(i, len); i = i + 1) {
    var t0 = $.index(this._childElements, i);
    var t1 = output.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    output[i] = t0;
  }
  return output;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_FrozenElementList", "Object", ["_nodeList"], {
 last$0: function() {
  return $.last(this._nodeList);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.CTC5);
 },
 clear$0: function() {
  throw $.captureStackTrace($.CTC5);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._nodeList, element, start);
 },
 getRange$2: function(start, rangeLength) {
  return $._FrozenElementList$_wrap$1($.getRange(this._nodeList, start, rangeLength));
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.CTC5);
 },
 iterator$0: function() {
  return $._FrozenElementListIterator$1(this);
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.CTC5);
 },
 add$1: function(value) {
  throw $.captureStackTrace($.CTC5);
 },
 set$length: function(newLength) {
  $.set$length(this._nodeList, newLength);
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.CTC5);
 },
 operator$index$1: function(index) {
  return $.index(this._nodeList, index);
 },
 get$length: function() {
  return $.get$length(this._nodeList);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._nodeList);
 },
 filter$1: function(f) {
  var out = $._ElementList$1([]);
  for (var t0 = this.iterator$0(); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (f.$call$1(t1) === true) {
      out.add$1(t1);
    } else {
    }
  }
  return out;
 },
 map$1: function(f) {
  var out = [];
  for (var t0 = this.iterator$0(); t0.hasNext$0() === true; ) {
    $.add$1(out, f.$call$1(t0.next$0()));
  }
  return out;
 },
 forEach$1: function(f) {
  for (var t0 = this.iterator$0(); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
 },
 get$first: function() {
  return $.index(this._nodeList, 0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_FrozenElementListIterator", "Object", ["_lib_index", "_list"], {
 hasNext$0: function() {
  return $.lt(this._lib_index, $.get$length(this._list));
 },
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  } else {
  }
  var t0 = this._list;
  var t1 = this._lib_index;
  this._lib_index = $.add(t1, 1);
  return $.index(t0, t1);
 }
});

Isolate.$defineClass("_ElementList", "_ListWrapper", ["_list"], {
 getRange$2: function(start, rangeLength) {
  return $._ElementList$1($._ListWrapper.prototype.getRange$2.call(this, start, rangeLength));
 },
 filter$1: function(f) {
  return $._ElementList$1($._ListWrapper.prototype.filter$1.call(this, f));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_ElementEventsImpl", "_EventsImpl", ["_ptr"], {
 get$keyUp: function() {
  return this._get$1('keyup');
 },
 keyUp$1: function(arg0) { return this.get$keyUp().$call$1(arg0); },
 get$keyDown: function() {
  return this._get$1('keydown');
 },
 keyDown$1: function(arg0) { return this.get$keyDown().$call$1(arg0); },
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); }
});

Isolate.$defineClass("_EventSourceEventsImpl", "_EventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 },
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); }
});

Isolate.$defineClass("_EventsImpl", "Object", ["_ptr"], {
 _get$1: function(type) {
  return $._EventListenerListImpl$2(this._ptr, type);
 },
 operator$index$1: function(type) {
  return this._get$1($.toLowerCase(type));
 }
});

Isolate.$defineClass("_EventListenerListImpl", "Object", ["_type", "_ptr"], {
 _remove$2: function(listener, useCapture) {
  this._ptr.$dom_removeEventListener$3(this._type, listener, useCapture);
 },
 _add$2: function(listener, useCapture) {
  this._ptr.$dom_addEventListener$3(this._type, listener, useCapture);
 },
 remove$2: function(listener, useCapture) {
  this._remove$2(listener, useCapture);
  return this;
 },
 remove$1: function(listener) {
  return this.remove$2(listener,false)
},
 add$2: function(listener, useCapture) {
  this._add$2(listener, useCapture);
  return this;
 },
 add$1: function(listener) {
  return this.add$2(listener,false)
}
});

Isolate.$defineClass("_FileReaderEventsImpl", "_EventsImpl", ["_ptr"], {
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); }
});

Isolate.$defineClass("_FileWriterEventsImpl", "_EventsImpl", ["_ptr"], {
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); }
});

Isolate.$defineClass("_FrameSetElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 },
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); }
});

Isolate.$defineClass("_IDBDatabaseEventsImpl", "_EventsImpl", ["_ptr"], {
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); }
});

Isolate.$defineClass("_IDBRequestEventsImpl", "_EventsImpl", ["_ptr"], {
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); }
});

Isolate.$defineClass("_IDBTransactionEventsImpl", "_EventsImpl", ["_ptr"], {
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); },
 get$complete: function() {
  return this._get$1('complete');
 },
 complete$1: function(arg0) { return this.get$complete().$call$1(arg0); }
});

Isolate.$defineClass("_IDBVersionChangeRequestEventsImpl", "_IDBRequestEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_InputElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_JavaScriptAudioNodeEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MediaElementEventsImpl", "_ElementEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MediaStreamEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_MessagePortEventsImpl", "_EventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_ChildNodeListLazy", "Object", ["_this"], {
 operator$index$1: function(index) {
  return $.index(this._this.get$$$dom_childNodes(), index);
 },
 get$length: function() {
  return $.get$length(this._this.get$$$dom_childNodes());
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange2(this, start, rangeLength, []));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter3(this, [], f));
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 iterator$0: function() {
  return $.iterator(this._this.get$$$dom_childNodes());
 },
 operator$indexSet$2: function(index, value) {
  this._this.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._this.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._this.$dom_removeChild$1(result);
  } else {
  }
  return result;
 },
 addAll$1: function(collection) {
  for (var t0 = $.iterator(collection); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    this._this.$dom_appendChild$1(t1);
  }
 },
 addLast$1: function(value) {
  this._this.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._this.$dom_appendChild$1(value);
 },
 last$0: function() {
  return this._this.lastChild;;
 },
 get$first: function() {
  return this._this.firstChild;;
 },
 first$0: function() { return this.get$first().$call$0(); },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_ListWrapper", "Object", [], {
 get$first: function() {
  return $.index(this._list, 0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 getRange$2: function(start, rangeLength) {
  return $.getRange(this._list, start, rangeLength);
 },
 last$0: function() {
  return $.last(this._list);
 },
 removeLast$0: function() {
  return $.removeLast(this._list);
 },
 clear$0: function() {
  return $.clear(this._list);
 },
 indexOf$2: function(element, start) {
  return $.indexOf$2(this._list, element, start);
 },
 addAll$1: function(collection) {
  return $.addAll(this._list, collection);
 },
 addLast$1: function(value) {
  return $.addLast(this._list, value);
 },
 add$1: function(value) {
  return $.add$1(this._list, value);
 },
 set$length: function(newLength) {
  $.set$length(this._list, newLength);
 },
 operator$indexSet$2: function(index, value) {
  $.indexSet(this._list, index, value);
 },
 operator$index$1: function(index) {
  return $.index(this._list, index);
 },
 get$length: function() {
  return $.get$length(this._list);
 },
 isEmpty$0: function() {
  return $.isEmpty(this._list);
 },
 filter$1: function(f) {
  return $.filter(this._list, f);
 },
 map$1: function(f) {
  return $.map(this._list, f);
 },
 forEach$1: function(f) {
  return $.forEach(this._list, f);
 },
 iterator$0: function() {
  return $.iterator(this._list);
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_NodeListWrapper", "_ListWrapper", ["_list"], {
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange(this._list, start, rangeLength));
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter(this._list, f));
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

Isolate.$defineClass("_NotificationEventsImpl", "_EventsImpl", ["_ptr"], {
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); },
 get$close: function() {
  return this._get$1('close');
 },
 close$0: function() { return this.get$close().$call$0(); }
});

Isolate.$defineClass("_PeerConnection00EventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_SVGElementInstanceEventsImpl", "_EventsImpl", ["_ptr"], {
 get$keyUp: function() {
  return this._get$1('keyup');
 },
 keyUp$1: function(arg0) { return this.get$keyUp().$call$1(arg0); },
 get$keyDown: function() {
  return this._get$1('keydown');
 },
 keyDown$1: function(arg0) { return this.get$keyDown().$call$1(arg0); },
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); }
});

Isolate.$defineClass("_SharedWorkerContextEventsImpl", "_WorkerContextEventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_SpeechRecognitionEventsImpl", "_EventsImpl", ["_ptr"], {
 get$result: function() {
  return this._get$1('result');
 },
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); }
});

Isolate.$defineClass("_TextTrackEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_TextTrackCueEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_TextTrackListEventsImpl", "_EventsImpl", ["_ptr"], {
});

Isolate.$defineClass("_WebSocketEventsImpl", "_EventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 },
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); },
 get$close: function() {
  return this._get$1('close');
 },
 close$0: function() { return this.get$close().$call$0(); }
});

Isolate.$defineClass("_WindowEventsImpl", "_EventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 },
 get$keyUp: function() {
  return this._get$1('keyup');
 },
 keyUp$1: function(arg0) { return this.get$keyUp().$call$1(arg0); },
 get$keyDown: function() {
  return this._get$1('keydown');
 },
 keyDown$1: function(arg0) { return this.get$keyDown().$call$1(arg0); },
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); }
});

Isolate.$defineClass("_WorkerEventsImpl", "_AbstractWorkerEventsImpl", ["_ptr"], {
 get$message: function() {
  return this._get$1('message');
 }
});

Isolate.$defineClass("_WorkerContextEventsImpl", "_EventsImpl", ["_ptr"], {
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); }
});

Isolate.$defineClass("_XMLHttpRequestEventsImpl", "_EventsImpl", ["_ptr"], {
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); }
});

Isolate.$defineClass("_XMLHttpRequestUploadEventsImpl", "_EventsImpl", ["_ptr"], {
 get$error: function() {
  return this._get$1('error');
 },
 error$2: function(arg0, arg1) { return this.get$error().$call$2(arg0, arg1); }
});

Isolate.$defineClass("_FixedSizeListIterator", "_VariableSizeListIterator", ["_lib_length", "_pos", "_array"], {
 hasNext$0: function() {
  return $.gt(this._lib_length, this._pos);
 }
});

Isolate.$defineClass("_VariableSizeListIterator", "Object", [], {
 next$0: function() {
  if (this.hasNext$0() !== true) {
    throw $.captureStackTrace($.CTC2);
  } else {
  }
  var t0 = this._array;
  var t1 = this._pos;
  this._pos = $.add(t1, 1);
  return $.index(t0, t1);
 },
 hasNext$0: function() {
  return $.gt($.get$length(this._array), this._pos);
 }
});

Isolate.$defineClass("Vector2D", "Object", ["_y", "_x"], {
 get$length: function() {
  return $.lengthOfHypotenuse(this._x, this._y);
 },
 set$y: function(value) {
  this._y = value;
 },
 get$y: function() {
  return this._y;
 },
 set$x: function(value) {
  this._x = value;
 },
 get$x: function() {
  return this._x;
 },
 operator$div$1: function(scalar) {
  return $.Vector2D$2($.div(this.get$x(), scalar), $.div(this.get$y(), scalar));
 },
 operator$mul$1: function(scalar) {
  return $.Vector2D$2($.mul(this.get$x(), scalar), $.mul(this.get$y(), scalar));
 },
 operator$eq$1: function(other) {
  var t0 = $.eqB(this.get$x(), other.get$x());
  if (t0) {
    var t1 = $.eqB(this.get$y(), other.get$y());
  } else {
    t1 = t0;
  }
  return t1;
 },
 operator$sub$1: function(other) {
  return $.Vector2D$2($.sub(this.get$x(), other.get$x()), $.sub(this.get$y(), other.get$y()));
 },
 operator$add$1: function(other) {
  return $.Vector2D$2($.add(this.get$x(), other.get$x()), $.add(this.get$y(), other.get$y()));
 },
 operator$negate$0: function() {
  return $.Vector2D$2($.neg(this.get$x()), $.neg(this.get$y()));
 },
 clone$0: function() {
  return $.Vector2D$2(this.get$x(), this.get$y());
 },
 normalize$0: function() {
  var l = $.get$length(this);
  if (!$.eqB(l, 0)) {
    this._x = $.div(this._x, l);
    this._y = $.div(this._y, l);
  } else {
  }
 },
 getNormalized$0: function() {
  var l = $.get$length(this);
  if ($.eqB(l, 0)) {
    return this.clone$0();
  } else {
  }
  return $.Vector2D$2($.div(this.get$x(), l), $.div(this.get$y(), l));
 },
 zero$0: function() {
  this.set$y(0);
  this.set$x(0);
 },
 Vector2D$2: function(_x, _y) {
  $.assert($.isInfinite(this._x) !== true);
  $.assert($.isInfinite(this._y) !== true);
  $.assert($.isNaN(this._x) !== true);
  $.assert($.isNaN(this._y) !== true);
 }
});

Isolate.$defineClass("Agent", "Object", ["type?", "pos?"], {
 Agent$0: function() {
  this.intendedMove = $.Vector2D$2(0, 0);
  this.currentMove = $.Vector2D$2(0, 0);
 }
});

Isolate.$defineClass("Herd", "Object", ["allWolves?", "allDogs?", "allSheep?"], {
 iterator$0: function() {
  return $.HerdIterator$1(this);
 },
 update$1: function(timeSinceLast) {
  for (var t0 = this.iterator$0(); t0.hasNext$0() === true; ) {
    t0.next$0().update$1(timeSinceLast);
  }
 },
 Herd$1: function(numSheep) {
  if (typeof numSheep !== 'number') return this.Herd$1$bailout(numSheep,  0);
  this.allSheep = $.List((void 0));
  this.allDogs = $.List((void 0));
  this.allWolves = $.List((void 0));
  for (var i = 0; i < numSheep; i = i + 1) {
    var t0 = this.allSheep;
    var t1 = i * 10;
    $.add$1(t0, $.Sheep$4(100 + $.mod(t1, 100), 100 + $.tdiv(t1, 100) * 10, this, 'Sheep #' + $.stringToString(i)));
  }
 },
 Herd$1$bailout: function(numSheep, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      this.allSheep = $.List((void 0));
      this.allDogs = $.List((void 0));
      this.allWolves = $.List((void 0));
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, numSheep)) break L0;
        var t1 = this.allSheep;
        var t2 = i * 10;
        $.add$1(t1, $.Sheep$4(100 + $.mod(t2, 100), 100 + $.tdiv(t2, 100) * 10, this, 'Sheep #' + $.stringToString(i)));
        i = i + 1;
      }
  }
 }
});

Isolate.$defineClass("HerdIterator", "Object", ["_lastIndex", "_wolfCount", "_dogCount", "_sheepCount", "_wolfPos", "_dogPos", "_sheepPos", "_lib2_pos", "herd"], {
 next$0: function() {
  var t0 = this._lib2_pos;
  this._lib2_pos = $.add(t0, 1);
  if ($.geB(t0, this._lastIndex)) {
    throw $.captureStackTrace($.NoMoreElementsException$0());
  } else {
  }
  if ($.leB(this._lib2_pos, $.sub(this._sheepCount, 1))) {
    this._sheepPos = $.add(this._sheepPos, 1);
    return $.index(this.herd.get$allSheep(), this._sheepPos);
  } else {
    if ($.leB(this._lib2_pos, $.sub($.add(this._sheepCount, this._dogCount), 1))) {
      this._dogPos = $.add(this._dogPos, 1);
      return $.index(this.herd.get$allDogs(), this._dogPos);
    } else {
      if ($.leB(this._lib2_pos, $.sub($.add($.add(this._sheepCount, this._dogCount), this._wolfCount), 1))) {
        this._wolfPos = $.add(this._wolfPos, 1);
        return $.index(this.herd.get$allWolves(), this._wolfPos);
      } else {
      }
    }
  }
  throw $.captureStackTrace('Something wrong with the HerdIterator arithmetic. _pos = ' + $.stringToString(this._lib2_pos) + ', _lastIndex = ' + $.stringToString(this._lastIndex));
 },
 hasNext$0: function() {
  return $.lt(this._lib2_pos, this._lastIndex);
 },
 HerdIterator$1: function(herd) {
  this._lib2_pos = -1;
  this._wolfPos = -1;
  this._dogPos = -1;
  this._sheepPos = -1;
  this._sheepCount = $.get$length(this.herd.get$allSheep());
  this._dogCount = $.get$length(this.herd.get$allDogs());
  this._wolfCount = $.get$length(this.herd.get$allWolves());
  this._lastIndex = $.sub($.add($.add(this._sheepCount, this._dogCount), this._wolfCount), 1);
 }
});

Isolate.$defineClass("Sheep", "Agent", ["herd", "name", "type", "currentMove", "intendedMove", "maxSpeed", "pos"], {
 update$1: function(timeSinceLast) {
  var quadrantX = $.tdiv($.toInt(this.pos.get$x()), 30);
  var quadrantY = $.tdiv($.toInt(this.pos.get$y()), 30);
  for (var t0 = $.iterator(this.herd), ix = 0, iy = 0; t0.hasNext$0() === true; ix = ix0, iy = iy0) {
    var t1 = t0.next$0();
    if ($.eqB(t1, this)) {
      var iy0 = iy;
      var ix0 = ix;
      continue;
    } else {
    }
    var otherQuadrantX = $.tdiv($.toInt(t1.get$pos().get$x()), 30);
    var otherQuadrantY = $.tdiv($.toInt(t1.get$pos().get$y()), 30);
    var t2 = $.eqB(this.type, $.SHEEP);
    if (t2) {
      var t3 = $.eqB(t1.get$type(), $.SHEEP);
    } else {
      t3 = t2;
    }
    if (t3) {
      var t4 = $.gtB($.abs($.sub(quadrantX, otherQuadrantX)), 1);
      if (!t4) {
        var t5 = $.gtB($.abs($.sub(quadrantY, otherQuadrantY)), 1);
      } else {
        t5 = t4;
      }
    } else {
      t5 = t3;
    }
    if (t5) {
      iy0 = iy;
      ix0 = ix;
      continue;
    } else {
    }
    var t6 = $.eqB(this.type, $.SHEEP);
    if (t6) {
      var t7 = $.eqB(t1.get$type(), $.DOG);
    } else {
      t7 = t6;
    }
    if (t7) {
      var t8 = $.gtB($.abs($.sub(quadrantX, otherQuadrantX)), 5);
      if (!t8) {
        var t9 = $.gtB($.abs($.sub(quadrantY, otherQuadrantY)), 5);
      } else {
        t9 = t8;
      }
    } else {
      t9 = t7;
    }
    if (t9) {
      iy0 = iy;
      ix0 = ix;
      continue;
    } else {
    }
    var vx = $.sub(t1.get$pos().get$x(), this.pos.get$x());
    var vy = $.sub(t1.get$pos().get$y(), this.pos.get$y());
    var vl = $.sqrt($.add($.mul(vx, vx), $.mul(vy, vy)));
    if ($.ltB(vl, 3)) {
      $.print('Too close, this shouldn\'t be physically possible.');
    } else {
    }
    if ($.ltB(vl, 10)) {
      var ix1 = $.add(ix, $.mul($.neg(vx), 10.0));
      var iy1 = $.add(iy, $.mul($.neg(vy), 10.0));
      var ix2 = ix1;
    } else {
      iy1 = iy;
      ix2 = ix;
    }
    var t10 = $.eqB(this.type, $.SHEEP);
    if (t10) {
      var t11 = $.eqB(t1.get$type(), $.SHEEP);
    } else {
      t11 = t10;
    }
    if (t11) {
      var t12 = $.ltB(vl, 30);
    } else {
      t12 = t11;
    }
    if (t12) {
      var t13 = $.gtB(vl, 15);
    } else {
      t13 = t12;
    }
    if (t13) {
      var ix3 = $.add(ix2, $.mul($.div(vx, $.mul(vl, vl)), 1.0));
      var iy2 = $.add(iy1, $.mul($.div(vy, $.mul(vl, vl)), 1.0));
      var ix4 = ix3;
    } else {
      iy2 = iy1;
      ix4 = ix2;
    }
    var t14 = $.eqB(this.type, $.SHEEP);
    if (t14) {
      var t15 = $.eqB(t1.get$type(), $.DOG);
    } else {
      t15 = t14;
    }
    if (t15) {
      var t16 = $.ltB(vl, 100);
    } else {
      t16 = t15;
    }
    if (t16) {
      var ix5 = $.sub(ix4, $.mul($.div(vx, vl), 5.0));
      iy0 = $.sub(iy2, $.mul($.div(vy, vl), 5.0));
      ix0 = ix5;
    } else {
      iy0 = iy2;
      ix0 = ix4;
    }
  }
  var il = $.lengthOfHypotenuse(ix, iy);
  if ($.gtB(il, 1.0)) {
    var ix6 = $.div(ix, il);
    var iy3 = $.div(iy, il);
    var ix7 = ix6;
  } else {
    iy3 = iy;
    ix7 = ix;
  }
  var cvx = $.add(ix7 * 2 / 3, $.div(this.currentMove.get$x(), 3));
  var cvy = $.add(iy3 * 2 / 3, $.div(this.currentMove.get$y(), 3));
  if ($.ltB($.lengthOfHypotenuse(cvx, cvy), $.div(this.maxSpeed, 4))) {
    var cvy0 = 0;
    var cvx0 = 0;
  } else {
    cvy0 = cvy;
    cvx0 = cvx;
  }
  var t17 = this.pos;
  t17.set$x($.add(t17.get$x(), $.mul(cvx0, this.maxSpeed)));
  var t18 = this.pos;
  t18.set$y($.add(t18.get$y(), $.mul(cvy0, this.maxSpeed)));
  this.currentMove.set$x(cvx0);
  this.currentMove.set$y(cvy0);
 },
 Sheep$4: function(x, y, herd, name$) {
  this.pos = $.Vector2D$2(x, y);
  this.type = $.SHEEP;
  this.name = name$;
  this.herd = herd;
  this.maxSpeed = 2.0;
 }
});

Isolate.$defineClass("Dog", "Agent", ["charCodes", "downPressed", "upPressed", "rightPressed", "leftPressed", "herd", "name", "type", "currentMove", "intendedMove", "maxSpeed", "pos"], {
 update$1: function(timeSinceLast) {
  this.intendedMove.zero$0();
  if (this.upPressed === true) {
    var t0 = this.intendedMove;
    t0.set$y($.sub(t0.get$y(), 1));
  } else {
  }
  if (this.downPressed === true) {
    var t1 = this.intendedMove;
    t1.set$y($.add(t1.get$y(), 1));
  } else {
  }
  if (this.leftPressed === true) {
    var t2 = this.intendedMove;
    t2.set$x($.sub(t2.get$x(), 1));
  } else {
  }
  if (this.rightPressed === true) {
    var t3 = this.intendedMove;
    t3.set$x($.add(t3.get$x(), 1));
  } else {
  }
  this.intendedMove.normalize$0();
  this.currentMove = $.add($.div($.mul(this.intendedMove, 2), 3), $.div(this.currentMove, 3));
  this.pos = $.add(this.pos, $.mul(this.currentMove, this.maxSpeed));
 },
 keyUp$1: function(charCode) {
  $0:{
    if ($.eqB($.index(this.charCodes, 0), charCode)) {
      this.upPressed = false;
      break $0;
    } else {
      if ($.eqB($.index(this.charCodes, 1), charCode)) {
        this.downPressed = false;
        break $0;
      } else {
        if ($.eqB($.index(this.charCodes, 2), charCode)) {
          this.leftPressed = false;
          break $0;
        } else {
          if ($.eqB($.index(this.charCodes, 3), charCode)) {
            this.rightPressed = false;
            break $0;
          } else {
          }
        }
      }
    }
  }
 },
 get$keyUp: function() { return new $.Closure44(this, 'keyUp$1'); },
 keyDown$1: function(charCode) {
  $0:{
    if ($.eqB($.index(this.charCodes, 0), charCode)) {
      this.upPressed = true;
      break $0;
    } else {
      if ($.eqB($.index(this.charCodes, 1), charCode)) {
        this.downPressed = true;
        break $0;
      } else {
        if ($.eqB($.index(this.charCodes, 2), charCode)) {
          this.leftPressed = true;
          break $0;
        } else {
          if ($.eqB($.index(this.charCodes, 3), charCode)) {
            this.rightPressed = true;
            break $0;
          } else {
          }
        }
      }
    }
  }
 },
 get$keyDown: function() { return new $.Closure44(this, 'keyDown$1'); },
 Dog$5: function(x, y, herd, name$, charCodes) {
  if ($.eqNullB(this.charCodes)) {
    this.charCodes = $.CTC3;
  } else {
  }
  this.pos = $.Vector2D$2(x, y);
  this.type = $.DOG;
  this.name = name$;
  this.herd = herd;
  this.maxSpeed = 5.0;
 }
});

Isolate.$defineClass("Configuration", "Object", [], {
 _indent$1: function(str) {
  return $.join($.map($.split(str, '\n'), new $.Closure35()), '\n');
 },
 onDone$5: function(passed, failed, errors, results, uncaughtError) {
  for (var t0 = $.iterator($._tests); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    $.print('' + $.stringToString($.toUpperCase(t1.get$result())) + ': ' + $.stringToString(t1.get$description()));
    if (!$.eqB(t1.get$message(), '')) {
      $.print(this._indent$1(t1.get$message()));
    } else {
    }
    var t2 = !$.eqNullB(t1.get$stackTrace());
    if (t2) {
      var t3 = !$.eqB(t1.get$stackTrace(), '');
    } else {
      t3 = t2;
    }
    if (t3) {
      $.print(this._indent$1(t1.get$stackTrace()));
    } else {
    }
  }
  $.print('');
  var t4 = $.eqB(passed, 0);
  if (t4) {
    var t5 = $.eqB(failed, 0);
  } else {
    t5 = t4;
  }
  if (t5) {
    var t6 = $.eqB(errors, 0);
  } else {
    t6 = t5;
  }
  if (t6) {
    $.print('No tests found.');
    var success = false;
  } else {
    var t7 = $.eqB(failed, 0);
    if (t7) {
      var t8 = $.eqB(errors, 0);
    } else {
      t8 = t7;
    }
    if (t8) {
      var t9 = $.eqNullB(uncaughtError);
    } else {
      t9 = t8;
    }
    if (t9) {
      $.print('All ' + $.stringToString(passed) + ' tests passed.');
      success = true;
    } else {
      if (!$.eqNullB(uncaughtError)) {
        $.print('Top-level uncaught error: ' + $.stringToString(uncaughtError));
      } else {
      }
      $.print('' + $.stringToString(passed) + ' PASSED, ' + $.stringToString(failed) + ' FAILED, ' + $.stringToString(errors) + ' ERRORS');
      success = false;
    }
  }
  if (!success) {
    throw $.captureStackTrace($.ExceptionImplementation$1('Some tests failed.'));
  } else {
  }
 },
 onStart$0: function() {
 },
 onInit$0: function() {
 }
});

Isolate.$defineClass("Expectation", "Object", ["_lib4_value"], {
 isTrue$0: function() {
  $.equals(true, this._lib4_value, (void 0));
 },
 approxEquals$3: function(expected, tolerance, reason) {
  $.approxEquals(expected, this._lib4_value, tolerance, reason);
 },
 approxEquals$1: function(expected) {
  return this.approxEquals$3(expected,(void 0),(void 0))
},
 equals$1: function(expected) {
  var t0 = this._lib4_value;
  var t1 = typeof t0 === 'string';
  if (t1) {
    var t2 = typeof expected === 'string';
  } else {
    t2 = t1;
  }
  if (t2) {
    $.stringEquals(expected, this._lib4_value, (void 0));
  } else {
    var t3 = this._lib4_value;
    var t4 = typeof t3 === 'object' && t3.is$Map();
    if (t4) {
      var t5 = typeof expected === 'object' && expected.is$Map();
    } else {
      t5 = t4;
    }
    if (t5) {
      $.mapEquals(expected, this._lib4_value, (void 0));
    } else {
      var t6 = this._lib4_value;
      var t7 = typeof t6 === 'object' && !!t6.is$Set;
      if (t7) {
        var t8 = typeof expected === 'object' && !!expected.is$Set;
      } else {
        t8 = t7;
      }
      if (t8) {
        $.setEquals(expected, this._lib4_value, (void 0));
      } else {
        $.equals(expected, this._lib4_value, (void 0));
      }
    }
  }
 }
});

Isolate.$defineClass("TestCase", "Object", ["runningTime", "startTime", "currentGroup", "stackTrace?", "result?", "message?", "callbacks?", "test", "description?", "id?"], {
 error$2: function(message, stackTrace) {
  this.result = 'error';
  this.message = message;
  this.stackTrace = stackTrace;
 },
 fail$2: function(message, stackTrace) {
  this.result = 'fail';
  this.message = message;
  this.stackTrace = stackTrace;
 },
 pass$0: function() {
  this.result = 'pass';
 },
 get$isComplete: function() {
  return !$.eqNullB(this.result);
 },
 test$0: function() { return this.test.$call$0(); }
});

Isolate.$defineClass("_Manager", "Object", ["managers?", "mainManager?", "isolates?", "supportsWorkers", "isWorker?", "fromCommandLine?", "topEventLoop?", "rootContext=", "currentContext=", "nextManagerId", "currentManagerId?", "nextIsolateId="], {
 maybeCloseWorker$0: function() {
  if ($.isEmpty(this.isolates) === true) {
    this.mainManager.postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'close'])));
  } else {
  }
 },
 _nativeInitWorkerMessageHandler$0: function() {
      $globalThis.onmessage = function (e) {
      _IsolateNatives._processWorkerMessage(this.mainManager, e);
    }
  ;
 },
 _nativeDetectEnvironment$0: function() {
      this.isWorker = $isWorker;
    this.supportsWorkers = $supportsWorkers;
    this.fromCommandLine = typeof(window) == 'undefined';
  ;
 },
 get$needSerialization: function() {
  return this.get$useWorkers();
 },
 get$useWorkers: function() {
  return this.supportsWorkers;
 },
 _Manager$0: function() {
  this._nativeDetectEnvironment$0();
  this.topEventLoop = $._EventLoop$0();
  this.isolates = $.HashMapImplementation$0();
  this.managers = $.HashMapImplementation$0();
  if (this.isWorker === true) {
    this.mainManager = $._MainManagerStub$0();
    this._nativeInitWorkerMessageHandler$0();
  } else {
  }
 }
});

Isolate.$defineClass("_IsolateContext", "Object", ["isolateStatics", "ports?", "id?"], {
 unregister$1: function(portId) {
  this.ports.remove$1(portId);
  if ($.isEmpty(this.ports) === true) {
    $._globalState().get$isolates().remove$1(this.id);
  } else {
  }
 },
 register$2: function(portId, port) {
  if (this.ports.containsKey$1(portId) === true) {
    throw $.captureStackTrace($.ExceptionImplementation$1('Registry: ports must be registered only once.'));
  } else {
  }
  $.indexSet(this.ports, portId, port);
  $.indexSet($._globalState().get$isolates(), this.id, this);
 },
 lookup$1: function(portId) {
  return $.index(this.ports, portId);
 },
 _setGlobals$0: function() {
  $setGlobals(this);;
 },
 eval$1: function(code) {
  var t0 = $._globalState().get$currentContext();
  $._globalState().set$currentContext(this);
  this._setGlobals$0();
  var t1 = (void 0);
  try {
    var t1 = code.$call$0();
  } finally {
    var t2 = t0;
    $._globalState().set$currentContext(t2);
    if (!$.eqNullB(t0)) {
      t0._setGlobals$0();
    } else {
    }
  }
  return t1;
 },
 initGlobals$0: function() {
  $initGlobals(this);;
 },
 _IsolateContext$0: function() {
  var t0 = $._globalState();
  var t1 = t0.get$nextIsolateId();
  t0.set$nextIsolateId($.add(t1, 1));
  this.id = t1;
  this.ports = $.HashMapImplementation$0();
  this.initGlobals$0();
 }
});

Isolate.$defineClass("_EventLoop", "Object", ["events"], {
 run$0: function() {
  if ($._globalState().get$isWorker() !== true) {
    this._runHelper$0();
  } else {
    try {
      this._runHelper$0();
    } catch (t0) {
      var t1 = $.unwrapException(t0);
      var t2 = t1;
      var t3 = $.getTraceFromException(t0);
      $._globalState().get$mainManager().postMessage$1($._serializeMessage($.makeLiteralMap(['command', 'error', 'msg', '' + $.stringToString(t2) + '\n' + $.stringToString(t3)])));
    }
  }
 },
 _runHelper$0: function() {
  if (!$.eqNullB($._window())) {
    new $.Closure41(this).$call$0();
  } else {
    for (; this.runIteration$0() === true; ) {
    }
  }
 },
 runIteration$0: function() {
  var event$ = this.dequeue$0();
  if ($.eqNullB(event$)) {
    if ($._globalState().get$isWorker() === true) {
      $._globalState().maybeCloseWorker$0();
    } else {
      var t0 = !$.eqNullB($._globalState().get$rootContext());
      if (t0) {
        var t1 = $._globalState().get$isolates().containsKey$1($._globalState().get$rootContext().get$id()) === true;
      } else {
        t1 = t0;
      }
      if (t1) {
        var t2 = $._globalState().get$fromCommandLine() === true;
      } else {
        t2 = t1;
      }
      if (t2) {
        var t3 = $.isEmpty($._globalState().get$rootContext().get$ports()) === true;
      } else {
        t3 = t2;
      }
      if (t3) {
        throw $.captureStackTrace($.ExceptionImplementation$1('Program exited with open ReceivePorts.'));
      } else {
      }
    }
    return false;
  } else {
  }
  event$.process$0();
  return true;
 },
 dequeue$0: function() {
  if ($.isEmpty(this.events) === true) {
    return;
  } else {
  }
  return this.events.removeFirst$0();
 },
 enqueue$3: function(isolate, fn, msg) {
  $.addLast(this.events, $._IsolateEvent$3(isolate, fn, msg));
 }
});

Isolate.$defineClass("_IsolateEvent", "Object", ["message?", "fn", "isolate"], {
 process$0: function() {
  this.isolate.eval$1(this.fn);
 }
});

Isolate.$defineClass("_MainManagerStub", "Object", [], {
 postMessage$1: function(msg) {
  $globalThis.postMessage(msg);;
 },
 get$id: function() {
  return 0;
 }
});

Isolate.$defineClass("_BaseSendPort", "Object", ["_isolateId?"], {
});

Isolate.$defineClass("_NativeJsSendPort", "_BaseSendPort", ["_receivePort?", "_isolateId"], {
 hashCode$0: function() {
  return this._receivePort.get$_id();
 },
 operator$eq$1: function(other) {
  var t0 = typeof other === 'object' && !!other.is$_NativeJsSendPort;
  if (t0) {
    var t1 = $.eqB(this._receivePort, other._receivePort);
  } else {
    t1 = t0;
  }
  return t1;
 },
 send$2: function(message, replyTo) {
  var t0 = ({});
  t0.replyTo_5 = replyTo;
  t0.message_4 = message;
  $._waitForPendingPorts([t0.message_4, t0.replyTo_5], new $.Closure17(this, t0));
 },
 is$_NativeJsSendPort: true
});

Isolate.$defineClass("_WorkerSendPort", "_BaseSendPort", ["_receivePortId?", "_workerId?", "_isolateId"], {
 hashCode$0: function() {
  return $.xor($.xor($.shl(this._workerId, 16), $.shl(this._isolateId, 8)), this._receivePortId);
 },
 operator$eq$1: function(other) {
  var t0 = typeof other === 'object' && !!other.is$_WorkerSendPort;
  if (t0) {
    var t1 = $.eqB(this._workerId, other._workerId);
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = $.eqB(this._isolateId, other.get$_isolateId());
  } else {
    t2 = t1;
  }
  if (t2) {
    var t3 = $.eqB(this._receivePortId, other.get$_receivePortId());
  } else {
    t3 = t2;
  }
  return t3;
 },
 send$2: function(message, replyTo) {
  var t0 = ({});
  t0.replyTo_2 = replyTo;
  t0.message_1 = message;
  $._waitForPendingPorts([t0.message_1, t0.replyTo_2], new $.Closure27(this, t0));
 },
 is$_WorkerSendPort: true
});

Isolate.$defineClass("_ReceivePortImpl", "Object", ["_callback?", "_id?"], {
 toSendPort$0: function() {
  return $._NativeJsSendPort$2(this, $._globalState().get$currentContext().get$id());
 },
 close$0: function() {
  this._callback = (void 0);
  $._globalState().get$currentContext().unregister$1(this._id);
 },
 receive$1: function(onMessage) {
  this._callback = onMessage;
 },
 _callback$2: function(arg0, arg1) { return this._callback.$call$2(arg0, arg1); },
 _ReceivePortImpl$0: function() {
  $._globalState().get$currentContext().register$2(this._id, this);
 }
});

Isolate.$defineClass("_PendingSendPortFinder", "_MessageTraverser", ["ports?", "_taggedObjects"], {
 visitBufferingSendPort$1: function(port) {
  if ($.eqNullB(port.get$_port())) {
    $.add$1(this.ports, port.get$_futurePort());
  } else {
  }
 },
 visitMap$1: function(map) {
  if (!(this._getInfo$1(map) === (void 0))) {
    return;
  } else {
  }
  this._attachInfo$2(map, true);
  $.forEach(map.getValues$0(), new $.Closure21(this));
 },
 visitList$1: function(list) {
  if (!(this._getInfo$1(list) === (void 0))) {
    return;
  } else {
  }
  this._attachInfo$2(list, true);
  $.forEach(list, new $.Closure23(this));
 },
 visitWorkerSendPort$1: function(port) {
 },
 visitNativeJsSendPort$1: function(port) {
 },
 visitPrimitive$1: function(x) {
 }
});

Isolate.$defineClass("_MessageTraverser", "Object", [], {
 _visitNativeOrWorkerPort$1: function(p) {
  if (typeof p === 'object' && !!p.is$_NativeJsSendPort) {
    return this.visitNativeJsSendPort$1(p);
  } else {
  }
  if (typeof p === 'object' && !!p.is$_WorkerSendPort) {
    return this.visitWorkerSendPort$1(p);
  } else {
  }
  throw $.captureStackTrace('Illegal underlying port ' + $.stringToString(p));
 },
 _getAttachedInfo$1: function(o) {
  return o['__MessageTraverser__attached_info__'];;
 },
 _setAttachedInfo$2: function(o, info) {
  o['__MessageTraverser__attached_info__'] = info;;
 },
 _clearAttachedInfo$1: function(o) {
  o['__MessageTraverser__attached_info__'] = (void 0);;
 },
 _dispatch$1: function(x) {
  if ($.isPrimitive(x) === true) {
    return this.visitPrimitive$1(x);
  } else {
  }
  if (typeof x === 'object' && (x.constructor === Array || x.is$List2())) {
    return this.visitList$1(x);
  } else {
  }
  if (typeof x === 'object' && x.is$Map()) {
    return this.visitMap$1(x);
  } else {
  }
  if (typeof x === 'object' && !!x.is$_NativeJsSendPort) {
    return this.visitNativeJsSendPort$1(x);
  } else {
  }
  if (typeof x === 'object' && !!x.is$_WorkerSendPort) {
    return this.visitWorkerSendPort$1(x);
  } else {
  }
  if (typeof x === 'object' && !!x.is$_BufferingSendPort) {
    return this.visitBufferingSendPort$1(x);
  } else {
  }
  throw $.captureStackTrace('Message serialization: Illegal value ' + $.stringToString(x) + ' passed');
 },
 _getInfo$1: function(o) {
  return this._getAttachedInfo$1(o);
 },
 _attachInfo$2: function(o, info) {
  $.add$1(this._taggedObjects, o);
  this._setAttachedInfo$2(o, info);
 },
 _cleanup$0: function() {
  var len = $.get$length(this._taggedObjects);
  for (var i = 0; $.ltB(i, len); i = i + 1) {
    this._clearAttachedInfo$1($.index(this._taggedObjects, i));
  }
  this._taggedObjects = (void 0);
 },
 traverse$1: function(x) {
  if ($.isPrimitive(x) === true) {
    return this.visitPrimitive$1(x);
  } else {
  }
  this._taggedObjects = $.List((void 0));
  var t0 = (void 0);
  try {
    var t0 = this._dispatch$1(x);
  } finally {
    this._cleanup$0();
  }
  return t0;
 }
});

Isolate.$defineClass("_Copier", "_MessageTraverser", ["_taggedObjects"], {
 visitBufferingSendPort$1: function(port) {
  if (!$.eqNullB(port.get$_port())) {
    return this._visitNativeOrWorkerPort$1(port.get$_port());
  } else {
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
  }
 },
 visitWorkerSendPort$1: function(port) {
  return $._WorkerSendPort$3(port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId());
 },
 visitNativeJsSendPort$1: function(port) {
  return $._NativeJsSendPort$2(port.get$_receivePort(), port.get$_isolateId());
 },
 visitMap$1: function(map) {
  var t0 = ({});
  t0.copy_1 = this._getInfo$1(map);
  if (!(t0.copy_1 === (void 0))) {
    return t0.copy_1;
  } else {
  }
  t0.copy_1 = $.HashMapImplementation$0();
  this._attachInfo$2(map, t0.copy_1);
  $.forEach(map, new $.Closure25(this, t0));
  return t0.copy_1;
 },
 visitList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object'||list.constructor !== Array)) return this.visitList$1$bailout(list,  0);
  var copy = this._getInfo$1(list);
  if (!(copy === (void 0))) {
    return copy;
  } else {
  }
  var len = list.length;
  var copy0 = $.List(len);
  this._attachInfo$2(list, copy0);
  for (var i = 0; i < len; i = i + 1) {
    var t0 = list.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var t1 = this._dispatch$1(list[i]);
    var t2 = copy0.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    copy0[i] = t1;
  }
  return copy0;
 },
 visitList$1$bailout: function(list, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var copy = this._getInfo$1(list);
      if (!(copy === (void 0))) {
        return copy;
      } else {
      }
      var len = $.get$length(list);
      var copy0 = $.List(len);
      this._attachInfo$2(list, copy0);
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, len)) break L0;
        var t1 = this._dispatch$1($.index(list, i));
        var t2 = copy0.length;
        if (i < 0 || i >= t2) throw $.ioore(i);
        copy0[i] = t1;
        i = i + 1;
      }
      return copy0;
  }
 },
 visitPrimitive$1: function(x) {
  return x;
 }
});

Isolate.$defineClass("_Serializer", "_MessageTraverser", ["_nextFreeRefId", "_taggedObjects"], {
 _serializeList$1: function(list) {
  if (typeof list !== 'string' && (typeof list !== 'object'||list.constructor !== Array)) return this._serializeList$1$bailout(list,  0);
  var len = list.length;
  var result = $.List(len);
  for (var i = 0; i < len; i = i + 1) {
    var t0 = list.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var t1 = this._dispatch$1(list[i]);
    var t2 = result.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    result[i] = t1;
  }
  return result;
 },
 _serializeList$1$bailout: function(list, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var len = $.get$length(list);
      var result = $.List(len);
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, len)) break L0;
        var t1 = this._dispatch$1($.index(list, i));
        var t2 = result.length;
        if (i < 0 || i >= t2) throw $.ioore(i);
        result[i] = t1;
        i = i + 1;
      }
      return result;
  }
 },
 visitBufferingSendPort$1: function(port) {
  if (!$.eqNullB(port.get$_port())) {
    return this._visitNativeOrWorkerPort$1(port.get$_port());
  } else {
    throw $.captureStackTrace('internal error: must call _waitForPendingPorts to ensure all ports are resolved at this point.');
  }
 },
 visitWorkerSendPort$1: function(port) {
  return ['sendport', port.get$_workerId(), port.get$_isolateId(), port.get$_receivePortId()];
 },
 visitNativeJsSendPort$1: function(port) {
  return ['sendport', $._globalState().get$currentManagerId(), port.get$_isolateId(), port.get$_receivePort().get$_id()];
 },
 visitMap$1: function(map) {
  var copyId = this._getInfo$1(map);
  if (!(copyId === (void 0))) {
    return ['ref', copyId];
  } else {
  }
  var id = this._nextFreeRefId;
  this._nextFreeRefId = $.add(id, 1);
  this._attachInfo$2(map, id);
  return ['map', id, this._serializeList$1(map.getKeys$0()), this._serializeList$1(map.getValues$0())];
 },
 visitList$1: function(list) {
  var copyId = this._getInfo$1(list);
  if (!(copyId === (void 0))) {
    return ['ref', copyId];
  } else {
  }
  var id = this._nextFreeRefId;
  this._nextFreeRefId = $.add(id, 1);
  this._attachInfo$2(list, id);
  return ['list', id, this._serializeList$1(list)];
 },
 visitPrimitive$1: function(x) {
  return x;
 }
});

Isolate.$defineClass("_Deserializer", "Object", ["_deserialized"], {
 _deserializeSendPort$1: function(x) {
  var managerId = $.index(x, 1);
  var isolateId = $.index(x, 2);
  var receivePortId = $.index(x, 3);
  if ($.eqB(managerId, $._globalState().get$currentManagerId())) {
    var isolate = $.index($._globalState().get$isolates(), isolateId);
    if ($.eqNullB(isolate)) {
      return;
    } else {
    }
    return $._NativeJsSendPort$2(isolate.lookup$1(receivePortId), isolateId);
  } else {
    return $._WorkerSendPort$3(managerId, isolateId, receivePortId);
  }
 },
 _deserializeMap$1: function(x) {
  var result = $.HashMapImplementation$0();
  var id = $.index(x, 1);
  $.indexSet(this._deserialized, id, result);
  var keys = $.index(x, 2);
  if (typeof keys !== 'string' && (typeof keys !== 'object'||keys.constructor !== Array)) return this._deserializeMap$1$bailout(x, 1, result, keys);
  var values = $.index(x, 3);
  if (typeof values !== 'string' && (typeof values !== 'object'||values.constructor !== Array)) return this._deserializeMap$1$bailout(x, 2, result, keys, values);
  var len = keys.length;
  $.assert(len === values.length);
  for (var i = 0; i < len; i = i + 1) {
    var t0 = keys.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var key = this._deserializeHelper$1(keys[i]);
    var t1 = values.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    result.operator$indexSet$2(key, this._deserializeHelper$1(values[i]));
  }
  return result;
 },
 _deserializeMap$1$bailout: function(x, state, env0, env1, env2) {
  switch (state) {
    case 1:
      result = env0;
      keys = env1;
      break;
    case 2:
      result = env0;
      keys = env1;
      values = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.HashMapImplementation$0();
      var id = $.index(x, 1);
      $.indexSet(this._deserialized, id, result);
      var keys = $.index(x, 2);
    case 1:
      state = 0;
      var values = $.index(x, 3);
    case 2:
      state = 0;
      var len = $.get$length(keys);
      $.assert($.eq(len, $.get$length(values)));
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, len)) break L0;
        result.operator$indexSet$2(this._deserializeHelper$1($.index(keys, i)), this._deserializeHelper$1($.index(values, i)));
        i = i + 1;
      }
      return result;
  }
 },
 _deserializeList$1: function(x) {
  var id = $.index(x, 1);
  var dartList = $.index(x, 2);
  if (typeof dartList !== 'object'||dartList.constructor !== Array||!!dartList.immutable$list) return this._deserializeList$1$bailout(x, 1, id, dartList);
  $.indexSet(this._deserialized, id, dartList);
  var len = dartList.length;
  for (var i = 0; i < len; i = i + 1) {
    var t0 = dartList.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var t1 = this._deserializeHelper$1(dartList[i]);
    var t2 = dartList.length;
    if (i < 0 || i >= t2) throw $.ioore(i);
    dartList[i] = t1;
  }
  return dartList;
 },
 _deserializeList$1$bailout: function(x, state, env0, env1) {
  switch (state) {
    case 1:
      id = env0;
      dartList = env1;
      break;
  }
  switch (state) {
    case 0:
      var id = $.index(x, 1);
      var dartList = $.index(x, 2);
    case 1:
      state = 0;
      $.indexSet(this._deserialized, id, dartList);
      var len = $.get$length(dartList);
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, len)) break L0;
        $.indexSet(dartList, i, this._deserializeHelper$1($.index(dartList, i)));
        i = i + 1;
      }
      return dartList;
  }
 },
 _deserializeRef$1: function(x) {
  var id = $.index(x, 1);
  var result = $.index(this._deserialized, id);
  $.assert(!(result === (void 0)));
  return result;
 },
 _deserializeHelper$1: function(x) {
  if ($.isPrimitive2(x) === true) {
    return x;
  } else {
  }
  $.assert(typeof x === 'object' && (x.constructor === Array || x.is$List2()));
  $0:{
    var t0 = $.index(x, 0);
    if ('ref' === t0) {
      return this._deserializeRef$1(x);
    } else {
      if ('list' === t0) {
        return this._deserializeList$1(x);
      } else {
        if ('map' === t0) {
          return this._deserializeMap$1(x);
        } else {
          if ('sendport' === t0) {
            return this._deserializeSendPort$1(x);
          } else {
            throw $.captureStackTrace('Unexpected serialized object');
          }
        }
      }
    }
  }
 },
 deserialize$1: function(x) {
  if ($.isPrimitive2(x) === true) {
    return x;
  } else {
  }
  this._deserialized = $.HashMapImplementation$0();
  return this._deserializeHelper$1(x);
 }
});

Isolate.$defineClass("Closure", "Closure43", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$0();
 }
});

Isolate.$defineClass("Closure2", "Closure43", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$1(this.box_0.arg1_2);
 }
});

Isolate.$defineClass("Closure3", "Closure43", ["box_0"], {
 $call$0: function() {
  return this.box_0.closure_1.$call$2(this.box_0.arg1_2, this.box_0.arg2_3);
 }
});

Isolate.$defineClass("Closure4", "Closure43", [], {
 $call$1: function(n) {
  var absN = $.abs(n);
  if ($.ltB(n, 0)) {
    var sign = '-';
  } else {
    sign = '';
  }
  if ($.geB(absN, 1000)) {
    return '' + $.stringToString(n);
  } else {
  }
  if ($.geB(absN, 100)) {
    return '' + $.stringToString(sign) + '0' + $.stringToString(absN);
  } else {
  }
  if ($.geB(absN, 10)) {
    return '' + $.stringToString(sign) + '00' + $.stringToString(absN);
  } else {
  }
  if ($.geB(absN, 1)) {
    return '' + $.stringToString(sign) + '000' + $.stringToString(absN);
  } else {
  }
  throw $.captureStackTrace($.IllegalArgumentException$1(n));
 }
});

Isolate.$defineClass("Closure5", "Closure43", [], {
 $call$1: function(n) {
  if ($.geB(n, 100)) {
    return '' + $.stringToString(n);
  } else {
  }
  if ($.geB(n, 10)) {
    return '0' + $.stringToString(n);
  } else {
  }
  return '00' + $.stringToString(n);
 }
});

Isolate.$defineClass("Closure6", "Closure43", [], {
 $call$1: function(n) {
  if ($.geB(n, 10)) {
    return '' + $.stringToString(n);
  } else {
  }
  return '0' + $.stringToString(n);
 }
});

Isolate.$defineClass("Closure7", "Closure43", ["box_0"], {
 $call$2: function(k, v) {
  if (this.box_0.first_3 !== true) {
    $.add$1(this.box_0.result_1, ', ');
  } else {
  }
  this.box_0.first_3 = false;
  $._emitObject(k, this.box_0.result_1, this.box_0.visiting_2);
  $.add$1(this.box_0.result_1, ': ');
  $._emitObject(v, this.box_0.result_1, this.box_0.visiting_2);
 }
});

Isolate.$defineClass("Closure8", "Closure43", [], {
 $call$1: function(n) {
  return typeof n === 'object' && n.is$Element();
 }
});

Isolate.$defineClass("Closure9", "Closure43", ["box_0", "output_2"], {
 $call$1: function(element) {
  if (this.box_0.f_1.$call$1(element) === true) {
    $.add$1(this.output_2, element);
  } else {
  }
 }
});

Isolate.$defineClass("Closure10", "Closure43", [], {
 $call$1: function(el) {
  return el.remove$0();
 }
});

Isolate.$defineClass("Closure11", "Closure43", [], {
 $call$0: function() {
  $.expect($.get$length($.Vector2D$2(1, -1))).equals$1(1.4142135623730951);
 }
});

Isolate.$defineClass("Closure12", "Closure43", [], {
 $call$0: function() {
  var va = $.Vector2D$2(-1, 0);
  var vb = $.Vector2D$2(100, 42);
  var vc = va.operator$add$1(vb);
  var vd = vb.operator$sub$1(va);
  var ve = va.operator$mul$1(5);
  var vf = vb.operator$div$1(2);
  $.expect(va).equals$1(va);
  $.expect(vc).equals$1($.Vector2D$2(99, 42));
  $.expect(vd).equals$1($.Vector2D$2(101, 42));
  $.expect(ve).equals$1($.Vector2D$2(-5, 0));
  $.expect(vf).equals$1($.Vector2D$2(50, 21));
 }
});

Isolate.$defineClass("Closure13", "Closure43", [], {
 $call$0: function() {
  var vn = $.Vector2D$2(3, 6).getNormalized$0();
  var vn2 = $.Vector2D$2(-1, 1);
  vn2.normalize$0();
  $.expect($.get$length(vn)).approxEquals$1(1.0);
  $.expect($.mul(vn.get$x(), 2)).approxEquals$1(vn.get$y());
  $.expect($.get$length(vn2)).approxEquals$1(1.0);
  $.expect($.lt(vn2.get$x(), 0)).isTrue$0();
 }
});

Isolate.$defineClass("Closure14", "Closure43", [], {
 $call$1: function(t) {
  return $.eq(t, $._soloTest);
 }
});

Isolate.$defineClass("Closure15", "Closure43", [], {
 $call$0: function() {
  $.assert($.eq($._currentTest, 0));
  $._testRunner.$call$0();
 }
});

Isolate.$defineClass("Closure16", "Closure43", ["port_2", "box_0"], {
 $call$2: function(msg, reply) {
  this.box_0.callback_1.$call$0();
  this.port_2.close$0();
 }
});

Isolate.$defineClass("Closure17", "Closure43", ["this_6", "box_3"], {
 $call$0: function() {
  var t0 = ({});
  $.checkReplyTo(this.box_3.replyTo_5);
  var isolate = $.index($._globalState().get$isolates(), this.this_6.get$_isolateId());
  if ($.eqNullB(isolate)) {
    return;
  } else {
  }
  if ($.eqNullB(this.this_6.get$_receivePort().get$_callback())) {
    return;
  } else {
  }
  var t1 = !$.eqNullB($._globalState().get$currentContext());
  if (t1) {
    var shouldSerialize = !$.eqB($._globalState().get$currentContext().get$id(), this.this_6.get$_isolateId());
  } else {
    shouldSerialize = t1;
  }
  t0.msg_1 = this.box_3.message_4;
  t0.reply_2 = this.box_3.replyTo_5;
  if (shouldSerialize) {
    t0.msg_1 = $._serializeMessage(t0.msg_1);
    t0.reply_2 = $._serializeMessage(t0.reply_2);
  } else {
  }
  $._globalState().get$topEventLoop().enqueue$3(isolate, new $.Closure24(this.this_6, t0, shouldSerialize), $.add('receive ', this.box_3.message_4));
 }
});

Isolate.$defineClass("Closure24", "Closure43", ["this_8", "box_0", "shouldSerialize_7"], {
 $call$0: function() {
  if (!$.eqNullB(this.this_8.get$_receivePort().get$_callback())) {
    if (this.shouldSerialize_7 === true) {
      var msg = $._deserializeMessage(this.box_0.msg_1);
      this.box_0.msg_1 = msg;
      var reply = $._deserializeMessage(this.box_0.reply_2);
      this.box_0.reply_2 = reply;
    } else {
    }
    this.this_8.get$_receivePort()._callback$2(this.box_0.msg_1, this.box_0.reply_2);
  } else {
  }
 }
});

Isolate.$defineClass("Closure18", "Closure43", ["box_0"], {
 $call$1: function(_) {
  return this.box_0.callback_1.$call$0();
 }
});

Isolate.$defineClass("Closure19", "Closure43", ["box_0", "box_2"], {
 $call$1: function(value) {
  $.indexSet(this.box_2.values_6, this.box_0.pos_1, value);
  var remaining = $.sub(this.box_2.remaining_5, 1);
  this.box_2.remaining_5 = remaining;
  var t0 = $.eqB(remaining, 0);
  if (t0) {
    var t1 = this.box_2.result_4.get$isComplete() !== true;
  } else {
    t1 = t0;
  }
  if (t1) {
    this.box_2.completer_3.complete$1(this.box_2.values_6);
  } else {
  }
 }
});

Isolate.$defineClass("Closure20", "Closure43", ["box_2"], {
 $call$1: function(exception) {
  if (this.box_2.result_4.get$isComplete() !== true) {
    this.box_2.completer_3.completeException$1(exception);
  } else {
  }
  return true;
 }
});

Isolate.$defineClass("Closure21", "Closure43", ["this_0"], {
 $call$1: function(e) {
  return this.this_0._dispatch$1(e);
 }
});

Isolate.$defineClass("Closure22", "Closure43", ["values_0"], {
 $call$2: function(k, v) {
  return $.add$1(this.values_0, v);
 }
});

Isolate.$defineClass("Closure23", "Closure43", ["this_0"], {
 $call$1: function(e) {
  return this.this_0._dispatch$1(e);
 }
});

Isolate.$defineClass("Closure25", "Closure43", ["this_2", "box_0"], {
 $call$2: function(key, val) {
  $.indexSet(this.box_0.copy_1, this.this_2._dispatch$1(key), this.this_2._dispatch$1(val));
 }
});

Isolate.$defineClass("Closure26", "Closure43", ["box_0"], {
 $call$2: function(key, value) {
  var t0 = this.box_0.list_1;
  var t1 = this.box_0.i_2;
  var i = $.add(t1, 1);
  this.box_0.i_2 = i;
  $.indexSet(t0, t1, value);
 }
});

Isolate.$defineClass("Closure27", "Closure43", ["this_3", "box_0"], {
 $call$0: function() {
  $.checkReplyTo(this.box_0.replyTo_2);
  var workerMessage = $._serializeMessage($.makeLiteralMap(['command', 'message', 'port', this.this_3, 'msg', this.box_0.message_1, 'replyTo', this.box_0.replyTo_2]));
  if ($._globalState().get$isWorker() === true) {
    $._globalState().get$mainManager().postMessage$1(workerMessage);
  } else {
    $.index($._globalState().get$managers(), this.this_3.get$_workerId()).postMessage$1(workerMessage);
  }
 }
});

Isolate.$defineClass("Closure28", "Closure43", ["box_0"], {
 $call$1: function(element) {
  var counter = $.add(this.box_0.counter_1, 1);
  this.box_0.counter_1 = counter;
 }
});

Isolate.$defineClass("Closure29", "Closure43", ["box_0"], {
 $call$1: function(entry) {
  var t0 = this.box_0.list_1;
  var t1 = this.box_0.index_2;
  var index = $.add(t1, 1);
  this.box_0.index_2 = index;
  $.indexSet(t0, t1, entry.get$value());
 }
});

Isolate.$defineClass("Closure30", "Closure43", ["box_0"], {
 $call$1: function(entry) {
  this.box_0.f_1.$call$2(entry.get$key(), entry.get$value());
 }
});

Isolate.$defineClass("Closure31", "Closure43", ["keys_0"], {
 $call$2: function(k, v) {
  return $.add$1(this.keys_0, k);
 }
});

Isolate.$defineClass("Closure32", "Closure43", ["box_0"], {
 $call$2: function(key, value) {
  var t0 = this.box_0.list_1;
  var t1 = this.box_0.i_2;
  var i = $.add(t1, 1);
  this.box_0.i_2 = i;
  $.indexSet(t0, t1, key);
 }
});

Isolate.$defineClass("Closure33", "Closure43", ["box_0"], {
 $call$1: function(entry) {
  var t0 = this.box_0.list_1;
  var t1 = this.box_0.index_2;
  var index = $.add(t1, 1);
  this.box_0.index_2 = index;
  $.indexSet(t0, t1, entry.get$key());
 }
});

Isolate.$defineClass("Closure34", "Closure43", ["testCase_0"], {
 $call$0: function() {
  $._callbacksCalled = 0;
  $._state = 2;
  this.testCase_0.test$0();
  if (!$.eqB($._state, 3)) {
    if ($.eqB(this.testCase_0.get$callbacks(), $._callbacksCalled)) {
      this.testCase_0.pass$0();
    } else {
    }
  } else {
  }
 }
});

Isolate.$defineClass("Closure35", "Closure43", [], {
 $call$1: function(line) {
  return '  ' + $.stringToString(line);
 }
});

Isolate.$defineClass("Closure36", "Closure43", ["this_0"], {
 $call$1: function(value) {
  this.this_0.add$1(value);
 }
});

Isolate.$defineClass("Closure37", "Closure43", ["this_0"], {
 $call$1: function(value) {
  this.this_0.remove$1(value);
 }
});

Isolate.$defineClass("Closure38", "Closure43", ["box_0"], {
 $call$2: function(key, value) {
  this.box_0.f_1.$call$1(key);
 }
});

Isolate.$defineClass("Closure39", "Closure43", ["box_0"], {
 $call$2: function(key, value) {
  $.add$1(this.box_0.result_2, this.box_0.f_1.$call$1(key));
 }
});

Isolate.$defineClass("Closure40", "Closure43", ["box_0"], {
 $call$2: function(key, value) {
  if (this.box_0.f_1.$call$1(key) === true) {
    $.add$1(this.box_0.result_2, key);
  } else {
  }
 }
});

Isolate.$defineClass("Closure41", "Closure43", ["this_0"], {
 $call$0: function() {
  if (this.this_0.runIteration$0() !== true) {
    return;
  } else {
  }
  $._window().setTimeout$2(this, 0);
 }
});

Isolate.$defineClass("Closure43", "Object", [], {
 toString$0: function() {
  return 'Closure';
 }
});

Isolate.$defineClass('Closure42', 'Closure43', ['self', 'target'], {
$call$0: function() { return this.self[this.target](); }
});
Isolate.$defineClass('Closure44', 'Closure43', ['self', 'target'], {
$call$1: function(p0) { return this.self[this.target](p0); }
});
$.mul$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a * b;
  } else {
  }
  return a.operator$mul$1(b);
};

$.startRootIsolate = function(entry) {
  var t0 = $._Manager$0();
  $._globalState2(t0);
  if ($._globalState().get$isWorker() === true) {
    return;
  } else {
  }
  var rootContext = $._IsolateContext$0();
  $._globalState().set$rootContext(rootContext);
  $._fillStatics(rootContext);
  $._globalState().set$currentContext(rootContext);
  rootContext.eval$1(entry);
  $._globalState().get$topEventLoop().run$0();
};

$._window = function() {
  return typeof window != 'undefined' ? window : (void 0);;
};

$._ChildNodeListLazy$1 = function(_this) {
  return new $._ChildNodeListLazy(_this);
};

$._AudioContextEventsImpl$1 = function(_ptr) {
  return new $._AudioContextEventsImpl(_ptr);
};

$.floor = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.floor$0();
  } else {
  }
  return Math.floor(receiver);
};

$.map = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.map$1(f);
  } else {
    return $.map2(receiver, [], f);
  }
};

$.eqB = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1(b) === true;
    } else {
      return a === b;
    }
  } else {
  }
  return a === b;
};

$.HashSetImplementation$from = function(other) {
  var set = $.HashSetImplementation$0();
  $.setRuntimeTypeInfo(set, ({E: 'E'}));
  for (var t0 = $.iterator(other); t0.hasNext$0() === true; ) {
    set.add$1(t0.next$0());
  }
  return set;
};

$._containsRef = function(c, ref) {
  for (var t0 = $.iterator(c); t0.hasNext$0() === true; ) {
    if (t0.next$0() === ref) {
      return true;
    } else {
    }
  }
  return false;
};

$.Dog$5 = function(x, y, herd, name$, charCodes) {
  var t0 = new $.Dog(charCodes, false, false, false, false, (void 0), (void 0), (void 0), (void 0), (void 0), 1.0, (void 0));
  t0.Agent$0();
  t0.Dog$5(x, y, herd, name$, charCodes);
  return t0;
};

$._NodeListWrapper$1 = function(list) {
  return new $._NodeListWrapper(list);
};

$.map2 = function(source, destination, f) {
  for (var t0 = $.iterator(source); t0.hasNext$0() === true; ) {
    $.add$1(destination, f.$call$1(t0.next$0()));
  }
  return destination;
};

$.isJsArray = function(value) {
  var t0 = !(value === (void 0));
  if (t0) {
    var t1 = (value.constructor === Array);
  } else {
    t1 = t0;
  }
  return t1;
};

$.indexSet$slow = function(a, index, value) {
  if ($.isJsArray(a) === true) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    } else {
    }
    var t0 = index < 0;
    if (!t0) {
      var t1 = $.geB(index, $.get$length(a));
    } else {
      t1 = t0;
    }
    if (t1) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    } else {
    }
    $.checkMutable(a, 'indexed set');
    a[index] = value;
    return;
  } else {
  }
  a.operator$indexSet$2(index, value);
};

$._nextProbe = function(currentProbe, numberOfProbes, length$) {
  return $.and($.add(currentProbe, numberOfProbes), $.sub(length$, 1));
};

$.allMatches = function(receiver, str) {
  if (!(typeof receiver === 'string')) {
    return receiver.allMatches$1(str);
  } else {
  }
  $.checkString(str);
  return $.allMatchesInStringUnchecked(receiver, str);
};

$.Sheep$4 = function(x, y, herd, name$) {
  var t0 = new $.Sheep((void 0), (void 0), (void 0), (void 0), (void 0), 1.0, (void 0));
  t0.Agent$0();
  t0.Sheep$4(x, y, herd, name$);
  return t0;
};

$.substringUnchecked = function(receiver, startIndex, endIndex) {
  return receiver.substring(startIndex, endIndex);
};

$.DateImplementation$now$0 = function() {
  var t0 = new $.DateImplementation(false, $.dateNow());
  t0.DateImplementation$now$0();
  return t0;
};

$.get$length = function(receiver) {
  var t0 = typeof receiver === 'string';
  if (!t0) {
    var t1 = $.isJsArray(receiver) === true;
  } else {
    t1 = t0;
  }
  if (t1) {
    return receiver.length;
  } else {
    return receiver.get$length();
  }
};

$.ge$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a >= b;
  } else {
  }
  return a.operator$ge$1(b);
};

$.update = function(curTime) {
  $.sub(curTime, $.startTime);
  var timeSinceLast = $.sub(curTime, $.lastTime);
  $.lastTime = curTime;
  $.ctx.clearRect$4(0, 0, 800, 600);
  $.herd.update$1(timeSinceLast);
  for (var t0 = $.iterator($.herd); t0.hasNext$0() === true; ) {
    $.drawAgent(t0.next$0());
  }
  $.window().requestAnimationFrame$1($.update);
  return true;
};

$.checkReplyTo = function(replyTo) {
  var t0 = !(replyTo === (void 0));
  if (t0) {
    var t1 = !((typeof replyTo === 'object') && !!replyTo.is$_NativeJsSendPort);
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = !((typeof replyTo === 'object') && !!replyTo.is$_WorkerSendPort);
  } else {
    t2 = t1;
  }
  if (t2) {
    var t3 = !((typeof replyTo === 'object') && !!replyTo.is$_BufferingSendPort);
  } else {
    t3 = t2;
  }
  if (t3) {
    throw $.captureStackTrace($.ExceptionImplementation$1('SendPort.send: Illegal replyTo port type'));
  } else {
  }
};

$.IllegalJSRegExpException$2 = function(_pattern, _errmsg) {
  return new $.IllegalJSRegExpException(_errmsg, _pattern);
};

$.stringEquals = function(expected, actual, reason) {
  if (typeof expected !== 'string') return $.stringEquals$bailout(expected, actual, reason,  0);
  if (typeof actual !== 'string' && (typeof actual !== 'object'||actual.constructor !== Array)) return $.stringEquals$bailout(expected, actual, reason,  0);
  var msg = $._getMessage(reason);
  var defaultMessage = 'Expect.stringEquals(expected: <' + $.stringToString(expected) + '>", <' + $.stringToString(actual) + '>' + $.stringToString(msg) + ') fails';
  if (expected === actual) {
    return;
  } else {
  }
  var eLen = expected.length;
  var aLen = actual.length;
  for (var left = 0; true; left = left0) {
    if (left === eLen) {
      $.assert(left < aLen);
      var snippet = $.substring$2(actual, left, aLen);
      $._fail('' + $.stringToString(defaultMessage) + '\nDiff:\n...[  ]\n...[ ' + $.stringToString(snippet) + ' ]');
      return;
    } else {
    }
    if (left === aLen) {
      $.assert(left < eLen);
      var snippet0 = $.substring$2(expected, left, eLen);
      $._fail('' + $.stringToString(defaultMessage) + '\nDiff:\n...[  ]\n...[ ' + $.stringToString(snippet0) + ' ]');
      return;
    } else {
    }
    var t0 = expected.length;
    if (left < 0 || left >= t0) throw $.ioore(left);
    var t1 = expected[left];
    var t2 = actual.length;
    if (left < 0 || left >= t2) throw $.ioore(left);
    if (!$.eqB(t1, actual[left])) {
      break;
    } else {
    }
    var left0 = left + 1;
  }
  for (var right = 0; true; right = right0) {
    if (right === eLen) {
      $.assert(right < aLen);
      var snippet1 = $.substring$2(actual, 0, aLen - right);
      $._fail('' + $.stringToString(defaultMessage) + '\nDiff:\n[  ]...\n[ ' + $.stringToString(snippet1) + ' ]...');
      return;
    } else {
      var t3 = right === aLen;
      var t4 = eLen - right;
    }
    if (t3) {
      $.assert(right < eLen);
      var snippet2 = $.substring$2(expected, 0, t4);
      $._fail('' + $.stringToString(defaultMessage) + '\nDiff:\n[  ]...\n[ ' + $.stringToString(snippet2) + ' ]...');
      return;
    } else {
    }
    var t5 = t4 <= left;
    if (!t5) {
      var t6 = aLen - right <= left;
    } else {
      t6 = t5;
    }
    if (t6) {
      break;
    } else {
      var t7 = t4 - 1;
      var t8 = aLen - right;
    }
    var t9 = expected.length;
    if (t7 < 0 || t7 >= t9) throw $.ioore(t7);
    var t10 = expected[t7];
    var t11 = t8 - 1;
    var t12 = actual.length;
    if (t11 < 0 || t11 >= t12) throw $.ioore(t11);
    if (!$.eqB(t10, actual[t11])) {
      break;
    } else {
    }
    var right0 = right + 1;
  }
  var eSnippet = $.substring$2(expected, left, eLen - right);
  var aSnippet = $.substring$2(actual, left, aLen - right);
  var diff = '\nDiff:\n...[ ' + $.stringToString(eSnippet) + ' ]...\n...[ ' + $.stringToString(aSnippet) + ' ]...';
  $._fail('' + $.stringToString(defaultMessage) + $.stringToString(diff));
};

$.FutureImpl$immediate = function(value) {
  var res = $.FutureImpl$0();
  res._setValue$1(value);
  return res;
};

$.map3 = function(source, destination, f) {
  for (var t0 = $.iterator(source); t0.hasNext$0() === true; ) {
    $.add$1(destination, f.$call$1(t0.next$0()));
  }
  return destination;
};

$.typeNameInIE = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  } else {
  }
  if ($.eqB(name$, 'Document')) {
    if (!!obj.xmlVersion) {
      return 'Document';
    } else {
    }
    return 'HTMLDocument';
  } else {
  }
  if ($.eqB(name$, 'HTMLTableDataCellElement')) {
    return 'HTMLTableCellElement';
  } else {
  }
  if ($.eqB(name$, 'HTMLTableHeaderCellElement')) {
    return 'HTMLTableCellElement';
  } else {
  }
  if ($.eqB(name$, 'MSStyleCSSProperties')) {
    return 'CSSStyleDeclaration';
  } else {
  }
  if ($.eqB(name$, 'CanvasPixelArray')) {
    return 'Uint8ClampedArray';
  } else {
  }
  if ($.eqB(name$, 'HTMLPhraseElement')) {
    return 'HTMLElement';
  } else {
  }
  return name$;
};

$.regExpMatchStart = function(m) {
  return m.index;
};

$.constructorNameFallback = function(obj) {
  var constructor$ = (obj.constructor);
  if ((typeof(constructor$)) === 'function') {
    var name$ = (constructor$.name);
    var t0 = (typeof(name$)) === 'string';
    if (t0) {
      var t1 = $.isEmpty(name$) !== true;
    } else {
      t1 = t0;
    }
    if (t1) {
      var t2 = !(name$ === 'Object');
    } else {
      t2 = t1;
    }
    if (t2) {
      return name$;
    } else {
    }
  } else {
  }
  var string = (Object.prototype.toString.call(obj));
  return $.substring$2(string, 8, string.length - 1);
};

$.keyUpHandler = function(e) {
  for (var t0 = $.iterator($.herd.get$allDogs()); t0.hasNext$0() === true; ) {
    t0.next$0().keyUp$1(e.get$keyCode());
  }
};

$.NullPointerException$2 = function(functionName, arguments$) {
  return new $.NullPointerException(arguments$, functionName);
};

$._serializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true) {
    return $._Serializer$0().traverse$1(message);
  } else {
    return $._Copier$0().traverse$1(message);
  }
};

$.clear = function(receiver) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.clear$0();
  } else {
  }
  $.set$length(receiver, 0);
};

$.tdiv = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return $.truncate((a) / (b));
  } else {
  }
  return a.operator$tdiv$1(b);
};

$.printString = function(string) {
  if (typeof console == "object") {
    console.log(string);
  } else {
    write(string);
    write("\n");
  }
};

$.JSSyntaxRegExp$_globalVersionOf$1 = function(other) {
  var t0 = other.get$pattern();
  var t1 = other.get$multiLine();
  var t2 = new $.JSSyntaxRegExp(other.get$ignoreCase(), t1, t0);
  t2.JSSyntaxRegExp$_globalVersionOf$1(other);
  return t2;
};

$.typeNameInChrome = function(obj) {
  var name$ = (obj.constructor.name);
  if (name$ === 'Window') {
    return 'DOMWindow';
  } else {
  }
  if (name$ === 'CanvasPixelArray') {
    return 'Uint8ClampedArray';
  } else {
  }
  return name$;
};

$._deserializeMessage = function(message) {
  if ($._globalState().get$needSerialization() === true) {
    return $._Deserializer$0().deserialize$1(message);
  } else {
    return message;
  }
};

$.sqrt = function(x) {
  return $.sqrt2(x);
};

$.sqrt2 = function(value) {
  return Math.sqrt($.checkNum(value));
};

$.shr = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var a0 = (a);
    var b0 = (b);
    if (b0 < 0) {
      throw $.captureStackTrace($.IllegalArgumentException$1(b0));
    } else {
    }
    var t0 = a0 > 0;
    var t1 = b0 > 31;
    if (t0) {
      if (t1) {
        return 0;
      } else {
      }
      return a0 >>> b0;
    } else {
    }
    if (t1) {
      var b1 = 31;
    } else {
      b1 = b0;
    }
    return (a0 >> b1) >>> 0;
  } else {
  }
  return a.operator$shr$1(b);
};

$.eqNull = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1((void 0));
    } else {
      return false;
    }
  } else {
    return typeof a === "undefined";
  }
};

$.and = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a & b) >>> 0;
  } else {
  }
  return a.operator$and$1(b);
};

$.substring$2 = function(receiver, startIndex, endIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$2(startIndex, endIndex);
  } else {
  }
  $.checkNum(startIndex);
  var length$ = receiver.length;
  if (endIndex === (void 0)) {
    var endIndex0 = length$;
  } else {
    endIndex0 = endIndex;
  }
  $.checkNum(endIndex0);
  if ($.ltB(startIndex, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  } else {
  }
  if ($.gtB(startIndex, endIndex0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(startIndex));
  } else {
  }
  if ($.gtB(endIndex0, length$)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(endIndex0));
  } else {
  }
  return $.substringUnchecked(receiver, startIndex, endIndex0);
};

$.indexSet = function(a, index, value) {
  if (a.constructor === Array && !a.immutable$list) {
    var key = (index >>> 0);
    var t0 = key === index;
    if (t0) {
      var t1 = key < (a.length);
    } else {
      t1 = t0;
    }
    if (t1) {
      a[key] = value;
      return;
    } else {
    }
  } else {
  }
  $.indexSet$slow(a, index, value);
};

$._DOMApplicationCacheEventsImpl$1 = function(_ptr) {
  return new $._DOMApplicationCacheEventsImpl(_ptr);
};

$.ExceptionImplementation$1 = function(msg) {
  return new $.ExceptionImplementation(msg);
};

$.StringMatch$3 = function(_start, str, pattern) {
  return new $.StringMatch(pattern, str, _start);
};

$.invokeClosure = function(closure, isolate, numberOfArguments, arg1, arg2) {
  var t0 = ({});
  t0.arg2_3 = arg2;
  t0.arg1_2 = arg1;
  t0.closure_1 = closure;
  if ($.eqB(numberOfArguments, 0)) {
    return $._callInIsolate(isolate, new $.Closure(t0));
  } else {
    if ($.eqB(numberOfArguments, 1)) {
      return $._callInIsolate(isolate, new $.Closure2(t0));
    } else {
      if ($.eqB(numberOfArguments, 2)) {
        return $._callInIsolate(isolate, new $.Closure3(t0));
      } else {
        throw $.captureStackTrace($.ExceptionImplementation$1('Unsupported number of arguments for wrapped closure'));
      }
    }
  }
};

$.gt = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a > b);
  } else {
    t2 = $.gt$slow(a, b);
  }
  return t2;
};

$.last = function(receiver) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.last$0();
  } else {
  }
  return $.index(receiver, $.sub($.get$length(receiver), 1));
};

$.assert = function(condition) {
};

$.buildDynamicMetadata = function(inputTable) {
  if (typeof inputTable !== 'string' && (typeof inputTable !== 'object'||inputTable.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable,  0);
  var result = [];
  for (var i = 0; i < inputTable.length; i = i + 1) {
    var t0 = inputTable.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    var tag = $.index(inputTable[i], 0);
    var t1 = inputTable.length;
    if (i < 0 || i >= t1) throw $.ioore(i);
    var tags = $.index(inputTable[i], 1);
    var set = $.HashSetImplementation$0();
    $.setRuntimeTypeInfo(set, ({E: 'String'}));
    var tagNames = $.split(tags, '|');
    if (typeof tagNames !== 'string' && (typeof tagNames !== 'object'||tagNames.constructor !== Array)) return $.buildDynamicMetadata$bailout(inputTable, 2, result, inputTable, tag, i, tags, set, tagNames);
    for (var j = 0; j < tagNames.length; j = j + 1) {
      var t2 = tagNames.length;
      if (j < 0 || j >= t2) throw $.ioore(j);
      set.add$1(tagNames[j]);
    }
    $.add$1(result, $.MetaInfo$3(tag, tags, set));
  }
  return result;
};

$.filter = function(receiver, predicate) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.filter$1(predicate);
  } else {
    return $.filter2(receiver, [], predicate);
  }
};

$.keyDownHandler = function(e) {
  for (var t0 = $.iterator($.herd.get$allDogs()); t0.hasNext$0() === true; ) {
    t0.next$0().keyDown$1(e.get$keyCode());
  }
};

$.filter2 = function(source, destination, f) {
  for (var t0 = $.iterator(source); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (f.$call$1(t1) === true) {
      $.add$1(destination, t1);
    } else {
    }
  }
  return destination;
};

$._getMessage = function(reason) {
  if (reason === (void 0)) {
    var t0 = '';
  } else {
    t0 = ', \'' + $.stringToString(reason) + '\'';
  }
  return t0;
};

$.contains$1 = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$1(other);
  } else {
  }
  return $.contains$2(receiver, other, 0);
};

$._EventSourceEventsImpl$1 = function(_ptr) {
  return new $._EventSourceEventsImpl(_ptr);
};

$.mul = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a * b);
  } else {
    t2 = $.mul$slow(a, b);
  }
  return t2;
};

$._NotificationEventsImpl$1 = function(_ptr) {
  return new $._NotificationEventsImpl(_ptr);
};

$.filter3 = function(source, destination, f) {
  for (var t0 = $.iterator(source); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (f.$call$1(t1) === true) {
      $.add$1(destination, t1);
    } else {
    }
  }
  return destination;
};

$._browserPrefix = function() {
  if ($._cachedBrowserPrefix === (void 0)) {
    if ($.isFirefox() === true) {
      $._cachedBrowserPrefix = '-moz-';
    } else {
      $._cachedBrowserPrefix = '-webkit-';
    }
  } else {
  }
  return $._cachedBrowserPrefix;
};

$.isPrimitive = function(x) {
  var t0 = x === (void 0);
  if (!t0) {
    var t1 = typeof x === 'string';
  } else {
    t1 = t0;
  }
  if (!t1) {
    var t2 = typeof x === 'number';
  } else {
    t2 = t1;
  }
  if (!t2) {
    var t3 = typeof x === 'boolean';
  } else {
    t3 = t2;
  }
  return t3;
};

$.neg = function(a) {
  if (typeof a === "number") {
    return -a;
  } else {
  }
  return a.operator$negate$0();
};

$.isPrimitive2 = function(x) {
  var t0 = x === (void 0);
  if (!t0) {
    var t1 = typeof x === 'string';
  } else {
    t1 = t0;
  }
  if (!t1) {
    var t2 = typeof x === 'number';
  } else {
    t2 = t1;
  }
  if (!t2) {
    var t3 = typeof x === 'boolean';
  } else {
    t3 = t2;
  }
  return t3;
};

$.isTrue = function(actual, reason) {
  if (actual === true) {
    return;
  } else {
  }
  var msg = $._getMessage(reason);
  $._fail('Expect.isTrue(' + $.stringToString(actual) + $.stringToString(msg) + ') fails.');
};

$._emitCollection = function(c, result, visiting) {
  $.add$1(visiting, c);
  var isList = typeof c === 'object' && (c.constructor === Array || c.is$List2());
  if (isList) {
    var t0 = '[';
  } else {
    t0 = '{';
  }
  $.add$1(result, t0);
  for (var t1 = $.iterator(c), first = true; t1.hasNext$0() === true; first = first0) {
    var t2 = t1.next$0();
    if (!first) {
      $.add$1(result, ', ');
    } else {
    }
    $._emitObject(t2, result, visiting);
    var first0 = false;
  }
  if (isList) {
    var t3 = ']';
  } else {
    t3 = '}';
  }
  $.add$1(result, t3);
  $.removeLast(visiting);
};

$.checkMutable = function(list, reason) {
  if (!!(list.immutable$list)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  } else {
  }
};

$.drawAgent = function(agent) {
  $.drawPoint(agent.get$pos().get$x(), agent.get$pos().get$y());
};

$.sub$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a - b;
  } else {
  }
  return a.operator$sub$1(b);
};

$.toStringWrapper = function() {
  return $.toString((this.dartException));
};

$.ExpectException$1 = function(message) {
  return new $.ExpectException(message);
};

$._PeerConnection00EventsImpl$1 = function(_ptr) {
  return new $._PeerConnection00EventsImpl(_ptr);
};

$._ElementList$1 = function(list) {
  return new $._ElementList(list);
};

$._WorkerContextEventsImpl$1 = function(_ptr) {
  return new $._WorkerContextEventsImpl(_ptr);
};

$._DocumentEventsImpl$1 = function(_ptr) {
  return new $._DocumentEventsImpl(_ptr);
};

$.isEmpty = function(receiver) {
  var t0 = typeof receiver === 'string';
  if (!t0) {
    var t1 = $.isJsArray(receiver) === true;
  } else {
    t1 = t0;
  }
  if (t1) {
    return receiver.length === 0;
  } else {
  }
  return receiver.isEmpty$0();
};

$.regExpTest = function(regExp, str) {
  return $.regExpGetNative(regExp).test(str);
};

$.getDay = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCDate());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getDate());
  }
  return t0;
};

$._EventsImpl$1 = function(_ptr) {
  return new $._EventsImpl(_ptr);
};

$.DateImplementation$fromEpoch$2 = function(value, isUtc) {
  return new $.DateImplementation($.checkNull(isUtc), value);
};

$._IDBRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBRequestEventsImpl(_ptr);
};

$.HashSetImplementation$0 = function() {
  var t0 = new $.HashSetImplementation((void 0));
  t0.HashSetImplementation$0();
  return t0;
};

$.stringSplitUnchecked = function(receiver, pattern) {
  if (typeof pattern === 'string') {
    return receiver.split(pattern);
  } else {
    if (typeof pattern === 'object' && !!pattern.is$JSSyntaxRegExp) {
      return receiver.split($.regExpGetNative(pattern));
    } else {
      throw $.captureStackTrace('StringImplementation.split(Pattern) UNIMPLEMENTED');
    }
  }
};

$.checkGrowable = function(list, reason) {
  if (!!(list.fixed$length)) {
    throw $.captureStackTrace($.UnsupportedOperationException$1(reason));
  } else {
  }
};

$._SpeechRecognitionEventsImpl$1 = function(_ptr) {
  return new $._SpeechRecognitionEventsImpl(_ptr);
};

$._Deserializer$0 = function() {
  return new $._Deserializer((void 0));
};

$._SVGElementInstanceEventsImpl$1 = function(_ptr) {
  return new $._SVGElementInstanceEventsImpl(_ptr);
};

$.wait = function(futures) {
  if (typeof futures !== 'string' && (typeof futures !== 'object'||futures.constructor !== Array)) return $.wait$bailout(futures,  0);
  var t0 = ({});
  if ($.isEmpty(futures) === true) {
    var t1 = $.FutureImpl$immediate($.CTC);
    $.setRuntimeTypeInfo(t1, ({T: 'List'}));
    return t1;
  } else {
  }
  var completer = $.CompleterImpl$0();
  $.setRuntimeTypeInfo(completer, ({T: 'List'}));
  t0.completer_3 = completer;
  t0.result_4 = t0.completer_3.get$future();
  t0.remaining_5 = futures.length;
  t0.values_6 = $.List(futures.length);
  for (var i = 0; i < futures.length; i = i + 1) {
    var t2 = ({});
    t2.pos_1 = i;
    var t3 = t2.pos_1;
    if (t3 !== (t3 | 0)) throw $.iae(t3);
    var t4 = futures.length;
    if (t3 < 0 || t3 >= t4) throw $.ioore(t3);
    var t5 = futures[t3];
    t5.then$1(new $.Closure19(t2, t0));
    t5.handleException$1(new $.Closure20(t0));
  }
  return t0.result_4;
};

$.add$1 = function(receiver, value) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'add');
    receiver.push(value);
    return;
  } else {
  }
  return receiver.add$1(value);
};

$.regExpExec = function(regExp, str) {
  var result = ($.regExpGetNative(regExp).exec(str));
  if (result === null) {
    return;
  } else {
  }
  return result;
};

$.ensureInitialized = function() {
  if (!$.eqB($._state, 0)) {
    return;
  } else {
  }
  $._tests = [];
  $._currentGroup = '';
  $._state = 1;
  $._testRunner = $._nextBatch;
  if ($.eqNullB($._config)) {
    $._config = $.Configuration$0();
  } else {
  }
  $._config.onInit$0();
  $._defer($._runTests);
};

$.approxEquals = function(expected, actual, tolerance, reason) {
  if (tolerance === (void 0)) {
    var tolerance0 = $.abs($.div(expected, $.pow(10.0, 4.0)));
  } else {
    tolerance0 = tolerance;
  }
  if ($.leB($.abs($.sub(expected, actual)), tolerance0)) {
    return;
  } else {
  }
  var msg = $._getMessage(reason);
  $._fail('Expect.approxEquals(expected:<' + $.stringToString(expected) + '>, actual:<' + $.stringToString(actual) + '>, tolerance:<' + $.stringToString(tolerance0) + '>' + $.stringToString(msg) + ') fails');
};

$.getMinutes = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCMinutes());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getMinutes());
  }
  return t0;
};

$.geB = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a >= b);
  } else {
    t2 = $.ge$slow(a, b) === true;
  }
  return t2;
};

$.getMonth = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCMonth()) + 1;
  } else {
    t0 = ($.lazyAsJsDate(receiver).getMonth()) + 1;
  }
  return t0;
};

$.stringContainsUnchecked = function(receiver, other, startIndex) {
  if (typeof other === 'string') {
    return !($.indexOf$2(receiver, other, startIndex) === -1);
  } else {
    if (typeof other === 'object' && !!other.is$JSSyntaxRegExp) {
      return other.hasMatch$1($.substring$1(receiver, startIndex));
    } else {
      return $.iterator($.allMatches(other, $.substring$1(receiver, startIndex))).hasNext$0();
    }
  }
};

$.ObjectNotClosureException$0 = function() {
  return new $.ObjectNotClosureException();
};

$.window = function() {
  return window;;
};

$.abs = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.abs$0();
  } else {
  }
  return Math.abs(receiver);
};

$.add = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a + b);
  } else {
    t2 = $.add$slow(a, b);
  }
  return t2;
};

$.regExpAttachGlobalNative = function(regExp) {
  regExp._re = $.regExpMakeNative(regExp, true);
};

$.leB = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a <= b);
  } else {
    t2 = $.le$slow(a, b) === true;
  }
  return t2;
};

$.mod = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var result = (a % b);
    if (result === 0) {
      return 0;
    } else {
    }
    if (result > 0) {
      return result;
    } else {
    }
    var b0 = (b);
    if (b0 < 0) {
      return result - b0;
    } else {
      return result + b0;
    }
  } else {
  }
  return a.operator$mod$1(b);
};

$.regExpMakeNative = function(regExp, global) {
  var t0 = regExp.get$pattern();
  var multiLine = regExp.get$multiLine();
  var ignoreCase = regExp.get$ignoreCase();
  $.checkString(t0);
  var t1 = $.StringBufferImpl$1('');
  if (multiLine === true) {
    $.add$1(t1, 'm');
  } else {
  }
  if (ignoreCase === true) {
    $.add$1(t1, 'i');
  } else {
  }
  if (global === true) {
    $.add$1(t1, 'g');
  } else {
  }
  try {
    return new RegExp(t0, $.toString(t1));
  } catch (t2) {
    var t3 = $.unwrapException(t2);
    var t4 = t3;
    throw $.captureStackTrace($.IllegalJSRegExpException$2(t0, (String(t4))));
  }
};

$.iterator = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    return $.ListIterator$1(receiver);
  } else {
  }
  return receiver.iterator$0();
};

$.BadNumberFormatException$1 = function(_s) {
  return new $.BadNumberFormatException(_s);
};

$._FrozenElementListIterator$1 = function(_list) {
  return new $._FrozenElementListIterator(0, _list);
};

$.TestCase$4 = function(id, description, test, callbacks) {
  return new $.TestCase((void 0), (void 0), $._currentGroup, (void 0), (void 0), '', callbacks, test, description, id);
};

$.Herd$1 = function(numSheep) {
  var t0 = new $.Herd((void 0), (void 0), (void 0));
  t0.Herd$1(numSheep);
  return t0;
};

$.mapToString = function(m) {
  var result = $.StringBufferImpl$1('');
  $._emitMap(m, result, $.List((void 0)));
  return result.toString$0();
};

$.lazyAsJsDate = function(receiver) {
  if (receiver.date === (void 0)) {
    receiver.date = new Date(receiver.get$value());
  } else {
  }
  return receiver.date;
};

$._XMLHttpRequestEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestEventsImpl(_ptr);
};

$._JavaScriptAudioNodeEventsImpl$1 = function(_ptr) {
  return new $._JavaScriptAudioNodeEventsImpl(_ptr);
};

$._emitObject = function(o, result, visiting) {
  if (typeof o === 'object' && (o.constructor === Array || o.is$Collection())) {
    if ($._containsRef(visiting, o) === true) {
      if (typeof o === 'object' && (o.constructor === Array || o.is$List2())) {
        var t0 = '[...]';
      } else {
        t0 = '{...}';
      }
      $.add$1(result, t0);
    } else {
      $._emitCollection(o, result, visiting);
    }
  } else {
    if (typeof o === 'object' && o.is$Map()) {
      if ($._containsRef(visiting, o) === true) {
        $.add$1(result, '{...}');
      } else {
        $._emitMap(o, result, visiting);
      }
    } else {
      if ($.eqNullB(o)) {
        var t1 = 'null';
      } else {
        t1 = o;
      }
      $.add$1(result, t1);
    }
  }
};

$._IsolateEvent$3 = function(isolate, fn, message) {
  return new $._IsolateEvent(message, fn, isolate);
};

$._emitMap = function(m, result, visiting) {
  var t0 = ({});
  t0.visiting_2 = visiting;
  t0.result_1 = result;
  $.add$1(t0.visiting_2, m);
  $.add$1(t0.result_1, '{');
  t0.first_3 = true;
  $.forEach(m, new $.Closure7(t0));
  $.add$1(t0.result_1, '}');
  $.removeLast(t0.visiting_2);
};

$._IDBDatabaseEventsImpl$1 = function(_ptr) {
  return new $._IDBDatabaseEventsImpl(_ptr);
};

$.isFirefox = function() {
  return $.contains$2($.userAgent(), 'Firefox', 0);
};

$.ge = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a >= b);
  } else {
    t2 = $.ge$slow(a, b);
  }
  return t2;
};

$._TextTrackCueEventsImpl$1 = function(_ptr) {
  return new $._TextTrackCueEventsImpl(_ptr);
};

$.mapEquals = function(expected, actual, reason) {
  if (typeof expected !== 'string' && (typeof expected !== 'object'||expected.constructor !== Array)) return $.mapEquals$bailout(expected, actual, reason,  0);
  if (typeof actual !== 'string' && (typeof actual !== 'object'||actual.constructor !== Array)) return $.mapEquals$bailout(expected, actual, reason,  0);
  var msg = $._getMessage(reason);
  for (var t0 = $.iterator(expected.getKeys$0()); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    if (actual.containsKey$1(t1) !== true) {
      $._fail('Expect.mapEquals(missing expected key: <' + $.stringToString(t1) + '>' + $.stringToString(msg) + ') fails');
    } else {
    }
    if (t1 !== (t1 | 0)) throw $.iae(t1);
    var t2 = expected.length;
    if (t1 < 0 || t1 >= t2) throw $.ioore(t1);
    var t3 = expected[t1];
    var t4 = actual.length;
    if (t1 < 0 || t1 >= t4) throw $.ioore(t1);
    $.equals(t3, actual[t1], (void 0));
  }
  for (var t5 = $.iterator(actual.getKeys$0()); t5.hasNext$0() === true; ) {
    var t6 = t5.next$0();
    if (expected.containsKey$1(t6) !== true) {
      $._fail('Expect.mapEquals(unexpected key: <' + $.stringToString(t6) + '>' + $.stringToString(msg) + ') fails');
    } else {
    }
  }
};

$._Copier$0 = function() {
  return new $._Copier((void 0));
};

$.MatchImplementation$5 = function(pattern, str, _start, _end, _groups) {
  return new $.MatchImplementation(_groups, _end, _start, str, pattern);
};

$.UnsupportedOperationException$1 = function(_message) {
  return new $.UnsupportedOperationException(_message);
};

$.indexOf$2 = function(receiver, element, start) {
  if ($.isJsArray(receiver) === true) {
    if (!((typeof start === 'number') && (start === (start | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(start));
    } else {
    }
    return $.indexOf(receiver, element, start, (receiver.length));
  } else {
    if (typeof receiver === 'string') {
      $.checkNull(element);
      if (!((typeof start === 'number') && (start === (start | 0)))) {
        throw $.captureStackTrace($.IllegalArgumentException$1(start));
      } else {
      }
      if (!(typeof element === 'string')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(element));
      } else {
      }
      if (start < 0) {
        return -1;
      } else {
      }
      return receiver.indexOf(element, start);
    } else {
    }
  }
  return receiver.indexOf$2(element, start);
};

$._DedicatedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._DedicatedWorkerContextEventsImpl(_ptr);
};

$.addLast = function(receiver, value) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.addLast$1(value);
  } else {
  }
  $.checkGrowable(receiver, 'addLast');
  receiver.push(value);
};

$._defer = function(callback) {
  var t0 = ({});
  t0.callback_1 = callback;
  var port = $.ReceivePort();
  port.receive$1(new $.Closure16(port, t0));
  port.toSendPort$0().send$2((void 0), (void 0));
};

$._FileReaderEventsImpl$1 = function(_ptr) {
  return new $._FileReaderEventsImpl(_ptr);
};

$.getYear = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCFullYear());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getFullYear());
  }
  return t0;
};

$.NoMoreElementsException$0 = function() {
  return new $.NoMoreElementsException();
};

$.eqNullB = function(a) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1((void 0)) === true;
    } else {
      return false;
    }
  } else {
    return typeof a === "undefined";
  }
};

$._Manager$0 = function() {
  var t0 = new $._Manager((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), 1, 0, 0);
  t0._Manager$0();
  return t0;
};

$.Element$tag = function(tag) {
  return document.createElement(tag);
};

$._FrameSetElementEventsImpl$1 = function(_ptr) {
  return new $._FrameSetElementEventsImpl(_ptr);
};

$.add$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a + b;
  } else {
    if (typeof a === 'string') {
      var b0 = $.toString(b);
      if (typeof b0 === 'string') {
        return a + b0;
      } else {
      }
      $.checkNull(b0);
      throw $.captureStackTrace($.IllegalArgumentException$1(b0));
    } else {
    }
  }
  return a.operator$add$1(b);
};

$.List$from = function(other) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'E'}));
  var iterator = $.iterator(other);
  for (; iterator.hasNext$0() === true; ) {
    result.push(iterator.next$0());
  }
  return result;
};

$.newList = function(length$) {
  if (length$ === (void 0)) {
    return new Array();
  } else {
  }
  var t0 = typeof length$ === 'number' && length$ === (length$ | 0);
  var t1 = !t0;
  if (t0) {
    var t2 = length$ < 0;
  } else {
    t2 = t1;
  }
  if (t2) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  } else {
  }
  var result = (new Array(length$));
  result.fixed$length = true;
  return result;
};

$.main = function() {
  $.show('Dart started. Running tests.');
  $.runUnitTests();
  $.show('Tests done.');
  $.canvas = $.document().query$1('#canvas');
  $.ctx = $.canvas.getContext$1('2d');
  var t0 = $.DateImplementation$now$0().value;
  $.lastTime = t0;
  $.startTime = t0;
  $.herd = $.Herd$1(200);
  var playerDog = $.Dog$5(0, 0, (void 0), 'dog', (void 0));
  $.add$1($.herd.get$allDogs(), playerDog);
  var player2Dog = $.Dog$5(0, 0, (void 0), 'dog', [38, 40, 37, 39]);
  $.add$1($.herd.get$allDogs(), player2Dog);
  $.add$1($.window().get$on().get$keyDown(), $.keyDownHandler);
  $.add$1($.window().get$on().get$keyUp(), $.keyUpHandler);
  $.window().requestAnimationFrame$1($.update);
};

$._AbstractWorkerEventsImpl$1 = function(_ptr) {
  return new $._AbstractWorkerEventsImpl(_ptr);
};

$.dateNow = function() {
  return Date.now();
};

$.DoubleLinkedQueueEntry$1 = function(e) {
  var t0 = new $.DoubleLinkedQueueEntry((void 0), (void 0), (void 0));
  t0.DoubleLinkedQueueEntry$1(e);
  return t0;
};

$._WorkerSendPort$3 = function(_workerId, isolateId, _receivePortId) {
  return new $._WorkerSendPort(_receivePortId, _workerId, isolateId);
};

$._computeLoadLimit = function(capacity) {
  return $.tdiv($.mul(capacity, 3), 4);
};

$.HashSetIterator$1 = function(set_) {
  var t0 = new $.HashSetIterator(-1, set_.get$_backingMap().get$_keys());
  t0.HashSetIterator$1(set_);
  return t0;
};

$.IllegalArgumentException$1 = function(arg) {
  return new $.IllegalArgumentException(arg);
};

$._MediaElementEventsImpl$1 = function(_ptr) {
  return new $._MediaElementEventsImpl(_ptr);
};

$._IDBTransactionEventsImpl$1 = function(_ptr) {
  return new $._IDBTransactionEventsImpl(_ptr);
};

$._BodyElementEventsImpl$1 = function(_ptr) {
  return new $._BodyElementEventsImpl(_ptr);
};

$._AllMatchesIterator$2 = function(re, _str) {
  return new $._AllMatchesIterator(false, (void 0), _str, $.JSSyntaxRegExp$_globalVersionOf$1(re));
};

$.FutureImpl$0 = function() {
  var t0 = [];
  return new $.FutureImpl([], t0, false, (void 0), (void 0), false);
};

$.iae = function(argument) {
  throw $.captureStackTrace($.IllegalArgumentException$1(argument));
};

$.truncate = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.truncate$0();
  } else {
  }
  if (receiver < 0) {
    var t0 = $.ceil(receiver);
  } else {
    t0 = $.floor(receiver);
  }
  return t0;
};

$.equals = function(expected, actual, reason) {
  if ($.eqB(expected, actual)) {
    return;
  } else {
  }
  var msg = $._getMessage(reason);
  $._fail('Expect.equals(expected: <' + $.stringToString(expected) + '>, actual: <' + $.stringToString(actual) + '>' + $.stringToString(msg) + ') fails.');
};

$._IsolateContext$0 = function() {
  var t0 = new $._IsolateContext((void 0), (void 0), (void 0));
  t0._IsolateContext$0();
  return t0;
};

$.isNaN = function(receiver) {
  if (typeof receiver === 'number') {
    return isNaN(receiver);
  } else {
    return receiver.isNegative$0();
  }
};

$.isInfinite = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.isInfinite$0();
  } else {
  }
  var t0 = (receiver == Infinity);
  if (!t0) {
    var t1 = (receiver == -Infinity);
  } else {
    t1 = t0;
  }
  return t1;
};

$.allMatchesInStringUnchecked = function(needle, haystack) {
  var result = $.List((void 0));
  $.setRuntimeTypeInfo(result, ({E: 'Match'}));
  var length$ = $.get$length(haystack);
  var patternLength = $.get$length(needle);
  if (patternLength !== (patternLength | 0)) return $.allMatchesInStringUnchecked$bailout(needle, haystack, 1, length$, result, patternLength);
  for (var startIndex = 0; true; startIndex = startIndex0) {
    var position = $.indexOf$2(haystack, needle, startIndex);
    if ($.eqB(position, -1)) {
      break;
    } else {
    }
    result.push($.StringMatch$3(position, haystack, needle));
    var endIndex = $.add(position, patternLength);
    if ($.eqB(endIndex, length$)) {
      break;
    } else {
      if ($.eqB(position, endIndex)) {
        var startIndex0 = $.add(startIndex, 1);
      } else {
        startIndex0 = endIndex;
      }
    }
  }
  return result;
};

$.le$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a <= b;
  } else {
  }
  return a.operator$le$1(b);
};

$._ChildrenElementList$_wrap$1 = function(element) {
  return new $._ChildrenElementList(element.get$$$dom_children(), element);
};

$.setEquals = function(expected, actual, reason) {
  var missingSet = $.HashSetImplementation$from(expected);
  missingSet.removeAll$1(actual);
  var extraSet = $.HashSetImplementation$from(actual);
  extraSet.removeAll$1(expected);
  var t0 = $.isEmpty(extraSet) === true;
  if (t0) {
    var t1 = $.isEmpty(missingSet) === true;
  } else {
    t1 = t0;
  }
  if (t1) {
    return;
  } else {
  }
  var sb = $.StringBufferImpl$1('Expect.setEquals(' + $.stringToString($._getMessage(reason)) + ') fails');
  if ($.isEmpty(missingSet) !== true) {
    sb.add$1('\nExpected collection does not contain: ');
  } else {
  }
  for (var t2 = $.iterator(missingSet); t2.hasNext$0() === true; ) {
    sb.add$1('' + $.stringToString(t2.next$0()) + ' ');
  }
  if ($.isEmpty(extraSet) !== true) {
    sb.add$1('\nExpected collection should not contain: ');
  } else {
  }
  for (var t3 = $.iterator(extraSet); t3.hasNext$0() === true; ) {
    sb.add$1('' + $.stringToString(t3.next$0()) + ' ');
  }
  $._fail(sb.toString$0());
};

$._AllMatchesIterable$2 = function(_re, _str) {
  return new $._AllMatchesIterable(_str, _re);
};

$.dynamicSetMetadata = function(inputTable) {
  var t0 = $.buildDynamicMetadata(inputTable);
  $._dynamicMetadata(t0);
};

$.drawPoint = function(x, y) {
  $.ctx.beginPath$0();
  $.ctx.set$lineWidth(2);
  $.ctx.set$fillStyle('gray');
  $.ctx.set$strokeStyle('gray');
  $.ctx.arc$6(x, y, 2, 0, 6.283185307179586, false);
  $.ctx.fill$0();
  $.ctx.closePath$0();
  $.ctx.stroke$0();
};

$._runTests = function() {
  if (!$.eqNullB($._soloTest)) {
    $._tests = $.filter($._tests, new $.Closure14());
  } else {
  }
  $._config.onStart$0();
  $._defer(new $.Closure15());
};

$.getMilliseconds = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCMilliseconds());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getMilliseconds());
  }
  return t0;
};

$.endsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.endsWith$1(other);
  } else {
  }
  $.checkString(other);
  var receiverLength = receiver.length;
  var otherLength = $.get$length(other);
  if ($.gtB(otherLength, receiverLength)) {
    return false;
  } else {
  }
  return $.eq(other, $.substring$1(receiver, $.sub(receiverLength, otherLength)));
};

$._nextBatch = function() {
  for (; $.ltB($._currentTest, $.get$length($._tests)); ) {
    var testCase = $.index($._tests, $._currentTest);
    $.guardAsync(new $.Closure34(testCase), (void 0));
    var t0 = testCase.get$isComplete() !== true;
    if (t0) {
      var t1 = $.gtB(testCase.get$callbacks(), 0);
    } else {
      t1 = t0;
    }
    if (t1) {
      return;
    } else {
    }
    $._currentTest = $.add($._currentTest, 1);
  }
  $._completeTests();
};

$.ListIterator$1 = function(list) {
  return new $.ListIterator(list, 0);
};

$._Serializer$0 = function() {
  return new $._Serializer(0, (void 0));
};

$.checkNum = function(value) {
  if (!(typeof value === 'number')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  } else {
  }
  return value;
};

$.HerdIterator$1 = function(herd) {
  var t0 = new $.HerdIterator((void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), (void 0), herd);
  t0.HerdIterator$1(herd);
  return t0;
};

$.FutureAlreadyCompleteException$0 = function() {
  return new $.FutureAlreadyCompleteException();
};

$._WorkerEventsImpl$1 = function(_ptr) {
  return new $._WorkerEventsImpl(_ptr);
};

$.ltB = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a < b);
  } else {
    t2 = $.lt$slow(a, b) === true;
  }
  return t2;
};

$._currentIsolate = function() {
  return $._globalState().get$currentContext();
};

$.FilteredElementList$1 = function(node) {
  return new $.FilteredElementList(node.get$nodes(), node);
};

$.expect = function(value) {
  return $.Expectation$1(value);
};

$.convertDartClosureToJS = function(closure, arity) {
  if (closure === (void 0)) {
    return;
  } else {
  }
  var function$ = (closure.$identity);
  if (!!function$) {
    return function$;
  } else {
  }
  var function0 = (function() {
    return $.invokeClosure.$call$5(closure, $._currentIsolate(), arity, arguments[0], arguments[1]);
  });
  closure.$identity = function0;
  return function0;
};

$._FixedSizeListIterator$1 = function(array) {
  return new $._FixedSizeListIterator($.get$length(array), 0, array);
};

$._FrozenElementList$_wrap$1 = function(_nodeList) {
  return new $._FrozenElementList(_nodeList);
};

$.split = function(receiver, pattern) {
  if (!(typeof receiver === 'string')) {
    return receiver.split$1(pattern);
  } else {
  }
  $.checkNull(pattern);
  return $.stringSplitUnchecked(receiver, pattern);
};

$.concatAll = function(strings) {
  $.checkNull(strings);
  for (var t0 = $.iterator(strings), result = ''; t0.hasNext$0() === true; result = result0) {
    var t1 = t0.next$0();
    $.checkNull(t1);
    if (!(typeof t1 === 'string')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t1));
    } else {
    }
    var result0 = result + t1;
  }
  return result;
};

$.Configuration$0 = function() {
  return new $.Configuration();
};

$.userAgent = function() {
  return $.window().get$navigator().get$userAgent();
};

$._InputElementEventsImpl$1 = function(_ptr) {
  return new $._InputElementEventsImpl(_ptr);
};

$.Vector2D$2 = function(_x, _y) {
  var t0 = new $.Vector2D(_y, _x);
  t0.Vector2D$2(_x, _y);
  return t0;
};

$.getRange = function(receiver, start, length$) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.getRange$2(start, length$);
  } else {
  }
  if (0 === length$) {
    return [];
  } else {
  }
  $.checkNull(start);
  $.checkNull(length$);
  if (!((typeof start === 'number') && (start === (start | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(start));
  } else {
  }
  if (!((typeof length$ === 'number') && (length$ === (length$ | 0)))) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  } else {
  }
  if (length$ < 0) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  } else {
  }
  if (start < 0) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  } else {
  }
  var end = start + length$;
  if ($.gtB(end, $.get$length(receiver))) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(length$));
  } else {
  }
  if ($.ltB(length$, 0)) {
    throw $.captureStackTrace($.IllegalArgumentException$1(length$));
  } else {
  }
  return receiver.slice(start, end);
};

$.pow = function(x, exponent) {
  return $.pow2(x, exponent);
};

$._DoubleLinkedQueueIterator$1 = function(_sentinel) {
  var t0 = new $._DoubleLinkedQueueIterator((void 0), _sentinel);
  t0._DoubleLinkedQueueIterator$1(_sentinel);
  return t0;
};

$.pow2 = function(value, exponent) {
  $.checkNum(value);
  $.checkNum(exponent);
  return Math.pow(value, exponent);
};

$.getRange2 = function(a, start, length$, accumulator) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.getRange2$bailout(a, start, length$, accumulator,  0);
  if ($.ltB(length$, 0)) {
    throw $.captureStackTrace($.IllegalArgumentException$1('length'));
  } else {
  }
  if ($.ltB(start, 0)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
  } else {
  }
  var end = $.add(start, length$);
  if ($.gtB(end, a.length)) {
    throw $.captureStackTrace($.IndexOutOfRangeException$1(end));
  } else {
  }
  for (var i = start; $.ltB(i, end); i = $.add(i, 1)) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    $.add$1(accumulator, a[i]);
  }
  return accumulator;
};

$._TextTrackListEventsImpl$1 = function(_ptr) {
  return new $._TextTrackListEventsImpl(_ptr);
};

$.toUpperCase = function(receiver) {
  if (!(typeof receiver === 'string')) {
    return receiver.toUpperCase$0();
  } else {
  }
  return receiver.toUpperCase();
};

$._dynamicMetadata = function(table) {
  $dynamicMetadata = table;
};

$._dynamicMetadata2 = function() {
  if ((typeof($dynamicMetadata)) === 'undefined') {
    var t0 = [];
    $._dynamicMetadata(t0);
  } else {
  }
  return $dynamicMetadata;
};

$.LinkedHashMapImplementation$0 = function() {
  var t0 = new $.LinkedHashMapImplementation((void 0), (void 0));
  t0.LinkedHashMapImplementation$0();
  return t0;
};

$._DeprecatedPeerConnectionEventsImpl$1 = function(_ptr) {
  return new $._DeprecatedPeerConnectionEventsImpl(_ptr);
};

$._PendingSendPortFinder$0 = function() {
  return new $._PendingSendPortFinder([], (void 0));
};

$.regExpGetNative = function(regExp) {
  var r = (regExp._re);
  if (r === (void 0)) {
    var r0 = (regExp._re = $.regExpMakeNative(regExp, false));
  } else {
    r0 = r;
  }
  return r0;
};

$.throwNoSuchMethod = function(obj, name$, arguments$) {
  throw $.captureStackTrace($.NoSuchMethodException$4(obj, name$, arguments$, (void 0)));
};

$.checkNull = function(object) {
  if (object === (void 0)) {
    throw $.captureStackTrace($.NullPointerException$2((void 0), $.CTC));
  } else {
  }
  return object;
};

$.CompleterImpl$0 = function() {
  return new $.CompleterImpl($.FutureImpl$0());
};

$.runUnitTests = function() {
  $.test('vector length', new $.Closure11());
  $.test('vector arithmetic', new $.Closure12());
  $.test('vector normalized', new $.Closure13());
};

$.StackTrace$1 = function(stack) {
  return new $.StackTrace(stack);
};

$._EventListenerListImpl$2 = function(_ptr, _type) {
  return new $._EventListenerListImpl(_type, _ptr);
};

$._fillStatics = function(context) {
    $globals = context.isolateStatics;
  $static_init();
;
};

$.lengthOfHypotenuse = function(x, y) {
  return $.sqrt($.add($.mul(x, x), $.mul(y, y)));
};

$.ReceivePort = function() {
  return $._ReceivePortImpl$0();
};

$.getSeconds = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCSeconds());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getSeconds());
  }
  return t0;
};

$._WindowEventsImpl$1 = function(_ptr) {
  return new $._WindowEventsImpl(_ptr);
};

$.DoubleLinkedQueue$0 = function() {
  var t0 = new $.DoubleLinkedQueue((void 0));
  t0.DoubleLinkedQueue$0();
  return t0;
};

$.TypeError$1 = function(msg) {
  return new $.TypeError(msg);
};

$.checkNumbers = function(a, b) {
  if (typeof a === 'number') {
    if (typeof b === 'number') {
      return true;
    } else {
      $.checkNull(b);
      throw $.captureStackTrace($.IllegalArgumentException$1(b));
    }
  } else {
  }
  return false;
};

$._DoubleLinkedQueueEntrySentinel$0 = function() {
  var t0 = new $._DoubleLinkedQueueEntrySentinel((void 0), (void 0), (void 0));
  t0.DoubleLinkedQueueEntry$1((void 0));
  t0._DoubleLinkedQueueEntrySentinel$0();
  return t0;
};

$.getHours = function(receiver) {
  if (receiver.isUtc$0() === true) {
    var t0 = ($.lazyAsJsDate(receiver).getUTCHours());
  } else {
    t0 = ($.lazyAsJsDate(receiver).getHours());
  }
  return t0;
};

$.stringToString = function(value) {
  var res = $.toString(value);
  if (!(typeof res === 'string')) {
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  } else {
  }
  return res;
};

$.lt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a < b;
  } else {
  }
  return a.operator$lt$1(b);
};

$.index$slow = function(a, index) {
  var t0 = typeof a === 'string';
  if (!t0) {
    var t1 = $.isJsArray(a) === true;
  } else {
    t1 = t0;
  }
  if (t1) {
    if (!((typeof index === 'number') && (index === (index | 0)))) {
      if (!(typeof index === 'number')) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      } else {
      }
      if (!($.truncate(index) === index)) {
        throw $.captureStackTrace($.IllegalArgumentException$1(index));
      } else {
      }
    } else {
    }
    var t2 = $.ltB(index, 0);
    if (!t2) {
      var t3 = $.geB(index, $.get$length(a));
    } else {
      t3 = t2;
    }
    if (t3) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    } else {
    }
    return a[index];
  } else {
  }
  return a.operator$index$1(index);
};

$._globalState = function() {
  return $globalState;;
};

$._globalState2 = function(val) {
  $globalState = val;;
};

$._ReceivePortImpl$0 = function() {
  var t0 = $._nextFreeId;
  $._nextFreeId = $.add(t0, 1);
  var t1 = new $._ReceivePortImpl((void 0), t0);
  t1._ReceivePortImpl$0();
  return t1;
};

$.contains$2 = function(receiver, other, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.contains$2(other, startIndex);
  } else {
  }
  $.checkNull(other);
  return $.stringContainsUnchecked(receiver, other, startIndex);
};

$._MainManagerStub$0 = function() {
  return new $._MainManagerStub();
};

$.IndexOutOfRangeException$1 = function(_index) {
  return new $.IndexOutOfRangeException(_index);
};

$.getTraceFromException = function(exception) {
  return $.StackTrace$1((exception.stack));
};

$._TextTrackEventsImpl$1 = function(_ptr) {
  return new $._TextTrackEventsImpl(_ptr);
};

$.charCodeAt = function(receiver, index) {
  if (typeof receiver === 'string') {
    if (!(typeof index === 'number')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(index));
    } else {
    }
    if (index < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    } else {
    }
    if (index >= receiver.length) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
    } else {
    }
    return receiver.charCodeAt(index);
  } else {
    return receiver.charCodeAt$1(index);
  }
};

$._BatteryManagerEventsImpl$1 = function(_ptr) {
  return new $._BatteryManagerEventsImpl(_ptr);
};

$.toInt = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.toInt$0();
  } else {
  }
  if ($.isNaN(receiver) === true) {
    throw $.captureStackTrace($.BadNumberFormatException$1('NaN'));
  } else {
  }
  if ($.isInfinite(receiver) === true) {
    throw $.captureStackTrace($.BadNumberFormatException$1('Infinity'));
  } else {
  }
  var truncated = $.truncate(receiver);
  if (truncated == -0.0) {
    var t0 = 0;
  } else {
    t0 = truncated;
  }
  return t0;
};

$._EventLoop$0 = function() {
  var t0 = $.DoubleLinkedQueue$0();
  $.setRuntimeTypeInfo(t0, ({E: '_IsolateEvent'}));
  return new $._EventLoop(t0);
};

$._WebSocketEventsImpl$1 = function(_ptr) {
  return new $._WebSocketEventsImpl(_ptr);
};

$.collectionToString = function(c) {
  var result = $.StringBufferImpl$1('');
  $._emitCollection(c, result, $.List((void 0)));
  return result.toString$0();
};

$._fullSpec = function(spec) {
  if (spec === (void 0)) {
    return '' + $.stringToString($._currentGroup);
  } else {
  }
  if (!$.eqB($._currentGroup, '')) {
    var t0 = '' + $.stringToString($._currentGroup) + ' ' + $.stringToString(spec);
  } else {
    t0 = spec;
  }
  return t0;
};

$.KeyValuePair$2 = function(key, value) {
  return new $.KeyValuePair(value, key);
};

$.MetaInfo$3 = function(tag, tags, set) {
  return new $.MetaInfo(set, tags, tag);
};

$._MediaStreamEventsImpl$1 = function(_ptr) {
  return new $._MediaStreamEventsImpl(_ptr);
};

$._NativeJsSendPort$2 = function(_receivePort, isolateId) {
  return new $._NativeJsSendPort(_receivePort, isolateId);
};

$.defineProperty = function(obj, property, value) {
  Object.defineProperty(obj, property,
      {value: value, enumerable: false, writable: true, configurable: true});;
};

$.dynamicFunction = function(name$) {
  var f = (Object.prototype[name$]);
  var t0 = !(f === (void 0));
  if (t0) {
    var t1 = (!!f.methods);
  } else {
    t1 = t0;
  }
  if (t1) {
    return f.methods;
  } else {
  }
  var methods = ({});
  var dartMethod = (Object.getPrototypeOf($.CTC10)[name$]);
  if (!(dartMethod === (void 0))) {
    methods['Object'] = dartMethod;
  } else {
  }
  var bind = (function() {return $.dynamicBind.$call$4(this, name$, methods, Array.prototype.slice.call(arguments));});
  bind.methods = methods;
  $.defineProperty((Object.prototype), name$, bind);
  return methods;
};

$.print = function(obj) {
  return $.printString($.toString(obj));
};

$.checkString = function(value) {
  if (!(typeof value === 'string')) {
    $.checkNull(value);
    throw $.captureStackTrace($.IllegalArgumentException$1(value));
  } else {
  }
  return value;
};

$.div = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a / b);
  } else {
    t2 = $.div$slow(a, b);
  }
  return t2;
};

$._callInIsolate = function(isolate, function$) {
  isolate.eval$1(function$);
  $._globalState().get$topEventLoop().run$0();
};

$.addAll = function(receiver, collection) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.addAll$1(collection);
  } else {
  }
  var iterator = $.iterator(collection);
  for (; iterator.hasNext$0() === true; ) {
    $.add$1(receiver, iterator.next$0());
  }
};

$.removeLast = function(receiver) {
  if ($.isJsArray(receiver) === true) {
    $.checkGrowable(receiver, 'removeLast');
    if ($.get$length(receiver) === 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(-1));
    } else {
    }
    return receiver.pop();
  } else {
  }
  return receiver.removeLast$0();
};

$.objectToString = function(object) {
  var name$ = (object.constructor.name);
  if ($.charCodeAt(name$, 0) === 36) {
    var name0 = $.substring$1(name$, 1);
  } else {
    name0 = name$;
  }
  return 'Instance of \'' + $.stringToString(name0) + '\'';
};

$.indexOf = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf$bailout(a, element, startIndex, endIndex,  0);
  if (typeof endIndex !== 'number') return $.indexOf$bailout(a, element, startIndex, endIndex,  0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  } else {
  }
  if ($.ltB(startIndex, 0)) {
    var i = 0;
  } else {
    i = startIndex;
  }
  for (; $.ltB(i, endIndex); i = $.add(i, 1)) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    } else {
    }
  }
  return -1;
};

$._firstProbe = function(hashCode, length$) {
  return $.and(hashCode, $.sub(length$, 1));
};

$.set$length = function(receiver, newLength) {
  if ($.isJsArray(receiver) === true) {
    $.checkNull(newLength);
    if (!((typeof newLength === 'number') && (newLength === (newLength | 0)))) {
      throw $.captureStackTrace($.IllegalArgumentException$1(newLength));
    } else {
    }
    if (newLength < 0) {
      throw $.captureStackTrace($.IndexOutOfRangeException$1(newLength));
    } else {
    }
    $.checkGrowable(receiver, 'set length');
    receiver.length = newLength;
  } else {
    receiver.set$length(newLength);
  }
  return newLength;
};

$.typeNameInFirefox = function(obj) {
  var name$ = $.constructorNameFallback(obj);
  if ($.eqB(name$, 'Window')) {
    return 'DOMWindow';
  } else {
  }
  if ($.eqB(name$, 'Document')) {
    return 'HTMLDocument';
  } else {
  }
  if ($.eqB(name$, 'XMLDocument')) {
    return 'Document';
  } else {
  }
  if ($.eqB(name$, 'WorkerMessageEvent')) {
    return 'MessageEvent';
  } else {
  }
  return name$;
};

$.gt$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a > b;
  } else {
  }
  return a.operator$gt$1(b);
};

$.ioore = function(index) {
  throw $.captureStackTrace($.IndexOutOfRangeException$1(index));
};

$.test = function(spec, body) {
  $.ensureInitialized();
  $.add$1($._tests, $.TestCase$4($.add($.get$length($._tests), 1), $._fullSpec(spec), body, 0));
};

$.Expectation$1 = function(_value) {
  return new $.Expectation(_value);
};

$.indexOf2 = function(a, element, startIndex, endIndex) {
  if (typeof a !== 'string' && (typeof a !== 'object'||a.constructor !== Array)) return $.indexOf2$bailout(a, element, startIndex, endIndex,  0);
  if (typeof endIndex !== 'number') return $.indexOf2$bailout(a, element, startIndex, endIndex,  0);
  if ($.geB(startIndex, a.length)) {
    return -1;
  } else {
  }
  if ($.ltB(startIndex, 0)) {
    var i = 0;
  } else {
    i = startIndex;
  }
  for (; $.ltB(i, endIndex); i = $.add(i, 1)) {
    if (i !== (i | 0)) throw $.iae(i);
    var t0 = a.length;
    if (i < 0 || i >= t0) throw $.ioore(i);
    if ($.eqB(a[i], element)) {
      return i;
    } else {
    }
  }
  return -1;
};

$.toString = function(value) {
  if (typeof value == "object") {
    if ($.isJsArray(value) === true) {
      return $.collectionToString(value);
    } else {
      return value.toString$0();
    }
  } else {
  }
  if (value === 0 && (1 / value) < 0) {
    return '-0.0';
  } else {
  }
  if (value === (void 0)) {
    return 'null';
  } else {
  }
  if (typeof value == "function") {
    return 'Closure';
  } else {
  }
  return String(value);
};

$.show = function(message) {
  $.document().query$1('#status').set$innerHTML(message);
};

$.hashCode = function(receiver) {
  if (typeof receiver === 'number') {
    return receiver & 0x1FFFFFFF;
  } else {
  }
  if (!(typeof receiver === 'string')) {
    return receiver.hashCode$0();
  } else {
  }
  var length$ = (receiver.length);
  for (var i = 0, hash = 0; i < length$; i = i0, hash = hash0) {
    var hash1 = (536870911 & hash + (receiver.charCodeAt(i))) >>> 0;
    var hash2 = (536870911 & hash1 + ((524287 & hash1) >>> 0 << 10)) >>> 0;
    var hash0 = (hash2 ^ $.shr(hash2, 6)) >>> 0;
    var i0 = i + 1;
  }
  var hash3 = (536870911 & hash + ((67108863 & hash) >>> 0 << 3)) >>> 0;
  var hash4 = (hash3 ^ $.shr(hash3, 11)) >>> 0;
  return (536870911 & hash4 + ((16383 & hash4) >>> 0 << 15)) >>> 0;
};

$.makeLiteralMap = function(keyValuePairs) {
  var iterator = $.iterator(keyValuePairs);
  var result = $.LinkedHashMapImplementation$0();
  for (; iterator.hasNext$0() === true; ) {
    result.operator$indexSet$2(iterator.next$0(), iterator.next$0());
  }
  return result;
};

$.startsWith = function(receiver, other) {
  if (!(typeof receiver === 'string')) {
    return receiver.startsWith$1(other);
  } else {
  }
  $.checkString(other);
  var length$ = $.get$length(other);
  if ($.gtB(length$, receiver.length)) {
    return false;
  } else {
  }
  return other == receiver.substring(0, length$);
};

$.le = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a <= b);
  } else {
    t2 = $.le$slow(a, b);
  }
  return t2;
};

$.toStringForNativeObject = function(obj) {
  return 'Instance of ' + $.stringToString($.getTypeNameOf(obj));
};

$.forEach = function(receiver, f) {
  if ($.isJsArray(receiver) !== true) {
    return receiver.forEach$1(f);
  } else {
    return $.forEach2(receiver, f);
  }
};

$.dynamicBind = function(obj, name$, methods, arguments$) {
  var tag = $.getTypeNameOf(obj);
  var method = (methods[tag]);
  var t0 = method === (void 0);
  if (t0) {
    var t1 = !($._dynamicMetadata2() === (void 0));
  } else {
    t1 = t0;
  }
  if (t1) {
    for (var method0 = method, i = 0; method1 = method0, $.ltB(i, $.get$length($._dynamicMetadata2())); method0 = method2, i = i0) {
      var entry = $.index($._dynamicMetadata2(), i);
      if ($.contains$1(entry.get$set(), tag) === true) {
        var method3 = (methods[entry.get$tag()]);
        if (!(method3 === (void 0))) {
          method1 = method3;
          break;
        } else {
        }
        var method2 = method3;
      } else {
        method2 = method0;
      }
      var i0 = i + 1;
    }
  } else {
    method1 = method;
  }
  if (method1 === (void 0)) {
    var method4 = (methods['Object']);
  } else {
    method4 = method1;
  }
  var proto = (Object.getPrototypeOf(obj));
  if (method4 === (void 0)) {
    var method5 = (function () {if (Object.getPrototypeOf(this) === proto) {$.throwNoSuchMethod.$call$3(this, name$, Array.prototype.slice.call(arguments));} else {return Object.prototype[name$].apply(this, arguments);}});
  } else {
    method5 = method4;
  }
  var nullCheckMethod = (function() {var res = method5.apply(this, Array.prototype.slice.call(arguments));return res === null ? (void 0) : res;});
  if (!proto.hasOwnProperty(name$)) {
    $.defineProperty(proto, name$, nullCheckMethod);
  } else {
  }
  return nullCheckMethod.apply(obj, arguments$);
  var method1;
};

$._MessagePortEventsImpl$1 = function(_ptr) {
  return new $._MessagePortEventsImpl(_ptr);
};

$.forEach2 = function(iterable, f) {
  for (var t0 = $.iterator(iterable); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
};

$._waitForPendingPorts = function(message, callback) {
  var t0 = ({});
  t0.callback_1 = callback;
  var finder = $._PendingSendPortFinder$0();
  finder.traverse$1(message);
  $.wait(finder.ports).then$1(new $.Closure18(t0));
};

$.getFunctionForTypeNameOf = function() {
  if (!((typeof(navigator)) === 'object')) {
    return $.typeNameInChrome;
  } else {
  }
  var userAgent = (navigator.userAgent);
  if ($.contains$1(userAgent, $.CTC9) === true) {
    return $.typeNameInChrome;
  } else {
    if ($.contains$1(userAgent, 'Firefox') === true) {
      return $.typeNameInFirefox;
    } else {
      if ($.contains$1(userAgent, 'MSIE') === true) {
        return $.typeNameInIE;
      } else {
        return $.constructorNameFallback;
      }
    }
  }
};

$.index = function(a, index) {
  if (typeof a == "string" || a.constructor === Array) {
    var key = (index >>> 0);
    var t0 = key === index;
    if (t0) {
      var t1 = key < (a.length);
    } else {
      t1 = t0;
    }
    if (t1) {
      return a[key];
    } else {
    }
  } else {
  }
  return $.index$slow(a, index);
};

$.xor = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return (a ^ b) >>> 0;
  } else {
  }
  return a.operator$xor$1(b);
};

$._ElementEventsImpl$1 = function(_ptr) {
  return new $._ElementEventsImpl(_ptr);
};

$.toLowerCase = function(receiver) {
  if (!(typeof receiver === 'string')) {
    return receiver.toLowerCase$0();
  } else {
  }
  return receiver.toLowerCase();
};

$.List = function(length$) {
  return $.newList(length$);
};

$._isPowerOfTwo = function(x) {
  return $.eq($.and(x, $.sub(x, 1)), 0);
};

$._XMLHttpRequestUploadEventsImpl$1 = function(_ptr) {
  return new $._XMLHttpRequestUploadEventsImpl(_ptr);
};

$._completeTests = function() {
  $._state = 0;
  for (var t0 = $.iterator($._tests), testsErrors_ = 0, testsFailed_ = 0, testsPassed_ = 0; t0.hasNext$0() === true; testsErrors_ = testsErrors_0, testsFailed_ = testsFailed_0, testsPassed_ = testsPassed_0) {
    $1:{
      var t1 = t0.next$0().get$result();
      if ('pass' === t1) {
        var testsPassed_1 = testsPassed_ + 1;
        var testsErrors_0 = testsErrors_;
        var testsFailed_0 = testsFailed_;
        var testsPassed_0 = testsPassed_1;
        break $1;
      } else {
        if ('fail' === t1) {
          var testsFailed_1 = testsFailed_ + 1;
          testsErrors_0 = testsErrors_;
          testsFailed_0 = testsFailed_1;
          testsPassed_0 = testsPassed_;
          break $1;
        } else {
          if ('error' === t1) {
            testsErrors_0 = testsErrors_ + 1;
            testsFailed_0 = testsFailed_;
            testsPassed_0 = testsPassed_;
            break $1;
          } else {
          }
        }
      }
      testsErrors_0 = testsErrors_;
      testsFailed_0 = testsFailed_;
      testsPassed_0 = testsPassed_;
    }
  }
  $._config.onDone$5(testsPassed_, testsFailed_, testsErrors_, $._tests, $._uncaughtErrorMessage);
};

$.captureStackTrace = function(ex) {
  var jsError = (new Error());
  jsError.dartException = ex;
  jsError.toString = $.toStringWrapper.$call$0;
  return jsError;
};

$.forEach3 = function(iterable, f) {
  for (var t0 = $.iterator(iterable); t0.hasNext$0() === true; ) {
    f.$call$1(t0.next$0());
  }
};

$.StackOverflowException$0 = function() {
  return new $.StackOverflowException();
};

$.eq = function(a, b) {
  if (typeof a === "object") {
    if (!!a.operator$eq$1) {
      return a.operator$eq$1(b);
    } else {
      return a === b;
    }
  } else {
  }
  return a === b;
};

$.StringBufferImpl$1 = function(content$) {
  var t0 = new $.StringBufferImpl((void 0), (void 0));
  t0.StringBufferImpl$1(content$);
  return t0;
};

$.HashMapImplementation$0 = function() {
  var t0 = new $.HashMapImplementation((void 0), (void 0), (void 0), (void 0), (void 0));
  t0.HashMapImplementation$0();
  return t0;
};

$.substring$1 = function(receiver, startIndex) {
  if (!(typeof receiver === 'string')) {
    return receiver.substring$1(startIndex);
  } else {
  }
  return $.substring$2(receiver, startIndex, (void 0));
};

$.div$slow = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    return a / b;
  } else {
  }
  return a.operator$div$1(b);
};

$.join = function(strings, separator) {
  return $.join2(strings, separator);
};

$.join2 = function(strings, separator) {
  if (typeof separator !== 'string') return $.join2$bailout(strings, separator,  0);
  $.checkNull(strings);
  $.checkNull(separator);
  for (var t0 = $.iterator(strings), result = '', first = true; t0.hasNext$0() === true; result = result0, first = first0) {
    var t1 = t0.next$0();
    $.checkNull(t1);
    if (!(typeof t1 === 'string')) {
      throw $.captureStackTrace($.IllegalArgumentException$1(t1));
    } else {
    }
    if (!first) {
      var result1 = result + separator;
    } else {
      result1 = result;
    }
    var result2 = result1 + t1;
    var first0 = false;
    var result0 = result2;
  }
  return result;
};

$._SharedWorkerContextEventsImpl$1 = function(_ptr) {
  return new $._SharedWorkerContextEventsImpl(_ptr);
};

$._IDBVersionChangeRequestEventsImpl$1 = function(_ptr) {
  return new $._IDBVersionChangeRequestEventsImpl(_ptr);
};

$.gtB = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a > b);
  } else {
    t2 = $.gt$slow(a, b) === true;
  }
  return t2;
};

$._fail = function(message) {
  throw $.captureStackTrace($.ExpectException$1(message));
};

$.setRuntimeTypeInfo = function(target, typeInfo) {
  if (!(target === (void 0))) {
    target.builtin$typeInfo = typeInfo;
  } else {
  }
};

$.shl = function(a, b) {
  if ($.checkNumbers(a, b) === true) {
    var a0 = (a);
    var b0 = (b);
    if (b0 < 0) {
      throw $.captureStackTrace($.IllegalArgumentException$1(b0));
    } else {
    }
    if (b0 > 31) {
      return 0;
    } else {
    }
    return (a0 << b0) >>> 0;
  } else {
  }
  return a.operator$shl$1(b);
};

$.document = function() {
  return document;;
};

$._FileWriterEventsImpl$1 = function(_ptr) {
  return new $._FileWriterEventsImpl(_ptr);
};

$.FutureNotCompleteException$0 = function() {
  return new $.FutureNotCompleteException();
};

$.NoSuchMethodException$4 = function(_receiver, _functionName, _arguments, _existingArgumentNames) {
  return new $.NoSuchMethodException(_existingArgumentNames, _arguments, _functionName, _receiver);
};

$.lt = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a < b);
  } else {
    t2 = $.lt$slow(a, b);
  }
  return t2;
};

$.unwrapException = function(ex) {
  if ("dartException" in ex) {
    return ex.dartException;
  } else {
  }
  var message = (ex.message);
  if (ex instanceof TypeError) {
    var type = (ex.type);
    var name$ = (ex.arguments ? ex.arguments[0] : "");
    var t0 = $.eqB(type, 'property_not_function');
    if (!t0) {
      var t1 = $.eqB(type, 'called_non_callable');
    } else {
      t1 = t0;
    }
    if (!t1) {
      var t2 = $.eqB(type, 'non_object_property_call');
    } else {
      t2 = t1;
    }
    if (!t2) {
      var t3 = $.eqB(type, 'non_object_property_load');
    } else {
      t3 = t2;
    }
    if (t3) {
      var t4 = typeof name$ === 'string';
      if (t4) {
        var t5 = $.startsWith(name$, '$call$') === true;
      } else {
        t5 = t4;
      }
      if (t5) {
        return $.ObjectNotClosureException$0();
      } else {
        return $.NullPointerException$2((void 0), $.CTC);
      }
    } else {
      if ($.eqB(type, 'undefined_method')) {
        var t6 = typeof name$ === 'string';
        if (t6) {
          var t7 = $.startsWith(name$, '$call$') === true;
        } else {
          t7 = t6;
        }
        if (t7) {
          return $.ObjectNotClosureException$0();
        } else {
          return $.NoSuchMethodException$4('', name$, [], (void 0));
        }
      } else {
      }
    }
    if (typeof message === 'string') {
      var t8 = $.endsWith(message, 'is null') === true;
      if (!t8) {
        var t9 = $.endsWith(message, 'is undefined') === true;
      } else {
        t9 = t8;
      }
      if (!t9) {
        var t10 = $.endsWith(message, 'is null or undefined') === true;
      } else {
        t10 = t9;
      }
      if (t10) {
        return $.NullPointerException$2((void 0), $.CTC);
      } else {
        if ($.endsWith(message, 'is not a function') === true) {
          return $.NoSuchMethodException$4('', '<unknown>', [], (void 0));
        } else {
        }
      }
    } else {
    }
    if (typeof message === 'string') {
      var t11 = message;
    } else {
      t11 = '';
    }
    return $.TypeError$1(t11);
  } else {
  }
  if (ex instanceof RangeError) {
    var t12 = typeof message === 'string';
    if (t12) {
      var t13 = $.contains$1(message, 'call stack') === true;
    } else {
      t13 = t12;
    }
    if (t13) {
      return $.StackOverflowException$0();
    } else {
    }
    return $.IllegalArgumentException$1('');
  } else {
  }
  if (typeof InternalError == 'function' && ex instanceof InternalError) {
    var t14 = typeof message === 'string';
    if (t14) {
      var t15 = message === 'too much recursion';
    } else {
      t15 = t14;
    }
    if (t15) {
      return $.StackOverflowException$0();
    } else {
    }
  } else {
  }
  return ex;
};

$.ceil = function(receiver) {
  if (!(typeof receiver === 'number')) {
    return receiver.ceil$0();
  } else {
  }
  return Math.ceil(receiver);
};

$.getTypeNameOf = function(obj) {
  if ($._getTypeNameOf === (void 0)) {
    $._getTypeNameOf = $.getFunctionForTypeNameOf();
  } else {
  }
  return $._getTypeNameOf.$call$1(obj);
};

$.guardAsync = function(tryBody, finallyBody) {
  try {
    return tryBody.$call$0();
  } catch (t0) {
    var t1 = $.unwrapException(t0);
    if (t1 === (void 0) || typeof t1 === 'object' && !!t1.is$ExpectException) {
      var t2 = t1;
      var t3 = $.getTraceFromException(t0);
      $.isTrue($.lt($._currentTest, $.get$length($._tests)), (void 0));
      if (!$.eqB($._state, 3)) {
        var t4 = $.index($._tests, $._currentTest);
        var t5 = t2.get$message();
        if ($.eqNullB(t3)) {
          var t6 = '';
        } else {
          t6 = $.toString(t3);
        }
        t4.fail$2(t5, t6);
      } else {
      }
    } else {
      var t7 = t1;
      var t8 = $.getTraceFromException(t0);
      if ($.eqB($._state, 2)) {
        var t9 = $.index($._tests, $._currentTest);
        var t10 = 'Caught ' + $.stringToString(t7);
        if ($.eqNullB(t8)) {
          var t11 = '';
        } else {
          t11 = $.toString(t8);
        }
        t9.fail$2(t10, t11);
      } else {
        if (!$.eqB($._state, 3)) {
          var t12 = $.index($._tests, $._currentTest);
          var t13 = 'Caught ' + $.stringToString(t7);
          if ($.eqNullB(t8)) {
            var t14 = '';
          } else {
            t14 = $.toString(t8);
          }
          t12.error$2(t13, t14);
        } else {
        }
      }
    }
  } finally {
    $._state = 1;
    if (!$.eqNullB(finallyBody)) {
      finallyBody.$call$0();
    } else {
    }
  }
};

$.sub = function(a, b) {
  var t0 = typeof a === 'number';
  if (t0) {
    var t1 = typeof b === 'number';
  } else {
    t1 = t0;
  }
  if (t1) {
    var t2 = (a - b);
  } else {
    t2 = $.sub$slow(a, b);
  }
  return t2;
};

$.stringEquals$bailout = function(expected, actual, reason, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      var msg = $._getMessage(reason);
      var defaultMessage = 'Expect.stringEquals(expected: <' + $.stringToString(expected) + '>", <' + $.stringToString(actual) + '>' + $.stringToString(msg) + ') fails';
      if ($.eqB(expected, actual)) {
        return;
      } else {
      }
      var t2 = expected === (void 0);
      if (!t2) {
        var t3 = actual === (void 0);
      } else {
        t3 = t2;
      }
      if (t3) {
        $._fail('' + $.stringToString(defaultMessage));
      } else {
      }
      var eLen = $.get$length(expected);
      var aLen = $.get$length(actual);
      var left = 0;
      L0: while (true) {
        if (!true) break L0;
        if (left === eLen) {
          $.assert($.lt(left, aLen));
          var snippet = $.substring$2(actual, left, aLen);
          $._fail('' + $.stringToString(defaultMessage) + '\nDiff:\n...[  ]\n...[ ' + $.stringToString(snippet) + ' ]');
          return;
        } else {
        }
        if (left === aLen) {
          $.assert($.lt(left, eLen));
          var snippet0 = $.substring$2(expected, left, eLen);
          $._fail('' + $.stringToString(defaultMessage) + '\nDiff:\n...[  ]\n...[ ' + $.stringToString(snippet0) + ' ]');
          return;
        } else {
        }
        if (!$.eqB($.index(expected, left), $.index(actual, left))) {
          break;
        } else {
        }
        var left0 = left + 1;
        left = left0;
      }
      var right = 0;
      L1: while (true) {
        if (!true) break L1;
        if (right === eLen) {
          $.assert($.lt(right, aLen));
          var snippet1 = $.substring$2(actual, 0, $.sub(aLen, right));
          $._fail('' + $.stringToString(defaultMessage) + '\nDiff:\n[  ]...\n[ ' + $.stringToString(snippet1) + ' ]...');
          return;
        } else {
        }
        if (right === aLen) {
          $.assert($.lt(right, eLen));
          var snippet2 = $.substring$2(expected, 0, $.sub(eLen, right));
          $._fail('' + $.stringToString(defaultMessage) + '\nDiff:\n[  ]...\n[ ' + $.stringToString(snippet2) + ' ]...');
          return;
        } else {
        }
        var t4 = $.leB($.sub(eLen, right), left);
        if (!t4) {
          var t5 = $.leB($.sub(aLen, right), left);
        } else {
          t5 = t4;
        }
        if (t5) {
          break;
        } else {
        }
        if (!$.eqB($.index(expected, $.sub($.sub(eLen, right), 1)), $.index(actual, $.sub($.sub(aLen, right), 1)))) {
          break;
        } else {
        }
        var right0 = right + 1;
        right = right0;
      }
      var eSnippet = $.substring$2(expected, left, $.sub(eLen, right));
      var aSnippet = $.substring$2(actual, left, $.sub(aLen, right));
      var diff = '\nDiff:\n...[ ' + $.stringToString(eSnippet) + ' ]...\n...[ ' + $.stringToString(aSnippet) + ' ]...';
      $._fail('' + $.stringToString(defaultMessage) + $.stringToString(diff));
  }
};

$.allMatchesInStringUnchecked$bailout = function(needle, haystack, state, env0, env1, env2) {
  switch (state) {
    case 1:
      length$ = env0;
      result = env1;
      patternLength = env2;
      break;
  }
  switch (state) {
    case 0:
      var result = $.List((void 0));
      $.setRuntimeTypeInfo(result, ({E: 'Match'}));
      var length$ = $.get$length(haystack);
      var patternLength = $.get$length(needle);
    case 1:
      state = 0;
      var startIndex = 0;
      L0: while (true) {
        if (!true) break L0;
        var position = $.indexOf$2(haystack, needle, startIndex);
        if ($.eqB(position, -1)) {
          break;
        } else {
        }
        result.push($.StringMatch$3(position, haystack, needle));
        var endIndex = $.add(position, patternLength);
        if ($.eqB(endIndex, length$)) {
          break;
        } else {
          if ($.eqB(position, endIndex)) {
            var startIndex0 = $.add(startIndex, 1);
          } else {
            startIndex0 = endIndex;
          }
        }
        startIndex = startIndex0;
      }
      return result;
  }
};

$.getRange2$bailout = function(a, start, length$, accumulator, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      if ($.ltB(length$, 0)) {
        throw $.captureStackTrace($.IllegalArgumentException$1('length'));
      } else {
      }
      if ($.ltB(start, 0)) {
        throw $.captureStackTrace($.IndexOutOfRangeException$1(start));
      } else {
      }
      var end = $.add(start, length$);
      if ($.gtB(end, $.get$length(a))) {
        throw $.captureStackTrace($.IndexOutOfRangeException$1(end));
      } else {
      }
      var i = start;
      L0: while (true) {
        if (!$.ltB(i, end)) break L0;
        $.add$1(accumulator, $.index(a, i));
        i = $.add(i, 1);
      }
      return accumulator;
  }
};

$.indexOf2$bailout = function(a, element, startIndex, endIndex, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      } else {
      }
      if ($.ltB(startIndex, 0)) {
        var i = 0;
      } else {
        i = startIndex;
      }
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        } else {
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.indexOf$bailout = function(a, element, startIndex, endIndex, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      if ($.geB(startIndex, $.get$length(a))) {
        return -1;
      } else {
      }
      if ($.ltB(startIndex, 0)) {
        var i = 0;
      } else {
        i = startIndex;
      }
      L0: while (true) {
        if (!$.ltB(i, endIndex)) break L0;
        if ($.eqB($.index(a, i), element)) {
          return i;
        } else {
        }
        i = $.add(i, 1);
      }
      return -1;
  }
};

$.join2$bailout = function(strings, separator, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      $.checkNull(strings);
      $.checkNull(separator);
      var t1 = $.iterator(strings);
      var result = '';
      var first = true;
      L0: while (true) {
        if (!(t1.hasNext$0() === true)) break L0;
        var t2 = t1.next$0();
        $.checkNull(t2);
        if (!(typeof t2 === 'string')) {
          throw $.captureStackTrace($.IllegalArgumentException$1(t2));
        } else {
        }
        if (!first) {
          var result0 = $.add(result, separator);
        } else {
          result0 = result;
        }
        var result1 = result0 + t2;
        var first0 = false;
        var result2 = result1;
        result = result2;
        first = first0;
      }
      return result;
  }
};

$.buildDynamicMetadata$bailout = function(inputTable, state, env0, env1, env2, env3, env4, env5, env6) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      result = env0;
      t0 = env1;
      tag = env2;
      i = env3;
      tags = env4;
      set = env5;
      tagNames = env6;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var result = [];
      var i = 0;
    case 2:
      L0: while (true) {
        switch (state) {
          case 0:
            if (!$.ltB(i, $.get$length(inputTable))) break L0;
            var tag = $.index($.index(inputTable, i), 0);
            var tags = $.index($.index(inputTable, i), 1);
            var set = $.HashSetImplementation$0();
            $.setRuntimeTypeInfo(set, ({E: 'String'}));
            var tagNames = $.split(tags, '|');
          case 2:
            state = 0;
            var j = 0;
            L1: while (true) {
              if (!$.ltB(j, $.get$length(tagNames))) break L1;
              set.add$1($.index(tagNames, j));
              j = j + 1;
            }
            $.add$1(result, $.MetaInfo$3(tag, tags, set));
            i = i + 1;
        }
      }
      return result;
  }
};

$.wait$bailout = function(futures, state, env0) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
      var t1 = ({});
      if ($.isEmpty(futures) === true) {
        var t2 = $.FutureImpl$immediate($.CTC);
        $.setRuntimeTypeInfo(t2, ({T: 'List'}));
        return t2;
      } else {
      }
      var completer = $.CompleterImpl$0();
      $.setRuntimeTypeInfo(completer, ({T: 'List'}));
      t1.completer_3 = completer;
      t1.result_4 = t1.completer_3.get$future();
      t1.remaining_5 = $.get$length(futures);
      t1.values_6 = $.List($.get$length(futures));
      var i = 0;
      L0: while (true) {
        if (!$.ltB(i, $.get$length(futures))) break L0;
        var t3 = ({});
        t3.pos_1 = i;
        var future = $.index(futures, t3.pos_1);
        future.then$1(new $.Closure19(t3, t1));
        future.handleException$1(new $.Closure20(t1));
        i = i + 1;
      }
      return t1.result_4;
  }
};

$.mapEquals$bailout = function(expected, actual, reason, state, env0, env1) {
  switch (state) {
    case 1:
      t0 = env0;
      break;
    case 2:
      t0 = env0;
      t1 = env1;
      break;
  }
  switch (state) {
    case 0:
    case 1:
      state = 0;
    case 2:
      state = 0;
      var msg = $._getMessage(reason);
      var t2 = $.iterator(expected.getKeys$0());
      L0: while (true) {
        if (!(t2.hasNext$0() === true)) break L0;
        var t3 = t2.next$0();
        if (actual.containsKey$1(t3) !== true) {
          $._fail('Expect.mapEquals(missing expected key: <' + $.stringToString(t3) + '>' + $.stringToString(msg) + ') fails');
        } else {
        }
        $.equals($.index(expected, t3), $.index(actual, t3), (void 0));
      }
      var t4 = $.iterator(actual.getKeys$0());
      L1: while (true) {
        if (!(t4.hasNext$0() === true)) break L1;
        var t5 = t4.next$0();
        if (expected.containsKey$1(t5) !== true) {
          $._fail('Expect.mapEquals(unexpected key: <' + $.stringToString(t5) + '>' + $.stringToString(msg) + ') fails');
        } else {
        }
      }
  }
};

$.dynamicBind.$call$4 = $.dynamicBind;
$.keyDownHandler.$call$1 = $.keyDownHandler;
$.typeNameInIE.$call$1 = $.typeNameInIE;
$._runTests.$call$0 = $._runTests;
$.typeNameInFirefox.$call$1 = $.typeNameInFirefox;
$.constructorNameFallback.$call$1 = $.constructorNameFallback;
$._nextBatch.$call$0 = $._nextBatch;
$.invokeClosure.$call$5 = $.invokeClosure;
$.toStringWrapper.$call$0 = $.toStringWrapper;
$.keyUpHandler.$call$1 = $.keyUpHandler;
$.update.$call$1 = $.update;
$.typeNameInChrome.$call$1 = $.typeNameInChrome;
$.throwNoSuchMethod.$call$3 = $.throwNoSuchMethod;
Isolate.$finishClasses();
Isolate.makeConstantList = function(list) {
  list.immutable$list = true;
  list.fixed$length = true;
  return list;
};
$.CTC = Isolate.makeConstantList([]);
$.CTC3 = Isolate.makeConstantList([87, 83, 65, 68]);
$.CTC5 = new Isolate.$isolateProperties.UnsupportedOperationException('');
$.CTC6 = new Isolate.$isolateProperties.IllegalArgumentException('Invalid list length');
$.CTC4 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, '^#[_a-zA-Z]\\w*$');
$.CTC7 = new Isolate.$isolateProperties._DeletedKeySentinel();
$.CTC9 = new Isolate.$isolateProperties.JSSyntaxRegExp(false, false, 'Chrome|DumpRenderTree');
$.CTC10 = new Isolate.$isolateProperties.Object();
$.CTC2 = new Isolate.$isolateProperties.NoMoreElementsException();
$.CTC8 = new Isolate.$isolateProperties.EmptyQueueException();
$.startTime = (void 0);
$.DOG = 2;
$._config = (void 0);
$._currentGroup = '';
$.canvas = (void 0);
$._state = 0;
$._callbacksCalled = 0;
$._getTypeNameOf = (void 0);
$._cachedBrowserPrefix = (void 0);
$.SHEEP = 1;
$._soloTest = (void 0);
$._testRunner = (void 0);
$.herd = (void 0);
$._nextFreeId = 1;
$.lastTime = (void 0);
$._tests = (void 0);
$._currentTest = 0;
$._uncaughtErrorMessage = (void 0);
$.ctx = (void 0);
var $ = null;
Isolate.$finishClasses();
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
$.$defineNativeClass = function(cls, fields, methods) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  for (var i = 0; i < fields.length; i++) {
    generateGetterSetter(fields[i], methods);
  }
  for (var method in methods) {
    $.dynamicFunction(method)[cls] = methods[method];
  }
};
$.defineProperty(Object.prototype, 'is$Element', function() { return false; });
$.defineProperty(Object.prototype, 'is$Collection', function() { return false; });
$.defineProperty(Object.prototype, 'is$List2', function() { return false; });
$.defineProperty(Object.prototype, 'is$Map', function() { return false; });
$.defineProperty(Object.prototype, 'toString$0', function() { return $.toStringForNativeObject(this); });
$.$defineNativeClass('AbstractWorker', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._AbstractWorkerEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLAnchorElement', ["type?"], {
 toString$0: function() {
  return this.toString();
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitAnimationList', ["length?"], {
});

$.$defineNativeClass('HTMLAppletElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAreaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Attr', ["value="], {
});

$.$defineNativeClass('AudioBuffer', ["length?"], {
});

$.$defineNativeClass('AudioContext', [], {
 get$on: function() {
  return $._AudioContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLAudioElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('AudioParam', ["value="], {
});

$.$defineNativeClass('HTMLBRElement', [], {
 clear$0: function() { return this.clear.$call$0(); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLBaseFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('BatteryManager', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._BatteryManagerEventsImpl$1(this);
 }
});

$.$defineNativeClass('BiquadFilterNode', ["type?"], {
});

$.$defineNativeClass('Blob', ["type?"], {
});

$.$defineNativeClass('HTMLBodyElement', [], {
 get$on: function() {
  return $._BodyElementEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLButtonElement', ["value=", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebKitCSSMatrix', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('CSSRule', ["type?"], {
});

$.$defineNativeClass('CSSRuleList', ["length?"], {
});

$.$defineNativeClass('CSSStyleDeclaration', ["length?"], {
 get$filter: function() {
  return this.getPropertyValue$1('' + $.stringToString($._browserPrefix()) + 'filter');
 },
 filter$1: function(arg0) { return this.get$filter().$call$1(arg0); },
 get$clear: function() {
  return this.getPropertyValue$1('clear');
 },
 clear$0: function() { return this.get$clear().$call$0(); },
 getPropertyValue$1: function(propertyName) {
  return this.getPropertyValue(propertyName);
 }
});

$.$defineNativeClass('CSSValueList', ["length?"], {
});

$.$defineNativeClass('HTMLCanvasElement', [], {
 getContext$1: function(contextId) {
  return this.getContext(contextId);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('CanvasRenderingContext2D', ["strokeStyle!", "lineWidth!", "fillStyle!"], {
 stroke$0: function() {
  return this.stroke();
 },
 fill$0: function() {
  return this.fill();
 },
 closePath$0: function() {
  return this.closePath();
 },
 clearRect$4: function(x, y, width, height) {
  return this.clearRect(x,y,width,height);
 },
 beginPath$0: function() {
  return this.beginPath();
 },
 arc$6: function(x, y, radius, startAngle, endAngle, anticlockwise) {
  return this.arc(x,y,radius,startAngle,endAngle,anticlockwise);
 }
});

$.$defineNativeClass('CharacterData', ["length?"], {
});

$.$defineNativeClass('ClientRectList', ["length?"], {
});

_ConsoleImpl = (typeof console == 'undefined' ? {} : console);
$.$defineNativeClass('HTMLContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ConvolverNode', [], {
 normalize$0: function() { return this.normalize.$call$0(); }
});

$.$defineNativeClass('HTMLDListElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('DOMApplicationCache', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DOMApplicationCacheEventsImpl$1(this);
 }
});

$.$defineNativeClass('DOMException', ["message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMMimeType', ["type?", "description?"], {
});

$.$defineNativeClass('DOMMimeTypeArray', ["length?"], {
});

$.$defineNativeClass('DOMPlugin', ["length?", "description?"], {
});

$.$defineNativeClass('DOMPluginArray', ["length?"], {
});

$.$defineNativeClass('DOMSelection', ["type?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMSettableTokenList', ["value="], {
});

$.$defineNativeClass('DOMStringList', ["length?"], {
 contains$1: function(string) {
  return this.contains(string);
 },
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'String'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('DOMTokenList', ["length?"], {
 toString$0: function() {
  return this.toString();
 },
 remove$1: function(token) {
  return this.remove(token);
 },
 contains$1: function(token) {
  return this.contains(token);
 },
 add$1: function(token) {
  return this.add(token);
 }
});

$.$defineNativeClass('DataTransferItem', ["type?"], {
});

$.$defineNativeClass('DataTransferItemList', ["length?"], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(data_OR_file, type) {
  return this.add(data_OR_file,type);
 },
 add$1: function(data_OR_file) {
  return this.add(data_OR_file);
}
});

$.$defineNativeClass('DedicatedWorkerContext', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._DedicatedWorkerContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('DeprecatedPeerConnection', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._DeprecatedPeerConnectionEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLDetailsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDirectoryElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDivElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLDocument', [], {
 $dom_querySelector$1: function(selectors) {
  return this.querySelector(selectors);;
 },
 query$1: function(selectors) {
  if ($.CTC4.hasMatch$1(selectors) === true) {
    return this.$dom_getElementById$1($.substring$1(selectors, 1));
  } else {
  }
  return this.$dom_querySelector$1(selectors);
 },
 $dom_getElementById$1: function(elementId) {
  return this.getElementById(elementId);
 },
 get$on: function() {
  return $._DocumentEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('DocumentFragment', [], {
 query$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$on: function() {
  return $._ElementEventsImpl$1(this);
 },
 get$parent: function() {
  return;
 },
 get$$$dom_lastElementChild: function() {
  return $.last(this.get$elements());
 },
 get$$$dom_firstElementChild: function() {
  return this.get$elements().first$0();
 },
 get$id: function() {
  return '';
 },
 set$innerHTML: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$innerHTML')) {
    $.clear(this.get$nodes());
  var e = $.Element$tag('div');
  e.set$innerHTML(value);
  var nodes = $.List$from(e.get$nodes());
  $.addAll(this.get$nodes(), nodes);
  } else {
    return Object.prototype.set$innerHTML.call(this, value);
  }
 },
 get$elements: function() {
  if ($.eqNullB(this._elements)) {
    this._elements = $.FilteredElementList$1(this);
  } else {
  }
  return this._elements;
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('Element', ["innerHTML!", "id?"], {
 query$1: function(selectors) {
  return this.querySelector(selectors);
 },
 get$$$dom_lastElementChild: function() {
  return this.lastElementChild;;
 },
 get$$$dom_firstElementChild: function() {
  return this.firstElementChild;;
 },
 get$$$dom_children: function() {
  return this.children;;
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._ElementEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 },
 get$elements: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$elements')) {
    return $._ChildrenElementList$_wrap$1(this);
  } else {
    return Object.prototype.get$elements.call(this);
  }
 },
 set$elements: function(value) {
  if (Object.getPrototypeOf(this).hasOwnProperty('set$elements')) {
    var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
  } else {
    return Object.prototype.set$elements.call(this, value);
  }
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLEmbedElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Entry', [], {
 remove$2: function(successCallback, errorCallback) {
  return this.remove($.convertDartClosureToJS(successCallback, 0),$.convertDartClosureToJS(errorCallback, 1));
 },
 remove$1: function(successCallback) {
  successCallback = $.convertDartClosureToJS(successCallback, 0);
  errorCallback = $.convertDartClosureToJS(errorCallback, 1);
  return this.remove(successCallback);
}
});

$.$defineNativeClass('EntryArray', ["length?"], {
});

$.$defineNativeClass('EntryArraySync', ["length?"], {
});

$.$defineNativeClass('EntrySync', [], {
 remove$0: function() {
  return this.remove();
 }
});

$.$defineNativeClass('ErrorEvent', ["message?"], {
});

$.$defineNativeClass('Event', ["type?"], {
});

$.$defineNativeClass('EventException', ["message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('EventSource', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._EventSourceEventsImpl$1(this);
 }
});

$.$defineNativeClass('EventTarget', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._EventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('HTMLFieldSetElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('FileException', ["message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('FileList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'File'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('FileReader', ["result?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 error$2: function(arg0, arg1) { return this.error.$call$2(arg0, arg1); },
 get$on: function() {
  return $._FileReaderEventsImpl$1(this);
 }
});

$.$defineNativeClass('FileWriter', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 error$2: function(arg0, arg1) { return this.error.$call$2(arg0, arg1); },
 get$on: function() {
  return $._FileWriterEventsImpl$1(this);
 }
});

$.$defineNativeClass('FileWriterSync', ["length?"], {
});

$.$defineNativeClass('Float32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'num'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Float64Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'num'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFormElement', ["length?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLFrameSetElement', [], {
 get$on: function() {
  return $._FrameSetElementEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLAllCollection', ["length?"], {
});

$.$defineNativeClass('HTMLCollection', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLOptionsCollection', [], {
 remove$1: function(index) {
  return this.remove(index);
 },
 set$length: function(value) {
  this.length = value;;
 },
 get$length: function() {
  return this.length;;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLHeadElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLHeadingElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('History', ["length?"], {
});

$.$defineNativeClass('HTMLHtmlElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('IDBCursor', ["key?"], {
 update$1: function(value) {
  return this.update(value);
 }
});

$.$defineNativeClass('IDBCursorWithValue', ["value?"], {
});

$.$defineNativeClass('IDBDatabase', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBDatabaseEventsImpl$1(this);
 }
});

$.$defineNativeClass('IDBDatabaseException', ["message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('IDBObjectStore', [], {
 clear$0: function() {
  return this.clear();
 },
 add$2: function(value, key) {
  return this.add(value,key);
 },
 add$1: function(value) {
  return this.add(value);
}
});

$.$defineNativeClass('IDBRequest', ["result?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_removeEventListener$3')) {
    return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_removeEventListener$3.call(this, type, listener, useCapture);
  }
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  if (Object.getPrototypeOf(this).hasOwnProperty('$dom_addEventListener$3')) {
    return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
  } else {
    return Object.prototype.$dom_addEventListener$3.call(this, type, listener, useCapture);
  }
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._IDBRequestEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('IDBTransaction', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBTransactionEventsImpl$1(this);
 }
});

$.$defineNativeClass('IDBVersionChangeRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._IDBVersionChangeRequestEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLIFrameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLImageElement', ["y?", "x?"], {
 complete$1: function(arg0) { return this.complete.$call$1(arg0); },
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLInputElement', ["value=", "type?", "pattern?"], {
 get$on: function() {
  return $._InputElementEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('Int16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Int8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('JavaScriptAudioNode', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._JavaScriptAudioNodeEventsImpl$1(this);
 }
});

$.$defineNativeClass('JavaScriptCallFrame', ["type?"], {
});

$.$defineNativeClass('HTMLKeygenElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLIElement', ["value=", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLabelElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLegendElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLLinkElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Location', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLMapElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMarqueeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaController', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 }
});

$.$defineNativeClass('HTMLMediaElement', [], {
 error$2: function(arg0, arg1) { return this.error.$call$2(arg0, arg1); },
 get$on: function() {
  return $._MediaElementEventsImpl$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('MediaKeyEvent', ["message?"], {
});

$.$defineNativeClass('MediaList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'String'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('MediaStream', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._MediaStreamEventsImpl$1(this);
 }
});

$.$defineNativeClass('MediaStreamList', ["length?"], {
});

$.$defineNativeClass('MediaStreamTrackList', ["length?"], {
});

$.$defineNativeClass('HTMLMenuElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MessageEvent', ["ports?"], {
});

$.$defineNativeClass('MessagePort', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._MessagePortEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLMetaElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLMeterElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLModElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('MouseEvent', ["y?", "x?"], {
});

$.$defineNativeClass('MutationRecord', ["type?"], {
});

$.$defineNativeClass('NamedNodeMap', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Navigator', ["userAgent?"], {
});

$.$defineNativeClass('Node', [], {
 $dom_replaceChild$2: function(newChild, oldChild) {
  return this.replaceChild(newChild,oldChild);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_removeChild$1: function(oldChild) {
  return this.removeChild(oldChild);
 },
 contains$1: function(other) {
  return this.contains(other);
 },
 $dom_appendChild$1: function(newChild) {
  return this.appendChild(newChild);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 set$text: function(value) {
  this.textContent = value;;
 },
 get$parent: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$parent')) {
    return this.parentNode;;
  } else {
    return Object.prototype.get$parent.call(this);
  }
 },
 get$$$dom_childNodes: function() {
  return this.childNodes;;
 },
 replaceWith$1: function(otherNode) {
  try {
    var t0 = this.get$parent();
    t0.$dom_replaceChild$2(otherNode, this);
  } catch (t1) {
    $.unwrapException(t1);
  }
  return this;
 },
 remove$0: function() {
  if (!$.eqNullB(this.get$parent())) {
    this.get$parent().$dom_removeChild$1(this);
  } else {
  }
  return this;
 },
 get$nodes: function() {
  return $._ChildNodeListLazy$1(this);
 }
});

$.$defineNativeClass('NodeIterator', [], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('NodeList', ["length?"], {
 operator$index$1: function(index) {
  return this[index];;
 },
 getRange$2: function(start, rangeLength) {
  return $._NodeListWrapper$1($.getRange2(this, start, rangeLength, []));
 },
 get$first: function() {
  return this.operator$index$1(0);
 },
 first$0: function() { return this.get$first().$call$0(); },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $._NodeListWrapper$1($.filter3(this, [], f));
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 operator$indexSet$2: function(index, value) {
  this._parent.$dom_replaceChild$2(value, this.operator$index$1(index));
 },
 clear$0: function() {
  this._parent.set$text('');
 },
 removeLast$0: function() {
  var result = this.last$0();
  if (!$.eqNullB(result)) {
    this._parent.$dom_removeChild$1(result);
  } else {
  }
  return result;
 },
 addAll$1: function(collection) {
  for (var t0 = $.iterator(collection); t0.hasNext$0() === true; ) {
    var t1 = t0.next$0();
    this._parent.$dom_appendChild$1(t1);
  }
 },
 addLast$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 add$1: function(value) {
  this._parent.$dom_appendChild$1(value);
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Node'}));
  return t0;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('NodeSelector', [], {
 query$1: function(selectors) {
  return this.querySelector(selectors);
 }
});

$.$defineNativeClass('Notification', ["tag?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._NotificationEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLOListElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLObjectElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('OperationNotAllowedException', ["message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('HTMLOptGroupElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLOptionElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Oscillator', ["type?"], {
});

$.$defineNativeClass('HTMLOutputElement', ["value=", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParagraphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLParamElement', ["value=", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('PeerConnection00', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._PeerConnection00EventsImpl$1(this);
 }
});

$.$defineNativeClass('PerformanceNavigation', ["type?"], {
});

$.$defineNativeClass('WebKitPoint', ["y=", "x="], {
});

$.$defineNativeClass('PositionError', ["message?"], {
});

$.$defineNativeClass('HTMLPreElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLProgressElement', ["value="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLQuoteElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('RadioNodeList', ["value="], {
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Range', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('RangeException', ["message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SQLError', ["message?"], {
});

$.$defineNativeClass('SQLException', ["message?"], {
});

$.$defineNativeClass('SQLResultSetRowList', ["length?"], {
});

$.$defineNativeClass('SVGAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphDefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAltGlyphItemElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAngle', ["value="], {
});

$.$defineNativeClass('SVGAnimateColorElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateMotionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimateTransformElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGAnimationElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCircleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGClipPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGComponentTransferFunctionElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGCursorElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDefsElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDescElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGDocument', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElement', [], {
 get$id: function() {
  return this.id;;
 },
 set$innerHTML: function(svg) {
  var container = $.Element$tag('div');
  container.set$innerHTML('<svg version="1.1">' + $.stringToString(svg) + '</svg>');
  this.set$elements(container.get$elements().get$first().get$elements());
 },
 set$elements: function(value) {
  var elements = this.get$elements();
  $.clear(elements);
  $.addAll(elements, value);
 },
 get$elements: function() {
  return $.FilteredElementList$1(this);
 },
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGElementInstance', [], {
 get$on: function() {
  return $._SVGElementInstanceEventsImpl$1(this);
 }
});

$.$defineNativeClass('SVGElementInstanceList', ["length?"], {
});

$.$defineNativeClass('SVGEllipseElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGException', ["message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('SVGFEBlendElement', ["y?", "x?", "result?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEColorMatrixElement', ["y?", "x?", "result?", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEComponentTransferElement', ["y?", "x?", "result?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFECompositeElement', ["y?", "x?", "result?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEConvolveMatrixElement', ["y?", "x?", "result?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDiffuseLightingElement', ["y?", "x?", "result?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDisplacementMapElement', ["y?", "x?", "result?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDistantLightElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEDropShadowElement', ["y?", "x?", "result?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFloodElement', ["y?", "x?", "result?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncAElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncBElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEFuncRElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEGaussianBlurElement', ["y?", "x?", "result?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEImageElement', ["y?", "x?", "result?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeElement', ["y?", "x?", "result?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMergeNodeElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEMorphologyElement', ["y?", "x?", "result?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEOffsetElement', ["y?", "x?", "result?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFEPointLightElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpecularLightingElement', ["y?", "x?", "result?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFESpotLightElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETileElement', ["y?", "x?", "result?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFETurbulenceElement', ["y?", "x?", "result?", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFilterElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFilterPrimitiveStandardAttributes', ["y?", "x?", "result?"], {
});

$.$defineNativeClass('SVGFontElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceFormatElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceNameElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceSrcElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGFontFaceUriElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGForeignObjectElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGlyphRefElement', ["y=", "x="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGHKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGImageElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLength', ["value="], {
});

$.$defineNativeClass('SVGLengthList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGLineElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGLinearGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMarkerElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMaskElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMetadataElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGMissingGlyphElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGNumber', ["value="], {
});

$.$defineNativeClass('SVGNumberList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPathSegArcAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegArcRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoCubicSmoothRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegCurvetoQuadraticSmoothRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalAbs', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoHorizontalRel', ["x="], {
});

$.$defineNativeClass('SVGPathSegLinetoRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalAbs', ["y="], {
});

$.$defineNativeClass('SVGPathSegLinetoVerticalRel', ["y="], {
});

$.$defineNativeClass('SVGPathSegList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPathSegMovetoAbs', ["y=", "x="], {
});

$.$defineNativeClass('SVGPathSegMovetoRel', ["y=", "x="], {
});

$.$defineNativeClass('SVGPatternElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPoint', ["y=", "x="], {
});

$.$defineNativeClass('SVGPointList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGPolygonElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGPolylineElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRadialGradientElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGRect', ["y=", "x="], {
});

$.$defineNativeClass('SVGRectElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSVGElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGScriptElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSetElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStopElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGStringList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGStyleElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSwitchElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGSymbolElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTRefElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextContentElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPathElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTextPositioningElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGTransform', ["type?"], {
});

$.$defineNativeClass('SVGTransformList', [], {
 clear$0: function() {
  return this.clear();
 }
});

$.$defineNativeClass('SVGUseElement', ["y?", "x?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGVKernElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SVGViewElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLScriptElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSelectElement', ["value=", "type?", "length="], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLShadowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('ShadowRoot', ["innerHTML!"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SharedWorkerContext', [], {
 get$on: function() {
  return $._SharedWorkerContextEventsImpl$1(this);
 }
});

$.$defineNativeClass('HTMLSourceElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLSpanElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('SpeechGrammarList', ["length?"], {
});

$.$defineNativeClass('SpeechInputResultList', ["length?"], {
});

$.$defineNativeClass('SpeechRecognition', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._SpeechRecognitionEventsImpl$1(this);
 }
});

$.$defineNativeClass('SpeechRecognitionError', ["message?"], {
});

$.$defineNativeClass('SpeechRecognitionEvent', ["result?"], {
 error$2: function(arg0, arg1) { return this.error.$call$2(arg0, arg1); }
});

$.$defineNativeClass('SpeechRecognitionResult', ["length?"], {
});

$.$defineNativeClass('SpeechRecognitionResultList', ["length?"], {
});

$.$defineNativeClass('Storage', [], {
 $dom_setItem$2: function(key, data) {
  return this.setItem(key,data);
 },
 $dom_removeItem$1: function(key) {
  return this.removeItem(key);
 },
 $dom_key$1: function(index) {
  return this.key(index);
 },
 $dom_getItem$1: function(key) {
  return this.getItem(key);
 },
 $dom_clear$0: function() {
  return this.clear();
 },
 get$$$dom_length: function() {
  return this.length;;
 },
 isEmpty$0: function() {
  return $.eqNull(this.$dom_key$1(0));
 },
 get$length: function() {
  return this.get$$$dom_length();
 },
 getValues$0: function() {
  var values = [];
  this.forEach$1(new $.Closure22(values));
  return values;
 },
 getKeys$0: function() {
  var keys = [];
  this.forEach$1(new $.Closure31(keys));
  return keys;
 },
 forEach$1: function(f) {
  for (var i = 0; true; i = i + 1) {
    var key = this.$dom_key$1(i);
    if ($.eqNullB(key)) {
      return;
    } else {
    }
    f.$call$2(key, this.operator$index$1(key));
  }
 },
 clear$0: function() {
  return this.$dom_clear$0();
 },
 remove$1: function(key) {
  var value = this.operator$index$1(key);
  this.$dom_removeItem$1(key);
  return value;
 },
 operator$indexSet$2: function(key, value) {
  return this.$dom_setItem$2(key, value);
 },
 operator$index$1: function(key) {
  return this.$dom_getItem$1(key);
 },
 containsKey$1: function(key) {
  return !$.eqNullB(this.$dom_getItem$1(key));
 },
 is$Map: function() { return true; }
});

$.$defineNativeClass('StorageEvent', ["key?"], {
});

$.$defineNativeClass('HTMLStyleElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('StyleMedia', ["type?"], {
});

$.$defineNativeClass('StyleSheet', ["type?"], {
});

$.$defineNativeClass('StyleSheetList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'StyleSheet'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTableCaptionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableCellElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableColElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableRowElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTableSectionElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLTextAreaElement', ["value=", "type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TextTrack', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackEventsImpl$1(this);
 }
});

$.$defineNativeClass('TextTrackCue', ["text!", "id?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackCueEventsImpl$1(this);
 }
});

$.$defineNativeClass('TextTrackCueList', ["length?"], {
});

$.$defineNativeClass('TextTrackList', ["length?"], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._TextTrackListEventsImpl$1(this);
 }
});

$.$defineNativeClass('TimeRanges', ["length?"], {
});

$.$defineNativeClass('HTMLTitleElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TouchList', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'Touch'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot assign element of immutable List.'));
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLTrackElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('TreeWalker', [], {
 filter$1: function(arg0) { return this.filter.$call$1(arg0); }
});

$.$defineNativeClass('UIEvent', ["keyCode?"], {
});

$.$defineNativeClass('HTMLUListElement', ["type?"], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('Uint16Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint32Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8Array', ["length?"], {
 getRange$2: function(start, rangeLength) {
  return $.getRange2(this, start, rangeLength, []);
 },
 removeLast$0: function() {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot removeLast on immutable List.'));
 },
 last$0: function() {
  return this.operator$index$1($.sub($.get$length(this), 1));
 },
 indexOf$2: function(element, start) {
  return $.indexOf2(this, element, start, $.get$length(this));
 },
 isEmpty$0: function() {
  return $.eq($.get$length(this), 0);
 },
 filter$1: function(f) {
  return $.filter3(this, [], f);
 },
 map$1: function(f) {
  return $.map3(this, [], f);
 },
 forEach$1: function(f) {
  return $.forEach3(this, f);
 },
 addAll$1: function(collection) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 addLast$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 add$1: function(value) {
  throw $.captureStackTrace($.UnsupportedOperationException$1('Cannot add to immutable List.'));
 },
 iterator$0: function() {
  var t0 = $._FixedSizeListIterator$1(this);
  $.setRuntimeTypeInfo(t0, ({T: 'int'}));
  return t0;
 },
 operator$indexSet$2: function(index, value) {
  this[index] = value;
 },
 operator$index$1: function(index) {
  return this[index];;
 },
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('Uint8ClampedArray', [], {
 is$List2: function() { return true; },
 is$Collection: function() { return true; }
});

$.$defineNativeClass('HTMLUnknownElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('HTMLVideoElement', [], {
 is$Element: function() { return true; }
});

$.$defineNativeClass('WebGLActiveInfo', ["type?"], {
});

$.$defineNativeClass('WebGLRenderingContext', [], {
 lineWidth$1: function(width) {
  return this.lineWidth(width);
 }
});

$.$defineNativeClass('WebSocket', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$2: function(code, reason) {
  return this.close(code,reason);
 },
 close$0: function() {
  return this.close();
},
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WebSocketEventsImpl$1(this);
 }
});

$.$defineNativeClass('WheelEvent', ["y?", "x?"], {
});

$.$defineNativeClass('DOMWindow', ["navigator?", "length?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._WindowEventsImpl$1(this);
 },
 _ensureRequestAnimationFrame$0: function() {
     if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   var vendors = ['ms', 'moz', 'webkit', 'o'];
   for (var i = 0; i < vendors.length && !this.requestAnimationFrame; ++i) {
     this.requestAnimationFrame = this[vendors[i] + 'RequestAnimationFrame'];
     this.cancelAnimationFrame =
         this[vendors[i]+'CancelAnimationFrame'] ||
         this[vendors[i]+'CancelRequestAnimationFrame'];
   }
   if (this.requestAnimationFrame && this.cancelAnimationFrame) return;
   this.requestAnimationFrame = function(callback) {
       return window.setTimeout(callback, 16 /* 16ms ~= 60fps */);
   };
   this.cancelAnimationFrame = function(id) { clearTimeout(id); }
;
 },
 _requestAnimationFrame$1: function(callback) {
  return this.requestAnimationFrame($.convertDartClosureToJS(callback, 1));
 },
 requestAnimationFrame$1: function(callback) {
  this._ensureRequestAnimationFrame$0();
  return this._requestAnimationFrame$1(callback);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$2: function(message, messagePorts) {
  return this.postMessage(message,messagePorts);
 },
 postMessage$1: function(message) {
  return this.postMessage(message);
},
 get$on: function() {
  return $._WorkerEventsImpl$1(this);
 }
});

$.$defineNativeClass('WorkerContext', ["navigator?"], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 },
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 close$0: function() {
  return this.close();
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  if (Object.getPrototypeOf(this).hasOwnProperty('get$on')) {
    return $._WorkerContextEventsImpl$1(this);
  } else {
    return Object.prototype.get$on.call(this);
  }
 }
});

$.$defineNativeClass('WorkerLocation', [], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('WorkerNavigator', ["userAgent?"], {
});

$.$defineNativeClass('XMLHttpRequest', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestEventsImpl$1(this);
 }
});

$.$defineNativeClass('XMLHttpRequestException', ["message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('XMLHttpRequestUpload', [], {
 $dom_removeEventListener$3: function(type, listener, useCapture) {
  return this.removeEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 $dom_addEventListener$3: function(type, listener, useCapture) {
  return this.addEventListener(type,$.convertDartClosureToJS(listener, 1),useCapture);
 },
 get$on: function() {
  return $._XMLHttpRequestUploadEventsImpl$1(this);
 }
});

$.$defineNativeClass('XPathException', ["message?"], {
 toString$0: function() {
  return this.toString();
 }
});

$.$defineNativeClass('DOMWindow', [], {
 setTimeout$2: function(handler, timeout) {
  return this.setTimeout($.convertDartClosureToJS(handler, 0),timeout);
 }
});

$.$defineNativeClass('Worker', [], {
 postMessage$1: function(msg) {
  return this.postMessage(msg);;
 },
 get$id: function() {
  return this.id;;
 }
});

// 328 dynamic classes.
// 384 classes
// 33 !leaf
(function(){
  var v0/*class(_SVGTextPositioningElementImpl)*/ = 'SVGTextPositioningElement|SVGTextElement|SVGTSpanElement|SVGTRefElement|SVGAltGlyphElement';
  var v1/*class(_SVGTextContentElementImpl)*/ = [v0/*class(_SVGTextPositioningElementImpl)*/,'SVGTextContentElement|SVGTextPathElement'].join('|');
  var v2/*class(_SVGGradientElementImpl)*/ = 'SVGGradientElement|SVGRadialGradientElement|SVGLinearGradientElement';
  var v3/*class(_SVGComponentTransferFunctionElementImpl)*/ = 'SVGComponentTransferFunctionElement|SVGFEFuncRElement|SVGFEFuncGElement|SVGFEFuncBElement|SVGFEFuncAElement';
  var v4/*class(_SVGAnimationElementImpl)*/ = 'SVGAnimationElement|SVGSetElement|SVGAnimateTransformElement|SVGAnimateMotionElement|SVGAnimateElement|SVGAnimateColorElement';
  var v5/*class(_SVGElementImpl)*/ = [v1/*class(_SVGTextContentElementImpl)*/,v2/*class(_SVGGradientElementImpl)*/,v3/*class(_SVGComponentTransferFunctionElementImpl)*/,v4/*class(_SVGAnimationElementImpl)*/,'SVGElement|SVGViewElement|SVGVKernElement|SVGUseElement|SVGTitleElement|SVGSymbolElement|SVGSwitchElement|SVGStyleElement|SVGStopElement|SVGScriptElement|SVGSVGElement|SVGRectElement|SVGPolylineElement|SVGPolygonElement|SVGPatternElement|SVGPathElement|SVGMissingGlyphElement|SVGMetadataElement|SVGMaskElement|SVGMarkerElement|SVGMPathElement|SVGLineElement|SVGImageElement|SVGHKernElement|SVGGlyphRefElement|SVGGlyphElement|SVGGElement|SVGForeignObjectElement|SVGFontFaceUriElement|SVGFontFaceSrcElement|SVGFontFaceNameElement|SVGFontFaceFormatElement|SVGFontFaceElement|SVGFontElement|SVGFilterElement|SVGFETurbulenceElement|SVGFETileElement|SVGFESpotLightElement|SVGFESpecularLightingElement|SVGFEPointLightElement|SVGFEOffsetElement|SVGFEMorphologyElement|SVGFEMergeNodeElement|SVGFEMergeElement|SVGFEImageElement|SVGFEGaussianBlurElement|SVGFEFloodElement|SVGFEDropShadowElement|SVGFEDistantLightElement|SVGFEDisplacementMapElement|SVGFEDiffuseLightingElement|SVGFEConvolveMatrixElement|SVGFECompositeElement|SVGFEComponentTransferElement|SVGFEColorMatrixElement|SVGFEBlendElement|SVGEllipseElement|SVGDescElement|SVGDefsElement|SVGCursorElement|SVGClipPathElement|SVGCircleElement|SVGAltGlyphItemElement|SVGAltGlyphDefElement|SVGAElement'].join('|');
  var v6/*class(_MediaElementImpl)*/ = 'HTMLMediaElement|HTMLVideoElement|HTMLAudioElement';
  var v7/*class(_UIEventImpl)*/ = 'UIEvent|WheelEvent|TouchEvent|TextEvent|SVGZoomEvent|MouseEvent|KeyboardEvent|CompositionEvent';
  var v8/*class(_ElementImpl)*/ = [v5/*class(_SVGElementImpl)*/,v6/*class(_MediaElementImpl)*/,'Element|HTMLUnknownElement|HTMLUListElement|HTMLTrackElement|HTMLTitleElement|HTMLTextAreaElement|HTMLTableSectionElement|HTMLTableRowElement|HTMLTableElement|HTMLTableColElement|HTMLTableCellElement|HTMLTableCaptionElement|HTMLStyleElement|HTMLSpanElement|HTMLSourceElement|HTMLShadowElement|HTMLSelectElement|HTMLScriptElement|HTMLQuoteElement|HTMLProgressElement|HTMLPreElement|HTMLParamElement|HTMLParagraphElement|HTMLOutputElement|HTMLOptionElement|HTMLOptGroupElement|HTMLObjectElement|HTMLOListElement|HTMLModElement|HTMLMeterElement|HTMLMetaElement|HTMLMenuElement|HTMLMarqueeElement|HTMLMapElement|HTMLLinkElement|HTMLLegendElement|HTMLLabelElement|HTMLLIElement|HTMLKeygenElement|HTMLInputElement|HTMLImageElement|HTMLIFrameElement|HTMLHtmlElement|HTMLHeadingElement|HTMLHeadElement|HTMLHRElement|HTMLFrameSetElement|HTMLFrameElement|HTMLFormElement|HTMLFontElement|HTMLFieldSetElement|HTMLEmbedElement|HTMLDivElement|HTMLDirectoryElement|HTMLDetailsElement|HTMLDListElement|HTMLContentElement|HTMLCanvasElement|HTMLButtonElement|HTMLBodyElement|HTMLBaseFontElement|HTMLBaseElement|HTMLBRElement|HTMLAreaElement|HTMLAppletElement|HTMLAnchorElement|HTMLElement'].join('|');
  var v9/*class(_DocumentFragmentImpl)*/ = 'DocumentFragment|ShadowRoot';
  var v10/*class(_DocumentImpl)*/ = 'HTMLDocument|SVGDocument';
  var v11/*class(_CharacterDataImpl)*/ = 'CharacterData|Text|CDATASection|Comment';
  var v12/*class(_WorkerContextImpl)*/ = 'WorkerContext|SharedWorkerContext|DedicatedWorkerContext';
  var v13/*class(_NodeImpl)*/ = [v8/*class(_ElementImpl)*/,v9/*class(_DocumentFragmentImpl)*/,v10/*class(_DocumentImpl)*/,v11/*class(_CharacterDataImpl)*/,'Node|ProcessingInstruction|Notation|EntityReference|Entity|DocumentType|Attr'].join('|');
  var v14/*class(_MediaStreamImpl)*/ = 'MediaStream|LocalMediaStream';
  var v15/*class(_IDBRequestImpl)*/ = 'IDBRequest|IDBVersionChangeRequest';
  var v16/*class(_AbstractWorkerImpl)*/ = 'AbstractWorker|Worker|SharedWorker';
  var table = [
    // [dynamic-dispatch-tag, tags of classes implementing dynamic-dispatch-tag]
    ['SVGTextPositioningElement', v0/*class(_SVGTextPositioningElementImpl)*/],
    ['SVGTextContentElement', v1/*class(_SVGTextContentElementImpl)*/],
    ['StyleSheet', 'StyleSheet|CSSStyleSheet'],
    ['AbstractWorker', v16/*class(_AbstractWorkerImpl)*/],
    ['UIEvent', v7/*class(_UIEventImpl)*/],
    ['Uint8Array', 'Uint8Array|Uint8ClampedArray'],
    ['AudioParam', 'AudioParam|AudioGain'],
    ['Blob', 'Blob|File'],
    ['WorkerContext', v12/*class(_WorkerContextImpl)*/],
    ['CSSRule', 'CSSRule|WebKitCSSRegionRule|CSSUnknownRule|CSSStyleRule|CSSPageRule|CSSMediaRule|WebKitCSSKeyframesRule|WebKitCSSKeyframeRule|CSSImportRule|CSSFontFaceRule|CSSCharsetRule'],
    ['CSSValueList', 'CSSValueList|WebKitCSSFilterValue|WebKitCSSTransformValue'],
    ['CharacterData', v11/*class(_CharacterDataImpl)*/],
    ['DOMTokenList', 'DOMTokenList|DOMSettableTokenList'],
    ['HTMLDocument', v10/*class(_DocumentImpl)*/],
    ['DocumentFragment', v9/*class(_DocumentFragmentImpl)*/],
    ['SVGGradientElement', v2/*class(_SVGGradientElementImpl)*/],
    ['SVGComponentTransferFunctionElement', v3/*class(_SVGComponentTransferFunctionElementImpl)*/],
    ['SVGAnimationElement', v4/*class(_SVGAnimationElementImpl)*/],
    ['SVGElement', v5/*class(_SVGElementImpl)*/],
    ['HTMLMediaElement', v6/*class(_MediaElementImpl)*/],
    ['Element', v8/*class(_ElementImpl)*/],
    ['Entry', 'Entry|FileEntry|DirectoryEntry'],
    ['EntrySync', 'EntrySync|FileEntrySync|DirectoryEntrySync'],
    ['Event', [v7/*class(_UIEventImpl)*/,'Event|WebGLContextEvent|WebKitTransitionEvent|TrackEvent|StorageEvent|SpeechRecognitionEvent|SpeechInputEvent|ProgressEvent|XMLHttpRequestProgressEvent|PopStateEvent|PageTransitionEvent|OverflowEvent|OfflineAudioCompletionEvent|MutationEvent|MessageEvent|MediaStreamEvent|MediaKeyEvent|IDBVersionChangeEvent|HashChangeEvent|ErrorEvent|DeviceOrientationEvent|DeviceMotionEvent|CustomEvent|CloseEvent|BeforeLoadEvent|AudioProcessingEvent|WebKitAnimationEvent'].join('|')],
    ['Node', v13/*class(_NodeImpl)*/],
    ['MediaStream', v14/*class(_MediaStreamImpl)*/],
    ['IDBRequest', v15/*class(_IDBRequestImpl)*/],
    ['EventTarget', [v12/*class(_WorkerContextImpl)*/,v13/*class(_NodeImpl)*/,v14/*class(_MediaStreamImpl)*/,v15/*class(_IDBRequestImpl)*/,v16/*class(_AbstractWorkerImpl)*/,'EventTarget|XMLHttpRequestUpload|XMLHttpRequest|DOMWindow|WebSocket|TextTrackList|TextTrackCue|TextTrack|SpeechRecognition|PeerConnection00|Notification|MessagePort|MediaController|IDBTransaction|IDBDatabase|FileWriter|FileReader|EventSource|DeprecatedPeerConnection|DOMApplicationCache|BatteryManager|AudioContext'].join('|')],
    ['HTMLCollection', 'HTMLCollection|HTMLOptionsCollection'],
    ['IDBCursor', 'IDBCursor|IDBCursorWithValue'],
    ['NodeList', 'NodeList|RadioNodeList']];
$.dynamicSetMetadata(table);
})();

var $globalThis = $;
var $globalState;
var $globals;
var $isWorker;
var $supportsWorkers;
var $thisScriptUrl;
function $static_init(){};

function $initGlobals(context) {
  context.isolateStatics = new Isolate();
}
function $setGlobals(context) {
  $ = context.isolateStatics;
  $globalThis = $;
}
$.main.$call$0 = $.main
if (typeof window != 'undefined' && typeof document != 'undefined' &&
    window.addEventListener && document.readyState == 'loading') {
  window.addEventListener('DOMContentLoaded', function(e) {
    $.startRootIsolate($.main);
  });
} else {
  $.startRootIsolate($.main);
}
function init() {
  Isolate.$isolateProperties = {};
Isolate.$defineClass = function(cls, superclass, fields, prototype) {
  var generateGetterSetter = function(field, prototype) {
  var len = field.length;
  var lastChar = field[len - 1];
  var needsGetter = lastChar == '?' || lastChar == '=';
  var needsSetter = lastChar == '!' || lastChar == '=';
  if (needsGetter || needsSetter) field = field.substring(0, len - 1);
  if (needsGetter) {
    var getterString = "return this." + field + ";";
    prototype["get$" + field] = new Function(getterString);
  }
  if (needsSetter) {
    var setterString = "this." + field + " = v;";
    prototype["set$" + field] = new Function("v", setterString);
  }
  return field;
};
  var constructor;
  if (typeof fields == 'function') {
    constructor = fields;
  } else {
    var str = "function " + cls + "(";
    var body = "";
    for (var i = 0; i < fields.length; i++) {
      if (i != 0) str += ", ";
      var field = fields[i];
      field = generateGetterSetter(field, prototype);
      str += field;
      body += "this." + field + " = " + field + ";\n";
    }
    str += ") {" + body + "}\n";
    str += "return " + cls + ";";
    constructor = new Function(str)();
  }
  Isolate.$isolateProperties[cls] = constructor;
  constructor.prototype = prototype;
  if (superclass !== "") {
    Isolate.$pendingClasses[cls] = superclass;
  }
};
Isolate.$pendingClasses = {};
Isolate.$finishClasses = function() {
  var pendingClasses = Isolate.$pendingClasses;
  Isolate.$pendingClasses = {};
  var finishedClasses = {};
  function finishClass(cls) {
    if (finishedClasses[cls]) return;
    finishedClasses[cls] = true;
    var superclass = pendingClasses[cls];
    if (!superclass) return;
    finishClass(superclass);
    var constructor = Isolate.$isolateProperties[cls];
    var superConstructor = Isolate.$isolateProperties[superclass];
    var prototype = constructor.prototype;
    if (prototype.__proto__) {
      prototype.__proto__ = superConstructor.prototype;
      prototype.constructor = constructor;
    } else {
      function tmp() {};
      tmp.prototype = superConstructor.prototype;
      var newPrototype = new tmp();
      constructor.prototype = newPrototype;
      newPrototype.constructor = constructor;
      var hasOwnProperty = Object.prototype.hasOwnProperty;
      for (var member in prototype) {
        if (hasOwnProperty.call(prototype, member)) {
          newPrototype[member] = prototype[member];
        }
      }
    }
  }
  for (var cls in pendingClasses) finishClass(cls);
};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
