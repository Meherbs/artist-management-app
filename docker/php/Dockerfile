FROM php:8.0-fpm

RUN apt-get update \
    && apt-get install -y \
    libzip-dev

RUN docker-php-ext-install \
    pdo_mysql zip

COPY --from=composer /usr/bin/composer /usr/bin/composer    

WORKDIR /var/www/backend/

CMD composer install ; \
    bin/console doctrine:migrations:migrate --no-interaction; \
    bin/console doctrine:fixtures:load --no-interaction ; \
    bin/console lexik:jwt:generate-keypair --skip-if-exists ; \
    php-fpm