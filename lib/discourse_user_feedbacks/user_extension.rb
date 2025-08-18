# frozen_string_literal: true

module DiscourseUserFeedbacks::UserExtension
  def self.prepended(base)
    base.has_many :feedbacks, class_name: 'DiscourseUserFeedbacks::UserFeedback'
  end
end
