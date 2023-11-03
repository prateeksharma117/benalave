import React, { useEffect, useRef } from "react";
import lottie from "lottie-web";
import animationData from "../../../assets/payment.json";

const LottieAnimation = ({ onAnimationComplete, width, height }) => {
  const animationContainer = useRef(null);

  useEffect(() => {
    const anim = lottie.loadAnimation({
      container: animationContainer.current,
      animationData: animationData,
      renderer: "svg",
      loop: false, // Ensure animation plays only once
      autoplay: true,
    });

    const completeCallback = () => {
      onAnimationComplete();
      anim.removeEventListener("complete", completeCallback); // Remove the event listener
    };

    anim.addEventListener("complete", completeCallback);

    // Set the width and height of the animation container
    if (width && height) {
      animationContainer.current.style.width = `${width}px`;
      animationContainer.current.style.height = `${height}px`;
    }

    return () => {
      anim.destroy();
    };
  }, [width, height]);

  const centerStyle = {
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  };

  return (
    <div ref={animationContainer} style={centerStyle} />
  );
};

export default LottieAnimation;
