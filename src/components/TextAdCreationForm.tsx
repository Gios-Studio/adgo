import React, { useState, useEffect } from 'react';
import { 
  TextAd, 
  TextAdFormData, 
  AdLanguage, 
  LANGUAGE_LABELS,
  DEFAULT_TEXT_STYLES,
  validateTextAd,
  getCharacterCounter,
  AD_TEXT_PLACEHOLDERS
} from '../types/textAds';
import { TextAdPreview } from './TextAdDisplay';
import { Type, Palette, Link, Eye, EyeOff, Save } from 'lucide-react';

interface TextAdCreationFormProps {
  onSubmit: (formData: TextAdFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: Partial<TextAdFormData>;
  isLoading?: boolean;
}

export const TextAdCreationForm: React.FC<TextAdCreationFormProps> = ({
  onSubmit,
  onCancel,
  initialData,
  isLoading = false
}) => {
  const [formData, setFormData] = useState<TextAdFormData>({
    title: initialData?.title || '',
    ad_text: initialData?.ad_text || '',
    language: initialData?.language || 'en',
    cta_link: initialData?.cta_link || '',
    text_style: initialData?.text_style || DEFAULT_TEXT_STYLES['en']
  });

  const [showPreview, setShowPreview] = useState(true);
  const [showStyleEditor, setShowStyleEditor] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Update text style defaults when language changes
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      text_style: {
        ...DEFAULT_TEXT_STYLES[prev.language],
        ...prev.text_style // Preserve any custom styling
      }
    }));
  }, [formData.language]);

  // Validate form on changes
  useEffect(() => {
    const validation = validateTextAd({
      ...formData,
      ad_type: 'text'
    });
    setValidationErrors(validation.errors);
  }, [formData]);

  const handleInputChange = (field: keyof TextAdFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleStyleChange = (styleField: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      text_style: {
        ...prev.text_style,
        [styleField]: value
      }
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validation = validateTextAd({
      ...formData,
      ad_type: 'text'
    });

    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }

    try {
      await onSubmit(formData);
    } catch (error) {
      console.error('Error submitting text ad:', error);
      setValidationErrors(['Failed to create text ad. Please try again.']);
    }
  };

  const characterCount = getCharacterCounter(formData.ad_text);
  const isValid = validationErrors.length === 0 && formData.ad_text.trim().length > 0;

  return (
    <div className="text-ad-creation-form max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Create Text Advertisement</h2>
        <p className="text-gray-600">Create engaging text-based ads with language localization support.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Form Section */}
        <div className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Ad Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Advertisement Title
              </label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Enter a descriptive title for your ad"
                required
              />
            </div>

            {/* Language Selection */}
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                id="language"
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value as AdLanguage)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {Object.entries(LANGUAGE_LABELS).map(([code, label]) => (
                  <option key={code} value={code}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            {/* Ad Text */}
            <div>
              <label htmlFor="ad_text" className="block text-sm font-medium text-gray-700 mb-2">
                Advertisement Text
              </label>
              <textarea
                id="ad_text"
                value={formData.ad_text}
                onChange={(e) => handleInputChange('ad_text', e.target.value)}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                  characterCount.isOverLimit ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder={AD_TEXT_PLACEHOLDERS[formData.language]}
                rows={4}
                required
              />
              <div className="mt-2 flex justify-between items-center">
                <div className={`text-sm ${
                  characterCount.isOverLimit ? 'text-red-600' : 'text-gray-500'
                }`}>
                  {characterCount.current}/{characterCount.max} characters
                  {characterCount.isOverLimit && ` (${-characterCount.remaining} over limit)`}
                </div>
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      characterCount.isOverLimit ? 'bg-red-500' : 
                      characterCount.percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                    }`}
                    style={{ width: `${Math.min(characterCount.percentage, 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* CTA Link */}
            <div>
              <label htmlFor="cta_link" className="block text-sm font-medium text-gray-700 mb-2">
                Call-to-Action Link (Optional)
              </label>
              <div className="relative">
                <Link className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                <input
                  type="url"
                  id="cta_link"
                  value={formData.cta_link}
                  onChange={(e) => handleInputChange('cta_link', e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com"
                />
              </div>
            </div>

            {/* Style Editor Toggle */}
            <div className="flex items-center justify-between">
              <button
                type="button"
                onClick={() => setShowStyleEditor(!showStyleEditor)}
                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 transition-colors"
              >
                <Palette size={16} />
                {showStyleEditor ? 'Hide' : 'Show'} Style Options
              </button>
              
              <button
                type="button"
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                {showPreview ? <EyeOff size={16} /> : <Eye size={16} />}
                {showPreview ? 'Hide' : 'Show'} Preview
              </button>
            </div>

            {/* Style Editor */}
            {showStyleEditor && (
              <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                <h3 className="font-medium text-gray-900 mb-3">Style Options</h3>
                
                <div className="grid grid-cols-2 gap-4">
                  {/* Background Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Background Color
                    </label>
                    <input
                      type="color"
                      value={formData.text_style.backgroundColor}
                      onChange={(e) => handleStyleChange('backgroundColor', e.target.value)}
                      className="w-full h-10 rounded border border-gray-300"
                    />
                  </div>

                  {/* Text Color */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Text Color
                    </label>
                    <input
                      type="color"
                      value={formData.text_style.textColor}
                      onChange={(e) => handleStyleChange('textColor', e.target.value)}
                      className="w-full h-10 rounded border border-gray-300"
                    />
                  </div>

                  {/* Font Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Font Size
                    </label>
                    <select
                      value={formData.text_style.fontSize}
                      onChange={(e) => handleStyleChange('fontSize', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="12px">Small (12px)</option>
                      <option value="14px">Normal (14px)</option>
                      <option value="16px">Medium (16px)</option>
                      <option value="18px">Large (18px)</option>
                      <option value="20px">X-Large (20px)</option>
                    </select>
                  </div>

                  {/* Font Weight */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Font Weight
                    </label>
                    <select
                      value={formData.text_style.fontWeight}
                      onChange={(e) => handleStyleChange('fontWeight', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="normal">Normal</option>
                      <option value="500">Medium</option>
                      <option value="600">Semi-Bold</option>
                      <option value="bold">Bold</option>
                    </select>
                  </div>

                  {/* Text Alignment */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Text Alignment
                    </label>
                    <select
                      value={formData.text_style.textAlign || 'left'}
                      onChange={(e) => handleStyleChange('textAlign', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="left">Left</option>
                      <option value="center">Center</option>
                      <option value="right">Right</option>
                    </select>
                  </div>

                  {/* Border Radius */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Border Radius
                    </label>
                    <select
                      value={formData.text_style.borderRadius || '8px'}
                      onChange={(e) => handleStyleChange('borderRadius', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="0px">None</option>
                      <option value="4px">Small</option>
                      <option value="8px">Medium</option>
                      <option value="12px">Large</option>
                      <option value="20px">X-Large</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* Validation Errors */}
            {validationErrors.length > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-md p-3">
                <div className="text-red-800 text-sm">
                  <ul className="list-disc list-inside space-y-1">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                disabled={!isValid || isLoading}
                className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <Save size={16} />
                {isLoading ? 'Creating...' : 'Create Text Ad'}
              </button>
              
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>

        {/* Preview Section */}
        {showPreview && (
          <div className="lg:sticky lg:top-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
              
              {formData.ad_text.trim() ? (
                <TextAdPreview
                  title={formData.title}
                  adText={formData.ad_text}
                  language={formData.language}
                  ctaLink={formData.cta_link}
                  textStyle={formData.text_style}
                />
              ) : (
                <div className="bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg p-8 text-center text-gray-500">
                  <Type size={48} className="mx-auto mb-2 opacity-50" />
                  <p>Enter ad text to see preview</p>
                </div>
              )}
              
              {/* Character count indicator */}
              <div className="mt-4 text-sm text-gray-600">
                Character count: {characterCount.current}/180
                {characterCount.isOverLimit && (
                  <span className="text-red-600 ml-2">Over limit!</span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TextAdCreationForm;