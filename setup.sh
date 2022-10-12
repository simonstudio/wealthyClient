npm i nodemon -g

mkdir data
# install
sudo apt install mariadb-server
sudo ufw allow 1000/tcp
# public database
sudo iptables -A INPUT -p tcp --destination-port 3306 -j ACCEPT
sudo ufw allow 3306/tcp

# start service
sudo systemctl start mysql
sudo systemctl status mysql

