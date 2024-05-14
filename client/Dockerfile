# Use Node 18 Alpine as the base image
FROM node:18-alpine
WORKDIR /app

# Install dependencies
COPY package.json yarn.lock* ./
RUN yarn install

# Copy the .env.example to .env (make sure .env.example exists)
COPY .env.example .env

# Copy the rest of the React application
COPY . .

CMD ["yarn", "start"]