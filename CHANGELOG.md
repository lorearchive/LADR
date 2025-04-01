# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

Date format: `YYYY-MMM-DD`

## [Unreleased]
- Nothing yet


## [1.2.0] - 2025-Apr-1
### Changed
- Minor frontend updates

### Fixed
- Episode list is now organized, all episodes are displayed in sequential order

#### Renderer
- GetImage support for more image dimensions

## [1.1.5] - 2025-Mar-23
### Added
- `.htaccess` for efficient SPA routing

## [1.1.4] - 2025-Mar-22
### Changed
- Minor code optimizations
- Home page changes

#### Renderer
- GetImage should now render black backgrounds - we'll see how this goes

### Fixed
- For GetDirectory to work, the URL now must end with a slash - root.jsx has been updated to add the slash whenever there isn't

#### Renderer
- TextEn is now checked for variators in ProcessNestedArray


## [1.1.3] - 2025-Mar-19
### Changed
- Code refactoring and optimizations
- Updated documentation

### Fixed
#### Renderer
- ProcessVariator's text color variator now supports mid-dialogue word color changes

## [1.1.2] - 2025-Mar-17
### Added
- Minor text in Home

### Fixed
- GetDirectory now supports the lang code in the URL
#### RENDERER
- GetImage supports images that are NOT .jpg extensions
- Minor ProcessCommand fixes for t9n support
- ProcessScript's new ruby variator rendering logic

## [1.1.1] - 2025-Mar-11
### Fixed
- Bumped axios to version 1.8.2
- Removed version 18.x check in GitHub Actions

## [1.1.0] - 2025-Mar-11
Now that most of the backend is done, I move on to the frontend...

### Added
- A Contributing guide. Unfinished
- More npm packages
#### Frotend
- shadcn/ui package for frontend components
- ScrollToTop component to scroll the page to top when it comes into view

### Changed
- Edited some files to respect the shadcn/ui
- Updated home page
- Minor code cleanup

### Fixed
#### Frontend
- Modal lang highlighting issues


## [1.0.1] - 2025-Mar-7
### Added
- Npm packages `image-size`, `axios`, and `buffer`

### Changed
- Minor code cleanup
- Bumped esbuild from `0.24.2` to `0.25.0`

#### Renderer
- GetImage crops images too
- Minor ProcessCommand fixes


## [1.0.0] - 2025-Mar-01

I was going to make the v1 update which was planned to be the final update before LADR was going live, but this update was so big I couldn't do anything but to increment the major version.

The biggest change v1.0.0 brings is the english translation support. It also brings some performance optimizations and frontend updates!

Ignoring the minor bugs, you could argue that the LADR is ready to be shipped. All functionalities, at this stage, work as expected.

The v1.0.0 changelog brings its own new changelog style, which now categorizes changes into two groups: FRONTEND, and RENDERER. Each groups contain changes made to its respective groups. Learn more about it in the contributing guide.

Get ready for the biggest update log yet!

\- Cieron

### Added
- README - not finished
 
#### FRONTEND:
- TL2TJ information in the Home page - subject to change!

#### RENDERER:
- English translation support (applies to many files)
- New npm package: xxhashjs is added to be used by GetImage function. 
- Two ExcelTables, stripped off raw from the game, used for t9n and image displaying.
- ProcessT9nHash is used to process hashes for t9n.

### Changed
- Zustand is not used anymore to store user's preferred lang - that is done via URL.
- If user accesses webpage with no prior preferred lang info, LADR uses the browser's preferred lang.
- The modal has been changed to reflect this change

#### RENDERER:
- Speaker name is aligned to the right
- GetImage function is changed so it respects the actual file structure of the game.
- CpuNoIgnore is now removed - replaced with ProcessNestedArray!

### Removed
- LangSync, because Zustand is not used anymore to store user's preferred lang - so no need to sync!
#### RENDERER:
- Cpu is not used anymore

## [0.4.0] - 2025-Feb-21
### Added
- Root.jsx now updates the HTML lang as well as the internal lang
- Chinese and Thai in the Preferences modal for preferred lang
- Background images now are displayed, cropped to stripes. Only works if the image is present in the LADR images repository (LIR)

### Changed
- ProcessScript is now a functional **component**, and is moved outside useEffect in GetEpisode. ProcessScript now can use hooks
- ProcessScript maps its outputs itself instead of GetEpisode mapping it
- Cleaned up unused code
- Slight changes to htmlSelection array checking in ProcessScript (may be removed later)

### Fixed
- The highlighting of the Korean button in the Preferences modal

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

[1.2.0]: https://github.com/lorearchive/LADR/compare/v1.1.5...v1.2.0
[1.1.5]: https://github.com/lorearchive/LADR/compare/v1.1.4...v1.1.5
[1.1.4]: https://github.com/lorearchive/LADR/compare/v1.1.3...v1.1.4
[1.1.3]: https://github.com/lorearchive/LADR/compare/v1.1.2...v1.1.3
[1.1.2]: https://github.com/lorearchive/LADR/compare/v1.1.1...v1.1.2
[1.1.1]: https://github.com/lorearchive/LADR/compare/v1.1.0...v1.1.1
[1.1.0]: https://github.com/lorearchive/LADR/compare/v1.0.1...v1.1.0
[1.0.1]: https://github.com/lorearchive/LADR/compare/v1.0.0...v1.0.1
[1.0.0]: https://github.com/lorearchive/LADR/compare/v0.4.0...v1.0.0
[0.4.0]: https://github.com/lorearchive/LADR/compare/v0.3.4...v0.4.0
[0.3.4]: https://github.com/lorearchive/LADR/compare/v0.3.3...v0.3.4
[0.3.3]: https://github.com/lorearchive/LADR/compare/v0.3.2...v0.3.3
[0.3.2]: https://github.com/lorearchive/LADR/compare/v0.3.1...v0.3.2
[0.3.1]: https://github.com/lorearchive/LADR/compare/v0.3.0...v0.3.1
[0.3.0]: https://github.com/lorearchive/LADR/compare/v0.2.0...v0.3.0 
[0.2.0]: https://github.com/lorearchive/LADR/compare/v0.1.1...v0.2.0 
[0.1.1]: https://github.com/lorearchive/LADR/compare/v0.1.0...v0.1.1
