const mongoose = require('mongoose');

const editableFieldSchema = new mongoose.Schema(
  {
    fieldName: { type: String, required: true },
    fieldLabel: { type: String, required: true },
    fieldType: {
      type: String,
      required: true,
      enum: ['text', 'textarea', 'color', 'image', 'select', 'number', 'toggle', 'list'],
    },
    defaultValue: { type: mongoose.Schema.Types.Mixed },
    options: [{ label: String, value: String }],
    placeholder: { type: String },
    helperText: { type: String },
    itemSchema: [{ fieldName: String, fieldLabel: String, fieldType: String, defaultValue: mongoose.Schema.Types.Mixed }],
  },
  { _id: false }
);

const sectionStructureSchema = new mongoose.Schema(
  {
    sectionId: { type: String, required: true },
    sectionType: {
      type: String,
      required: true,
      enum: [
        'Hero',
        'About',
        'Services',
        'Features',
        'Gallery',
        'Pricing',
        'Testimonials',
        'Team',
        'Contact',
        'Footer',
      ],
    },
    title: { type: String, required: true },
    description: { type: String },
    editableFields: [editableFieldSchema],
  },
  { _id: false }
);

const templateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a template name'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Please provide a template category'],
      enum: ['SaaS', 'Portfolio', 'Business', 'Restaurant', 'Fitness', 'Event', 'Agency', 'Blog'],
    },
    description: {
      type: String,
      required: true,
    },
    thumbnail: {
      type: String,
      required: true,
    },
    tags: [{ type: String }],
    defaultTheme: {
      primaryColor: { type: String, default: '#4f46e5' },
      secondaryColor: { type: String, default: '#06b6d4' },
      accentColor: { type: String, default: '#f59e0b' },
      backgroundColor: { type: String, default: '#ffffff' },
      textColor: { type: String, default: '#1e293b' },
      fontFamily: { type: String, default: 'Inter' },
      borderRadius: { type: String, default: 'rounded-xl' },
    },
    structure: [sectionStructureSchema],
    isFeatured: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Template', templateSchema);
