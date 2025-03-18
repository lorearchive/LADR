# Contributing to LADR

Hey there, welcome to the GitHub page of LADR! I am excited that you are interested in the LADR project. This document will go over how the LADR works, so you can make your contributions, fixing what you want fixed, doing things you love.


## Reporting issues
If you find a bug, or something that doesn't seem quite right, there are a few ways of going about reporting. The easiest way is to open an issue in the [Issue Tracker](https://github.com/lorearchive/LADR/issues). When you do so, please make sure to include relevant information like your Device, operating system, browser and browser version, screen resolution, and a detailed description about your problem.

You can also email inquiries to me via email: `cirrow@proton.me`

**Issues regarding the translations** should be reported to the TL2TJ team, not here. Ask in the [Discord server](https://discord.gg/p5XW48HyXn).

To report **security vulnerabilities**, refer to the [Security vulnerabilities reporting manual](https://github.com/lorearchive/LADR/blob/main/SECURITY.md).

## Submitting pull requests
- I doubt that anyone would submit functional code changes, but if you do, please test the new LADR thoroughly in your dev server.

- None-functional updates like bugfixes and code refactoring doesn't require tests.


## Community and Communication
- Forums have not been set up yet. For now, you can use the [GitHub Discussions page](https://github.com/lorearchive/LADR/discussions).
  
  

## How LADR Works
### Quick URL Navigation
Quick URL Navigation, or QUN, is a URL structure pattern used in LADR to enable rapid navigation to and from stories using the URL address bar. The pattern is as follows:

`domain/storytype/volume/chapter/episode-sector`

For example, `ladr.lorearchive.org/main/3/2/3-1` returns Main Story, Volume 3, Chapter 2, Episode 3, Sector 1.

As you can see, QUN omits all story divisions and only focuses on the numbers only.

In LADR is a concept of **sectors** - which is a subdivision of an episode, divided by in-game combat. In the raw JSON files, different sectors are recognized as different story (evident from being given different story IDs), though still part of the same episode. That is why sectors are represented with a hyphen, next to the episode number. Episodes of main story only contain one sector or two sectors.


### How the Renderer works

In the context of LADR, the idea of *rendering* is the process of transforming the raw JSON data into stylized HTML format. The word *Renderer* is used to refer to the files involved with rendering. The files mostly live inside the `/src/scripts` directory, though same may be elsewhere.

 
The files of the renderer begins with either of these names: "Get", and "Process". This is the naming convention used to distinguish files and functions which are responsible for API calls (Get), and files and functions responsible for transforming a given data (Process).


#### 1. Fetch the JSON
The raw JSON data are stored inside a remote GitHub repository and fetched via GitHub API. Therefore, there may be rate limits during the beta phase.

The file responsible for fetching the raw JSON is `GetEpisode`. As of now, it only has support for main story.

Once the wanted story is extracted from the URL, GetEpisode performs a search in the LJR (LADR's JSON Repository). The files inside LJR follows a specific pattern. That is,

`VolumeX/ChapterX/EpisodeX-sX.json`

where X is a number. In order, they stand for volume number, chapter number, episode number then sector number.
