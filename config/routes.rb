# frozen_string_literal: true

DiscourseUserFeedbacks::Engine.routes.draw do
  resources :user_feedbacks, constraints: DiscourseUserFeedbacks::UserFeedbacksConstraint.new do
    collection do
      get :stats
      # Reports integration
      get :user_feedbacks_total
      get :user_feedbacks_by_rating
      get :user_feedbacks_activity
    end
  end
end
