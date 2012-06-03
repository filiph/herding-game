#import('dart:html');

#import('Vector.dart');
#import('Agent.dart');
#import('Dog.dart');
#import('Herd.dart');

#import('/Applications/dart/dart-sdk/lib/unittest/unittest.dart');

CanvasElement canvas;
CanvasRenderingContext2D ctx;
final int viewportWidth = 800;
final int viewportHeight = 600;

int startTime, lastTime;

Herd herd;

/**
 * Program entry point.
 */
void main() {
  show('Dart started. Running tests.');
  runUnitTests();
  show('Tests done.');


  canvas = document.query("#canvas");
  ctx = canvas.getContext("2d");
  startTime = lastTime = (new Date.now()).value;

  herd = new Herd(numSheep:200);
  Dog playerDog = new Dog();
  herd.allDogs.add(playerDog);
  Dog player2Dog = new Dog(charCodes: [38, 40, 37, 39]); // arrows
  herd.allDogs.add(player2Dog);

  window.on.keyDown.add(keyDownHandler);
  window.on.keyUp.add(keyUpHandler);

  window.requestAnimationFrame(update);
}

void keyDownHandler(KeyboardEvent e) {
  for (Dog dog in herd.allDogs)
    dog.keyDown(e.keyCode);
}

void keyUpHandler(KeyboardEvent e) {
  for (Dog dog in herd.allDogs)
    dog.keyUp(e.keyCode);
}


void runUnitTests() {

  test('vector length', () {
    var v = new Vector2D(1,-1);
    expect(v.length).equals(Math.SQRT2);
  });
  test('vector arithmetic', () {
    var va = new Vector2D(-1, 0);
    var vb = new Vector2D(100, 42);
    var vc = va + vb;
    var vd = vb - va;
    var ve = va * 5;
    var vf = vb / 2;
    expect(va).equals(va);
    expect(vc).equals(new Vector2D(99, 42));
    expect(vd).equals(new Vector2D(101, 42));
    expect(ve).equals(new Vector2D(-5, 0));
    expect(vf).equals(new Vector2D(50, 21));
  });
  test('vector normalized', () {
    var v = new Vector2D(3,6);
    var vn = v.getNormalized();
    var vn2 = new Vector2D(-1,1); vn2.normalize();
    expect(vn.length).approxEquals(1.0);
    expect(vn.x * 2).approxEquals(vn.y);
    expect(vn2.length).approxEquals(1.0);
    expect(vn2.x < 0).isTrue();
  });

}

int pos = 0;

/**
  * The main update loop.
  */
bool update(int curTime) {
  int timePassed = curTime - startTime;
  int timeSinceLast = curTime - lastTime;
  lastTime = curTime;

  ctx.clearRect(0, 0, viewportWidth, viewportHeight);
  //show((1/timeSinceLast*1000).toInt().toString());

  // calculate positions and movements
  herd.update(timeSinceLast);

  // display current state
  for (var agent in herd)
    drawAgent(agent);

  window.requestAnimationFrame(update);
  return true;
}

void drawAgent(Agent agent) {
  drawPoint(agent.pos.x, agent.pos.y); // TODO: draw according to type of agent
}

// Draw a small circle representing an agent centered at (x,y).
void drawPoint(num x, num y) {
  final String COLOR = "gray";
  final int POINT_RADIUS = 2;
  final TAU = Math.PI * 2;

  ctx.beginPath();
  ctx.lineWidth = 2;
  ctx.fillStyle = COLOR;
  ctx.strokeStyle = COLOR;
  ctx.arc(x, y, POINT_RADIUS, 0, TAU, false);
  ctx.fill();
  ctx.closePath();
  ctx.stroke();
}

void show(String message) {
  document.query('#status').innerHTML = message;
}
