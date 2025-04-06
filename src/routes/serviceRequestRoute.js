import { Router } from "express";
import {
  getServiceRequests,
  getServiceRequestById,
  createServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,
} from "../controllers/serviceRequestController.js";
import {
  isAuthenticated,
  authorizeAdmin,
  authorizeTechnician,
  authorizeClient,
} from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", isAuthenticated, getServiceRequests);
router.get("/:id", isAuthenticated, getServiceRequestById);
router.post("/", isAuthenticated, createServiceRequest);
router.put("/:id", isAuthenticated, updateServiceRequest);
router.delete("/:id", isAuthenticated, deleteServiceRequest);

export default router;
