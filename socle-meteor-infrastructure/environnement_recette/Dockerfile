
FROM node
RUN apt-get update && apt-get install -y curl
RUN curl https://install.meteor.com/ | sh
WORKDIR /src
COPY . /src
CMD ["meteor"]


