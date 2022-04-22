# team-games

## Install

### GIT
```
sudo apt update
sudo apt install git
git --version
git clone https://github.com/raimyson/team-games.git
```


### VISUAL CODE
https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.vscode-remote-extensionpack


### MYSQL
digitalocean.com/community/tutorials/how-to-install-mysql-on-ubuntu-20-04-pt

sudo apt install mysql-server
sudo /etc/init.d/mysql start
sudo mysql_secure_installation
sudo mysql
SET GLOBAL validate_password.policy=LOW;
SHOW VARIABLES LIKE 'validate_password%';
CREATE USER 'teamgames'@'localhost' IDENTIFIED WITH mysql_native_password BY 'teamgames';
GRANT ALL PRIVILEGES ON *.* TO 'teamgames'@'localhost' WITH GRANT OPTION
CREATE DATABASE teamgames;
flush privileges;
exit;
mysql -u teamgames -p teamgames < /home/raimyson/team-games/database/teamgames.sql


### NODEJS
https://www.digitalocean.com/community/tutorials/how-to-install-node-js-on-ubuntu-20-04-pt

sudo apt-get install build-essential
sudo apt-get install python2.7
sudo ln -s /usr/bin/python2.7 /usr/bin/python
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash
source ~/.bashrc
nvm list-remote
nvm install v10.24.1
node -v
sudo npm install

### APACHE
sudo apt install apache2

sudo nano /etc/apache2/apache2.conf
AcceptFilter http none --> Add this to the end

sudo nano /etc/apache2/ports.conf
change Listen 80 por Listen 8080

sudo nano /etc/apache2/sites-enabled/000-default.conf

<VirtualHost *:8080>
	ServerAdmin webmaster@localhost
	DocumentRoot /var/www/html
	ErrorLog ${APACHE_LOG_DIR}/error.log
	CustomLog ${APACHE_LOG_DIR}/access.log combined

	ProxyPreserveHost On
	ProxyRequests off

	RewriteEngine On

	# websocket
	RewriteCond %{HTTP:Upgrade}         =websocket                      [NC]
	RewriteRule ^/api/ws/(.*)           ws://127.0.0.1:8090/api/ws/$1   [P,L]

	ProxyPass /api http://127.0.0.1:8090/api
	ProxyPassReverse /api http://127.0.0.1:8090/api

	ProxyPass / http://127.0.0.1:3000/
	ProxyPassReverse / http://127.0.0.1:3000/

</VirtualHost>

# vim: syntax=apache ts=4 sw=4 sts=4 sr noet

sudo a2enmod rewrite	
sudo a2enmod proxy
sudo a2enmod proxy_http
sudo a2enmod proxy_balancer
sudo a2enmod proxy_wstunnel
sudo a2enmod lbmethod_byrequests
sudo a2enmod headers

sudo service apache2 restart