import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../utils/api';
import confetti from 'canvas-confetti';

const CustomizerContext = createContext(null);

export const CustomizerProvider = ({ children }) => {
  const [template, setTemplate] = useState(null);
  const [siteId, setSiteId] = useState(null);
  const [siteName, setSiteName] = useState('My Custom Website');
  const [slug, setSlug] = useState('my-custom-website');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('draft');
  const [publishedAt, setPublishedAt] = useState(null);

  const [customizations, setCustomizations] = useState({});
  const [theme, setTheme] = useState({
    primaryColor: '#6366f1',
    secondaryColor: '#3b82f6',
    accentColor: '#10b981',
    backgroundColor: '#ffffff',
    textColor: '#1e293b',
    fontFamily: 'Inter',
    borderRadius: 'rounded-2xl',
  });

  const [sectionOrder, setSectionOrder] = useState([]);
  const [sectionVisibility, setSectionVisibility] = useState({});

  const [activeSection, setActiveSection] = useState(null);
  const [viewport, setViewport] = useState('desktop'); // desktop, tablet, mobile
  const [previewMode, setPreviewMode] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState(null);

  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState(null);

  // Undo / Redo history stacks
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  // Record history snapshot
  const pushHistory = useCallback((newCustomizations, newTheme) => {
    setHistory((prev) => {
      const updated = prev.slice(0, historyIndex + 1);
      return [...updated, { customizations: newCustomizations, theme: newTheme }];
    });
    setHistoryIndex((prev) => prev + 1);
  }, [historyIndex]);

  // Initialize customizer from template or existing site
  const initializeFromTemplate = (templateData, existingSite = null) => {
    setTemplate(templateData);

    if (existingSite) {
      setSiteId(existingSite._id || existingSite.id);
      setSiteName(existingSite.siteName || `My ${templateData.name}`);
      setSlug(existingSite.slug || 'my-custom-website');
      setDescription(existingSite.description || templateData.description);
      setStatus(existingSite.status || 'draft');
      setPublishedAt(existingSite.publishedAt || null);
      setTheme(existingSite.theme || templateData.defaultTheme);
      setCustomizations(existingSite.customizations || {});
      setSectionOrder(existingSite.sectionOrder?.length ? existingSite.sectionOrder : templateData.structure.map((s) => s.sectionId));
      setSectionVisibility(existingSite.sectionVisibility || {});
    } else {
      setSiteId(null);
      const initialName = `My ${templateData.name.split('-')[0].trim()}`;
      setSiteName(initialName);
      setSlug(initialName.toLowerCase().replace(/[^a-z0-9]/g, '-') + '-' + Math.random().toString(36).substring(2, 6));
      setDescription(templateData.description);
      setStatus('draft');
      setPublishedAt(null);
      setTheme(templateData.defaultTheme || {
        primaryColor: '#6366f1',
        secondaryColor: '#3b82f6',
        accentColor: '#10b981',
        backgroundColor: '#ffffff',
        textColor: '#1e293b',
        fontFamily: 'Inter',
        borderRadius: 'rounded-2xl',
      });

      // Populate default customizations from template schema
      const initialCustoms = {};
      templateData.structure.forEach((section) => {
        initialCustoms[section.sectionId] = {};
        section.editableFields.forEach((field) => {
          initialCustoms[section.sectionId][field.fieldName] = field.defaultValue;
        });
      });
      setCustomizations(initialCustoms);
      setSectionOrder(templateData.structure.map((s) => s.sectionId));
      setSectionVisibility({});
    }

    if (templateData.structure.length > 0) {
      setActiveSection(templateData.structure[0].sectionId);
    }
    setIsDirty(false);
    setHistory([]);
    setHistoryIndex(-1);
  };

  // Update a single field
  const updateField = (sectionId, fieldName, value) => {
    setCustomizations((prev) => {
      const sectionData = prev[sectionId] || {};
      const updated = {
        ...prev,
        [sectionId]: {
          ...sectionData,
          [fieldName]: value,
        },
      };
      pushHistory(updated, theme);
      return updated;
    });
    setIsDirty(true);
  };

  // Update a field inside a list item
  const updateListItem = (sectionId, fieldName, index, itemKey, itemValue) => {
    setCustomizations((prev) => {
      const sectionData = prev[sectionId] || {};
      const currentList = Array.isArray(sectionData[fieldName]) ? [...sectionData[fieldName]] : [];
      if (currentList[index]) {
        currentList[index] = { ...currentList[index], [itemKey]: itemValue };
      }
      const updated = {
        ...prev,
        [sectionId]: {
          ...sectionData,
          [fieldName]: currentList,
        },
      };
      pushHistory(updated, theme);
      return updated;
    });
    setIsDirty(true);
  };

  // Add item to list field
  const addListItem = (sectionId, fieldName, defaultItem) => {
    setCustomizations((prev) => {
      const sectionData = prev[sectionId] || {};
      const currentList = Array.isArray(sectionData[fieldName]) ? [...sectionData[fieldName]] : [];
      currentList.push(defaultItem);
      const updated = {
        ...prev,
        [sectionId]: {
          ...sectionData,
          [fieldName]: currentList,
        },
      };
      pushHistory(updated, theme);
      return updated;
    });
    setIsDirty(true);
  };

  // Remove item from list field
  const removeListItem = (sectionId, fieldName, index) => {
    setCustomizations((prev) => {
      const sectionData = prev[sectionId] || {};
      const currentList = Array.isArray(sectionData[fieldName]) ? [...sectionData[fieldName]] : [];
      currentList.splice(index, 1);
      const updated = {
        ...prev,
        [sectionId]: {
          ...sectionData,
          [fieldName]: currentList,
        },
      };
      pushHistory(updated, theme);
      return updated;
    });
    setIsDirty(true);
  };

  // Update theme setting
  const updateThemeProperty = (key, value) => {
    setTheme((prev) => {
      const updated = { ...prev, [key]: value };
      pushHistory(customizations, updated);
      return updated;
    });
    setIsDirty(true);
  };

  const applyThemePreset = (preset) => {
    setTheme(preset);
    pushHistory(customizations, preset);
    setIsDirty(true);
  };

  // Reorder sections
  const moveSection = (sectionId, direction) => {
    setSectionOrder((prev) => {
      const index = prev.indexOf(sectionId);
      if (index === -1) return prev;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.length) return prev;

      const newOrder = [...prev];
      const [moved] = newOrder.splice(index, 1);
      newOrder.splice(targetIndex, 0, moved);
      setIsDirty(true);
      return newOrder;
    });
  };

  // Toggle section visibility
  const toggleSectionVisibility = (sectionId) => {
    setSectionVisibility((prev) => {
      const current = prev[sectionId] ?? true;
      const updated = { ...prev, [sectionId]: !current };
      setIsDirty(true);
      return updated;
    });
  };

  // Save / Publish Site
  const saveSite = async (newStatus = null) => {
    if (!template) return;
    setIsSaving(true);

    try {
      const targetStatus = newStatus || status;
      const payload = {
        templateId: template._id || template.id,
        siteName,
        slug,
        description,
        thumbnail: template.thumbnail,
        customizations,
        theme,
        sectionOrder,
        sectionVisibility,
        status: targetStatus,
      };

      let res;
      if (siteId) {
        res = await api.put(`/sites/${siteId}`, payload);
      } else {
        res = await api.post('/sites', payload);
        if (res.success && res.site) {
          setSiteId(res.site._id || res.site.id);
        }
      }

      if (res.success) {
        setIsDirty(false);
        setStatus(targetStatus);
        setLastSaved(new Date());
        if (targetStatus === 'published') {
          setPublishedAt(new Date());
          confetti({
            particleCount: 120,
            spread: 70,
            origin: { y: 0.6 },
          });
        }
        return res.site;
      }
    } catch (error) {
      console.error('Error saving site:', error);
      throw error;
    } finally {
      setIsSaving(false);
    }
  };

  // Undo / Redo
  const canUndo = historyIndex > 0;
  const canRedo = historyIndex < history.length - 1;

  const undo = () => {
    if (canUndo) {
      const prevIndex = historyIndex - 1;
      const state = history[prevIndex];
      setCustomizations(state.customizations);
      setTheme(state.theme);
      setHistoryIndex(prevIndex);
      setIsDirty(true);
    }
  };

  const redo = () => {
    if (canRedo) {
      const nextIndex = historyIndex + 1;
      const state = history[nextIndex];
      setCustomizations(state.customizations);
      setTheme(state.theme);
      setHistoryIndex(nextIndex);
      setIsDirty(true);
    }
  };

  return (
    <CustomizerContext.Provider
      value={{
        template,
        siteId,
        siteName,
        setSiteName,
        slug,
        setSlug,
        description,
        setDescription,
        status,
        publishedAt,
        customizations,
        theme,
        sectionOrder,
        sectionVisibility,
        activeSection,
        setActiveSection,
        viewport,
        setViewport,
        previewMode,
        setPreviewMode,
        highlightedSection,
        setHighlightedSection,
        isDirty,
        isSaving,
        lastSaved,
        initializeFromTemplate,
        updateField,
        updateListItem,
        addListItem,
        removeListItem,
        updateThemeProperty,
        applyThemePreset,
        moveSection,
        toggleSectionVisibility,
        saveSite,
        undo,
        redo,
        canUndo,
        canRedo,
      }}
    >
      {children}
    </CustomizerContext.Provider>
  );
};

export const useCustomizer = () => {
  const context = useContext(CustomizerContext);
  if (!context) {
    throw new Error('useCustomizer must be used within a CustomizerProvider');
  }
  return context;
};
