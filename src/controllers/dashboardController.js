import { findUserById, getUserRole } from "../models/userModel.js";
import {
  findServiceRequestsByUserId,
  findServiceRequests,
} from "../models/serviceRequestModel.js";
import { getAllProducts } from "../models/productModel.js";
import { getAllServices } from "../models/serviceModel.js";

export const renderDashboard = async (req, res) => {
  if (req.session.userId) {
    try {
      const userId = req.session.userId;
      const user = await findUserById(userId);
      const roleId = await getUserRole(userId);

      if (!user) {
        return res.redirect("/login");
      }

      let serviceRequests = [];
      let products = [];
      let services = [];

      if (roleId === 3) {
        // Client
        serviceRequests = await findServiceRequestsByUserId(userId);
        products = await getAllProducts();
        services = await getAllServices();
      } else if (roleId === 2) {
        // Technician - Get all service requests for now
        serviceRequests = await findServiceRequests();
        // If you later want to filter by technician:
        // serviceRequests = await findServiceRequestsByTechnicianId(userId);
      } else if (roleId === 1) {
        // Admin - Get all service requests
        serviceRequests = await findServiceRequests(); // Assuming findServiceRequests gets all
        // You might have a different function for admin to get more details later
      }

      console.log("Service requests passed to view:", serviceRequests);
      console.log("Products passed to view:", products);
      console.log("Services: ", services);

      res.render("dashboard", {
        title: "Dashboard",
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          roleId: roleId,
        },
        serviceRequests: serviceRequests,
        products: products,
        services: services,
      });
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.redirect("/login");
  }
};
