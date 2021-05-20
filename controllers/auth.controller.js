const jwt= require("jsonwebtoken");
const bcrypt= require("bcryptjs");

const config = require("../config/auth.config.js");
const db= require("../models");
const User = db.user; 
