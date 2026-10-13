const express = require('express');
const router = express.Router();
const {
  getUserSites,
  getSiteById,
  createSite,
  updateSite,
  duplicateSite,
  deleteSite,
  getPublicSiteBySlug,
} = require('../controllers/siteController');
const { protect } = require('../middleware/auth');

// Public route to view standalone site by slug
router.get('/public/:slug', getPublicSiteBySlug);

// Protected routes for site management
router.get('/', protect, getUserSites);
router.post('/', protect, createSite);
router.get('/:id', protect, getSiteById);
router.put('/:id', protect, updateSite);
router.post('/:id/duplicate', protect, duplicateSite);
router.delete('/:id', protect, deleteSite);

module.exports = router;
