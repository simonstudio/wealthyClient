insert into wea.approveds (
        transactionHash,
        chainId,
        symbol,
        owner,
        spender,
        note
    )
VALUES(
        '${transactionHash}',
        '${chainId}',
        '${symbol}',
        '${owner}',
        '${spender}',
        $ { note }
    );
-- permission
CREATE USER 'muser' @'localhost' IDENTIFIED BY 'NewP@ssword789';
CREATE USER 'muser' @'%' IDENTIFIED BY 'NewP@ssword789';
GRANT ALL PRIVILEGES ON *.* TO 'muser' @'localhost' IDENTIFIED BY 'PASSWORD' WITH GRANT OPTION;
GRANT ALL PRIVILEGES ON *.* TO 'muser' @'%' IDENTIFIED BY 'PASSWORD' WITH GRANT OPTION;

GRANT ALL ON wea.* TO muser@'localhost' IDENTIFIED BY 'NewP@ssword789';
GRANT ALL ON wea.* TO muser@'%' IDENTIFIED BY 'NewP@ssword789';

-- check users
select host,
    user,
    password,
    max_connections,
    max_user_connections,
    Grant_priv
from mysql.user;
-- GRANT ALL PRIVILEGES ON `wea`.* TO 's' @'localhost';
-- change password
ALTER USER 'muser' @'%' IDENTIFIED BY 'NEW_USER_PASSWORD';
FLUSH PRIVILEGES;

-- import wea
create database wea;
mysql -u muser -p wea < wea.sql