#library('herd');

#import('Agent.dart');
#import('Sheep.dart');
#import('Dog.dart');

class Herd implements Iterable<Agent> {

  Herd([int numSheep=100]) {
    allSheep = new List();
    allDogs = new List();
    allWolves = new List();

    for (var i = 0; i < numSheep; i++) {
      allSheep.add(new Sheep(
        x: 100 + (i*10 % 100),
        y: 100 + (i*10 ~/ 100)*10,
        herd: this,
        name: "Sheep #$i")
      );
    }
  }

  update(int timeSinceLast) {

    // TODO: iterate, find 'other's for each one (to make it faster)
    for (var agent in this)
      agent.update(timeSinceLast);
  }

  HerdIterator iterator() => new HerdIterator(this);

  List<Sheep> allSheep;
  List<Dog> allDogs;
  List<Agent> allWolves; // TODO


}

class HerdIterator implements Iterator {
  Herd herd;
  int _pos, _sheepPos, _dogPos, _wolfPos;
  int _sheepCount, _dogCount, _wolfCount;
  int _lastIndex;

  HerdIterator(this.herd) {
    _pos = -1;
    _sheepPos = _dogPos = _wolfPos = -1;
    _sheepCount = herd.allSheep.length;
    _dogCount = herd.allDogs.length;
    _wolfCount = herd.allWolves.length;
    _lastIndex = _sheepCount + _dogCount + _wolfCount - 1;
  }

  bool hasNext() => _pos < _lastIndex;
  Agent next() {
    if (_pos++ >= _lastIndex)
      throw new NoMoreElementsException();

    if (_pos <= _sheepCount - 1) {
      _sheepPos++;
      return herd.allSheep[_sheepPos];
    } else if (_pos <= _sheepCount + _dogCount - 1) {
      _dogPos++;
      return herd.allDogs[_dogPos];
    } else if (_pos <= _sheepCount + _dogCount + _wolfCount - 1) {
      _wolfPos++;
      return herd.allWolves[_wolfPos];
    }

    throw "Something wrong with the HerdIterator arithmetic. "
          "_pos = $_pos, _lastIndex = $_lastIndex";
  }
}