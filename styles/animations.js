export const cartSlide = {
  visible: {
    opacity: 1,
    x: "0",
    transition: {
      duration: 0.2,
    },
  },
  hidden: {
    opacity: 0,
    x: "100%",
  },
  exit: {
    opacity: 0,
    x: "100%",
    transition: {
      duration: 0.2,
    },
  },
};

export const menuSlide = {
  visible: {
    x: "0",
    transition: {
      duration: 0.2,
    },
  },
  hidden: {
    x: "100%",
  },
  exit: {
    x: "100%",
    transition: {
      duration: 0.2,
    },
  },
};

export const searchFieldAppear = {
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
  hidden: {
    opacity: 1,
  },
  exit: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};
