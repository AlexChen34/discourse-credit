# Discourse User Credit Plugin v1.0.0 ✅

A comprehensive user feedback and credit system for Discourse that allows community members to rate each other with positive, neutral, or negative feedback. **Created by Alex - Fully tested and working with admin functionality!**

## 🎉 Features

**✅ FULLY FUNCTIONAL ADMIN SYSTEM:**
- **Admin Edit Ratings**: Change between Positive ↔ Neutral ↔ Negative
- **Admin Edit Comments**: Modify review text with real-time updates  
- **Admin Delete Feedback**: Remove inappropriate feedback
- **Modern Ember Components**: Co-located templates, no deprecation warnings
- **Refined UI**: Subtle, Discourse-compatible button highlighting

## Features

### ✨ **Enhanced Rating System**
- **3-Option Rating**: Positive (+1), Neutral (0), or Negative (-1) feedback system
- **Smart Button Highlighting**: Subtle visual feedback with 5% scale and themed colors
- **Daily Limits**: Each user can only rate another user once per day (admins exempt)
- **Visual Display**: Ratings appear in user cards, profiles, and throughout the interface

### 👥 **User Experience** 
- **Feedback Records**: Users can view their complete feedback history (given and received)
- **Intuitive Interface**: Modern 3-button rating interface with optional text reviews
- **Real-time Updates**: Instant feedback display across all user interface components
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices

### 🔧 **Admin Controls** (✅ WORKING)
- **✅ Edit Ratings**: Admins can change any rating (Positive ↔ Neutral ↔ Negative)
- **✅ Edit Comments**: Modify review text with immediate save functionality
- **✅ Delete Feedback**: Remove inappropriate feedback with confirmation
- **✅ Admin Tracking**: Shows "Modified by admin" indicators with timestamps
- **✅ Statistics Dashboard**: Comprehensive analytics with daily/weekly breakdowns
- **✅ Bulk Operations**: Manage multiple feedback entries efficiently

### 📊 **Statistics Dashboard**
- **Overall Statistics**: Total feedbacks, positive/neutral/negative breakdowns
- **Daily & Weekly Analytics**: Detailed activity tracking with visual charts
- **User Metrics**: Unique users giving/receiving feedback tracking
- **Visual Components**: Responsive stat cards with color-coded displays
- **Export Capabilities**: Download statistics for external analysis

## Installation

1. Clone this repository to your Discourse plugins directory:
```bash
cd /path/to/discourse/plugins
git clone https://github.com/AlexChen34/discourse-credit.git
```

2. Rebuild your Discourse instance:
```bash
cd /path/to/discourse
./launcher rebuild app
```

3. Run the database migration to convert existing data (if upgrading):
```bash
cd /path/to/discourse
./launcher enter app
rails db:migrate
```

## Configuration

Visit your Discourse admin panel → Settings → Plugins → User Feedbacks to configure:

- **Enable/disable** the feedback system
- **Set daily rating limits** (default: 5 per day)
- **Configure minimum trust level** for giving feedback
- **Toggle display options** for user cards, profiles, etc.
- **Enable statistics dashboard** for admins

## Usage

### For Users
1. **Give Feedback**: Visit any user's profile or click their username
2. **Rate Users**: Choose positive, neutral, or negative with optional text review
3. **View History**: Access your feedback records through your user profile
4. **Daily Limits**: One rating per user per day to prevent spam

### For Admins
1. **Modify Ratings**: Admins can edit or delete any user feedback
2. **View Statistics**: Access comprehensive analytics at `/admin/plugins/user-feedbacks/stats`
3. **Monitor Activity**: Track daily/weekly feedback trends and user engagement

## Version History

### v1.0.0 (August 18, 2025) - ✅ INITIAL RELEASE
- **🎉 Complete user feedback system** with positive/neutral/negative ratings
- **Modern Ember Components**: Co-located component templates for reliability
- **Admin functionality**: Full edit/delete capabilities with tracking
- **Enhanced button highlighting**: Subtle, Discourse-compatible styling
- **Statistics dashboard**: Comprehensive analytics with visual charts
- **Daily rating limits**: Spam prevention with user constraints
- **Production ready**: Verified working system with modern architecture

## Technical Details

### Architecture
- **Backend**: Ruby on Rails with ActiveRecord models and comprehensive error handling
- **Frontend**: Modern Ember.js Glimmer components with co-located templates
- **Database**: PostgreSQL with proper indexing, constraints, and admin modification tracking
- **Styling**: SCSS with Discourse theme compatibility and CSS variable usage
- **Localization**: I18n support for client and server strings

### Key Components
- **Models**: `UserFeedback` with rating validation and admin tracking
- **Controllers**: `UserFeedbacksController` with CRUD operations and admin authorization
- **Components**: `rating-input`, `feedback-list-item` with edit capabilities
- **Routes**: RESTful API endpoints with proper constraints and authentication
- **Migrations**: Database schema with admin modification audit trail

### Browser Compatibility
- **Modern Browsers**: Chrome 90+, Firefox 88+, Safari 14+, Edge 90+
- **Mobile Support**: iOS Safari, Chrome Mobile, Samsung Internet
- **Responsive Design**: Optimized for all screen sizes and touch interfaces

## 🚀 Production Deployment

This plugin is **production-ready** and has been thoroughly tested with:

- ✅ **Admin functionality**: Edit/delete operations working perfectly
- ✅ **User interactions**: Rating and review system fully functional
- ✅ **Performance**: Optimized queries and efficient frontend components
- ✅ **Security**: Proper authorization and input validation
- ✅ **Modern standards**: No deprecation warnings, current Ember patterns

## Support & Contributing

### 🐛 Issues & Bug Reports
For issues, feature requests, or contributions, please visit our [GitHub repository](https://github.com/AlexChen34/discourse-credit).

### 📖 Documentation
- **Installation Guide**: See above installation steps
- **Configuration**: Available through Discourse admin panel → Settings → Plugins
- **API Documentation**: RESTful endpoints for developers
- **Component Usage**: Modern Ember.js patterns with co-located templates

### 🤝 Contributing
We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Test thoroughly (especially admin functionality)
4. Submit a pull request with detailed description

### 📝 Known Working Features (v1.0.0)
- ✅ User rating system (positive/neutral/negative)
- ✅ Admin edit ratings and comments
- ✅ Admin delete feedback
- ✅ Statistics dashboard
- ✅ Mobile responsive design
- ✅ Modern Ember components
- ✅ No deprecation warnings

## 📚 Credits

**Development Team**: Created by Alex  
**Framework**: Built on Discourse platform with Ruby on Rails and Ember.js
**Acknowledgement**: Ahmed_Gagan

---

**⭐ This plugin is actively maintained and production-ready! ⭐**
