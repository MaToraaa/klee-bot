# Gunakan image Node.js resmi sebagai base image
FROM node:16

# Set working directory di dalam container
WORKDIR /var/www

# Salin package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Install dependencies
RUN npm install
RUN npm install -g nodemon

# Salin semua file ke dalam container
COPY . .

# Ekspos port (opsional, tergantung kebutuhan bot)
EXPOSE 3333

# Jalankan bot
CMD ["npm", "start"]
# CMD ["npm", "run", "dev"]
