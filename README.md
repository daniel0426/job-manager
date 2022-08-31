# Job managing application

Building Job managing application with React (front-end) and Firebase firestore (database, backend)

## Tech used 
- React / Firebase / TailwindCSS

## To start application
  1. clone this project
  2. npm install
  3. npm start

## Process

  1. Project setup 
     project setup using create-react-app & install libraries that needed (tailwindCSS, react-router, ..etc)
  
  2. Add Job and Showing Job datas. 
     - Can add new Job through job-form and send it to firebase firestore.
     - After submit job-form, form data is send it to firebase firestore and redirect to main page so tradie can see new job rightaway.
     - Read Job datas from the firestore and show them in the main page.
  
  3. Job Detail Page
    - When Tradie click one of the Job, it routes to job detail page and show details of that job.
    - Get specific job Detail info through job Identifier. 
    - Tradie can see Customer Info, Notes, Status, CreateTime and also Job Identifier
  
  4. Edit Job details
    - Tradie can edit status, edit/add notes for that Job
    - Implementing add/edit function using firebase

  5. Sort and Filter job datas in the main page.
    - Tradie can sort job datas by Date
    - Tradie can filter job datas depending on their status.
    
  6. Styling 
    - Styling application using tailwindCss
  
  7. Refactoring
    - test the app several times to see if there is any minor errors and fix it.


  


