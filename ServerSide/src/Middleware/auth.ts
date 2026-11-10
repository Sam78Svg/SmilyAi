import jwt, {
    JsonWebTokenError,
    type JwtPayload,
} from "jsonwebtoken";
import type { RequestHandler, Response } from "express";

export type AuthenticatedClaims = JwtPayload & {
    sub: string;
};

declare global {
    namespace Express {
        interface Request {
            auth?: AuthenticatedClaims;
        }
    }
}

function isAuthenticatedClaims(
    payload: string | JwtPayload,
): payload is AuthenticatedClaims {
    return (
        typeof payload === "object" &&
        payload !== null &&
        typeof payload.sub === "string" &&
        payload.sub.trim().length > 0
    );
}

function rejectUnauthorized(res: Response, invalidToken = false) {
    const challenge = invalidToken
        ? 'Bearer realm="api", error="invalid_token"'
        : 'Bearer realm="api"';

    res.setHeader("WWW-Authenticate", challenge);
    return res.status(401).json({ error: "Authentication required." });
}

export const authenticateToken: RequestHandler = (req, res, next) => {
    const secret = process.env.JWT_SECRET;
    if (!secret) {
        console.error("[auth] JWT_SECRET is not configured.");
        res.status(503).json({ error: "Authentication is not configured." });
        return;
    }

    const authorization = req.get("authorization");
    const tokenMatch = authorization?.match(/^Bearer\s+(\S+)$/i);
    if (!tokenMatch) {
        rejectUnauthorized(res);
        return;
    }

    try {
        const payload = jwt.verify(tokenMatch[1], secret, {
            algorithms: ["HS256"],
        });

        if (!isAuthenticatedClaims(payload)) {
            rejectUnauthorized(res, true);
            return;
        }

        req.auth = payload;
        next();
    } catch (error) {
        if (error instanceof JsonWebTokenError) {
            rejectUnauthorized(res, true);
            return;
        }

        next(error);
    }
};