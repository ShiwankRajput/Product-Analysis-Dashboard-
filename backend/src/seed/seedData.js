require("dotenv").config();
const mongoose = require("mongoose");
const { faker } = require("@faker-js/faker");

const connectDB = require("../config/db");
const User = require("../models/User");
const FeatureClick = require("../models/FeatureClick");
const { hashPassword } = require("../utils/hashPassword");

const FEATURES = [
  "date_filter",
  "gender_filter",
  "age_filter",
  "bar_chart_click",
  "chart_zoom"
];

const seedData = async () => {
  try {
    await connectDB();

    console.log("Deleting old data...");
    await User.deleteMany();
    await FeatureClick.deleteMany();

    
    const users = [];

    for (let i = 0; i < 10; i++) {
      const user = await User.create({
        username: faker.internet.username(),
        password: await hashPassword("123456"),
        age: faker.number.int({ min: 15, max: 60 }),
        gender: faker.helpers.arrayElement([
          "Male",
          "Female",
          "Other"
        ])
      });

      users.push(user);
    }

    console.log("Users created:", users.length);

    const clicks = [];

    for (let i = 0; i < 150; i++) {
      clicks.push({
        userId: faker.helpers.arrayElement(users)._id,
        featureName: faker.helpers.arrayElement(FEATURES),
        timestamp: faker.date.between({
          from: "2026-01-01",
          to: new Date()
        })
      });
    }

    await FeatureClick.insertMany(clicks);

    console.log("Feature clicks created:", clicks.length);
    process.exit();

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();