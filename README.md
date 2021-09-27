# Phase10 Random Phase Generator

HTML/JavaScript website to generate random phases for the [Phase10](https://www.mattelgames.com/en-us/cards/phase-10) card game by Mattel.

When playing the game, players have to complete a number of phases by playing sets/runs of cards for example. However the game only includes one set of 10 phases for the players to complete every time they play.

The purpose of this application is to generate 10 random phases of varying difficulty so players can have a different game every time.

The application has been deployed to [https://phase10-generator.neocities.org/](https://phase10-generator.neocities.org/).

### How does it work?

Each phase consists of 1 or 2 goals. We identified 6 different types of goal:
* **Run** - set of cards in numerical order
* **Set** - set of cards of the same number
* **Colour** - a set of cards of the same colour
* **Evens** - a set of even (or odd) cards
* **Colour Run** - a set of cards in numerical order of the same colour
* **Colour Evens** - a set of even (or odd) cards of the same colour

We then calculated the relative probability of being dealt each goal (e.g. for set of 4, what is the probability that any 4 cards you draw will be a set?). We ordered each goal based on the probability, then created a matrix where we created every possible phase by combining each goal with each other goal, and by itself for a phase of one goal. We eliminated double-counted phases, phases requiring a total of fewer than 6 or more than 9 cards, and phases with two goals of evens or colour evens, and calculated the probabilities of the rest by multiplying the probabilities of the two goals (or taking the probability of the single goal in 1-goal phases).

Finally we ordered the remaining phases by probability and assigned each one a rank. All this data is saved in the JSON file and loaded into the JavaScript on page load. 10 random phases are picked, sorted by rank (from easiest to hardest), and displayed to the user.
