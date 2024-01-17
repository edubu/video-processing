import redis

# Redis server enviroment variables
PORT = 6379
HOST = 'localhost'
DB = 0

# Create redis client
r = redis.Redis(host=HOST, port=PORT, db=DB, decode_responses=True)

def get_redis_client():
    return r