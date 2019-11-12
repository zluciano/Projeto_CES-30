# Projeto_CES-30


## Install Front

sudo apt-get install nodejs
sudo apt-get install npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash

Running either of the above commands downloads a script and runs it. The script clones the nvm repository to ~/.nvm, and adds the source lines from the snippet below to your profile (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm


cd front
npm install


## Run Front

cd front
npm start