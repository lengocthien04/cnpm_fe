import { FloatingOverlay } from "@floating-ui/react";
import { Fragment } from "react";
import { motion } from "framer-motion";
import { ColorRing } from "react-loader-spinner";

export default function LoadingPage() {
  return (
    <FloatingOverlay lockScroll style={{ zIndex: 1000 }}>
      <Fragment>
        {/* Background */}
        <motion.div
          className="fixed inset-0 bg-black"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.6 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Body */}
        <motion.div
          className="fixed left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{}}
            wrapperClass="blocks-wrapper"
            colors={["#294BCC", "#294BCC", "#294BCC", "#294BCC", "#294BCC"]}
          />
        </motion.div>
      </Fragment>
    </FloatingOverlay>
  );
}
