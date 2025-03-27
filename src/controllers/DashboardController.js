import { findUserById, getUserRole } from "../models/userModel.js";
import { findServiceRequestsByUserId } from "../models/servicerequestModel.js";
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
        const productsResult = await getAllProducts(); // Get the result object
        products = productsResult.rows; // Extract the rows array
        services = await getAllServices();
      }
      // console.log(req.session);
      // console.log(user);
      console.log("Service requests passed to view:", serviceRequests);
      console.log("Products passed to view:", products);
      console.log("Services: ", services);
      console.log("Products passed to view:", products);
      res.render("dashboard", {
        title: "Dashboard", // Pass the title to the view
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          roleId: roleId,
        }, // Pass user data to the view
        serviceRequests: serviceRequests, // Pass service requests to the view
        products: products, // Pass products to the view
        services: services, // Pass services to the view
      });
    } catch (error) {
      console.error("Error fetching user data:", error);
      res.status(500).send("Internal Server Error");
    }
  } else {
    res.redirect("/login");
  }
};
