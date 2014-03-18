.. _openlayers.vector.style-intro:

Understanding Style
===================

When styling HTML elements, you might use CSS like the following:

.. code-block:: html

    .someClass {
        background-color: blue;
        border-width: 1px;
        border-color: olive;
    }

The ``.someClass`` text is a selector (in this case it selects all elements that include the class name ``"someClass"``) and the block that follows is a group of named properties and values, otherwise known as style declarations.

ol.feature.StyleFunction
------------------------

A vector layer can have a function for the ``style`` config in which a different style will be chosen based on some attribute of a feature. The style function gets two arguments: the ``feature`` and the ``resolution``. Assuming you want to apply a style to all features that have an attribute named ``class`` with a value of ``"someClass"``, you would start your style function with the following:

.. code-block:: javascript

    style: function(feature, resolution) {
      if (feature.get('class') === 'someClass') {
        // return the style
      }
    }

Symbolizers
-----------

The equivalent of a declaration block in CSS is a `symbolizer` in OpenLayers 3 (these are typically instances of ol.style.*). To paint polygon features with a blue background and a 1 pixel wide olive stroke, you would use two symbolizers like the following:

.. code-block:: javascript

    new ol.style.Style({
      fill: new ol.style.Fill({
        color: 'blue'
      }),
      stroke: new ol.style.Stroke({
        color: 'olive',
        width: 1
      })
    });

Depending on the geometry type, different symbolizers can be applied. Lines work like polygons, but they cannot have a fill. Points can be styled with ``ol.style.Circle`` or ``ol.style.Icon``. The former is used to render circle shapes, and the latter uses graphics from file (e.g. png images). Here is an example for a style with a circle:

.. code-block:: javascript

    new ol.style.Circle({
      radius: 20,
      fill: new ol.style.Fill({
        color: '#ff9900',
        opacity: 0.6
      }),
      stroke: new ol.style.Stroke({
        color: '#ffcc00',
        opacity: 0.4
      })
    });

ol.style.Style
----------------

An ``ol.style.Style`` object has 4 keys: ``fill``, ``image``, ``stroke`` and ``text``. It also has an optional ``zIndex`` property. The style function will return an array of ``ol.style.Style`` objects.
If you want all features to be colored red except for those that have a ``class`` attribute with the value of ``"someClass"`` (and you want those features colored blue with an 1px wide olive stroke), you would create a style function that looked like the following (by the way, it is important to create objects outside of the style function so they can be reused, but for simplicity reasons the objects are created inline in the example below):

.. code-block:: javascript

    style: (function() {
      var someStyle = [new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'blue'
        }),
        stroke: new ol.style.Stroke({
          color: 'olive',
          width: 1
        })
      })];
      var otherStyle = [new ol.style.Style({
        fill: new ol.style.Fill({
          color: 'red'
        })
      })];
      return function(feature, resolution) {
        if (feature.get('class') === "someClass") {
          return someStyle;
        } else {
          return otherStyle;
        }
      };
    }())

.. note ::

    It is important to create the style arrays outside of the actual function. This can be done with a closure as done in the example above.

.. note ::

    A feature also has a style config option that can take a function having only resolution as argument. This makes it possible to style individual features (based on resolution).

Pseudo-classes
--------------

CSS allows for pseudo-classes on selectors. These basically limit the application of style declarations based on contexts that are not easily represented in the selector, such as mouse position, neighboring elements, or browser history. In OpenLayers 3, a somewhat similar concept is having a style config option on a feature overlay. The feature overlay is used to show the selected feature of an ``ol.interaction.Select`` and gets its own style config option.

An example is:

.. code-block:: javascript

    var select = new ol.interaction.Select({
      featureOverlay: new ol.FeatureOverlay({
        style: new ol.style.Style({
          fill: new ol.style.Fill({
            color: 'rgba(255,255,255,0.5)'
          })
        })
      })
    });

With the basics of styling under your belt, it's time to move on to :ref:`styling vector layers <openlayers.style>`.
