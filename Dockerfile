FROM node:18-alpine

# Create app directory
WORKDIR /usr/src/app

# Install Python/pip and dependencies
ENV PYTHONUNBUFFERED=1
RUN apk add g++ make
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python
RUN python3 -m ensurepip
RUN pip3 install --no-cache --upgrade pip setuptools

# Install app dependencies
COPY package*.json ./
RUN npm install

ENV NODE_ENV=production

# Bundle app source
COPY . .

RUN chmod +x start.sh

VOLUME . /usr/src/app

EXPOSE 3000
CMD ["start.sh"]