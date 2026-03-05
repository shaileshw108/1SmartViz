from fastapi import FastAPI, UploadFile, File
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
import pandas as pd
import shutil

app = FastAPI()

UPLOAD_FILE = "uploads/data.csv"

app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/", response_class=HTMLResponse)
def home():
    with open("templates/index.html") as f:
        return f.read()

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    with open(UPLOAD_FILE, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    df = pd.read_csv(UPLOAD_FILE)
    return {"columns": list(df.columns)}

@app.get("/chart")
def chart(column: str):
    df = pd.read_csv(UPLOAD_FILE)
    data = df[column].value_counts()

    return {
        "labels": list(data.index.astype(str)),
        "values": list(data.values)
    }
