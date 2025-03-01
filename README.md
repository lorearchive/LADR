![image](https://github.com/user-attachments/assets/4ec8bb04-7ccc-473f-89c1-cd29a0d751ee)

# Lore Archive's Dialogue Reader

<div align="center">

![GitHub License](https://img.shields.io/github/license/lorearchive/LADR)
![GitHub branch status](https://img.shields.io/github/checks-status/lorearchive/ladr-json/main?label=LJR)
![GitHub branch status](https://img.shields.io/github/checks-status/lorearchive/ladr-images/main?label=LIR)

</div>


## For local developments
Clone the repository, then run
```bash
cd LADR
npm i
npm run dev
```


Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## About the reader

*Lore Archive's Dialogue Reader for Blue Archive*, often shortened to just **LADR**, is an online, web-based text story viewer for Blue Archive built from the ground up. It is written primarily in TypeScript and JavaScript.


## Files
The project's file stucture largely consists of the following directories:
- **data/** contains files which do not belong to src, public, or state
- **public/** contains image files which are used outside of the story render
- **src/** contains files responsible for the website & rendering of the website



## For power users
### QUN
Quick URL Navigation, or QUN, is just a fancy word for the URL structuring protocol at LADR. It omits words like "Volume", "Chapter" or "Episode" and lets users quickly navigate to an episode of their choice by simply writing the numbers only.
