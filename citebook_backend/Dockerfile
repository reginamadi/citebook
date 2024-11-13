# Base image
FROM php:8.2.4-apache

# Install required dependencies
RUN apt-get update && \
    apt-get install -y --fix-missing \
    libzip-dev \
    zip \
    unzip \
    nano \
    curl \
    cron \
    dos2unix

# Install the required version of Composer
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Install MySQL driver
RUN docker-php-ext-install pdo_mysql

# Copy entrypoint script and set permissions
COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

# Set working directory
WORKDIR /var/www/html

# Copy composer.json and composer.lock files
COPY composer.json composer.lock ./

# Install PHP dependencies
RUN composer install --no-dev --prefer-dist --no-scripts --no-autoloader

# Copy the rest of the application files
COPY . .

# Install PHP dependencies again to update autoload files
RUN composer install --no-dev --prefer-dist

# Change permissions for Laravel storage and cache
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Expose port 8000
EXPOSE 8000

# Start the Laravel server
# CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=8000"] 
# CMD ["php", "artisan", "migrate"]
CMD ["/usr/local/bin/entrypoint.sh"]
