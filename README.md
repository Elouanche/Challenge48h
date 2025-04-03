# 48h Project - Initialization Steps

This project uses Laravel as the PHP framework along with Tailwind CSS for styling. Below are the steps to properly initialize and configure the project after cloning or retrieving the latest updates.

## Prerequisites

Before starting, make sure you have the following tools installed:

- **PHP** (version 8.x or higher)
- **Composer** (PHP dependency manager)
- **Node.js** and **NPM**
- **MySQL** (or any other compatible database management system)

## Initialization Steps

### 1. Clone the Project

If you haven't already, clone the project from the Git repository:

```bash
git clone https://gitlab.jeremy-garcon.com/d-veloppement/48h_challange.git
cd .\challenge48withLaravel\ 
```

### 2. Install PHP Dependencies

Install the PHP dependencies specified in the `composer.json` file:

```bash
composer install
composer update
```

This will install all necessary dependencies for the Laravel application to function properly.

### 3. Install JavaScript Dependencies

Install front-end dependencies using NPM:

```bash
npm install
```

### 4. Configure the Environment

The `.env` file contains the environment variables for the project, such as database credentials, API keys, etc.

- If you don't have an `.env` file, copy the `.env.example` file:

  ```bash
  cp .env.example .env
  ```

- Open the `.env` file and configure the following settings:
  
  - **Database**: Set up database connection details (`DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).

### 5. Set Up the Database

If the database is empty or there are migrations to apply, run the following commands:

- **Migrations**: Apply migrations to create database tables:

  ```bash
  php artisan migrate
  ```

- If you also want to seed the database with sample data, execute:

  ```bash
  php artisan db:seed
  ```

- Additionally, generate an application key:

  ```bash
  php artisan key:generate
  ```

### 6. Start the Development Server

You can start Laravel's built-in development server to check if everything is working correctly:

```bash
php artisan serve
```

This will start the server at [http://127.0.0.1:8000](http://127.0.0.1:8000).

---

## Useful Commands

- **Run Migrations**: `php artisan migrate`
- **Run Migrations**: `php artisan migrate:refresh`
- **Run Seeds**: `php artisan db:seed`
- **Clear Cache**: `php artisan cache:clear`
- **Start Local Server**: `php artisan serve`
- **Generate Application Key**: `php artisan key:generate`

## Dependencies

This project utilizes the following dependencies:

- **Laravel**: PHP framework
- **Composer**: PHP dependency manager
- **NPM**: JavaScript dependency manager
- **Tailwind CSS**: Utility-first CSS framework

---

If you encounter any issues, ensure that all required services (database, cache server, etc.) are running and that the `.env` file is correctly configured.

---

Good luck and happy coding!