const dataValidation = (req, res, next) => {
  const { task, preference, tags } = req.body;

  if (!task || typeof(task) !== 'string') {
    console.error('backend-check-enter-valid-task');
    return res.status(400).json({ error: 'Enter a valid task!' });
  }

  if (preference && typeof preference !== 'string') {
    console.error('backend-check-enter-valid-preference');
    return res.status(400).json({ error: '"preference" must be a string' });
  }

  if (tags && !Array.isArray(tags)) {
    console.error('backend-check-tags');
    return res.status(400).json({ error: '"tags" must be an array' });
  }

  next();
};

export { dataValidation };
