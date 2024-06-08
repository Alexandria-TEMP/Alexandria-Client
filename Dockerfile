ARG node_version=20-alpine
#or 20.12
FROM node:${node_version} as base

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

# TODO uncomment following lines to add back stages, and remove preceding line
# reason for commenting out in development: `docker compose up dev` is inconsistent with
# command for backend, which is just `docker compose up`, and this is causing confusion

# Test stage (no e2e testing)
# FROM base AS test
# CMD \
#     npm run lint && \
#     npm run test

# Development stage
FROM base AS dev
CMD npm run dev

# Production stage
# FROM base AS prod
# CMD npm run build && npm run start