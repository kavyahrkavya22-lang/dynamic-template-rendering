import React from 'react';
import ColorPicker from '../common/ColorPicker';
import ImageUploader from '../common/ImageUploader';
import { Plus, Trash2, GripVertical } from 'lucide-react';

const DynamicFieldRenderer = ({
  field,
  value,
  onChange,
  onListItemChange,
  onAddListItem,
  onRemoveListItem,
  sectionId,
}) => {
  const { fieldName, fieldLabel, fieldType, options, placeholder, helperText } = field;

  // Handle standard text input
  if (fieldType === 'text') {
    return (
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-300 block">{fieldLabel}</label>
        <input
          type="text"
          value={value ?? ''}
          placeholder={placeholder || `Enter ${fieldLabel.toLowerCase()}...`}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        />
        {helperText && <p className="text-[11px] text-slate-500">{helperText}</p>}
      </div>
    );
  }

  // Handle textarea
  if (fieldType === 'textarea') {
    return (
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-300 block">{fieldLabel}</label>
        <textarea
          rows={3}
          value={value ?? ''}
          placeholder={placeholder || `Enter ${fieldLabel.toLowerCase()}...`}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white placeholder:text-slate-600 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all resize-y"
        />
        {helperText && <p className="text-[11px] text-slate-500">{helperText}</p>}
      </div>
    );
  }

  // Handle Color Picker
  if (fieldType === 'color') {
    return (
      <ColorPicker
        label={fieldLabel}
        value={value}
        onChange={onChange}
        helperText={helperText}
      />
    );
  }

  // Handle Image Uploader
  if (fieldType === 'image') {
    return (
      <ImageUploader
        label={fieldLabel}
        value={value}
        onChange={onChange}
        helperText={helperText}
      />
    );
  }

  // Handle Select Dropdown
  if (fieldType === 'select') {
    return (
      <div className="space-y-1.5">
        <label className="text-xs font-medium text-slate-300 block">{fieldLabel}</label>
        <select
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 text-xs text-white focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        >
          {options?.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {helperText && <p className="text-[11px] text-slate-500">{helperText}</p>}
      </div>
    );
  }

  // Handle Boolean Toggle Switch
  if (fieldType === 'toggle') {
    return (
      <div className="flex items-center justify-between py-1">
        <div>
          <label className="text-xs font-medium text-slate-300">{fieldLabel}</label>
          {helperText && <p className="text-[11px] text-slate-500">{helperText}</p>}
        </div>
        <button
          type="button"
          onClick={() => onChange(!value)}
          className={`w-11 h-6 rounded-full transition-colors relative flex items-center px-0.5 ${
            value ? 'bg-indigo-600' : 'bg-slate-800'
          }`}
        >
          <div
            className={`w-5 h-5 rounded-full bg-white transition-transform ${
              value ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>
    );
  }

  // Handle Dynamic List (e.g. features, services, testimonials, pricing plans)
  if (fieldType === 'list') {
    const list = Array.isArray(value) ? value : [];

    return (
      <div className="space-y-3 pt-2">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-indigo-300 uppercase tracking-wider">
            {fieldLabel} ({list.length})
          </label>
          <button
            type="button"
            onClick={() => {
              const defaultItem = list.length > 0
                ? { ...list[0], title: `New Item ${list.length + 1}` }
                : { title: 'New Item', description: 'Description...', icon: 'Zap' };
              onAddListItem(sectionId, fieldName, defaultItem);
            }}
            className="px-2.5 py-1 rounded-md text-[11px] font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors flex items-center gap-1 shadow-sm"
          >
            <Plus className="w-3 h-3" /> Add Item
          </button>
        </div>

        <div className="space-y-2.5">
          {list.map((item, idx) => (
            <div
              key={idx}
              className="p-3 rounded-xl bg-slate-900/90 border border-slate-800 space-y-2.5 relative group"
            >
              <div className="flex items-center justify-between border-b border-slate-800/80 pb-2">
                <span className="text-[11px] font-semibold text-slate-400">
                  Item #{idx + 1}: {item.name || item.title || 'Untitled'}
                </span>
                {list.length > 1 && (
                  <button
                    type="button"
                    onClick={() => onRemoveListItem(sectionId, fieldName, idx)}
                    className="text-rose-400 hover:text-rose-300 p-1 rounded hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Dynamic Fields inside List Item */}
              <div className="space-y-2">
                {Object.keys(item).map((itemKey) => {
                  const itemVal = item[itemKey];

                  if (itemKey === 'isPopular') {
                    return (
                      <div key={itemKey} className="flex items-center justify-between text-xs pt-1">
                        <span className="text-slate-400">Highlight / Popular Badge</span>
                        <input
                          type="checkbox"
                          checked={Boolean(itemVal)}
                          onChange={(e) => onListItemChange(sectionId, fieldName, idx, itemKey, e.target.checked)}
                          className="rounded bg-slate-800 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                        />
                      </div>
                    );
                  }

                  if (itemKey === 'avatar' || itemKey === 'image') {
                    return (
                      <div key={itemKey} className="space-y-1">
                        <label className="text-[11px] text-slate-400 capitalize">{itemKey} URL</label>
                        <input
                          type="text"
                          value={itemVal ?? ''}
                          onChange={(e) => onListItemChange(sectionId, fieldName, idx, itemKey, e.target.value)}
                          className="w-full px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-xs text-white"
                        />
                      </div>
                    );
                  }

                  if (itemKey === 'description' || itemKey === 'content' || itemKey === 'features') {
                    return (
                      <div key={itemKey} className="space-y-1">
                        <label className="text-[11px] text-slate-400 capitalize">{itemKey}</label>
                        <textarea
                          rows={2}
                          value={itemVal ?? ''}
                          onChange={(e) => onListItemChange(sectionId, fieldName, idx, itemKey, e.target.value)}
                          className="w-full px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-xs text-white"
                        />
                      </div>
                    );
                  }

                  return (
                    <div key={itemKey} className="space-y-1">
                      <label className="text-[11px] text-slate-400 capitalize">{itemKey}</label>
                      <input
                        type="text"
                        value={itemVal ?? ''}
                        onChange={(e) => onListItemChange(sectionId, fieldName, idx, itemKey, e.target.value)}
                        className="w-full px-2.5 py-1 rounded bg-slate-950 border border-slate-800 text-xs text-white"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return null;
};

export default DynamicFieldRenderer;
