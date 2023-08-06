# Kaboodle Frontend Technical Test

This repo contains my submission for the Kaboodle Frontend Technical Challenge. It was created using [Create React App](https://github.com/facebook/create-react-app). It can be run by cloning the repository, navigating to the cloned folder and running:

`npm install`

`npm start`

## Summary

Based on the test overview, a simple UI has been created to display the required data for each accommodation in the provided `.json` file. Material UI's React component library was used to streamline the creation of this UI, leaving most components with their default Material UI styling to save time.

Karoomdle contains two views: a list view and a single accommodation view. In the list view, a small subset of the data corresponding to a property can be seen on an `AccommodationCard`. A preview of the property's description is visible, with a button allowing the user to see the full description. There is also a button allowing the user to move to the single accommodation view and see the full details for a specific property.

In the single accommodation view, additional information such as address, facilities and room types are included. The details in this view fulfill the requirements of the technical test, and have been included in a separate view as this much information felt too much to display in a list, but would be vital for a user to see if they are interested in a specific property.

## Areas To Improve

Below are a few thoughts for areas of this app which could be improved or developed further with more time.

### Accessibility

With more time, the accessibility of this UI should be investigated. The tabbing order seems to be sensible, but how a screen reader would navigate this page has not been looked into. Some components might need suitable labels to make them more descriptive. The use of default MUI styling should mean that fonts and colours are suitable for users with accessibility requirements.

### Responsive Layout

The UI layout is partially responsive, adjusting for narrower viewports. With more time, this should be tested on mobile devices directly to see whether the layout is suitable and easy to use.

### Design

This UI would benefit from a design overhaul, which could be done through the `Theme` API provided by MUI. Colour schemes and fonts could be created and implemented to give the UI some branding and some adjustments might be required to layout and to which pieces of information are available where, to make the experience as smooth for users as possible. This work would be best done collaboratively with experienced designers.

### Test Coverage

Basic unit tests are included for some components, but some of the functionality within `App` has not been tested, such as the data "enrichment" function. This function should have unit tests to ensure it manipulates data objects correctly. If this was a public facing app, various other testing methods should be implemented such as visual regression testing for components.

### Displaying All Data

Some data included in the data files is not displayed, due to it being out of the scope of the test requirements. With more time it would be logical to display as much of this data as is considered useful.

### More Filtering Options

Similarly to data that isn't displayed, the filtering options are not exhaustive but are sufficient to demonstrate how further filtering would be implemented. For example, filtering by facilities would be logical and simple to add.
