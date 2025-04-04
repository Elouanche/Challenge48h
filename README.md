# 🚀 48h Project - Initialization Steps

This project uses **Laravel** as the PHP framework and **Tailwind CSS** for styling. Here are the steps to properly initialize and configure the project after cloning or pulling the latest updates.

---

## ✅ Prerequisites

Before starting, make sure you have the following tools installed:

- 🐘 **[PHP](https://www.php.net/downloads)** (version 8.x or higher): Required to run Laravel.
- 🎼 **[Composer](https://getcomposer.org/download/)**: PHP dependency manager.
- 🟢 **[Node.js](https://nodejs.org/)** and **[NPM](https://www.npmjs.com/)**: Required to compile CSS/JS files.
- 🗄️ **[MySQL](https://dev.mysql.com/downloads/)**: Database used by the application.
- 🐳 **[Docker](https://www.docker.com/)**: To containerize the application and its dependencies.

---

## 🛠️ Initialization Steps

### 1️⃣ Configure the Laravel Environment

1. Copy the `.env.example` file if the `.env` file does not exist:

    ```bash
    cp challenge48withLaravel/.env.example challenge48withLaravel/.env
    ```

2. 📝 Edit the `.env` file to configure the following settings:
    - **Database**: (`DB_HOST`, `DB_PORT`, `DB_DATABASE`, `DB_USERNAME`, `DB_PASSWORD`).

> **Why?** These variables allow Laravel to connect to the database and other services.

---

### 2️⃣ Configure the MySQL Database in Docker

1. Copy the sample environment file for Docker:

    ```bash
    cp Docker_Serveur_Bdd/sample.env Docker_Serveur_Bdd/.env
    ```

2. Configure your DNS or connection port:

    - **With DNS**:

      ```yaml
      labels:
        - "traefik.enable=true"
        - "traefik.http.routers.phpmyadmin.rule=Host(`DOMAIN_NAME_SERVER.com`)"
        - "traefik.http.routers.phpmyadmin.entrypoints=websecure"
      ```

    - **Without DNS**:

      ```yaml
      ports:
        - "8085:80"
        - "${HOST_MACHINE_PMA_PORT}:80"
        - "${HOST_MACHINE_PMA_SECURE_PORT}:443"
      ```

3. 🛡️ Set the environment variables in the `.env` file:

    ```env
    MYSQL_USER=user
    MYSQL_PASSWORD=password
    MYSQL_DATABASE=database
    ```

> **Note:** Avoid including sensitive information directly in the project's `.env` file.

---

### 3️⃣ Start Docker Traefik

1. Copy the sample environment file for Traefik:

    ```bash
    cp Docker_Serveur_Traefik/sample_env Docker_Serveur_Traefik/.env
    ```

2. 🚢 Start Traefik with Docker Compose:

    ```bash
    docker-compose -f Docker_Serveur_Traefik/docker-compose.yml up -d
    ```

> **Why?** This starts Traefik to handle HTTP/HTTPS requests.

---

### 4️⃣ Start the Database with Docker

1. 🗄️ Start the database with Docker Compose:

    ```bash
    docker-compose -f Docker_Serveur_Bdd/docker-compose.yml up -d
    ```

2. 🌐 Access the interface via: [http://localhost:8085](http://localhost:8085)

> **Explanation:** This command starts the MySQL container (and phpMyAdmin if configured).

---

### 5️⃣ Start the Laravel Project in Development Mode

1. If the `.env` file does not exist, copy it:

    ```bash
    cp .env.example .env
    ```

2. Install PHP and Node.js dependencies:

    ```bash
    composer install && composer update && npm install
    ```

3. Open two terminals:
    - **Terminal 1**: Start the Node.js development server:

      ```bash
      npm run dev
      ```

    - **Terminal 2**: Start the Laravel server:

      ```bash
      php artisan serve
      ```

---

### 6️⃣ Configure the Database with Migration

1. Apply migrations to create the tables:

    ```bash
    php artisan migrate
    ```

2. (Optional) Seed the database with sample data:

    ```bash
    php artisan db:seed
    ```

3. Generate an application key:

    ```bash
    php artisan key:generate
    ```

---

### 7️⃣ Start Laravel in Production Mode

For launching Laravel in production mode, refer to the README file in the `Docker_Serveur_Laravel` directory.

---

🎉 **Congratulations!** You have completed the setup 🚀.
