# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Date format: `YYYY-MMM-DD`

## [Unreleased]
- Nothing yet


## [0.3.4] - 2025-Feb-20
### Changed
- Renamed "PageWrapper" to "PageAnim" in root.jsx
- Renamed `ladr-site` to `ladr-app`
- Added `defer` to root.jsx script import
- Changed and actually enforced LangGuard in root.jsx
- Gathered all utilities in Root()

### Fixed
- Bugs with root path URL `"localhost:5173/"` redirecting to `"home/"` in LangSync 

### Removed
- NumberGuard3 in root.jsx because it was causing issues


## [0.3.3] - 2025-Feb-17
### Fixed
- npm packages updated - upgraded esbuild
- Small attempts for code cleanup

## [0.3.2] - 2025-Feb-15
### Added
- GetAdjEpisodes enable quick navigation to adjacent stories using buttons
- Partial i18n support for ProcessCommand
- ProcessScript now also fetches other language texts

### Changed
- Renamed LangUpdater to LangSync
- ProcessCommand imports and parameters
- Cpu's ProcessCommmand usage to respect the new parameters
- GetEpisode imports and cleanup - adds support for GetAdjEpisodes

### Removed
- Directory store in store.ts, because it is not used anymore
- Cpu imports

## [0.3.1] - 2025-Feb-13
### Added
- Back to top button, stored in utils directory
- Paths for `/:lang`, and `/:/lang/test`
- A store for directory - will be used in the future by GetAdjDirectory and breadcrumbs?
- User is redirected automatically to a URL with episode-sector if sector is not in the URL
- Case command for `#NA`


### Fixed
- Selecting Korean in the preferences modal sets lang as ko, instead of kr
- The way GetEpisode pulls the sector from URL
- The JSON repository does not use Git LFS anymore; so the URLs were changed
- The gradient for the fontsize equation to 0.007
- Added extra transition types

### Removed
- Simplified MainSto page
- Removed CreateEmLine function


## [0.3.0] - 2025-Feb-10
### Added
- Zustand for global state management; used to store preferences
- User's preferred language now appears on the URL path
- Preferences can be updated with the new preferences modal

### Fixed
- Files and scripts which rely on the URL path has been adjusted accordingly to account for the language code
- Header links have been updated

### Removed
- Unused script.js


## [0.2.0] - 2025-Feb-09
### Added
- root.jsx has new components NumberGuard, used to check if the URL paths are made up of only numbers. Used in QUN.
- Added support for QUN in GetDirectory and GetEpisode

### Changed
- GetDirectory now uses TSX instead of JSX
- Updated GetDirectory pulling methods to add support for QUN (Quick URL Navigation follows a system where users can quickly access the specified Volume, Chapter, Episode and Sector using the URL.)

### Fixed
- Indentations in root, GetEpisode and GetDirectory

### Removed
- Redundant check for data in the final return statement in GetEpisode
- "Open in new tab" buttons in directory listing (for now)

## [0.1.1] - 2025-Feb-06
### Added
- MIT License

## [0.1.0] - 2025-Feb-06
### Added
- Everything!


[0.3.4]: https://github.com/lorearchive/LADR/compare/v0.3.3...v0.3.4
[0.3.3]: https://github.com/lorearchive/LADR/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/lorearchive/LADR/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/lorearchive/LADR/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/lorearchive/LADR/compare/v0.2.0...v0.3.0 
[0.2.0]: https://github.com/lorearchive/LADR/compare/v0.1.1...v0.2.0 
[0.1.1]: https://github.com/lorearchive/LADR/compare/v0.1.0...v0.1.1
