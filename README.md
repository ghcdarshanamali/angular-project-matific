# Notes

I utilized the given endpoints. However, the endpoint(https://ljifg6p8cd.execute-api.us-east-1.amazonaws.com/production/matific-test-activities) that retrieves the test activities gives a CORS issue as the Access-Control-Allow-Origin is not set in the endpoint. Therefore I have used hard-coded json to retrive data in the service class.

Part 1 : Login/Signup => I have utilized the same user interface for both functions and the user details will be stored in a local array. The login option is on the header. you may use existing credentials in the local array or can sign up.

Part 2 : When navigating to the page, all the details will be loaded to the table and you can filter using, - Class: which shows all the activities of the students in that selected class - Student: which shows all the activities of that selected student

I made 2 assumptions 
-  The average mark of all the attempts will be the Results 
-  The latest date would be the completion date(however, I faced an issue when retrieving the latest date. Therefore, I'm retrieving the first element of the date array.)

I have written unit test cases for SnapshotReportsService, LoginComponent, HeaderComponent and SnapShotReportsComponents.

run `ng test` to execute the unit tests

- I could not implement the below scenarios/functions 
    - Filter from Date Time 
    - Persistent Login 
    - Using encrypted password(an error occurred during the implementation, I have commented out the code) 
    - The Bonus activity to generate bar charts 
    - Some validations and alignemnet issues.

For more details related to any implementation, please refer to the code base.
I have added bootstrap and bcryptjs libraries in addition to the default libraries.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).
