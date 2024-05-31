const express = require("express");
const cors = require("cors");
require("./db/config");
const User = require("./db/User");
const app = express();
const bcrypt = require("bcrypt");
const Jwt = require("jsonwebtoken");
const jwtKey = "harsh";

app.use(express.json());
app.use(cors());

// Registration
app.post("/register", async(req, resp) => {
    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            resp.status(409).send({
                result: "User already exists"
            });

            return;
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds

        let user = new User({
            email: req.body.email,
            password: hashedPassword,
            name: req.body.name,
            gender: req.body.gender,
            role: req.body.role,
        });
        let result = await user.save();
        result = result.toObject();

        Jwt.sign({ result }, jwtKey, { expiresIn: "2h" }, (err, token) => {
            if (err) {
                resp.status(500).send({
                    result: "Something went wrong. Please try again later.",
                });
            }
            resp.send({ result, auth: token });
        });
    } catch (error) {
        resp.status(500).send("Internal Server Error");
    }
});

// login
app.post("/login", async(req, resp) => {
    try {
        if (req.body.password && req.body.email) {
            const user = await User.findOne({ email: req.body.email });
            if (user) {
                const passwordMatch = await bcrypt.compare(
                    req.body.password,
                    user.password
                );

                if (passwordMatch) {
                    const userWithoutPassword = {...user.toObject() };
                    user.count += 1;
                    user.lastLoginDate = Date.now();
                    await user.save();

                    Jwt.sign({ user: userWithoutPassword },
                        jwtKey, { expiresIn: "2h" },
                        (err, token) => {
                            if (err) {
                                resp.status(500).send({
                                    result: "Something went wrong. Please try again later.",
                                });
                            }
                            resp.send({ user: userWithoutPassword, auth: token });
                        }
                    );
                } else {
                    resp.status(401).send({ result: "Invalid password" });
                }
            } else {
                resp.status(404).send({ result: "No user found" });
            }
        } else {
            resp.status(400).send({ result: "Invalid credentials" });
        }
    } catch (error) {
        resp.status(500).send("Internal Server Error");
    }
});

// Get all users
app.get("/users", async(req, resp) => {
    try {
        const users = await User.find();
        resp.send(users);
    } catch (error) {
        resp.status(500).send("Internal Server Error");
    }
});
app.listen(5000, () => {
    console.log("Server is running on port 5000");
});