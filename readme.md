# SliderPlex

A simple and responsive jQuery content slider plugin

## Table of contents

 - [Installation](#installation)
 - [Usage](#usage)
 - [Contribute](#contribute)
 - [Credits](#credits)
 - [License](#license)

## Installation

Install it using one of the follows options:

1. Using [Git][https://pt.wikipedia.org/wiki/Git]:

    git clone git://github.com/e200/SliderPlex.git

2. Using [Bower](https://bower.io/) (recommend):
    
    bower install unity/config

using a **terminal/prompt** in your project folder.

Add jQuery and SliderPlex CSS and JavaScript files to your page <head>:

```html
<head>
    <link rel="stylesheet" href="src/css/SliderPlex.min.css">
    
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script src="src/SliderPlex.min.js"></script>
</head>
```

## Usage

First, setup the slider structure:

```html
<div class="slider">
    <ul>
        <li><img src="images/slides1.jpg"></li>
        <li><img src="images/slides2.jpg"></li>
        <li><img src="images/slides3.jpg"></li>
        <li><img src="images/slides4.jpg"></li>
        <li><img src="images/slides5.jpg"></li>
    </ul>
</div>
```
Sets how many slides you want. Then, initialize the SliderPlex with the slide element above the body close tag:

```html
    <script>
        $('.slider').SliderPlex();
    </script>
</body>
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
            
        <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="src/SliderPlex.min.js"></script>
    </head>
    
    <body>
        <div class="slider">
            <ul>
                <li><img src="images/slides1.jpg"></li>
                <li><img src="images/slides2.jpg"></li>
                <li><img src="images/slides3.jpg"></li>
                <li><img src="images/slides4.jpg"></li>
                <li><img src="images/slides5.jpg"></li>
            </ul>
        </div>
        
        <script>
            $('.slider').SliderPlex();
        </script>
    </body>
</html>
```

And, voila... It's working!!!

## Options

:/

## Contributing

To contribute, please, read the [contributing](https://github.com/e200/SliderPlex)
## Credits

 - [Eleandro Duzentos](https://e200.github.com/) and contributors.
 
## License
 
The SLiderPlex is licensed under the MIT license. See [License](https://github.com/) file for more information.