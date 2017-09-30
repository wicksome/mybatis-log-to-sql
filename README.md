# Convert mybatis's log to SQL

> Replace all `?` characters to parameters.

## Install

```bash
$ git clone https://github.com/wicksome/mybatis-log-to-sql.git
$ cd mybatis-log-to-sql && npm init
```

## Usage

```bash
$ node index.js
>> SQL: SELECT * FROM table WHERE id in ( ? , ? , ? ) AND name = ?
>> Parameters: 1(Long), 2(Long), 3(Long), str(String)
--------------------------------------------------------------------------------
SELECT * FROM table WHERE id in (1, 2, 3) AND name = 'str'
✔ Copy sql!
```
