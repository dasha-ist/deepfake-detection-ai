from functools import wraps
import jwt
from flask import request, g, current_app

def jwt_optional(f):
    """
    A decorator to optionally decode a JWT from the Authorization header.
    If the token is valid, it sets `g.is_authenticated = True`.
    If the token is missing or invalid, it sets `g.is_authenticated = False`.
    """
    @wraps(f)
    def decorated_function(*args, **kwargs):
        g.is_authenticated = False
        auth_header = request.headers.get('Authorization')
        jwt_secret = current_app.config.get('SUPABASE_JWT_SECRET')

        if auth_header and auth_header.startswith('Bearer ') and jwt_secret:
            token = auth_header.split(' ')[1]
            try:
                jwt.decode(token, jwt_secret, algorithms=['HS256'])
                g.is_authenticated = True
            except (jwt.ExpiredSignatureError, jwt.InvalidTokenError):
                # Token is invalid or expired, user remains a guest
                pass
        
        return f(*args, **kwargs)
    return decorated_function