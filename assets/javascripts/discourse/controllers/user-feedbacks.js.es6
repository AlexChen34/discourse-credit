import Controller from "@ember/controller";
import { action } from "@ember/object";
import { computed } from "@ember/object";
import { ajax } from "discourse/lib/ajax";
import { popupAjaxError } from "discourse/lib/ajax-error";
import I18n from "I18n";

export default Controller.extend({
  rating: 0, // -1, 0, 1 for negative, neutral, positive
  review: "",
  readOnly: false,
  
  placeholder: I18n.t("discourse_user_feedbacks.user_feedbacks.user_review.placeholder"),

  canGiveFeedback: computed("feedback_to_id", function() {
    return this.feedback_to_id !== this.currentUser?.id && this.currentUser?.id;
  }),

  disabled: computed("rating", function() {
    // Rating of 0 (neutral) is valid, so we check if rating is null/undefined
    return this.rating === null || this.rating === undefined;
  }),

  hasRatedToday: computed("model.feedbacks.@each.created_at", function() {
    if (!this.currentUser || !this.model?.feedbacks) return false;
    
    const today = new Date().toDateString();
    return this.model.feedbacks.some(feedback => {
      return feedback.user_id === this.currentUser.id && 
             new Date(feedback.created_at).toDateString() === today;
    });
  }),

  showRatingInterface: computed("canGiveFeedback", "hasRatedToday", "readOnly", function() {
    return this.canGiveFeedback && !this.hasRatedToday && !this.readOnly;
  }),

  ratingText: computed("rating", function() {
    switch(this.rating) {
      case 1: return I18n.t("discourse_user_feedbacks.rating.positive");
      case 0: return I18n.t("discourse_user_feedbacks.rating.neutral");
      case -1: return I18n.t("discourse_user_feedbacks.rating.negative");
      default: return "";
    }
  }),

  actions: {
    createFeedback() {
      if (this.disabled) return;
      
      this.set("readOnly", true);
      
      ajax("/user_feedbacks", {
        type: "POST",
        data: {
          rating: this.rating,
          review: this.review,
          feedback_to_id: this.feedback_to_id,
        },
      }).then((response) => {
        this.model.feedbacks.unshiftObject(response.user_feedback);
        this.set("rating", 0);
        this.set("review", "");
        this.notifyPropertyChange("hasRatedToday");
      }).catch((error) => {
        popupAjaxError(error);
      }).finally(() => {
        this.set("readOnly", false);
      });
    },

    refreshFeedbacks() {
      // Refresh the feedbacks list
      ajax("/user_feedbacks.json", {
        type: "GET",
        data: {
          feedback_to_id: this.feedback_to_id,
        },
      }).then((response) => {
        this.set("model", response);
        this.notifyPropertyChange("hasRatedToday");
      }).catch(popupAjaxError);
    }
  }
});
