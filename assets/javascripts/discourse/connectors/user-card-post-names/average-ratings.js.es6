export default {
  shouldRender(args, component) {
    if (args.user.id <= 0) {
      return false;
    }

    if (
      !component.siteSettings
        .user_feedbacks_display_average_ratings_on_user_card
    ) {
      return false;
    }

    return true;
  },
};
