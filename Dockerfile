FROM node:22.2.0-alpine 

WORKDIR /app

COPY . .

RUN yarn && yarn build

EXPOSE 3000

# Start the application
CMD ["yarn", "start"]
