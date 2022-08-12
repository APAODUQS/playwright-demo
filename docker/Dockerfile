ARG PLAYWRIGHT_VERSION='1.25.0'
FROM mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-focal
RUN npx playwright install --with-deps
RUN npx playwright install chrome
RUN npx playwright install msedge
ENV BROWSERSTACK_USERNAME=${BROWSERSTACK_USERNAME}
ENV BROWSERSTACK_ACCESS_KEY=$BROWSERSTACK_ACCESS_KEY}
