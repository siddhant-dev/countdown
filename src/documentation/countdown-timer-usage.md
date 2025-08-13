# Countdown Timer Web Component Usage

## Overview
The Countdown Timer Web Component provides a cross-framework timer for countdown functionalities. It supports two input mechanisms: direct countdown through seconds or fetching external time values via an API. The component emits an event once the countdown reaches zero.

## Installation
Include the bundled JavaScript in your HTML or import it into your framework project:

### Vanilla JavaScript
1. Add the following script to your HTML:
```html
<script src="path-to-main.main.js"></script>
<script src="path-to-polyfills.js"></script>
```

### Angular Integration
No extra steps are required; simply use `<countdown-timer>` with its input parameters `seconds-left` number input or provide the api endpoint as `api-endpoint` which is string input, the framework supports and listens design slots apps."""

### Example code 
You can find the sample code on how to use it inside public folder. 