import { motion } from "framer-motion";

const gradientShift = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 7,
      ease: "linear",
      repeat: Infinity,
    },
  },
};
interface AnimatedGradientTextProps {
  children: React.ReactNode;
  className?: string;
  // Tableau avec 4 couleurs
  colors: string[];
}

const MotionGradient = ({
  children,
  className,
  colors,
}: AnimatedGradientTextProps) => {
    
  const gradientString = `linear-gradient(-45deg, ${colors
    .map((color) => color)
    .join(", ")})`;

    return (
    <motion.div
      className={className}
      style={{
        background: gradientString,
        backgroundSize: "400% 400%",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
      }}
      variants={gradientShift}
      animate="animate">
      {children}
    </motion.div>
  );
};

export default MotionGradient;
