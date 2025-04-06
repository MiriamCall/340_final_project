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
    // Render the dashboard view with service requests data
    res.render("dashboard", { serviceRequests });
  } catch (error) {
    console.error("Error fetching service requests:", error);
    res.render("dashboard", {
      serviceRequests: [],
      error: "Failed to load service requests",
    });
  }
};

export const getServiceRequestById = async (req, res) => {
  try {
    const serviceRequest = await findServiceRequestById(req.params.id);
    if (serviceRequest) {
      res.render("service-request-details", { serviceRequest });
    } else {
      res.redirect("/dashboard");
    }
  } catch (error) {
    console.error("Error retrieving service request:", error);
    res.redirect("/dashboard");
  }
};

export const createServiceRequest = async (req, res) => {
  try {
    // Add the user id to the request body
    req.body.user_id = req.session.userId;
    req.body.status_id = 1; // Default status ID for new requests
    req.body.technician_id = 1; // Default technician ID for new requests
    await createServiceRequestModel(req.body);

    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error creating service request:", error);
    res.redirect("/service-requests/new"); // Redirect back to form
  }
};

export const updateServiceRequest = async (req, res) => {
  try {
    const serviceRequest = await updateServiceRequestModel(
      req.params.id,
      req.body
    );
    if (serviceRequest) {
      res.redirect(`/service-requests/${req.params.id}`);
    } else {
      res.redirect("/dashboard");
    }
  } catch (error) {
    console.error("Error updating service request:", error);
    res.redirect(`/service-requests/${req.params.id}/edit`);
  }
};

export const deleteServiceRequest = async (req, res) => {
  try {
    await deleteServiceRequestModel(req.params.id);
    res.redirect("/dashboard");
  } catch (error) {
    console.error("Error deleting service request:", error);
    res.redirect(`/service-requests/${req.params.id}`);
  }
};
