import { useState } from "react";

// Componente que usa o hook B
function MyComponent() {
  const [animationStatus, setAnimationStatus] = useState("Animation not started");

  const handleAnimationStart = () => {
    setAnimationStatus("Animation started");
  };

  const handleAnimationEnd = () => {
    setAnimationStatus("Animation ended");
  };

  return (
    <div>
      <div
        className="w-20 h-20 bg-red-500 animate-jump animate-duration-1000"
        onAnimationStart={handleAnimationStart}
        onAnimationEnd={handleAnimationEnd}
      >
        {/* Esta caixa será animada */}
      </div>
      <p>{animationStatus}</p>
    </div>
  );
}

export default MyComponent;
