# Node Nbyula Terraformers (Server-Side)

Alone we can do so little; together we can do so much. With Nbyula growing exponentially, terraformers are looking forward to expanding their team. Could you help them build a customizable job board?

## Objectives

- Terraformers and applicants should be able to sign up and login to the app.
- Terraformers should be able to post a job listing on a common job board shared between other terraformers.
  - The listing should contain: title, description (markdown support is a plus), location, deadline, contact phone number and contact email.
  - Note that these job listings should be presented as cards on a board.
  - Based upon how far the job listing is from the deadline, the cards should have a color. For simplicity, the listing which are due in more than 21 days should be green, less than 14 days should be yellow and less than 3 days should be red.
- Terraformers should be able to rearrange the cards on the board by drag and drop to help them modify the order in which they’re displayed to the applicants.
- Terraformers should be able to archive a job listing.
- Applicants should be able to mark their interest on any available and active job listing.
- Terraformers should be able to see interested applicants.

## Technologies

- Node/Express
- Prisma
- PostgreSQL

## How to install

- Download and install the latest version of PostgreSQL.
- Install the latest vesion of Node.js
- Copy and paste `.env.example` file and rename it: `.env`
- Go to root directory of your node project and run: `npx prisma migrate deploy`
- Run the following command: `npm start`
