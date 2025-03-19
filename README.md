![image](https://github.com/user-attachments/assets/4ec8bb04-7ccc-473f-89c1-cd29a0d751ee)

# Lore Archive's Dialogue Reader

<div align="center">

![GitHub License](https://img.shields.io/github/license/lorearchive/LADR?style=flat)
![GitHub repo size](https://img.shields.io/github/repo-size/lorearchive/LADR?style=flat)
![GitHub branch status](https://img.shields.io/github/checks-status/lorearchive/ladr-json/main?label=LJR&style=flat)
![GitHub branch status](https://img.shields.io/github/checks-status/lorearchive/ladr-images/main?label=LIR&style=flat)

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


## Related repositories
- LADR's JSON Repository (LJR): https://github.com/lorearchive/ladr-json
- LADR's Images Repository (LIR): https://github.com/lorearchive/ladr-json

Note that the contents of the two repositories are NOT owned by the Lore Archive Project.


## About the reader

*Lore Archive's Dialogue Reader for Blue Archive*, often shortened to just **LADR**, is an online, web-based text story viewer for Blue Archive built from the ground up. It is written primarily in TypeScript and JavaScript, and uses React.

**Don't try contributing to the code!** I am going to re-write the application into Svelte.

This is my first big project which uses git and GitHub, and you may find me figuring things out by poking at everything.

### License
The codebase of LADR (excludes the Excel Tables found in `/data/ExcelTable` and the contents of the LJR and LIR) is licensed under the [MIT License](https://github.com/lorearchive/LADR/blob/main/LICENSE).

