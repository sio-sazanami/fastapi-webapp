from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
import uvicorn
from pydantic import BaseModel
import db

app = FastAPI()
app.mount(path="/static", app=StaticFiles(directory="static"), name="static")
templates = Jinja2Templates(directory="template")

@app.get("/", response_class=HTMLResponse)
def index(request: Request):
    context = {"request": request}
    return templates.TemplateResponse("index.html", context)

@app.get('/favicon.ico', include_in_schema=False)
def favicon():
    return FileResponse('favicon.ico')

@app.get("/template", response_class=HTMLResponse)
def template(request: Request):
    context = {"request": request}
    return templates.TemplateResponse("template.html", context)

@app.get("/geosearch", response_class=HTMLResponse)
def template(request: Request):
    context = {"request": request}
    return templates.TemplateResponse("geosearch.html", context)

@app.get("/exe_api", response_class=HTMLResponse)
def template(request: Request):
    context = {"request": request}
    return templates.TemplateResponse("exe_api.html", context)

class template_keyword(BaseModel):
    keyword:str

@app.post("/template_search")
def template_search(key_json: template_keyword):
    keyword = key_json.keyword
    result = db.selectall(keyword)
    return result

class geo_keyword(BaseModel):
    id:str = ""
    name:str = ""
    state:str = ""
    country:str = ""

@app.post("/geosearch")
def template_search(geo_keyword: geo_keyword):
    result, status = db.geocode(geo_keyword.id,geo_keyword.name,geo_keyword.state,geo_keyword.country)
    return result

if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8080)