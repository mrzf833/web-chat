# Dockerfile
FROM node:16.20

# Install dependencies
RUN apt-get update && apt-get install -y \
    git \
    unzip

# Set the working directory
WORKDIR /var/www/html

# Copy the Laravel application files into the container
COPY . .

EXPOSE 3000