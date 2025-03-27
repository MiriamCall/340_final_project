import {
  findServiceRequests,
  findServiceRequestById,
  createServiceRequest as createServiceRequestModel,
  updateServiceRequest as updateServiceRequestModel,
  deleteServiceRequest as deleteServiceRequestModel,
} from "../models/serviceRequestModel.js";

export const getServiceRequests = async (req, res) => {
  try {
    const serviceRequests = await findServiceRequests();
    res.json(serviceRequests);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getServiceRequestById = async (req, res) => {
  try {
    const serviceRequest = await findServiceRequestById(req.params.id);
    if (serviceRequest) {
      res.json(serviceRequest);
    } else {
      res.status(404).json({ message: "Service request not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const createServiceRequest = async (req, res) => {
  try {
    const serviceRequest = await createServiceRequestModel(req.body);
    res.status(201).json(serviceRequest);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateServiceRequest = async (req, res) => {
  try {
    const serviceRequest = await updateServiceRequestModel(
      req.params.id,
      req.body
    );
    if (serviceRequest) {
      res.json(serviceRequest);
    } else {
      res.status(404).json({ message: "Service request not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteServiceRequest = async (req, res) => {
  try {
    await deleteServiceRequestModel(req.params.id);
    res.status(204).send(); // No content
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
