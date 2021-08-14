# TrueAccordPortfolio

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.1.

## Setup

Run `npm i` to download the necessary libraries to build this application.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.


## Overview

For this project, my approach initially was to set up the business logic first before tackling the display logic.

I spent the first couple of hours considering all the requirements and edge cases that I would need to tackle.

The next few hours I spent building the application skeleton, major components, object types, and services

After fleshing out the PlanAllocation service, I fleshed out unit tests on the service, so I knew I was preforming the correct actions as I designed.

The next day I built out the ui components and tied the created services into the ui elements.

## Summary

If I were to talk more time on this process, I would definably flesh out my unit tests more.  I ran into many edge cases that I didn't foresee that I had to debug manually when service the application.

I would also find a better slider than the MatSlider.  There is a small bug that I spent a significant amount of time trying to solve that might be easier to deal with using another library.

I think now it would have been better if I clarified the redistribution logic for the allocations.  My initial assumption was to distribute the modified difference evenly across the other unlocked plans but the complexity was proving to be too pretty complicated, so I refactored to a simpler solution.

Finally, I added in additional un-required features of adding/removing plans and locking a plan's assigned allocation.  While they didn't complicate the application too much, the weren't direct requirements.
