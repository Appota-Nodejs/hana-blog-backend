# Hana Blog Backend

## **How to setup development environment**

### _Step 1_

Run

```node
npm install
```

to install all dependencies

&nbsp;

### _Step 2_

Create .env file with these 2 fields

```env
SQL_URI='mysql://USERNAME:PASSWORD@localhost:3306/hana-blog'
JWT_KEY=???
```

&nbsp;

### _Step 3_

Run

```node
npm run dev
```

to spin up the development server. After running this command, all the tables will be automatically created
