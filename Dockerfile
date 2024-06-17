ARG node_version=20-alpine
#or 20.12
FROM node:${node_version} as base

# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat

# Create directory in container
WORKDIR /app

COPY package.json .
COPY package-lock.json .

# Get dependencies
RUN \
    if [ -f package-lock.json ]; then npm ci; \
    # Allow install without lockfile, so example works even without Node.js installed locally
    else echo "Warning: Lockfile not found. It is recommended to commit lockfiles to version control." && npm install; \
    fi


# Copy files to container
COPY . .

# Disable NextJS telemetry
ENV NEXT_TELEMETRY_DISABLED 1 

# Expose port
EXPOSE 3000

# Development stage
FROM base AS dev
CMD npm run dev

# TODO production