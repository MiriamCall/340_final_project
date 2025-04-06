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

router.get("/", isAuthenticated, authorizeTechnician, getServiceRequests);
router.get("/:id", isAuthenticated, authorizeTechnician, getServiceRequestById);
router.post("/", isAuthenticated, authorizeTechnician, createServiceRequest);
router.put("/:id", isAuthenticated, authorizeTechnician, updateServiceRequest);
router.delete(
  "/:id",
  isAuthenticated,
  authorizeTechnician,
  deleteServiceRequest
);

export default router;
