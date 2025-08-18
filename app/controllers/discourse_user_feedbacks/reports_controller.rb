class DiscourseUserFeedbacks::ReportsController < Admin::AdminController
  def user_feedbacks_total
    report = Report.new('user_feedbacks_total')
    report.icon = 'star'
    report.start_date = params[:start_date] || 30.days.ago
    report.end_date = params[:end_date] || Time.zone.now
    
    data = []
    current_date = report.start_date.beginning_of_day
    
    while current_date <= report.end_date
      next_date = current_date + 1.day
      count = UserFeedback.where(created_at: current_date...next_date).count
      
      data << {
        x: current_date.strftime('%Y-%m-%d'),
        y: count
      }
      
      current_date = next_date
    end
    
    report.data = data
    report.total = UserFeedback.where(created_at: report.start_date..report.end_date).count
    report.prev_period = UserFeedback.where(
      created_at: (report.start_date - (report.end_date - report.start_date))..report.start_date
    ).count
    
    render json: { report: report }
  end

  def user_feedbacks_by_rating
    report = Report.new('user_feedbacks_by_rating')
    report.icon = 'chart-pie'
    report.start_date = params[:start_date] || 30.days.ago
    report.end_date = params[:end_date] || Time.zone.now
    
    feedbacks_in_period = UserFeedback.where(created_at: report.start_date..report.end_date)
    
    positive_count = feedbacks_in_period.where(rating: 1).count
    neutral_count = feedbacks_in_period.where(rating: 0).count
    negative_count = feedbacks_in_period.where(rating: -1).count
    
    report.data = [
      { x: 'Positive', y: positive_count, color: '#46B54A' },
      { x: 'Neutral', y: neutral_count, color: '#F7941E' },
      { x: 'Negative', y: negative_count, color: '#D32F2F' }
    ]
    
    report.total = positive_count + neutral_count + negative_count
    
    render json: { report: report }
  end

  def user_feedbacks_activity
    report = Report.new('user_feedbacks_activity')
    report.icon = 'chart-line'
    report.start_date = params[:start_date] || 30.days.ago
    report.end_date = params[:end_date] || Time.zone.now
    
    data = []
    current_date = report.start_date.beginning_of_day
    
    while current_date <= report.end_date
      next_date = current_date + 1.day
      feedbacks_on_date = UserFeedback.where(created_at: current_date...next_date)
      
      positive_count = feedbacks_on_date.where(rating: 1).count
      neutral_count = feedbacks_on_date.where(rating: 0).count
      negative_count = feedbacks_on_date.where(rating: -1).count
      
      data << {
        x: current_date.strftime('%Y-%m-%d'),
        y: positive_count + neutral_count + negative_count,
        positive: positive_count,
        neutral: neutral_count,
        negative: negative_count
      }
      
      current_date = next_date
    end
    
    report.data = data
    report.total = UserFeedback.where(created_at: report.start_date..report.end_date).count
    
    render json: { report: report }
  end
end
