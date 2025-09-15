const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { ConnectDB } = require("./DataBase/configDB");
const { AuthRouter } = require("./Routers/Auth");
const { authMiddleware } = require("./Middleware/authMiddleware");
const { BooksRouter } = require("./Routers/BooksRouter");
const { BorrowRouter } = require("./Routers/BorrowRouter");
const { UsersRouter } = require("./Routers/Users");
const { Users } = require("./Models/User");

require("dotenv").config();
ConnectDB(process.env.MONGO_URI);

const app = express();

app.use(
  cors({
    origin: "https://library-management-system-i4z1.vercel.app",
    credentials: true,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// 🔹 Public routes (no auth needed)
app.use("/api/auth", AuthRouter);

// 🔹 Protected routes (any logged-in user)
app.use("/api/borrow", BorrowRouter);

// 🔹 Admin routes
app.use("/api/books", BooksRouter);
app.use("/api/users", UsersRouter);

// 🔹 Verify token route
app.get("/api/verify", authMiddleware(), async (req, res) => {
  console.log("hiii");

  try {
    // req.user.id comes from authMiddleware
    const user = await Users.findById(req.user.id).select("name email role");
    // password automatically excluded, only required fields

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Token verified successfully",
      user, // only name, email, role
    });
  } catch (error) {
    console.error("Error verifying user:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
});

// 🔹 Root route
app.get("/", (req, res) => {
  res.send("<h1>Server is running....</h1>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server Started PORT : http://localhost:${PORT}`);
});
