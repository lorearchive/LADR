# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Date format: `YYYY-MMM-DD`

## [Unreleased]
- Nothing yet

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


[0.2.0]: https://github.com/lorearchive/LADR/compare/v0.2.0...v0.3.0 
[0.2.0]: https://github.com/lorearchive/LADR/compare/v0.1.1...v0.2.0 
[0.1.1]: https://github.com/lorearchive/LADR/compare/v0.1.0...v0.1.1
