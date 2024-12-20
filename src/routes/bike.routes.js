import { Router } from "express";
import {
  getAllBikes,
  getBikeById,
  updateLocation,
  updateServerUrl,
} from "../controllers/bike.controller.js";

const bikeRouter = Router();

// ${base_url}/bike?page=page_number_here
bikeRouter.get("/", getAllBikes);

// ${base_url}/bike/one?id=bike_id_here
bikeRouter.get("/one", getBikeById);

bikeRouter.post("/update", updateServerUrl);
bikeRouter.post("/update-location", updateLocation);

export { bikeRouter };
