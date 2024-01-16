from typing import Annotated

from fastapi import FastAPI, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware

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


@app.post("/upload_test_chunk")
async def receive_chunk(videoChunk: UploadFile = File(...), FPS: float = Form(...)):
    # Process the chunk here, e.g., save it to a file
    # You can use videoChunk.file.read() to access the binary data
    print(f"Video chunk: {videoChunk}")
    print(f"FPS: {FPS}")
    return {"Success": "True", "Received_FPS": FPS}