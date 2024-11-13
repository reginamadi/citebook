#!/bin/bash
set -e

# Run migrations
php artisan migrate

# Start the Laravel server
php artisan serve --host=0.0.0.0 --port=8000
