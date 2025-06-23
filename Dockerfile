# Gunakan image node resmi
FROM node:23-alpine


RUN apk update \
    && apk add --no-cache openssl\
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# Salin file dependensi
COPY package*.json ./

# Install dependensi
RUN npm install

# Salin semua file ke dalam container
COPY . .

# Prisma generate (untuk client)
RUN npx prisma generate

# Build TypeScript
RUN npm run build


# Expose port
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "run", "start"]