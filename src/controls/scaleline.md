# Displaying a Scale Line

Another typical widget to display on maps is a scale bar.  OpenLayers 3 provides an `ol.control.ScaleLine` for just this.  

## Creating a ScaleLine Control

### Tasks

1.  Open the `map.html` in your text editor.

1.  Somewhere in the map config, add the following code to create a new scale line control for your map:

  ```js
    controls: ol.control.defaults().extend([
      new ol.control.ScaleLine()
    ]),
  ```

1.  Save your changes and open `map.html` in your browser: {{ book.workshopUrl }}/map.html

  ![A default scale bar in the bottom left-hand corner](./scaleline1.png)

## Moving the ScaleLine Control

You may find the scale bar a bit hard to read over the imagery. There are a few approaches to take in order to improve scale visibility.  If you want to keep the control inside the map viewport, you can add some style declarations within the CSS of your document. To test this out, you can include a background color and padding to the scale bar with something like the following:

```css
  .ol-scale-line {
    background: black;
    padding: 5px;
  }
```

However, for the sake of this exercise, let's say you think the map viewport is getting unbearably crowded. To avoid such over-crowding, you can display the scale in a different location. To accomplish this, we need to first create an additional element in our markup and then tell the scale control to render itself within this new element.

### Tasks

1.  Create a new block level element in the `<body>` of your page. To make this element easy to refer to, we'll give it an `id` attribute. Insert the following markup somewhere in the `<body>` of your `map.html` page. (Placing the scale element right after the map viewport element `<div id="map"></div>` makes sense.):

  ```html
    <div id="scale-line" class="scale-line"></div>
  ```

1.  Now modify the code creating the scale control so that it refers to the `scale-line` element:

  ```js   
    controls: ol.control.defaults().extend([
      new ol.control.ScaleLine({className: 'ol-scale-line', target: document.getElementById('scale-line')})
    ]),
  ```

1.  Save your changes and open `map.html` in your browser: {{ book.workshopUrl }}/map.html    

1.  Fix the position of the control with, for example, the following CSS rules:

  ```css    
    .scale-line {
      position: absolute;
      top: 350px;
    }
    .ol-scale-line {
      position: relative;
      bottom: 0px;
      left: 0px;
    }
  ```

1.  Now save your changes and view `map.html` again in your browser: {{ book.workshopUrl }}/map.html

  ![A scale line control outside the map viewport](scaleline2.png)


*Note* - To create a custom control you can inherit (by using `ol.inherits`) from `ol.control.Control`. To see an example of this check out: http://openlayers.org/en/master/examples/custom-controls.html.
