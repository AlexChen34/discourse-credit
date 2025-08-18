# frozen_string_literal: true
class UpdateUserFeedbackRatingSystem < ActiveRecord::Migration[7.0]
  def up
    # Add index for daily constraint
    add_index :discourse_user_feedbacks, [:user_id, :feedback_to_id, :created_at], 
              name: 'idx_user_feedback_daily_constraint'
    
    # Add admin_modified flag
    add_column :discourse_user_feedbacks, :admin_modified, :boolean, default: false
    add_column :discourse_user_feedbacks, :admin_modified_by, :integer, null: true
    add_column :discourse_user_feedbacks, :admin_modified_at, :datetime, null: true
    
    # Update existing ratings to new system
    # Old system: 1-5 stars -> New system: -1 (negative), 0 (neutral), 1 (positive)
    execute <<~SQL
      UPDATE discourse_user_feedbacks 
      SET rating = CASE 
        WHEN rating >= 4 THEN 1   -- 4-5 stars become positive
        WHEN rating = 3 THEN 0    -- 3 stars become neutral  
        WHEN rating <= 2 THEN -1  -- 1-2 stars become negative
      END
    SQL
  end

  def down
    remove_index :discourse_user_feedbacks, name: 'idx_user_feedback_daily_constraint'
    remove_column :discourse_user_feedbacks, :admin_modified
    remove_column :discourse_user_feedbacks, :admin_modified_by
    remove_column :discourse_user_feedbacks, :admin_modified_at
  end
end
