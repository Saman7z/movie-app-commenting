# The project belongs to the original developer which is dang connie, you can find her below:

[Origina GitHub Repo](https://github.com/dangconnie/movie-app)

#### I only contributed on commenting to different parts :)

## Guidance for reading comments:

    1. //  : Comments which helps to understand the overal functionality
    2. //! : Comments which I recommend for better functionality
    3. To have a better experience reading comments you could use "Better Comments" extension in vscode

## Most important issues with the source code :

HTML:

1. intergrity attribute and `crossorigin="anonymous"` should have been added to external links
2. Lacks SEO TAGS
3. should have added `<meta name="viewport" content="width=device-width, initial-scale=1.0">`
4. should have added `<meta charset="UTF-8">`
5. Adding all external JS import in the head and not before the ending body tag
6. Not having the screen reader friendly UI in the content listing section
7. Img Tags which are injected through JS lack height, width, alt attributes which is essential for Seo
8. The other things which I thought could be an issue mentioned in the HTML file as comment

Javascript:

1. The most important issue is not using the DRY(don't repeat yourself) method which made the code hard to read and inefficient.
2. Using var instead of let and const.
3. Not adding apiBaseURL and imageBaseUrl in config file.
4. there should be a back up plan for the case of NO INTERNET connetion.
5. Again not using es6 features like destructuring which would have make her life much easier instead of for example declaring nowPlayingData.results[i].release_date which looks counter intuitive
6. poor variable naming choices
7. redeclaring functions which could have been outsourced and used multiple times
8. Getting user input data without any cleaning or checking before hand
9. Not checking for any undefined or null data which could possibly come back from fetching

CSS:
1. Not Mobile friendly

Other Issues:

1. there is a unused cat.jpeg image in source folder!
