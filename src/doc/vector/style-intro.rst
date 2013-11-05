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

ol.expr.Expression
------------------

When styling features in ol3, your selectors are ``ol.expr.Expression`` objects which you create by using ``ol.expr.parse``.  Assuming you want to apply a style to all features that have an  attribute named ``class`` with a value of ``"someClass"``, you would start with an expression like the following:

.. code-block:: javascript

    filter: ol.expr.parse('class === "someClass"')

Symbolizers
-----------

The equivalent of a declaration block in CSS is a `symbolizer` in ol3 (these are typically instances of ol.style.*). To paint polygon features with a blue background and a 1 pixel wide olive stroke, you would use two symbolizers like the following:

.. code-block:: javascript

    new ol.style.Fill({
      color: 'blue'
    }),
    new ol.style.Stroke({
      color: 'olive',
      width: 1
    })

ol.style.Rule
---------------

To combine a filter with a symbolizer, we use an ``ol.style.Rule`` object. As such, a rule that says `"paint all features with class equal to 'someClass' using a 1px olive stroke and blue fill"` would be created as follows:

.. code-block:: javascript

    new ol.style.Rule({
      filter: ol.expr.parse('class === "someClass"'),
      symbolizers: [
        new ol.style.Fill({
          color: 'blue'
        }),
        new ol.style.Stroke({
          color: 'olive',
          width: 1
        })
      ]
    })

ol.style.Style
----------------

As in CSS page, where you may have many rules-- selectors and associated declaration blocks--you are likely to have more than one rule for styling the features of a given map layer. You group ``ol.style.Rule`` objects together in an ``ol.style.Style`` object. A style object is typically constructed with base symbolizers. When a feature is rendered, the base symbolizers are extended with symbolizers from all rules that apply to the feature.

So, if you want all features to be colored red except for those that have a ``class`` attribute with the value of ``"someClass"`` (and you want those features colored blue with an 1px olive stroke), you would create a style that looked like the following:

.. code-block:: javascript

    var myStyle = new ol.style.Style({
      symbolizers: [new ol.style.Fill({color: 'red'})],
      rules: [
        new ol.style.Rule({
          filter: ol.expr.parse('class === "someClass"'),
          symbolizers: [
            new ol.style.Fill({
              color: 'blue'
            }),
            new ol.style.Stroke({
              color: 'olive',
              width: 1
            })
          ]
        })
      ]
    });

.. note ::

    If you don't include any rules in a style, `all` of the features in a layer will be rendered with the base symbolizers.

Pseudo-classes
--------------

CSS allows for pseudo-classes on selectors. These basically limit the application of style declarations based on contexts such as mouse position, neighboring elements, or browser history, that are not easily represented in the selector. In ol3, a somewhat similar concept is one of "render intent." Without defining the full set of render intents that you can use, the library allows for sets of rules to apply only under specific contexts.

An example of using render intent is (renderIntent is a function registered in ol3 with ``ol.expr.register``):

.. code-block:: javascript

    style: new ol.style.Style({
      rules: [
        new ol.style.Rule({
          filter: 'renderIntent("selected")',
          symbolizers: [
            new ol.style.Fill({
              color: '#ffffff',
              opacity: 0.5
            })
          ]
        })
      ],
      symbolizers: [
        new ol.style.Fill({
          color: '#ffffff',
          opacity: 0.25
        }),
        new ol.style.Stroke({
          color: '#6666ff'
        })
      ]
    })

To determine how features in a vector layer are styled, you need to construct the layer with an ``ol.style.Style``. 

With the basics of styling under your belt, it's time to move on to :ref:`styling vector layers <openlayers.style>`.
