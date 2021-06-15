# Abercrombie Client-Side Developer Skill Assessment
1. Clone this repository.
2. Complete exercises below by creating/modifying code in their respective folders. You can architect the project how you like re: folder structure, how you name your files, etc. Use your best judgement as a developer.
3. Push the code to your own public Git repository, and send the link to your recruiter / rep.
4. Pretend your code is going into a PRODUCTION environment, or that you are writing a pull request for an established open source project. Do not rush these exercises or cut corners in the name of speed. We aren't interested in the code you can write under pressure; no one writes amazing code when they are rushing. This is your chance to show off. Write your best code.
5. **This exercise is to be completed without coaching or other outside assistance. Obviously, you may feel free to use whatever online resources you like -- MDN, StackOverflow, etc -- but it is not acceptable to utilize other developers to help you finish this task.** 

***

## Exercise 1: Consuming RESTful API data
1. `yarn install`
2. `yarn start` to run the server
3. `localhost:3000`

***

## Exercise 2: Task Tracker Enhancement
[Task Tracker](./exercise-2/index.html)

The above link is to a simple task-tracker app. The JS has many errors and inefficiencies that need to be fixed. There is also additional functionality that has to be added.  This is an open-ended assessment meant to measure your skill in key areas like javascript, CSS, HTML, and accessibility.

Solve the problems presented in whatever way you deem most appropriate and in keeping with today's standards, with the following caveats/limitations:

    * Vanilla JS only, no jQuery or frameworks. This test is to see if you understand javascript, so no shortcuts.
    * Do not use any JS plugins. Same reason as above.
    * Use Sass for any styles.

#### Fixes
1. Break the contents of the HTML file into pieces that follow a logical separation of concerns for the browser.
2. Fix any invalid HTML
3. Fix any JS errors / inefficiencies.
5. Utilize closures to prevent pollution of the global object with app code

#### Features
1. `Uncompleted` - Make the form keyboard-accessible
2. `Completed` - Add support for localStorage such that refreshing the page does not reset your task list
3. `Completed` - Add form validation such that an empty task cannot be submitted.
4. `Completed` - Convert float-based layouts to flexbox-based layouts. The visuals should not change, just the CSS that handles the layout.
5. `Completed` - Make the design responsive, such that -
    * The form fills 100% width of the screen up until 375px wide
    * The form becomes centered in the page after 375px
    * There should be no horizontal scroll bars present at any width
