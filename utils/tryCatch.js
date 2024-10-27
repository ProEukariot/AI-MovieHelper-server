const tryCatch = (controller) => async (req, res, next) => {
  try {
    return await controller(req, res);
  } catch (err) {
    return next(err);
  }
};

export default tryCatch;
