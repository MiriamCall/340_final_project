import { Router } from "express";
import {
  getServiceRequests,
  getServiceRequestById,
  createServiceRequest,
  updateServiceRequest,
  deleteServiceRequest,
} from "../controllers/serviceRequestController.js";

const router = Router();

router.get("/", getServiceRequests);
router.get("/:id", getServiceRequestById);
router.post("/", createServiceRequest);
router.put("/:id", updateServiceRequest);
router.delete("/:id", deleteServiceRequest);

export default router;
