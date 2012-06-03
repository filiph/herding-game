#library('sheep');

#import('Vector.dart');
#import('Agent.dart');
#import('Herd.dart');


class Sheep extends Agent {

  Sheep([var x = 0, y = 0, herd, String name="unnamed"]) : super() {
    this.pos = new Vector2D(x, y);
    this.type = Agent.SHEEP;
    this.name = name;
    this.herd = herd;
    this.maxSpeed = 2.0;
  }

  void update(int timeSinceLast) {
    final num PRIORITY_HIGH = 10.0;
    final num PRIORITY_MEDIUM = 5.0;
    final num PRIORITY_LOW = 2.0;

    // TODO: change to int vx,vy because of garbage collection?
    //intendedMove.zero();
    num ix = 0; num iy = 0;

    final int quadrantSize = 30;
    int quadrantX = pos.x.toInt() ~/ quadrantSize;
    int quadrantY = pos.y.toInt() ~/ quadrantSize;

    for (Agent other in herd) {
      if (other == this)
        continue;

      int otherQuadrantX = other.pos.x.toInt() ~/ quadrantSize;
      int otherQuadrantY = other.pos.y.toInt() ~/ quadrantSize;

      if (type == Agent.SHEEP && other.type == Agent.SHEEP &&
          (
          (quadrantX - otherQuadrantX).abs() > 1
          ||
          (quadrantY - otherQuadrantY).abs() > 1
          )) {
        continue;
      }

      if (type == Agent.SHEEP && other.type == Agent.DOG &&
          (
          (quadrantX - otherQuadrantX).abs() > 5
          ||
          (quadrantY - otherQuadrantY).abs() > 5
          )) {
        continue;
      }

      //Vector2D vec = other.pos - pos;
      num vx = other.pos.x - pos.x;
      num vy = other.pos.y - pos.y;
      num vl = Math.sqrt(vx * vx + vy * vy); // == vec.length;

      if (vl < 3) {
        // physics
        print("Too close, this shouldn't be physically possible.");
      }
      if (vl < 10) {
        // too close, go away
        //intendedMove += -(vec) * PRIORITY_HIGH;
        ix += -vx * PRIORITY_HIGH;
        iy += -vy * PRIORITY_HIGH;
      }

      // go towards other sheep
      if (type == Agent.SHEEP && other.type == Agent.SHEEP
          && vl < 30 && vl > 15) {
        //intendedMove += (vec / (vec.length * vec.length)) * PRIORITY_LOW;
        ix += vx / (vl * vl) * PRIORITY_LOW;
        iy += vy / (vl * vl) * PRIORITY_LOW;
      }

      if (type == Agent.SHEEP && other.type == Agent.DOG
          && vl < 100) {
        //intendedMove -= (vec / (vec.length)) * PRIORITY_MEDIUM;
        ix -= vx / vl * PRIORITY_MEDIUM;
        iy -= vy / vl * PRIORITY_MEDIUM;
      }

    }

    num il = Vector2D.lengthOfHypotenuse(ix, iy); // == intendedMove.length

    if (il > 1.0) {
      //intendedMove.normalize();
      ix /= il;
      iy /= il;
    }

    // inertia
    //currentMove = intendedMove * 2 / 3 + currentMove / 3;
    num cvx = ix * 2 / 3 + currentMove.x / 3;
    num cvy = iy * 2 / 3 + currentMove.y / 3;
    num cvl = Vector2D.lengthOfHypotenuse(cvx, cvy); // == currentMove.length

    if (cvl < maxSpeed / 4) {
      cvx = 0; cvy = 0;
    }

    // pos += currentMove * maxSpeed;
    pos.x += cvx * maxSpeed;
    pos.y += cvy * maxSpeed;

    currentMove.x = cvx;
    currentMove.y = cvy;

  }

}
