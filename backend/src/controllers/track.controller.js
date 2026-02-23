const FeatureClick = require("../models/FeatureClick");

exports.trackFeature = async (req, res) => {
  try {
    const { featureName } = req.body;

    if (!featureName) {
      return res.status(400).json({
        message: "featureName is required"
      });
    }

    const click = await FeatureClick.create({
      userId: req.user,
      featureName
    });

    res.status(201).json({
      message: "Feature tracked",
      data: click
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};