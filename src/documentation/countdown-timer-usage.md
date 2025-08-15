# Countdown Timer Web Component Usage

## Overview

The Countdown Timer Web Component provides a flexible, cross-framework countdown timer. Users can set it up to either:

1. Directly use the `seconds-left` input to count down a specified number of seconds, or
2. Fetch the starting countdown value dynamically from an external API via the `api-endpoint` input.

Once the countdown reaches zero, the component emits a `deadlineReached` event. It also provides robust error handling for invalid inputs and API errors, making it user-friendly and reliable.

## Installation

### Vanilla JavaScript

Add the following scripts to your HTML file:

```html
<script src="path-to-main.main.js"></script>
<script src="path-to-polyfills.js"></script>
```

### Angular Integration

1. Add the `<countdown-timer>` component to your Angular application. It requires no additional setup.
2. Provide the following inputs:

   - `seconds-left` (number, optional): Specifies the countdown duration in seconds. If this input is not provided, the `api-endpoint` input must be specified.
   - `api-endpoint` (string, optional): URL of the API endpoint to fetch the countdown's starting value. The API response must be in the format: `{ seconds-left: number }`.

3. Subscribe to the `deadlineReached` event to perform actions when the countdown finishes.

Example:

```html
<countdown-timer seconds-left="60" (deadlineReached)="onDeadlineReached()"></countdown-timer>

<countdown-timer api-endpoint="https://myapi.com/countdown-start" (deadlineReached)="onDeadlineReached()"></countdown-timer>
```

## Error Handling

The component will display an error message in the following cases:

- No valid input (`seconds-left` or `api-endpoint`) is provided.
- The API fails or an invalid response is received.
- An invalid countdown duration (e.g., zero or negative values) is specified.

### Example Code

Refer to the public folder index.html file
