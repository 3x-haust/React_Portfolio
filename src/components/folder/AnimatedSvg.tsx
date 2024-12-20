import { motion } from "framer-motion";

const AnimatedSvg = ({ color }: { color: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 90 90"
    width="50px"
    height="50px"
  >
    <g id="surface983695">
      <motion.path
        initial={{
          pathLength: 0,
          strokeOpacity: 1,
        }}
        animate={{
          pathLength: 1,
          strokeOpacity: 0.5,
          transition: { duration: 2 },
        }}
        whileHover={{
          fill: "rgb(0, 0, 0)",
          y: -7,
          transition: { duration: 0.5, type: "spring" },
        }}
        d="M 12 9 C 8.683594 9 6 11.683594 6 15 L 6 24 L 84 24 L 84 21 C 84 17.683594 81.316406 15 78 15 L 33.597656 15 L 31.746094 11.914062 C 30.664062 10.105469 28.710938 9 26.601562 9 Z M 9 30 C 7.34375 30 6 31.34375 6 33 L 6 69 C 6 72.316406 8.683594 75 12 75 L 78 75 C 81.316406 75 84 72.316406 84 69 L 84 33 C 84 31.34375 82.65625 30 81 30 Z M 9 30 "
        stroke="white"
        strokeWidth="2"
        fill={color}
      />
    </g>
  </svg>
);

export default AnimatedSvg;
