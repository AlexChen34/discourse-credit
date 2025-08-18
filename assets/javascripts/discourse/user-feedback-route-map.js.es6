export default {
  resource: "user",
  path: "/u/:username",
  map() {
    this.route("feedbacks", { path: "/feedbacks" });
  },
};
