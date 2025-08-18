# frozen_string_literal: true
class CreateDiscourseUserFeedback < ActiveRecord::Migration[6.1]
  def change
    create_table :discourse_user_feedbacks do |t|
      t.integer :user_id, null: false
      t.integer :feedback_to_id, null: false
      t.integer :rating, null: false
      t.text :review
      t.datetime :deleted_at
      t.timestamps
    end
  end
end
