FROM node:12.2.0-alpine
RUN apk add --no-cache git
WORKDIR /app
ENV PATH=/app/node_modules/.bin:/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin
COPY package.json /app/package.json
RUN npm install
RUN npm install react-scripts@3.0.1 -g
EXPOSE 3000
CMD ["npm" "start"]