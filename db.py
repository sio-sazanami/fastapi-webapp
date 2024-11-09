import json
import MySQLdb

#任意SQLを実行
def selectall(query):
    username='user'
    password='password'
    conn = MySQLdb.connect(user=username, password=password, host='127.0.0.1', db='db')
    try:
        with conn.cursor(MySQLdb.cursors.DictCursor) as cur:
            cur.execute(query)
            data = cur.fetchall()
        return json.dumps(data)
    except Exception as e:
        data = [{"error": str(e)}]
        return json.dumps(data) 

#geocode-APIを実行
def geocode(id,name,state,country):
    query = f'select * from citylist where id like "%{id}%" and name like "%{name}%" and state like "%{state}%" and country like "%{country}%"'
    try:
        result = selectall(query)
        return result, 1
    except:
        return {"result": "DB Access Error!"}, 0

