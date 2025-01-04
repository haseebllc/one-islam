// useMouseDirection

type Direction = "top" | "bottom" | "left" | "right";

const useMouseDirection = () => {
  // onenter
  const handleMouseEnterUMD = (
    e: React.MouseEvent<HTMLElement>,
    ref: HTMLElement | null
  ) => {
    if (!ref) return undefined;
    const direction = getMouseDirection(e, e.currentTarget as HTMLElement);
    setMouseDirection(ref, direction);
    setTimeout(() => {
      ref.style.transition = "transform 0.5s cubic-bezier(.53,.74,0,.89)";
      ref.style.transform = "translate(0, 0)";
    }, 0);
  };

  // onleave
  const handleMouseLeaveUMD = (
    e: React.MouseEvent<HTMLElement>,
    ref: HTMLElement | null
  ) => {
    if (!ref) return;
    const direction = getMouseDirection(e, e.currentTarget as HTMLElement);
    ref.style.transition = "transform 0.6s cubic-bezier(.53,.74,0,.89)";
    switch (direction) {
      case "top":
        ref.style.transform = "translateY(-100%)";
        break;
      case "bottom":
        ref.style.transform = "translateY(100%)";
        break;
      case "left":
        ref.style.transform = "translateX(-100%)";
        break;
      case "right":
        ref.style.transform = "translateX(100%)";
        break;
    }
  };

  // get direction
  const getMouseDirection = (
    e: React.MouseEvent<HTMLElement>,
    element: HTMLElement
  ): Direction => {
    const rect = element.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const w = rect.width;
    const h = rect.height;
    const top = globalThis.Math.abs(y);
    const bottom = globalThis.Math.abs(h - y);
    const left = globalThis.Math.abs(x);
    const right = globalThis.Math.abs(w - x);
    const min = globalThis.Math.min(top, bottom, left, right);
    if (min === top) return "top";
    if (min === bottom) return "bottom";
    if (min === left) return "left";
    if (min === right) return "right";
    throw new globalThis.Error("Invalid direction");
  };

  // set direction
  const setMouseDirection = (ref: HTMLElement, direction: Direction) => {
    ref.style.transition = "none";
    switch (direction) {
      case "top":
        ref.style.transform = "translateY(-100%)";
        break;
      case "bottom":
        ref.style.transform = "translateY(100%)";
        break;
      case "left":
        ref.style.transform = "translateX(-100%)";
        break;
      case "right":
        ref.style.transform = "translateX(100%)";
        break;
    }
  };

  return { handleMouseEnterUMD, handleMouseLeaveUMD };
};

export default useMouseDirection;
