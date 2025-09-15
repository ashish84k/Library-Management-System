const jwt = require("jsonwebtoken");

// 1️⃣ Generate JWT token
const generateToken = (user) => {
  // user object me id aur role pass karo
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" } // 1 day expiry
  );
};

// 2️⃣ Set token in cookies
const setCookies = (res, token) => {
  res.cookie("token", token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production",
    sameSite: "Strict",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
  });
};

// 3️⃣ Get token from cookies
const getCookies = (req) => {
  return req.cookies.token || null;
};

// 4️⃣ Verify JWT token
const verifyToken = (req) => {
  try {
    const token = getCookies(req);
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded; // { id, role, iat, exp }
  } catch (error) {
    return null;
  }
};

module.exports = { generateToken, setCookies, getCookies, verifyToken };
