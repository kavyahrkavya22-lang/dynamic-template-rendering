const mongoose = require('mongoose');

const userSiteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    templateId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Template',
      required: true,
    },
    siteName: {
      type: String,
      required: [true, 'Please provide a site name'],
      trim: true,
    },
    slug: {
      type: String,
      required: [true, 'Please provide a site slug'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'],
    },
    description: {
      type: String,
      default: '',
    },
    thumbnail: {
      type: String,
      default: '',
    },
    customizations: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    theme: {
      primaryColor: { type: String, default: '#4f46e5' },
      secondaryColor: { type: String, default: '#06b6d4' },
      accentColor: { type: String, default: '#f59e0b' },
      backgroundColor: { type: String, default: '#ffffff' },
      textColor: { type: String, default: '#1e293b' },
      fontFamily: { type: String, default: 'Inter' },
      borderRadius: { type: String, default: 'rounded-xl' },
    },
    sectionOrder: [{ type: String }],
    sectionVisibility: {
      type: mongoose.Schema.Types.Mixed,
      default: {},
    },
    status: {
      type: String,
      enum: ['draft', 'published'],
      default: 'draft',
    },
    publishedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('UserSite', userSiteSchema);
