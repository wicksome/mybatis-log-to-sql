# Convert mybatis's log to SQL

## Usage

```bash
$ node index.js
>> SQL: SELECT * FROM table WHERE id in ( ? , ? , ? ) AND name = ?
>> Parameters: 1(Long), 2(Long), 3(Long), str(String)
--------------------------------------------------------------------------------
SELECT * FROM table WHERE id in (1, 2, 3) AND name = 'str'
✔ Copy sql!
```
