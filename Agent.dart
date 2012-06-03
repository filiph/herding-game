#library('agent');

#import('Herd.dart');
#import('Vector.dart');

class Agent {
  Vector2D pos;
  num maxSpeed = 1.0;
  Vector2D intendedMove, currentMove;
  int type;
  String name;
  Herd herd;

  static int SHEEP = 1;
  static int DOG = 2;
  static int WOLF = 4;
  static int OTHER = 8;

  Agent() {
    intendedMove = new Vector2D(0, 0);
    currentMove = new Vector2D(0, 0);
  }

  abstract void update(int timeSinceLast);
}