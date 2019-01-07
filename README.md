# Strawberry Survey

## Typeform inspired surveys built with React, Styled-components, and nwb.

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Strawberry Survey is currently in ACTIVE DEVELOPMENT and not ready for use by humans.

Strawberry survey is a survey component inspired by Typeform that you can add to your React application.
image goes here.

### Quick start

To install:
`npm --save strawberry-survey`
To start, import the Survey element and create an array of question items like this, or use the survey builder to create your survey array:

```
import Survey from 'strawberry-survey';

const survey = [
  {
    question: "Are you a robot?",
    type: "checkbox",
    required: true,
    options: {
      label: "I'm a robot"
    }
  },
  {
    question: "Do you like being a robot?",
    type: "checkbox",
    required: true
  }
];
```

..and pass it into the `Survey` component:

```
//and then, in your app...
<Survey items={survey}  />
```

To see the survey results, pass a `handleComplete` function to the survey:
(Note: This is not implemented yet.)

```
handleComplete = results => {
 console.log(results)
}

<Survey items={survey} onComplete={handleComplete}>
```

### Question Types

#### checkbox

The Checkbox component provides a simple checkbox. You can add an optional label, or specify it's requiredTrue, for instance if you need them to agree to something to continue the survey.
Example:

```
{
    question: "Are you a robot?",
    type: "checkbox",
    required: true, //optional, will default to false
    options: {
      label: "I'm a robot",
      requiredTrue: true, //if you need them to click the checkbox to indicate agreement to continue, use this
    }
  },
```

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
