import Component from "@glimmer/component";
import { tracked } from "@glimmer/tracking";
import { action } from "@ember/object";
import I18n from "I18n";

export default class RatingInput extends Component {
  get value() {
    return this.args.value !== undefined ? this.args.value : 0;
  }

  get readOnly() {
    return this.args.readOnly || false;
  }

  @action
  changeRating(value) {
    console.log('RatingInput changeRating called with:', value, 'current value:', this.value, 'readOnly:', this.readOnly);
    
    if (this.readOnly) {
      console.log('Rating input is read-only, ignoring click');
      return;
    }
    
    // Prevent duplicate selections - only trigger onChange if value actually changes
    if (this.value === value) {
      console.log('Rating already set to', value, '- ignoring duplicate selection');
      return;
    }
    
    console.log('Calling onChange callback with value:', value);
    console.log('Current isPositive:', this.isPositive, 'isNeutral:', this.isNeutral, 'isNegative:', this.isNegative);
    
    if (this.args.onChange && typeof this.args.onChange === 'function') {
      this.args.onChange(value);
    } else {
      console.warn('No onChange callback provided or not a function');
    }
  }

  get isPositive() {
    const result = this.value === 1;
    console.log('isPositive called, value:', this.value, 'result:', result);
    return result;
  }

  get isNeutral() {
    const result = this.value === 0;
    console.log('isNeutral called, value:', this.value, 'result:', result);
    return result;
  }

  get isNegative() {
    const result = this.value === -1;
    console.log('isNegative called, value:', this.value, 'result:', result);
    return result;
  }

  get ratingText() {
    switch(this.value) {
      case 1: return I18n.t("discourse_user_feedbacks.rating.positive");
      case 0: return I18n.t("discourse_user_feedbacks.rating.neutral");
      case -1: return I18n.t("discourse_user_feedbacks.rating.negative");
      default: return "Not rated";
    }
  }
}
