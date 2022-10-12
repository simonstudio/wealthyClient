mkdir data
# install
sudo apt install mariadb-server

# public database
sudo iptables -A INPUT -p tcp --destination-port 3306 -j ACCEPT
sudo ufw allow 3306/tcp

# start service
sudo systemctl start mysql
sudo systemctl status mysql
