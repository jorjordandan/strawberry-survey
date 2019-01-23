# Strawberry Survey

## Typeform inspired surveys built with React, Material ui, and React-Spring.

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

Strawberry Survey is currently in ACTIVE DEVELOPMENT and not ready for use by humans.

Strawberry survey is a survey component inspired by Typeform that you can add to your React application.
image goes here.

### Quick start

To install:
`npm --save strawberry-survey`
To start, import the Survey element and create an array of question items:

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
 console.log(results);
}
//output:
[
  {
    question: "Are you a robot?"
    completed: true,
    skipped: false,
    response: [true] //responses depend on question type.

  },
  {
  question: "Do you like being a robot?",
  completed: true,
  skipped: false,
  response: [true]
  }
]

<Survey items={survey} onComplete={handleComplete}>
```

### Question Types

#### checkbox

The Checkbox component provides a simple checkbox. You can add an optional label, or specify it's requiredTrue, for example, if you need the user's consent to continue the survey.
Example:

```
{
    question: "Are you a robot?",
    type: "checkbox",
    required: true, //optional, will default to false
    options: {
      label: "I'm a robot",
      requiredTrue: true, //if you need users to indicate agreement to continue, use this
    }
  },
```

All responses are returned as arrays, which may contain ints, strings, or booleans, depending on the question type. A checkbox response is a boolean in an array:

```
[
  {
    question: "Are you a robot?",
    completed: true,
    skipped: false,
    response: [true] //example checkbox response
  }
]
```

#### text input

Provides a text input. You can add an optional label.
Example:

```
{
    question: "What is your name?",
    type: "textInput",
    required: true, //optional, defaults false
    options: {
      label: "Your name:", optional, default none
    }
  },
```

A text input response looks like this:

```
[
  {
    question: "What is your name?",
    completed: true,
    skipped: false,
    response: ["Robo-man"] //example checkbox response
  }
]
```

#### section

Provides a new section, or starting page.
Example:

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo
[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
