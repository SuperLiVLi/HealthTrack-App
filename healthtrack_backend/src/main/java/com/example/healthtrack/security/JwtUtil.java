package com.example.healthtrack.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.auth0.jwt.interfaces.JWTVerifier;
import java.util.Date;

public class JwtUtil {

    private static final String SECRET = "muzimuzimuzimuzimuzi";
    private static final String ISSUER = "health_track_app";
    private static final long EXPIRATION_TIME = 3600_000;

    public static String generateToken(String userId) {
        return JWT.create()
                .withIssuer(ISSUER)
                .withSubject(userId)
                .withExpiresAt(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .sign(Algorithm.HMAC512(SECRET));
    }

    public static String verifyToken(String token) throws JWTVerificationException {
        JWTVerifier verifier = JWT.require(Algorithm.HMAC512(SECRET))
                .withIssuer(ISSUER)
                .build();
        DecodedJWT jwt = verifier.verify(token);
        return jwt.getSubject();
    }
}