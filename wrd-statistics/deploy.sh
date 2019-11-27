#!/usr/bin/env bash

# checks if azure-cli is installed (if not exit)
# if dist folder is present -> deploy
# else build and then deploy

if ! type "az" > /dev/null; then
  echo "ERROR: azure-cli is not installed!"
  echo "Instruction for mac: https://build5nines.com/install-azure-cli-2-0-on-macos/"
  # curl -L https://aka.ms/InstallAzureCli | bash
  echo "Else: https://docs.microsoft.com/en-us/cli/azure/install-azure-cli?view=azure-cli-latest"
  exit -1;
fi

# will be invalidated after We Are Developers Workshop
AZ_STORAGE_DEV="DefaultEndpointsProtocol=https;AccountName=wrdbawagmfa;AccountKey=kJms/KqMzR6uUjxYFra89QT5ROx7ZGjqJ5JFiwqALcvttwdO0MaWGO8By9zg7XIQUX9OeZhoWWUjxERq4TrrjQ==;EndpointSuffix=core.windows.net"

DIR="./dist"

deploy () {
  echo "Deploying to azure..."
  echo ""

  az storage blob delete-batch -s "\$web" --pattern wrd-statistics --connection-string ${AZ_STORAGE_DEV}
  az storage blob upload-batch -d "\$web/wrd-statistics" -s dist --connection-string ${AZ_STORAGE_DEV}
}

# build the mocked production version (ext.-build)
npm run build:prod:mock
deploy



