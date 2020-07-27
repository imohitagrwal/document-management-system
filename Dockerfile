FROM node:8.9.4

ENV NODE_ENV=development
ENV PORT=3000
# Set a working directory
WORKDIR /usr/src/app

COPY ./package.json .

# Install Node.js dependencies
RUN npm install

# Copy application files
COPY ./src .

EXPOSE 8080

CMD [ "node", "server.js" ]
