import { AnimationControls } from "framer-motion";

export const toggleInView = (inView:boolean, controls: AnimationControls) => {
    if (inView) {
        controls.start('visible');
      }
      if (!inView) {
        controls.start('hidden');
      }
}