export default {
  shouldRender(args, component) {
    if (!component.currentUser) {
      return false;
    }

    if (
      args.model.id <= 0 ||
      (component.siteSettings.user_feedbacks_hide_feedbacks_from_user &&
        component.currentUser.id == args.model.id &&
        !component.currentUser.admin)
    ) {
      return false;
    }

    return true;
  },
};
