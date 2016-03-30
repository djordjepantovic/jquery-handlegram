# jquery-handlegram

__Example:__

- [djordjepantovic.github.io/jquery-handlegram/](http://djordjepantovic.github.io/jquery-handlegram/)

## Installation
Setting up Handlegram is pretty straight-forward. Just download the script and include it in your HTML:

```html
<script src="path/to/handlegram.jquery.min.js"></script>
```

## Basic Usage

Here's how easy it is to get all images tagged with __#awesome__:

```html
<script>
    $('.some-elem').handlegram({
        get: 'tag',
        tagName: 'awesome',
        template: $('#handlebars-template'),
        clientId: 'YOUR_CLIENT_ID'
    });
</script>
```

You can easily change this behavior using [options](#options).

## Requirements

- valid __client id__ from [Instagram's API](http://instagram.com/developer/register/)
- [jquery](https://github.com/jquery/jquery) (1.5 and greater)
- [handlebars.js](http://handlebarsjs.com/installation.html)

## Options

- `clientId` - __Required__. Your API client id from Instagram
- `template` - Custom HTML template using [Handlebars](http://handlebarsjs.com). See [templating](#templating)
- `get` - Customize what Handlegram fetches.
	- `popular` (default) - Images from the popular page
	- `tag` - Images with a specific tag. Use `tagName` to specify the tag
	- `location` - Images from a location. Use `locationId` to specify the location
	- `user` - Images from a user. Use `userId` to specify the user
- `tagName` (string) - Name of the tag to get. Use with `get: 'tag'`
- `locationId` (number) - Unique id of a location to get. Use with `get: 'location'`
- `userId` (number) - Unique id of a user to get. Use with `get: 'user'`
- `limit` - Maximum number of Images to add. (default 10)
- `resolution` - Size of the images to get. Available options are:
	- `thumbnail` - 150x150
	- `low_resolution` (default) - 306x306
	- `standard_resolution` - 612x612
- `onComplete` (function) - A callback function called when images have been added to the page

## Templating

The easiest way to control the way Handlegram looks on your website is to use the __template__ option. Handlebars provides the power necessary to let you build semantic templates effectively.

```html
<div class="handlegram">
	<script id="instagram-template" type="text/x-handlebars-template">
		{{#each this}}
		<div class="photo-box">
			<div class="image-wrap">
                <a href="{{link}}"><img src="{{image}}"></a>
            </div>
            <div class="description">
            	<strong>{{likes}} Likes</strong>
            	<small>{{caption}}</small>
            </div>
		</div>
		{{/each}}
	</script>
</div>

<script>
    $('div.handlegram').handlegram({
        get: 'popular',
        tagName: 'awesome',
        clientId: 'YOUR_CLIENT_ID',
        template: $('#instagram-template')
    });
</script>
```

The templating option provides several tags for you to use to control where variables are inserted into your HTML markup. Available keywors are:

- `{{image}}` - URL of the image source. The size is inherited from the `resolution` option
- `{{likes}}` - Number of likes
- `{{caption}}` - Image's caption text
- `{{link}}` - URL to view the image on Instagram's website
- `{{username}}` - Username of the user
- `{{date}}` - Date in format dd/mm/yyyy
