# frozen_string_literal: true

class DiscourseUserFeedbacks::UserFeedbacksConstraint
  def matches?(request)
    current_user = CurrentUser.lookup_from_env(request.env)

    return true if !SiteSetting.user_feedbacks_hide_feedbacks_from_user

    return false if !current_user
    return false if request.query_parameters["feedback_to_id"].to_i == current_user.id && current_user.admin == false

    true
  rescue Discourse::InvalidAccess, Discourse::ReadOnly
    false
  end
end
