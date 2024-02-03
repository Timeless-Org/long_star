import router from "express";
import {
  createUserController,
  getUserController,
  updateUserController,
  getWatchlistController,
  updateWatchlistController,
  updateNotificationController,
  searchUserController,
  getTopPriceUsersController,
} from "../controllers/user";

const routers = router.Router();

routers.post("/", createUserController);
routers.get("/:address", getUserController);
routers.put("/:address", updateUserController);
routers.get("/watchlists/:address", getWatchlistController);
routers.put("/watchlist", updateWatchlistController);
routers.put("/notification/:address", updateNotificationController);
routers.get("/search/:keyword", searchUserController);
routers.get("/top-price-users", getTopPriceUsersController);

export default routers;