# Projeto_CES-30


## Install Client

sudo apt-get install nodejs
sudo apt-get install npm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.1/install.sh | bash

Running either of the above commands downloads a script and runs it. The script clones the nvm repository to ~/.nvm, and adds the source lines from the snippet below to your profile (~/.bash_profile, ~/.zshrc, ~/.profile, or ~/.bashrc).
export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh" # This loads nvm


cd client
npm install


## Install server
cd server
npm install

Enter in this link: 
https://www.oracle.com/br/database/technologies/instant-client/linux-x86-64-downloads.html#ic_x64_inst

Download: Basic Package (ZIP)

Then, enter in: 
https://www.oracle.com/br/database/technologies/instant-client/linux-x86-64-downloads.html#ic_x64_inst

And follow the 8 installation steps of the ZIP file

## Run Client

cd client
npm start

## Run server

cd server
npm start