const STORAGE_KEY = 'jamPresets';
const MAX_PRESETS = 50;

// Generate unique ID
const generateId = () => `preset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

/**
 * Preset storage operations using localStorage
 */
export const presetStorage = {
  /**
   * Save a new preset
   * @param {Object} preset - Preset object (without id and createdAt)
   * @returns {Object} Saved preset with id and createdAt
   */
  save(preset) {
    try {
      const presets = this.loadAll();

      const newPreset = {
        ...preset,
        id: generateId(),
        createdAt: Date.now()
      };

      presets.push(newPreset);

      // Enforce max limit - remove oldest if exceeded
      if (presets.length > MAX_PRESETS) {
        presets.sort((a, b) => b.createdAt - a.createdAt); // Sort by newest first
        presets.splice(MAX_PRESETS); // Keep only the most recent MAX_PRESETS
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(presets));
      return newPreset;
    } catch (error) {
      console.error('Failed to save preset:', error);
      throw new Error('Failed to save preset. Storage may be full.');
    }
  },

  /**
   * Load all presets
   * @returns {Array} Array of preset objects
   */
  loadAll() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) return [];

      const presets = JSON.parse(data);
      // Sort by most recent first
      return presets.sort((a, b) => b.createdAt - a.createdAt);
    } catch (error) {
      console.error('Failed to load presets:', error);
      return [];
    }
  },

  /**
   * Load a single preset by ID
   * @param {string} id - Preset ID
   * @returns {Object|null} Preset object or null if not found
   */
  load(id) {
    const presets = this.loadAll();
    return presets.find(p => p.id === id) || null;
  },

  /**
   * Delete a preset by ID
   * @param {string} id - Preset ID
   * @returns {boolean} True if deleted successfully
   */
  delete(id) {
    try {
      const presets = this.loadAll();
      const filtered = presets.filter(p => p.id !== id);

      if (filtered.length === presets.length) {
        return false; // Preset not found
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
      return true;
    } catch (error) {
      console.error('Failed to delete preset:', error);
      return false;
    }
  },

  /**
   * Export preset to JSON file download
   * @param {Object} preset - Preset object to export
   */
  exportToFile(preset) {
    try {
      const json = JSON.stringify(preset, null, 2);
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = `${preset.name || 'preset'}_${Date.now()}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to export preset:', error);
      throw new Error('Failed to export preset');
    }
  },

  /**
   * Import preset from JSON file
   * @param {File} file - File object from input
   * @returns {Promise<Object>} Promise that resolves to preset object
   */
  importFromFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const preset = JSON.parse(e.target.result);

          // Validate preset structure
          if (!preset.name || !preset.sequence || !preset.globalSettings) {
            reject(new Error('Invalid preset file format'));
            return;
          }

          resolve(preset);
        } catch (error) {
          reject(new Error('Failed to parse preset file'));
        }
      };

      reader.onerror = () => {
        reject(new Error('Failed to read file'));
      };

      reader.readAsText(file);
    });
  },

  /**
   * Get storage usage information
   * @returns {Object} { used: number, limit: number, percentage: number }
   */
  getStorageInfo() {
    try {
      const data = localStorage.getItem(STORAGE_KEY) || '';
      const used = new Blob([data]).size;
      const limit = 5 * 1024 * 1024; // Assume 5MB limit

      return {
        used,
        limit,
        percentage: (used / limit) * 100,
        presetsCount: this.loadAll().length
      };
    } catch (error) {
      return { used: 0, limit: 0, percentage: 0, presetsCount: 0 };
    }
  },

  /**
   * Clear all presets (for testing or reset)
   */
  clearAll() {
    localStorage.removeItem(STORAGE_KEY);
  }
};
