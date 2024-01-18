from typing import Annotated

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from redis import Redis

# Handlers
from streamlib.redisClient import get_redis_client
from streamlib.chunks import handle_chunk

app = FastAPI()

origins = [
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.get("/ping_redis")
async def ping_redis():
    r: Redis = get_redis_client()
    
    return {"ping": r.ping()}


@app.post("/upload_chunk")
async def receive_chunk(videoChunk: UploadFile = File(...), FPS: float = Form(...), streamId: str = Form(...)):
    # Process the chunk here, e.g., save it to a file
    # You can use videoChunk.file.read() to access the binary data
    print(f"Test Video Chunk received at {FPS} FPS for stream {streamId}")
    
    res = await handle_chunk(videoChunk, FPS, streamId);
    
    return {"success": res.success, "received_FPS": FPS}