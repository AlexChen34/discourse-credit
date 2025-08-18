export default {
  shouldRender(args, component) {
    if (args.model.id <= 0) {
      return false;
    }

    if (
      !component.siteSettings.user_feedbacks_display_average_ratings_on_profile
    ) {
      return false;
    }

    return true;
  },
};
