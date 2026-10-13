const UserSite = require('../models/UserSite');
const Template = require('../models/Template');

const generateSlug = (name) => {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  const randomSuffix = Math.random().toString(36).substring(2, 6);
  return `${base || 'site'}-${randomSuffix}`;
};

// @desc    Get all sites for logged in user
// @route   GET /api/sites
// @access  Private
const getUserSites = async (req, res) => {
  try {
    const sites = await UserSite.find({ userId: req.user._id })
      .populate('templateId', 'name category thumbnail')
      .sort({ updatedAt: -1 });

    res.json({ success: true, count: sites.length, sites });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get single user site by ID
// @route   GET /api/sites/:id
// @access  Private
const getSiteById = async (req, res) => {
  try {
    const site = await UserSite.findOne({
      _id: req.params.id,
      userId: req.user._id,
    }).populate('templateId');

    if (!site) {
      return res.status(404).json({ success: false, message: 'Site not found or access denied' });
    }

    res.json({ success: true, site });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create new user site from template
// @route   POST /api/sites
// @access  Private
const createSite = async (req, res) => {
  try {
    const { templateId, siteName, customizations, theme, sectionOrder, sectionVisibility, status } = req.body;

    if (!templateId) {
      return res.status(400).json({ success: false, message: 'Please provide a templateId' });
    }

    const template = await Template.findById(templateId);
    if (!template) {
      return res.status(404).json({ success: false, message: 'Template not found' });
    }

    const name = siteName || `My ${template.name.split('-')[0].trim()} Site`;
    const slug = req.body.slug ? req.body.slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-') : generateSlug(name);

    // Verify slug uniqueness
    const existingSlug = await UserSite.findOne({ slug });
    const finalSlug = existingSlug ? generateSlug(name) : slug;

    // Build default customizations from template schema if not provided
    let initialCustomizations = customizations || {};
    if (Object.keys(initialCustomizations).length === 0) {
      template.structure.forEach((section) => {
        initialCustomizations[section.sectionId] = {};
        section.editableFields.forEach((field) => {
          initialCustomizations[section.sectionId][field.fieldName] = field.defaultValue;
        });
      });
    }

    const initialOrder = sectionOrder || template.structure.map((s) => s.sectionId);

    const site = await UserSite.create({
      userId: req.user._id,
      templateId,
      siteName: name,
      slug: finalSlug,
      description: template.description,
      thumbnail: template.thumbnail,
      customizations: initialCustomizations,
      theme: theme || template.defaultTheme,
      sectionOrder: initialOrder,
      sectionVisibility: sectionVisibility || {},
      status: status || 'draft',
      publishedAt: status === 'published' ? new Date() : null,
    });

    const populatedSite = await UserSite.findById(site._id).populate('templateId');
    res.status(201).json({ success: true, site: populatedSite });
  } catch (error) {
    console.error('Create site error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update user site
// @route   PUT /api/sites/:id
// @access  Private
const updateSite = async (req, res) => {
  try {
    const { siteName, slug, description, thumbnail, customizations, theme, sectionOrder, sectionVisibility, status } = req.body;

    let site = await UserSite.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!site) {
      return res.status(404).json({ success: false, message: 'Site not found or access denied' });
    }

    if (slug && slug !== site.slug) {
      const sanitizedSlug = slug.toLowerCase().trim().replace(/[^a-z0-9-]/g, '-');
      const slugExists = await UserSite.findOne({ slug: sanitizedSlug, _id: { $ne: site._id } });
      if (slugExists) {
        return res.status(400).json({ success: false, message: 'This slug URL is already taken. Please choose another one.' });
      }
      site.slug = sanitizedSlug;
    }

    if (siteName) site.siteName = siteName;
    if (description !== undefined) site.description = description;
    if (thumbnail !== undefined) site.thumbnail = thumbnail;
    if (customizations) site.customizations = customizations;
    if (theme) site.theme = theme;
    if (sectionOrder) site.sectionOrder = sectionOrder;
    if (sectionVisibility) site.sectionVisibility = sectionVisibility;
    if (status) {
      site.status = status;
      if (status === 'published' && !site.publishedAt) {
        site.publishedAt = new Date();
      }
    }

    site.markModified('customizations');
    site.markModified('theme');
    site.markModified('sectionVisibility');

    const updatedSite = await site.save();
    const populatedSite = await UserSite.findById(updatedSite._id).populate('templateId');

    res.json({ success: true, site: populatedSite });
  } catch (error) {
    console.error('Update site error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Duplicate user site
// @route   POST /api/sites/:id/duplicate
// @access  Private
const duplicateSite = async (req, res) => {
  try {
    const site = await UserSite.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!site) {
      return res.status(404).json({ success: false, message: 'Original site not found' });
    }

    const newName = `${site.siteName} (Copy)`;
    const newSlug = generateSlug(newName);

    const clonedSite = await UserSite.create({
      userId: req.user._id,
      templateId: site.templateId,
      siteName: newName,
      slug: newSlug,
      description: site.description,
      thumbnail: site.thumbnail,
      customizations: site.customizations,
      theme: site.theme,
      sectionOrder: site.sectionOrder,
      sectionVisibility: site.sectionVisibility,
      status: 'draft',
    });

    const populatedSite = await UserSite.findById(clonedSite._id).populate('templateId');
    res.status(201).json({ success: true, site: populatedSite });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete user site
// @route   DELETE /api/sites/:id
// @access  Private
const deleteSite = async (req, res) => {
  try {
    const site = await UserSite.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!site) {
      return res.status(404).json({ success: false, message: 'Site not found or access denied' });
    }

    await site.deleteOne();
    res.json({ success: true, message: 'Site deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get public site by slug (Standalone live viewer)
// @route   GET /api/sites/public/:slug
// @access  Public
const getPublicSiteBySlug = async (req, res) => {
  try {
    const slug = req.params.slug.toLowerCase().trim();
    const site = await UserSite.findOne({ slug }).populate('templateId');

    if (!site) {
      return res.status(404).json({ success: false, message: 'Site not found at this address' });
    }

    res.json({
      success: true,
      site: {
        id: site._id,
        siteName: site.siteName,
        slug: site.slug,
        description: site.description,
        customizations: site.customizations,
        theme: site.theme,
        sectionOrder: site.sectionOrder,
        sectionVisibility: site.sectionVisibility,
        status: site.status,
        updatedAt: site.updatedAt,
        template: site.templateId,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  getUserSites,
  getSiteById,
  createSite,
  updateSite,
  duplicateSite,
  deleteSite,
  getPublicSiteBySlug,
};
