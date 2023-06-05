import os
from dotenv import load_dotenv
from pymongo import MongoClient

load_dotenv('.env')

DB_CLIENT = os.getenv('DB_CLIENT')
DB_NAME = os.getenv('DB_NAME')
DB_COLLECTION = os.getenv('DB_COLLECTION')

client = MongoClient(DB_CLIENT)
db = client[DB_NAME]
collection = db[DB_COLLECTION]