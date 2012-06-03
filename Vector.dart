#library('vector');

class Vector2D {
  Vector2D(this._x, this._y) {
    assert(!_x.isInfinite());
    assert(!_y.isInfinite());
    assert(!_x.isNaN());
    assert(!_y.isNaN());
  }

  void zero() {
    x = y = 0;
  }

  Vector2D getNormalized() {
    var l = length;
    if (l == 0)
      return clone();
    num nx = x / l;
    num ny = y / l;
    return new Vector2D(nx, ny);
  }

  void normalize() {
    var l = length;
    if (l != 0) {
      _x /= l;
      _y /= l;
    }
  }

  static num lengthOfHypotenuse(num x, num y) {
    return Math.sqrt(x * x + y * y);
  }

  Vector2D clone() => new Vector2D(x, y);

  Vector2D operator negate() => new Vector2D(-x, -y);
  Vector2D operator +(Vector2D other) => new Vector2D(x + other.x, y + other.y);
  Vector2D operator -(Vector2D other) => new Vector2D(x - other.x, y - other.y);
  bool operator ==(Vector2D other) => (x == other.x && y == other.y);
  Vector2D operator *(num scalar) => new Vector2D(x * scalar, y * scalar);
  Vector2D operator /(num scalar) => new Vector2D(x / scalar, y / scalar);

  num _x, _y;
  num get x() => _x;
  void set x(num value) { _x = value; }
  num get y() => _y;
  void set y(num value) { _y = value; }

  num get length() => lengthOfHypotenuse(_x, _y);
}
