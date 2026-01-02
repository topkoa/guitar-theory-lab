import { useState, useEffect } from 'react';
import PresetCard from './PresetCard';
import { presetStorage } from '../../utils/presetStorage';
import './PresetManager.css';

function PresetManager({ mode, onClose, onSave, onLoad }) {
  const [presets, setPresets] = useState([]);
  const [presetName, setPresetName] = useState('');
  const [presetDescription, setPresetDescription] = useState('');
  const [importError, setImportError] = useState(null);

  // Load presets when opening in load mode
  useEffect(() => {
    if (mode === 'load') {
      setPresets(presetStorage.loadAll());
    }
  }, [mode]);

  // Handle save
  const handleSave = () => {
    if (!presetName.trim()) {
      alert('Please enter a preset name');
      return;
    }

    onSave(presetName.trim(), presetDescription.trim());
    setPresetName('');
    setPresetDescription('');
    onClose();
  };

  // Handle load
  const handleLoad = (preset) => {
    onLoad(preset);
    onClose();
  };

  // Handle delete
  const handleDelete = (presetId) => {
    if (confirm('Are you sure you want to delete this preset?')) {
      presetStorage.delete(presetId);
      setPresets(presetStorage.loadAll());
    }
  };

  // Handle export
  const handleExport = (preset) => {
    presetStorage.exportToFile(preset);
  };

  // Handle import
  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    try {
      setImportError(null);
      const preset = await presetStorage.importFromFile(file);
      const saved = presetStorage.save(preset);
      setPresets(presetStorage.loadAll());

      // Optionally auto-load the imported preset
      if (confirm(`Preset "${saved.name}" imported successfully. Load it now?`)) {
        handleLoad(saved);
      }
    } catch (error) {
      setImportError(error.message);
    }

    // Reset file input
    event.target.value = '';
  };

  return (
    <div className="preset-modal-overlay" onClick={onClose}>
      <div className="preset-modal" onClick={(e) => e.stopPropagation()}>
        <div className="preset-modal-header">
          <h3>{mode === 'save' ? 'Save Preset' : 'Load Preset'}</h3>
          <button className="close-btn" onClick={onClose}>×</button>
        </div>

        <div className="preset-modal-content">
          {mode === 'save' ? (
            // Save Mode
            <div className="save-form">
              <div className="form-group">
                <label htmlFor="preset-name">Preset Name *</label>
                <input
                  id="preset-name"
                  type="text"
                  value={presetName}
                  onChange={(e) => setPresetName(e.target.value)}
                  placeholder="My Blues Jam"
                  maxLength={50}
                  autoFocus
                />
              </div>
              <div className="form-group">
                <label htmlFor="preset-description">Description (Optional)</label>
                <textarea
                  id="preset-description"
                  value={presetDescription}
                  onChange={(e) => setPresetDescription(e.target.value)}
                  placeholder="12-bar blues progression in A..."
                  rows={3}
                  maxLength={200}
                />
              </div>
              <div className="form-actions">
                <button className="cancel-btn" onClick={onClose}>
                  Cancel
                </button>
                <button className="save-preset-btn" onClick={handleSave}>
                  Save Preset
                </button>
              </div>
            </div>
          ) : (
            // Load Mode
            <div className="load-content">
              <div className="import-section">
                <label htmlFor="import-file" className="import-btn">
                  Import from File
                </label>
                <input
                  id="import-file"
                  type="file"
                  accept=".json"
                  onChange={handleImport}
                  style={{ display: 'none' }}
                />
                {importError && (
                  <p className="import-error">{importError}</p>
                )}
              </div>

              {presets.length === 0 ? (
                <div className="empty-presets">
                  <p>No saved presets yet.</p>
                  <p>Save your first jam sequence to get started!</p>
                </div>
              ) : (
                <div className="presets-grid">
                  {presets.map((preset) => (
                    <PresetCard
                      key={preset.id}
                      preset={preset}
                      onLoad={handleLoad}
                      onDelete={handleDelete}
                      onExport={handleExport}
                    />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PresetManager;
