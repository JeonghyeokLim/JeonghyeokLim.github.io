# Jeonghyeok Lim — Personal Academic Website

A responsive personal website for robotics research, projects, publications, and contact information.

## Live website

`https://jeonghyeoklim.github.io`

GitHub Pages may take a few minutes to publish after a commit.

## Files

- `index.html`: all website text, links, and sections
- `assets/styles.css`: colors, layout, animation, and mobile design
- `assets/script.js`: dark/light mode, mobile navigation, and scroll effects

## Quick edits

### Replace the profile image

Upload a photo as `assets/profile.jpg`, then change the profile image line in `index.html` to:

```html
<img src="assets/profile.jpg" alt="Jeonghyeok Lim" />
```

### Add a CV

Upload the file as `assets/Jeonghyeok_Lim_CV.pdf`, then add this button near the hero buttons:

```html
<a class="button ghost" href="assets/Jeonghyeok_Lim_CV.pdf" target="_blank">CV</a>
```

### Add email and academic links

Edit the Contact section in `index.html` and add links for email, Google Scholar, LinkedIn, or your laboratory page.

### Add a publication

Replace the placeholder inside the `publications` section of `index.html` with your paper title, author list, venue, PDF, project page, and code links.

## Design notes

The website uses only HTML, CSS, and JavaScript. No build step or external framework is required.
