# Kaplan Programming Assignment

An important component of Kaplan's assessment and learning platform is serving questions to assess the skill level of learners.  Questions can involve different types of interactions (multiple choice, fill in the blanks etc) and below you see an example of what we call an order interaction that requires using drag and drop (or arrows) to order a list of options in the correct order.

This assignment is to implement the order interaction component/feature of Kaplan's learning platform.

### Stack

#### BACKEND
The application makes significant use of Google's Firebase platform. Questions are stored as documents in Google's Cloud Firestore database. The questions are then pulled into the application using Firestore's querying API. For additional detail on how to access Firestore through the API, please visit: https://firebase.google.com/docs/firestore/.

All the images used in the application are stored in Firebase's Cloud Storage facility.

#### FRONTEND
The application was built using Facebook's React framework. Given the straight-forward backend system required by the project, I wanted to use a design-focused web framework.  I chose React because of its emphasis on simple, easy-to-replicate UI components. Not only does React help keep code organized, but its repeatable style would serve me well should I ever need to expand the project to support additional features.

To manipulate the application state, I decided to add Redux to the application. I prefer Redux as a state handler because of its ability to store all important data in a central location. This helps keep the project organized.

#### Third Party Libaries
During the development of the application, I made use of the following libraries:
  1. React (https://reactjs.org/)
  2. Redux (https://redux.js.org/)
  3. ESLint (https://eslint.org/)
  4. Firebase (https://firebase.google.com/docs/)
  5. React-dnd (http://react-dnd.github.io/react-dnd/)
  6. React Spinkit (https://github.com/KyleAMathews/react-spinkit)
  7. Webpack (https://webpack.js.org/)
  8. Jest (https://facebook.github.io/jest/)
  9. Enzyme (http://airbnb.io/enzyme/)

### Installation

To clone the repo to your local directory, enter the following commands in your terminal
```
  git clone https://github.com/borkjt9/kaplan-assignment.git kaplan-assignment
  cd kaplan-assignment
  npm install
  npm start
```

Then open http://localhost:3000/ to see your application.

This application was built using Facebook's create-react-app template as a base. For additional detail on how to install new packages, test react applications, etc, please visit: https://github.com/facebook/create-react-app.

### Deployment

To build for production, run the following command:
```
  npm run build
```

### Testing

To test, I used a combination of:
  1. Jest, Facebook's open-sourced JavaScript testing framework;
  2. Enzyme, a JavaScript Testing utility created by AirBnB that makes it easier to assert, manipulate, and traverse React Components' output;

To run the tests, use the following command:
```
npm test
```

### Styling

#### Sass
In lieu of traditional css I installed Sass, which is a css precompiler. Sass lets you use features that don't exist in CSS  like variables, nesting, mixins, and inheritance. Particularly, I find that the nesting and variable assignment properties help to keep the project organized.

In additional, I added the third-party stylesheets Normalize and Bootstrap. Normalize makes the rendering of elements consistent across browsers. Bootstrap is a powerful grid system developed by Twitter to make web pages responsive.

#### Linter

I use a linter to keep my code clean and organized. I prefer to use airbnb's style code, and load it directly into my text editor (Atom 2). This way, I can still see all my errors, but they do not block my application from rendering as I work.

#### Organization
To organize my styles, I use the Blocks, Elements, and Modifiers (BEM) methodology. While the naming convention may seem verbose at times,  I find it makes components easier to understand and debug.

For more detail on the BEM method, visit: http://getbem.com/introduction/.

### Accessibility
To make the application accessible to all types of users, I implemented the following rules:

**1. HTML Language Attribute.** Declaring a language attribute on the HTML element enables a screen reader to read out the text with correct pronunciation.

**2. Buttons.** Ensure they have a :focus state and that they are recognizable.

**3. Images.**  Use alt texts.

**4. Color and Contrast.** Ensure that the foreground and background colors of the application have sufficient contrast in order to make more readable for everyone.

**5. Avoid Hidden Content.** Avoid using CSS tag {display: none} wherever possible.

### UI Differences
The following are areas where the functionality of my project diverges from the assignment, and the explanations as to why:

**1. Arrow Buttons** At first glance, I thought it  unintuitive that the arrow buttons referred to the answer that is currently active. As such, I made the arrow buttons render dynamically next to the active answer, and only when an answer is active.

Unfortunately, this caused issues later on in the development (see below section). Perhaps this is why Kaplan designed's them as they did!

**2. Loading Notification** I added a loading animation that shows when the application initial pulls the questions prompts from Firebase.

### Known Issues
The following are known, non-fatal issues with the application. Given that the application is still functional with these issues, I prioritized completing the application and sending it for your review in a timely manner over perfection.

**1. Drag-and-Drop Feature** To implement the requested drag-and-drop feature, I used the third-party library called 'react-dnd'. I had never used this library before, but it was well documented and quite popular. Unfortunately, this library later caused issues for me. Most significantly, I learned that there is a known issue that causes the library to break on the most updated versions of Firefox and Safari when combined with the most updated version of React.

Additionally, on a smaller level, the library does not play nice with modern libraries for unit testing.

**2. Pre-loading images on Safari** In the highest-level component of the application, I run a small piece of non-displayed jsx to load and cache the application's images before they are rendered.

However, this tactic does not seem to work on Safari. Each time a button is clicked, there is a slight lag on while the image is loading.

Given that the application uses only five images, an easy fix would be to include the images directly in the application. However, this is not scalable.

Another solution would be to create a Sprite, or Sprites. This solution would be more scalable, but possibly increase initial load time.

**3. Mobile Layout** The application on mobile has spacing issues. Additionally, it is not easy to navigate. Given the design of the application, I would most likely make significant changes to make it completely accessible via mobile. Specifically, I would do the following:
  1. Add media queries that load css based on the screen size of the application.
  2.  Change layout of answer container so that rather than moving answers between two columns, I would move numbers to align next to each answer. This would allow you to render all elements in a single column.

### What I would do differently
If I had unlimited time, I would do the following differently.

**1. Use a different drag-n-drop library** The library I decided to use led to significant problems, as mentioned above. I would spend more time researching all available libraries and pick the one that best fits my needs. I could also develop my own if needed.

**2. Give arrow buttons their own component** To make it easy for the arrow buttons to dynamically render next to the active answer, I included them in the Answer Component. However, this caused complexity issues later on in terms of event propagation, amongst other things. If I had a do-over, I would give them their own component and pass the location of the active answer to the component's props.

**3. Develop with a mobile first mindset** As mentioned above, I ran into issues with the layout when I tested it on mobile. I would have architected the project to be accessibility on mobile from the start.

### What I have learned

This was a great assignment to work on. Specifically, it allowed me to become more familiar with quickly integrating third-party libraries into an application, as well as building unit tests with React's recommended testing libraries.

This assignment also reinforced for me how important it is to spend time at the onset to scope out and design the architecture for the entire system. Even in a small, contained project like this, there was significant risk of the code spiraling out of control and becoming unreadable if it wasn't properly organized.

Given the short deadline for this project, if I did not adequately sketch the design of system appropriately at the beginning, there would have been significant risk of running into issues that I would not have had the time to fix.

### License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.
