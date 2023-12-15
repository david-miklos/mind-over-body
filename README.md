Check out the brand [mind over body](https://www.instagram.com/mind.overbodyy/) and [my buddy](https://www.instagram.com/gopo.72/).

## Notes for myself

### PlanetScale Serverless SQL Database

1. Create a [PlanetScale Database](https://planetscale.com/)
2. Install [pscale CLI](https://github.com/planetscale/cli#installation)
3. Use the CLI to connect to the DB: `pscale auth login`
4. Create a `dev` database branch: `pscale branch create <branch_name> dev`
5. Start the connection: `pscale connect <database_name> dev --port 3306`

### Prisma ORM

1. Install Prisma Client: `npm i @prisma/client`
2. Install Prisma as dev dependency: `npm i prisma --save-dev`
3. Initialize Prisma: `npx prisma init`
4. Push schema updates to database: `npx prisma db push`
5. Generate type-safe database client: `prisma generate` or `npm install`
