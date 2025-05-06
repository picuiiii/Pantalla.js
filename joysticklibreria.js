export class Joystick {
  constructor(container, callback, options = {}) {
    this.container = container;
    this.callback = callback;
    this.options = Object.assign({
      size: 100,
      strokeColor: '#999',
      fillColor: 'rgba(100,100,100,0.5)',
      limitRadius: true
    }, options);
    this._init();
  }

  _init() {
    this.joystick = document.createElement("div");
    this.stick = document.createElement("div");

    Object.assign(this.joystick.style, {
      width: this.options.size + "px",
      height: this.options.size + "px",
      background: this.options.fillColor,
      border: `2px solid ${this.options.strokeColor}`,
      borderRadius: "50%",
      position: "absolute",
      touchAction: "none",
    });

    Object.assign(this.stick.style, {
      width: "40%",
      height: "40%",
      background: "#ccc",
      borderRadius: "50%",
      position: "absolute",
      left: "30%",
      top: "30%"
    });

    this.joystick.appendChild(this.stick);
    this.container.appendChild(this.joystick);

    this._bindEvents();
  }

  _bindEvents() {
    let active = false;
    let center = { x: 0, y: 0 };

    const moveStick = (dx, dy) => {
      const r = this.options.size / 2;
      let distance = Math.sqrt(dx * dx + dy * dy);
      if (this.options.limitRadius && distance > r) {
        dx = (dx / distance) * r;
        dy = (dy / distance) * r;
        distance = r;
      }

      this.stick.style.transform = `translate(${dx}px, ${dy}px)`;
      if (this.callback) {
        this.callback({ dx, dy, distance, angle: Math.atan2(dy, dx) });
      }
    };

    this.joystick.addEventListener("touchstart", e => {
      active = true;
      const rect = this.joystick.getBoundingClientRect();
      center = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      };
    });

    this.joystick.addEventListener("touchmove", e => {
      if (!active) return;
      const touch = e.touches[0];
      const dx = touch.clientX - center.x;
      const dy = touch.clientY - center.y;
      moveStick(dx, dy);
    });

    this.joystick.addEventListener("touchend", () => {
      active = false;
      this.stick.style.transform = `translate(0px, 0px)`;
      if (this.callback) {
        this.callback({ dx: 0, dy: 0, distance: 0, angle: 0 });
      }
    });
  }

  setPosition(x, y) {
    this.joystick.style.left = x + "px";
    this.joystick.style.top = y + "px";
  }

  getElement() {
    return this.joystick;
  }
}