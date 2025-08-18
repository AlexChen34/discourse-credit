import Route from "@ember/routing/route";
import { ajax } from "discourse/lib/ajax";

export default Route.extend({
  model() {
    return ajax("/user_feedbacks/stats.json").catch(() => {
      this.router.transitionTo("adminPlugins.show", "discourse-user-credit");
    });
  }
});
