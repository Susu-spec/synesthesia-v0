# synesthesia-v0

A music visualiser created using p5.js, and html, and vanilla css.
> I'll create a link to this version of the project after it is successfully migrated to [React.js](https://react.dev/).
> This version is my first draft of the visualiser.

## Resources used
- [The Aesthetic Programming Handbook](https://aesthetic-programming.net/)
- 3d Cartesian Planes on youtube.
- [Particle Rendering Systems](https://www.karlsims.com/particle-dreams.html) || [Link to Paper](https://www.karlsims.com/papers/ParticlesSiggraph90.pdf) || [Coding Train Implementation on Youtube](https://www.youtube.com/watch?v=syR0klfncCk)
- A lot of inspiration.

## Future Development
- Migration to React.js
- Addition of a user input audio button
- Some extra lerping color motion
- And moving text.

## General Notes
> I have a lot to say about the migration process, particularly the p5.js library addon problem with React.js. I've been here for days. 
<br>
> [Fix](https://github.com/P5-wrapper/react/issues/61) - Could be one of these issues, in my case, p5Sound did exist within my node_modules folder, I had to delete the folder and reinstall the packages.
<br>
> [Fix](https://github.com/processing/p5.js/issues/4479) - "ReferenceError: p5 is not defined", this has to do with how modern bundlers handle p5 and its addons. I'm not sure why the p5.js maintainers haven't solved this issue, I'll probably create a bug report if I don't find one.
