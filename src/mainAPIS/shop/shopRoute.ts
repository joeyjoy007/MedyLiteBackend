import { Router } from "express";
import { getAllShops, insertShopItem, showShopItem } from "./shopController";

const router = Router();

// router.post("/", createChemist);

router.route("/shopItem/:id").patch(insertShopItem);
router.route("/shopItem/:id").get(showShopItem);
router.get("/getAllShop",getAllShops)
router.patch("/:id");
router.delete("/:id");

export default router;
