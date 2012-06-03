#library('dog');

#import('Vector.dart');
#import('Agent.dart');
#import('Herd.dart');

class Dog extends Agent {
  Dog([var x = 0, y = 0, herd, String name="dog", List<int> this.charCodes])
      : super() {
    if (charCodes == null) {
      // arrows: 38, 40, 37, 39
      // wsad: 87, 83, 65, 68
      charCodes = const [87, 83, 65, 68];
    }
    this.pos = new Vector2D(x, y);
    this.type = Agent.DOG;
    this.name = name;
    this.herd = herd;
    this.maxSpeed = 5.0;
  }

  bool leftPressed = false, rightPressed = false,
       upPressed = false, downPressed = false;

  void keyDown(int charCode) {
    switch (charCode) {
      case charCodes[0]: {
        upPressed = true;
        break;
      }
      case charCodes[1]: {
        downPressed = true;
        break;
      }
      case charCodes[2]: {
        leftPressed = true;
        break;
      }
      case charCodes[3]: {
        rightPressed = true;
        break;
      }
    }
  }

  void keyUp(int charCode) {
    switch (charCode) {
      case charCodes[0]: {
        upPressed = false;
        break;
      }
      case charCodes[1]: {
        downPressed = false;
        break;
      }
      case charCodes[2]: {
        leftPressed = false;
        break;
      }
      case charCodes[3]: {
        rightPressed = false;
        break;
      }
    }
  }

  void update(int timeSinceLast) {
    intendedMove.zero();

    if (upPressed)
      intendedMove.y -= 1;
    if (downPressed)
      intendedMove.y += 1;
    if (leftPressed)
      intendedMove.x -= 1;
    if (rightPressed)
      intendedMove.x += 1;

    intendedMove.normalize();

    currentMove = intendedMove * 2 / 3 + currentMove / 3;
    pos += currentMove * maxSpeed;
  }

  List<int> charCodes;

}
