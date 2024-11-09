Multiply Code Task
====================

Multiply’s app uses a conversational interface to collect information. This task is to build a simple version of this in React. Please feel free to use Typescript or Javascript.

## Task

Write a simple React component that can render a series of questions and responses from text inputs, number inputs and dropdowns depending on the props provided, as well as a “Done” button once all questions are complete.

* Don’t use any external form library.

You should make clear the structure of the props your component expects. In particular, we would expect to be able to configure via props:

* The questions asked, the data type / validation of any answers
* The existing user data at the start of the conversation
* The conditions under which to ask a particular question

Use the following as your test case:
* What is your first name?
        * Expects a string
* How old are you?
        * Expects a number
        * Should be >= 18 and < 65 years old
* Do you have a significant other?
        * Expects True / False
* What is your significant other’s name?
        * Expects a string
        * Only asked if the answer to the previous question is true
* What is your last name?
        * Expects a string

Questions should appear one by one, in sequence. A question should appear once the answer to the previous question is complete and valid, triggered by onBlur. Once a field has been touched, it should be highlighted if it is invalid - how you show this is up to you.

The “Done” button should appear when the conversation is otherwise complete, and on press should show a simple success message.

In particular, we’ll be looking out for clean logic and component reusability/extensibility.

**Please send a zipped file of your code, including any comments to mike@multiply.ai.**


Good luck!
