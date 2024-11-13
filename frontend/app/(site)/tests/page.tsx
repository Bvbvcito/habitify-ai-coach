"use client";
import { motion } from "framer-motion";
const uiTests = () => {
  return (
    <>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ ease: "easeInOut", duration: 0.75 }}
      >
        <h1>tests</h1>
      </motion.div>
    </>
  );
};

export default uiTests;
