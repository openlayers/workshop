.. module:: openlayers.controls
    :synopsis: Learn about using map interactions and controls.

.. _openlayers.controls:

Working With Interactions and Controls
======================================

In ol3, interactions and controls provide a way for users to interact with your map. Controls have a visual representation while interactions are invisible to the user. When you create a map with the default options, you are provided with a few visible default controls. These are: ol.control.Attribution, ol.control.Logo and ol.control.Zoom.
The default interactions are: ol.interaction.DragRotate, ol.interaction.DoubleClickZoom, ol.interaction.TouchPan, ol.interaction.TouchRotate, ol.interaction.TouchZoom, ol.interaction.DragPan, ol.interaction.KeyboardPan, ol.interaction.KeyboardZoom, ol.interaction.MouseWheelZoom and ol.interaction.DragZoom.


.. rubric:: What this module covers

This module covers the basics of using interactions and controls in ol3. In this module you will create a scale line control and an interaction to select features.

.. toctree::
    :maxdepth: 1
    
    Create a scale line. <scaleline>
    Allow users to select features. <select>
