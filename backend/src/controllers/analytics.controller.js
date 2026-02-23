const FeatureClick = require("../models/FeatureClick");
const User = require("../models/User");

exports.getAnalytics = async (req, res) => {
  try {
    const { startDate, endDate, age, gender, featureName } = req.query;

    let matchStage = {};

    // DATE FILTER
    if (startDate && endDate) {
      matchStage.timestamp = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    // JOIN USER DATA
    const pipeline = [
      {
        $lookup: {
          from: "users",
          localField: "userId",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" }
    ];

    // AGE FILTER
    if (age === "<18") {
      pipeline.push({ $match: { "user.age": { $lt: 18 } } });
    } else if (age === "18-40") {
      pipeline.push({
        $match: { "user.age": { $gte: 18, $lte: 40 } }
      });
    } else if (age === ">40") {
      pipeline.push({ $match: { "user.age": { $gt: 40 } } });
    }

    // GENDER FILTER
    if (gender) {
      pipeline.push({ $match: { "user.gender": gender } });
    }

    if (Object.keys(matchStage).length)
      pipeline.push({ $match: matchStage });

    // =========================
    // BAR CHART (TOTAL CLICKS)
    // =========================
    const barChart = await FeatureClick.aggregate([
      ...pipeline,
      {
        $group: {
          _id: "$featureName",
          totalClicks: { $sum: 1 }
        }
      },
      {
        $project: {
          featureName: "$_id",
          totalClicks: 1,
          _id: 0
        }
      }
    ]);

    // =========================
    // LINE CHART (TIME TREND)
    // =========================
    let lineChart = [];

    if (featureName) {
      lineChart = await FeatureClick.aggregate([
        ...pipeline,
        { $match: { featureName } },
        {
          $group: {
            _id: {
              $dateToString: {
                format: "%Y-%m-%d",
                date: "$timestamp"
              }
            },
            clicks: { $sum: 1 }
          }
        },
        { $sort: { _id: 1 } }
      ]);
    }

    res.json({
      barChart,
      lineChart
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};