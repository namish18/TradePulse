/**
 * Encryption Utilities
 * Password hashing and token generation
 */

import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const SALT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 12;

/**
 * Hash password using bcrypt
 * @param {string} password - Plain text password
 * @returns {Promise<string>} Hashed password
 */
export async function hashPassword(password) {
    return bcrypt.hash(password, SALT_ROUNDS);
}

/**
 * Compare password with hash
 * @param {string} password - Plain text password
 * @param {string} hash - Hashed password
 * @returns {Promise<boolean>} Passwords match
 */
export async function comparePassword(password, hash) {
    return bcrypt.compare(password, hash);
}

/**
 * Generate JWT token
 * @param {Object} payload - Token payload
 * @param {string} secret - JWT secret
 * @param {string} expiresIn - Expiration time
 * @returns {string} JWT token
 */
export function generateToken(payload, secret = process.env.JWT_SECRET, expiresIn = '7d') {
    return jwt.sign(payload, secret, {
        expiresIn,
        issuer: process.env.JWT_ISSUER || 'tradepulse-api',
        audience: process.env.JWT_AUDIENCE || 'tradepulse-client',
    });
}

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @param {string} secret - JWT secret
 * @returns {Object} Decoded payload
 */
export function verifyToken(token, secret = process.env.JWT_SECRET) {
    return jwt.verify(token, secret);
}

/**
 * Decode JWT token without verification
 * @param {string} token - JWT token
 * @returns {Object} Decoded payload
 */
export function decodeToken(token) {
    return jwt.decode(token);
}

export default {
    hashPassword,
    comparePassword,
    generateToken,
    verifyToken,
    decodeToken,
};
