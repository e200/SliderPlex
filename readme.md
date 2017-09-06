# SliderPlex

A simple and responsive jQuery content slider plugin. See a [demo](https://e200.github.io/SliderPlex/demo/).

## Table of contents

 - [Installation](#installation)
 - [Usage](#usage)
 - [Options](#options)
 - [Contribute](#contribute)
 - [Credits](#credits)
 - [License](#license)

## Installation

Install it using one of the follow options:

1. Using [Git](https://pt.wikipedia.org/wiki/Git):

    git clone git://github.com/e200/SliderPlex.git

2. Using [Bower](https://bower.io/docs):

    bower install sliderplex

in a **terminal/prompt** in your project folder, then add *jQuery* and **SliderPlex** files (CSS & JavaScript) to your page:

```html
<head>
    <link rel="stylesheet" href="src/css/SliderPlex.min.css">

    <!-- jQuery must be before SliderPlex -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="src/SliderPlex.min.js"></script>
</head>
```

## Usage

First, setup your slider structure:

```html
<div id="slider">
    <ul>
        <li><img src="images/slides1.jpg"></li>
        <li><img src="images/slides2.jpg"></li>
        <li><img src="images/slides3.jpg"></li>
        <li><img src="images/slides4.jpg"></li>
        <li><img src="images/slides5.jpg"></li>
    </ul>
</div>
```
Sets how many slides you want. Then, initialize the SliderPlex before the body close tag:

```html
<script>
    $('#slider').SliderPlex();
</script>
```

Full usage code:

```html
<!DOCTYPE html>
<html lang="pt">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">

        <title>SliderPlex example</title>

        <link rel="stylesheet" href="src/css/SliderPlex.min.css">

        !-- jQuery must be before SliderPlex -->
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="src/SliderPlex.min.js"></script>
    </head>

    <body>
        <div id="slider">
            <ul>
                <li><img src="images/slides1.jpg"></li>
                <li><img src="images/slides2.jpg"></li>
                <li><img src="images/slides3.jpg"></li>
                <li><img src="images/slides4.jpg"></li>
                <li><img src="images/slides5.jpg"></li>
            </ul>
        </div>

        <script>
            $('#slider').SliderPlex();
        </script>
    </body>
</html>
```

And... That's it!!! :)

## Options

You can pass an object containing options to the SliderPlex initialization method:

```js
$('.slider').SliderPlex({
    autoPlay: false,
    animation: 'fade'
});
```

##### Available options:

```
autoPlay         | default: true
slideInterval    | default: 8 (sec)                       
animation        | default: 'fade'.[fade, zoom, slide]
animationTime    | default: .5 (sec)
direction        | default: 'right'
arrows           | default: true
nonFocusArrows   | default: false
pauseOnMouseOver | default: false
pauseOnMouseDown | default: true
fillSpace        | default: true
 ```

## Contributing

To contribute, please, read [contributing](https://github.com/e200/SliderPlex).
## Credits

 - [Eleandro Duzentos](https://e200.github.com/) and contributors.

## License

The SliderPlex is licensed under the MIT license. See [License](https://github.com/) file for more information.
