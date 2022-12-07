const ApiError = require('../exceptions/api-error')

module.exports = function (err, _, res, _) {
  if (err instanceof ApiError) return res.status(err.status).json(err.message)
  return res.status(500).json('Произошла непредвиденная ошибка.')
}
