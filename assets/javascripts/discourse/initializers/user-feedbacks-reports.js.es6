import { ajax } from "discourse/lib/ajax";

export default {
  name: "user-feedbacks-reports",

  initialize(container) {
    const siteSettings = container.lookup("site-settings:main");
    
    if (siteSettings.user_feedbacks_enabled) {
      // Register user feedback reports with Discourse
      const site = container.lookup("site:main");
      
      if (site.admin_dashboard_reports) {
        // Add user feedback reports to available reports
        site.admin_dashboard_reports.push({
          type: "user_feedbacks_total",
          title: "Total User Feedbacks",
          description: "Total number of user feedbacks given over time",
          icon: "star",
          color: "#46B8DA"
        });
        
        site.admin_dashboard_reports.push({
          type: "user_feedbacks_by_rating", 
          title: "User Feedbacks by Rating",
          description: "Breakdown of feedbacks by positive/neutral/negative ratings",
          icon: "chart-pie",
          color: "#3AB54A"
        });
        
        site.admin_dashboard_reports.push({
          type: "user_feedbacks_activity",
          title: "User Feedback Activity", 
          description: "Daily user feedback activity showing rating distribution",
          icon: "chart-line",
          color: "#F7941E"
        });
      }
    }
  }
};
