import express from 'express';
import authController from './controllers/authController';
import rootController from './controllers/rootController';
import teamController from './controllers/teamController';
import vendorController from './controllers/vendorController';
import cartController from './controllers/cartController';
import ordersController from './controllers/ordersController';
import plannerController from './controllers/plannerController';


const router = express.Router();

router.get("/", rootController);

router.post('/api/auth/login', authController);

router.get("/api/team", teamController);

router.get("/api/vendor", vendorController);

router.get("/api/cart", cartController);

router.get("/api/orders", ordersController);

router.get("/api/planner", plannerController);

export default router;