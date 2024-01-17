from fastapi import UploadFile, File, Form
from redis import Redis
from streamlib.redisClient import get_redis_client

r: Redis = get_redis_client()

"""
    handle_chunk stores the stream chunks in Redis, and allocates then to a segment if enough chunks are available.
"""
async def handle_chunk(videoChunk: UploadFile = File(...), FPS: float = Form(...), streamId: str = Form(...)):
    # Process the chunk here, e.g., save it to a file
    # You can use videoChunk.file.read() to access the binary data
    print(f"Video chunk: {videoChunk}")
    print(f"FPS: {FPS}")
    
    # Get the value of the field from the chunk_map
    
    
    
    
    return {"success": True, "Chunks Waiting": 0}

async def check_stream_exists(streamId: str):
    r = await get_redis_client()

    # Get the value of the field from the hash map
    value = r.hget('chunk_map', streamId)

    # Check if the field exists
    if value is None:
        return False
    else:
        return True