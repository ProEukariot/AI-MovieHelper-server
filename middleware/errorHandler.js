const errorHandler = (err, req, res, next) => {
  return res.status(500).json({ message: "Something went wrong!", code: 500 });
};

export default errorHandler;
