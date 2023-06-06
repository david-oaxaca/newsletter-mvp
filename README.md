# Newsletter - MVP

This repository contains an SPA and a REST API along with the docker-compose file that will allow the user to:

- Admin user can create a recipient list.
- Admin user can add a recipient to a previously created list.
- Admin user can upload a PDF or PNG file to a newsletter.
- Admin can trigger a newsletter send with a button.
- If a PNG is sended, a PDF of the PNG will be attached.
- Recipient can unsubscribe to any future newsletter.
- Recipient can unsubscribe to certain topics.

The technologies used for this project were:

- REST API: FastAPI and Python
- SPA: Next.js and JavaScript
- Other technologies: Figma for early draft. MongoDB as the database.

## ℹ️ Important Warning

For this project to work, a Send Grid API key was used, this is included in the .env files, but it will be deactived allong with any other sensible information in the following week.

## ℹ️ Usage

```bash
# Build the spa and api sevices
docker-compose build
# Deploy the containers
docker-compose up -d
```

## ⚡ Single Page Application (SPA)

More information can be found in the "newsletter-spa" README.md

## ⚡ REST API

More information can be found in the "newsletter-api" README.md

## ℹ️ License

[MIT](https://choosealicense.com/licenses/mit/)
