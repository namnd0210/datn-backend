const admin = (req, res, next) => {
  if (![0, 1].includes(req.user.role)) return res.json({ err: 'Your are not allowed !!!' });
  next();
};

export default admin;
