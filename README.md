<div id="top"></div>
<h3 align="center">Filebase <i>beta</i></h3>
<p align="center">
    Filebase is like a database for your files and directories. It's just not another file explorer. You can tag, add notes, organize, categorize, filter, search and quickly find your needed files with an easy-to-use application. Filebase does not modify your existing files or directories and is designed for people who have a lot of files to keep track of and want to keep them organized and located quickly! There are other file utilities on the market but none focus on organization.
    <br />   
</p>

# Table of Contents

1. [About](#About)
2. [Built with](#Built with)
3. [Installing and running application in dev.](#Installingandrunningapplicationindev)
4. [Roadmap](#Roadmap)
5. [Contributing](#Contributing)
6. [License](#License)
7. [Contact](#Contact)

## About Filebase

Filebase was created out of frustration, I was watching my partner go through her Cricut project images one by one and trying to organize them, I noticed there is no real way to keep track of files and directories with Windows Explorer. Other tools on the market focused on archiving and some modified the files. Searching in Windows Explorer is marginal at best. You can add an attribute to files, but it is slow. I wanted to learn Electron and frustration was the catalyst for Filebase!. If anyone remembers Picasa image viewer from Google that application was the general idea for this application. It was just easy to use and fast. I want to keep this application simple to use and fast no feature bloat.

Filebase is in the early design stages and will be changed often. I can't guarantee that updates will be backwards compatible. Feel free to try but please wait for the first release before you create a bunch of libraries!  

Under the hood Filebase uses PouchDB to store file and directory structure using a tree type structure, each of these nodes in the tree can have metadata added to it that will be searchable. This is what makes Filebase unique, a library is a snapshot of a file or directory when its created, if the file structure changes you can reindex the directory. If a file or directory is missing you can remove the reference to it or keep it in the index. 

Screenshots of the application.

Main view with created libraries, a library can be a directory or file. If it is a directory Filebase scans the entire directory and indexes it.

![](/assets/github-images/main.jpg)

Library view with files in directory.

![](/assets/github-images/library-view.jpg)

Create a new library - choose a directory or file to index.

![](/assets/github-images/create-library.jpg)

Drive info shown.

![](/assets/github-images/drive-info.jpg)

Settings - choose file extensions to index.

![](/assets/github-images/settings.jpg)

Filebase will always remain free and the another goal is to have cross-platform usability.

<p align="right">(<a href="#top">back to top</a>)</p>

### Built with

* [Electron](https://www.electronjs.com)
* [electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate)
* [React.js](https://reactjs.org/)
* [Pouchdb](https://pouchdb.com/)
* [Bootstrap](https://getbootstrap.com)

<p align="right">(<a href="#top">back to top</a>)</p>

## Installing and running application in dev

Currently, there is no installation package because project is under active development.

If you want to try it in dev, clone the repo and then run npm install, then npm start.

You might need to remove pouchdb package from the main package file when npm install is run. After install is run just add it back and run npm start.

## Roadmap

The feature list is the following
Library creation and edit.
Searching of libraries.
File and directory filtering, easy drill down.
Searchable metadata related to the libraries and files.
Export of database to JSON so it cn be backed up.
Archiving of entire libraries safely so tht original files are not damaged.
Archived libraries will still be searchable so that finding archived files and directories is easy to do.
UnArchiving of libraries safely.

See the [open issues](https://github.com/kbrisso/file-base/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p>

## Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<p align="right">(<a href="#top">back to top</a>)</p>

## Contact

Kevin Brisson - [LinkedIn](https://www.linkedin.com/in/kevin-brisson-918445185/) - kbrisso@gmail.com

Project Link: [https://github.com/kbrisso/file-base](https://github.com/kbrisso/file-base)

<p align="right">(<a href="#top">back to top</a>)</p>





