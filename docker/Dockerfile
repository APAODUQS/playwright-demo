ARG PLAYWRIGHT_VERSION='1.20.1'
FROM mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-focal
RUN npx playwright@${PLAYWRIGHT_VERSION} install chrome
RUN npx playwright@${PLAYWRIGHT_VERSION} install msedge
RUN npx playwright@${PLAYWRIGHT_VERSION} install webkit
RUN playwright@${PLAYWRIGHT_VERSION} install firefox