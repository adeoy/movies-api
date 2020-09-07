const boom = require('@hapi/boom');

function scopesValidationHandler(allowedScopes) {
  return function (req, res, next) {
    if (!req.user || (req.user && !req.user.scopes)) {
      next(boom.unauthorized('Missing scopes'));
    }
    console.log('scopes', req.user.scopes);
    const hasAccess = allowedScopes
      .map(allowScope => req.user.scopes.includes(allowScope))
      .find(allowed => Boolean(allowed));

    if (hasAccess) {
      next();
    } else {
      next(boom.unauthorized('Insufficient scopes'));
    }
  }
}

module.exports = scopesValidationHandler;