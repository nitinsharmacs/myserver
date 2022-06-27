const random = () => {
  return Math.floor(Math.random() * 9999);
};

const login = (req, res) => {
  const { queryParams } = req;
  const email = queryParams.get('email');
  const password = queryParams.get('password');

  if (email === 'ramujha266@gmail.com' && password === 'nitin') {
    res.redirect('/');
    return;
  }

  res.status(401).json({ message: 'Authentication failed' });
};

module.exports = { login };
