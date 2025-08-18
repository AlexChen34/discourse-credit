# frozen_string_literal: true

module DiscourseUserFeedbacks
  class UserFeedback < ActiveRecord::Base
    self.table_name = 'discourse_user_feedbacks'

    belongs_to :user
    belongs_to :feedback_to, class_name: 'User'
    belongs_to :admin_modified_by, class_name: 'User', optional: true, foreign_key: 'admin_modified_by'

    default_scope { where(deleted_at: nil) }

    # Rating values: -1 (negative), 0 (neutral), 1 (positive)
    validates :rating, inclusion: { in: [-1, 0, 1] }
    validates :user_id, presence: true
    validates :feedback_to_id, presence: true
    
    # Prevent users from rating themselves
    validate :cannot_rate_self
    
    # One rating per user per day constraint
    validate :one_rating_per_day, on: :create
    
    scope :positive, -> { where(rating: 1) }
    scope :neutral, -> { where(rating: 0) }
    scope :negative, -> { where(rating: -1) }
    scope :today, -> { where(created_at: Date.current.beginning_of_day..Date.current.end_of_day) }
    scope :this_week, -> { where(created_at: Date.current.beginning_of_week..Date.current.end_of_week) }

    def rating_text
      case rating
      when 1
        'positive'
      when 0
        'neutral'
      when -1
        'negative'
      end
    end

    def can_be_modified_by?(user)
      return false unless user
      user.admin? || user.moderator?
    end

    private

    def cannot_rate_self
      if user_id == feedback_to_id
        errors.add(:feedback_to_id, "cannot rate yourself")
      end
    end

    def one_rating_per_day
      return unless user_id && feedback_to_id
      
      existing_rating = UserFeedback.where(
        user_id: user_id,
        feedback_to_id: feedback_to_id,
        created_at: Date.current.beginning_of_day..Date.current.end_of_day
      ).exists?
      
      if existing_rating
        errors.add(:base, "You can only rate a user once per day")
      end
    end
  end
end
