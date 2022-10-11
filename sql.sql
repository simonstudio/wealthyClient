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

-- 

CREATE USER 'sammy'@'%' IDENTIFIED BY 'NewP@ssword789';
GRANT ALL PRIVILEGES ON *.* TO 'sammy'@'localhost' WITH GRANT OPTION;


-- GRANT ALL PRIVILEGES ON `wea`.* TO 's' @'localhost';