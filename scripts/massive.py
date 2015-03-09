#!/usr/bin/python

import urllib
import json

from pymongo import MongoClient

# MongoDB
mongo_client = MongoClient('localhost', 27017)
db = mongo_client['circo']

# CSV
import csv

# JSON
import simplejson

users = db.users.find({"finished" : True, "id": { "$gte": 491 } }).sort("id", 1)

codes = {}
regions = {}
languages = {}
useragents = {}
genders = {}
ages = {}
lateralities = {}

def incrementCount(label, obj):
    if label in obj:
        obj[label] = obj[label] + 1
    else:
        obj[label] = 1

for user in users:
    code = user["code"]
    ip = user["ip"]
    acceptlanguage = user["acceptlanguage"]
    useragent = user["useragent"]
    questions = user["questions"]
    GENDER_VALUE = questions["GENDER_VALUE"]
    AGE_VALUE = questions["AGE_VALUE"]
    LATERALITY_VALUE = questions["LATERALITY_VALUE"]

    print ip

    region = urllib.urlopen('http://ipinfo.io/%s/json' % ip).read()
    region = json.loads(region)

    if "country" in region:
        region = region["country"]
    else:
        region = "-"

    print region

    incrementCount(code, codes)
    incrementCount(region, regions)
    incrementCount(acceptlanguage, languages)
    incrementCount(useragent, useragents)
    incrementCount(GENDER_VALUE, genders)
    incrementCount(AGE_VALUE, ages)
    incrementCount(LATERALITY_VALUE, lateralities)

print codes
print regions
print languages
print useragents
print genders
print ages
print lateralities
