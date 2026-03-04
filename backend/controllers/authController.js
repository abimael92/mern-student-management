import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import User from '../models/User.js';
import RefreshToken from '../models/RefreshToken.js';
import crypto from 'crypto';

dotenv.config();

// Helper function to generate access token (short-lived)
const signToken = (user) =>
  jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_ACCESS_EXPIRE || '15m' }
  );

// Helper function to generate refresh token (long-lived)
const generateRefreshToken = async (user, ipAddress, userAgent) => {
  // Create random token
  const token = crypto.randomBytes(40).toString('hex');

  // Set expiration (7 days from now)
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  // Store in database
  const refreshToken = await RefreshToken.create({
    token,
    user: user._id,
    expiresAt,
    ipAddress,
    userAgent
  });

  return refreshToken.token;
};

// Helper function to set cookie options
const getCookieOptions = (isRefreshToken = false) => {
  const options = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  };

  if (isRefreshToken) {
    return {
      ...options,
      path: '/api/v1/auth/refresh',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    };
  }

  return {
    ...options,
    maxAge: 15 * 60 * 1000 // 15 minutes
  };
};

// Login with refresh token support
export const login = async (req, res) => {
  try {
    const { usernameOrEmail, password } = req.body;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || 'unknown';

    // Find user
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }]
    }).select('+password');

    // Check credentials
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Check if user is active
    if (user.isActive === false) {
      return res.status(401).json({ message: 'Account is deactivated' });
    }

    // Generate tokens
    const accessToken = signToken(user);
    const refreshToken = await generateRefreshToken(user, ipAddress, userAgent);

    // Update last login
    user.lastLogin = Date.now();
    await user.save({ validateBeforeSave: false });

    // Set HTTP-only cookies
    res.cookie('accessToken', accessToken, getCookieOptions(false));
    res.cookie('refreshToken', refreshToken, getCookieOptions(true));

    // Return user info (no tokens in body)
    res.json({
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
        profile: user.profile
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Login failed' });
  }
};

// Refresh token endpoint
export const refresh = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    const ipAddress = req.ip || req.connection.remoteAddress;
    const userAgent = req.get('User-Agent') || 'unknown';

    if (!refreshToken) {
      return res.status(401).json({ message: 'Refresh token required' });
    }

    // Find valid refresh token
    const tokenDoc = await RefreshToken.findOne({
      token: refreshToken,
      revokedAt: null
    }).populate('user');

    if (!tokenDoc) {
      return res.status(401).json({ message: 'Invalid refresh token' });
    }

    // Check if token is expired
    if (tokenDoc.expiresAt < new Date()) {
      await tokenDoc.deleteOne(); // Clean up expired token
      return res.status(401).json({ message: 'Refresh token expired' });
    }

    // Check if user exists and is active
    if (!tokenDoc.user) {
      await tokenDoc.deleteOne(); // Clean up orphaned token
      return res.status(401).json({ message: 'User no longer exists' });
    }

    if (tokenDoc.user.isActive === false) {
      return res.status(401).json({ message: 'Account deactivated' });
    }

    // Revoke old token
    tokenDoc.revokedAt = Date.now();
    await tokenDoc.save();

    // Generate new tokens
    const accessToken = signToken(tokenDoc.user);
    const newRefreshToken = await generateRefreshToken(tokenDoc.user, ipAddress, userAgent);

    // Update token chain
    tokenDoc.replacedByToken = newRefreshToken;
    await tokenDoc.save();

    // Set new cookies
    res.cookie('accessToken', accessToken, getCookieOptions(false));
    res.cookie('refreshToken', newRefreshToken, getCookieOptions(true));

    res.json({ message: 'Token refreshed successfully' });
  } catch (error) {
    console.error('Refresh error:', error);
    res.status(500).json({ message: 'Token refresh failed' });
  }
};

// Register
export const register = async (req, res) => {
  try {
    const { username, email, password, role, profile } = req.body;

    // Check if user exists
    const exists = await User.findOne({ $or: [{ username }, { email }] });
    if (exists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create user
    const user = await User.create({
      username,
      email,
      password,
      role,
      profile,
      isActive: true
    });

    res.status(201).json({
      id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      profile: user.profile
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Registration failed' });
  }
};

// Logout
export const logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (refreshToken) {
      // Revoke the refresh token
      await RefreshToken.findOneAndUpdate(
        { token: refreshToken },
        { revokedAt: Date.now() }
      );
    }

    // Clear cookies
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken', { path: '/api/v1/auth/refresh' });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Logout failed' });
  }
};

// Get current user
export const me = async (req, res) => {
  try {
    // req.user is set by auth middleware
    res.json({
      user: {
        id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role,
        profile: req.user.profile
      }
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({ message: 'Failed to get user info' });
  }
};

// Revoke all tokens for a user (admin only)
export const revokeAllTokens = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: 'User ID required' });
    }

    const result = await RefreshToken.updateMany(
      { user: userId, revokedAt: null },
      { revokedAt: Date.now() }
    );

    res.json({
      message: 'All sessions revoked',
      count: result.modifiedCount
    });
  } catch (error) {
    console.error('Revoke tokens error:', error);
    res.status(500).json({ message: 'Failed to revoke tokens' });
  }
};

// Get active sessions for current user
export const getMySessions = async (req, res) => {
  try {
    const sessions = await RefreshToken.find({
      user: req.user._id,
      revokedAt: null,
      expiresAt: { $gt: new Date() }
    }).select('createdAt expiresAt ipAddress userAgent');

    res.json({ sessions });
  } catch (error) {
    console.error('Get sessions error:', error);
    res.status(500).json({ message: 'Failed to get sessions' });
  }
};

// Revoke a specific session (logout from that device)
export const revokeSession = async (req, res) => {
  try {
    const { tokenId } = req.params;

    const token = await RefreshToken.findOne({
      _id: tokenId,
      user: req.user._id
    });

    if (!token) {
      return res.status(404).json({ message: 'Session not found' });
    }

    token.revokedAt = Date.now();
    await token.save();

    res.json({ message: 'Session revoked successfully' });
  } catch (error) {
    console.error('Revoke session error:', error);
    res.status(500).json({ message: 'Failed to revoke session' });
  }
};