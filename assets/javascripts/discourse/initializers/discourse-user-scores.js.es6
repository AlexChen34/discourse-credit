import { withPluginApi } from "discourse/lib/plugin-api";
import I18n from "I18n";

function initializeDiscourseUserFeedbacks(api) {
  const site = api.container.lookup("site:main");
  const siteSettings = api.container.lookup("site-settings:main");

  // Use the new API for tracking post properties
  api.addTrackedPostProperties([
    "user_average_rating", 
    "user_rating_count", 
    "user_positive_count", 
    "user_neutral_count", 
    "user_negative_count"
  ]);

  // Use modern post decoration instead of deprecated widget decoration
  if (
    !site.mobileView &&
    siteSettings.user_feedbacks_display_average_ratings_beside_username_on_post
  ) {
    api.decorateCooked(($elem, helper) => {
      if (!helper || !helper.attrs) return;
      
      const positiveCount = helper.attrs.user_positive_count || 0;
      const neutralCount = helper.attrs.user_neutral_count || 0;
      const negativeCount = helper.attrs.user_negative_count || 0;
      const totalCount = positiveCount + neutralCount + negativeCount;
      
      if (helper.attrs.user_id <= 0 || totalCount === 0) {
        return;
      }

      const $posterInfo = $elem.closest('.topic-post').find('.poster-info');
      if ($posterInfo.length && !$posterInfo.find('.user-ratings-display').length) {
        const ratingsHtml = `
          <div class="user-ratings-display">
            <div class="rating-summary">
              <span class="positive">+${positiveCount}</span>
              <span class="neutral">${neutralCount}</span>
              <span class="negative">-${negativeCount}</span>
            </div>
            <span class="rating-count">
              <a href="${helper.attrs.usernameUrl}/feedbacks">
                ${I18n.t("discourse_user_feedbacks.user_feedbacks.user_ratings_count", { count: totalCount })}
              </a>
            </span>
          </div>
        `;
        $posterInfo.append(ratingsHtml);
      }
    });
  }
}

export default {
  name: "discourse-user-credit",

  initialize(container) {
    const siteSettings = container.lookup("site-settings:main");

    if (siteSettings.user_feedbacks_enabled) {
      withPluginApi("1.0.0", initializeDiscourseUserFeedbacks);
    }
  },
};
