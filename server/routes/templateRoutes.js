const express = require('express');
const router = express.Router();
const {
  getTemplates,
  getTemplateById,
  createTemplate,
  updateTemplate,
  deleteTemplate,
  reseedTemplates,
} = require('../controllers/templateController');
const { protect, adminOnly } = require('../middleware/auth');

router.get('/', getTemplates);
router.get('/:id', getTemplateById);
router.post('/', protect, createTemplate);
router.put('/:id', protect, updateTemplate);
router.delete('/:id', protect, deleteTemplate);
router.post('/seed', reseedTemplates);

module.exports = router;
