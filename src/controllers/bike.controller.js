import Bike from "../models/bike.model.js";
import {
  updateLocationSchema,
  updateServerUrlSchema,
} from "../validations/bike.validation.js";

const getAllBikes = async (req, res) => {
  const page = parseInt(req.query.page) || 1;

  try {
    const bikes = await Bike.find()
      .skip((page - 1) * 20)
      .limit(20);

    const pages = Math.ceil((await Bike.countDocuments()) / 20);

    if (bikes.length === 0) {
      return res.status(404).json({ error: "end of content" });
    }

    res.status(200).json({
      page: page,
      total_pages: pages,
      count: bikes.length,
      bikes: bikes,
    });
  } catch (error) {
    res.status(500).json({ error: `Failed to get bikes: ${error.message}` });
  }
};

const getBikeById = async (req, res) => {
  const id = req.query.id;

  if (!id) {
    return res.status(400).json({ error: "id not provided or malformed" });
  }

  try {
    const bike = await Bike.findById(id);

    if (!bike) {
      return res.status(404).json({ error: "bike not found" });
    }

    res.status(200).json({ bike });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateServerUrl = async (req, res) => {
  try {
    const data = updateServerUrlSchema.safeParse(req.body);
    if (!data.success) {
      return res.status(400).json({ error: data.error });
    }

    const bike = await Bike.findByIdAndUpdate(data.data.bikeId, {
      serverUrl: data.data.serverUrl,
    });

    if (!bike) {
      return res.status(404).json({ error: "bike not found" });
    }

    return res.status(200).json({ message: "serverUrl updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateLocation = async (req, res) => {
  try {
    const data = updateLocationSchema.safeParse(req.body);
    if (!data.success) {
      return res.status(400).json({ error: data.error });
    }

    const bike = await Bike.findByIdAndUpdate(data.data.bikeId, {
      location: { lat: data.data.latitude, lng: data.data.longitude },
    });

    if (!bike) {
      return res.status(404).json({ error: "bike not found" });
    }

    return res.status(200).json({ message: "location updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { getAllBikes, getBikeById, updateLocation, updateServerUrl };
