ARG node_version=20-alpine

FROM node:${node_version} AS builder

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Create directory in container
WORKDIR /app

# Copy the lock file only if it exists
COPY package.json package-lock.jso[n] ./

# Get dependencies
RUN \
    if [ -f package-lock.json ]; then npm ci; \
    # Allow install without lockfile, so example works even without Node.js installed locally
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && npm install; \
    fi


# Copy files to container
COPY . .

# Disable NextJS telemetry
ENV NEXT_TELEMETRY_DISABLED=1

# Set the API base URL, hardcoded for now
ENV NEXT_PUBLIC_API_BASE_URL=https://api.alexandria01.ewi.tudelft.nl/api/v2


# Build the app
RUN npm run build
ENTRYPOINT [ "npm", "run", "start" ]
