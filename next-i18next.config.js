module.exports = {
  i18n: {
    // debug:true,
    defaultLocale: 'en',
    locales: ['en', 'ka'],
    directory: './locales', // Directory where locale files are stored
    objectNotation: true, // Enable object notation for translation strings
    cookie: 'locale', // Cookie name to parse locale settings from
    fallbacks: { 'ge': 'ka' }, // Fallback language if translation is missing
    syncFiles: true, // Synchronize locale files when new keys are added
    autoReload: true, // Auto-reload locale files when changes are made
    updateFiles: true, // Update locale files on save if autoReload is enabled
    // indent: '  ', // Indentation for JSON files
    // extension: '.json', // File extension for locale files
    detectLocale: false, // Automatically detect the user's locale
    queryParameter: 'lang', // Query parameter to parse locale settings from
    // register: global, // Object to attach i18n API methods to
    // logDebugFn: function (msg) { console.log('debug', msg); }, // Function to log debug messages
    // logWarnFn: function (msg) { console.log('warn', msg); }, // Function to log warning messages
    // logErrorFn: function (msg) { console.log('error', msg); } // Function to log error messages
  }
}
