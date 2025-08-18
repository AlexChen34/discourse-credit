# frozen_string_literal: true

class UserFeedbackSerializer < ApplicationSerializer
  attributes :id,
             :user_id,
             :feedback_to_id,
             :review,
             :rating,
             :rating_text,
             :created_at,
             :deleted_at,
             :admin_modified,
             :admin_modified_at,
             :can_modify

  has_one :user, serializer: GroupPostUserSerializer, embed: :object
  has_one :feedback_to, serializer: GroupPostUserSerializer, embed: :object
  has_one :admin_modified_by, serializer: GroupPostUserSerializer, embed: :object

  def rating_text
    object.rating_text
  end

  def can_modify
    return false unless scope.user
    scope.user.admin? || scope.user.moderator?
  end

  def include_admin_modified_by?
    object.admin_modified?
  end
end
