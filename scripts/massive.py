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
ages_int = {
	"<20": 0,
	"21-30": 0,
	"31-40": 0,
	"41-50": 0,
	"51-60": 0,
	"61>" : 0
}
lateralities = {}
region_ips = {}

def getRegion(ip):
    if ip not in region_ips:
        #region = urllib.urlopen('http://ipinfo.io/%s/json' % ip).read()
        #region = json.loads(region)
        region = urllib.urlopen('https://freegeoip.net/json/%s' % ip).read()
        region = json.loads(region)

        if "country_code" in region:
            region = region["country_code"]
        else:
            region = "-"
            
        region_ips[ip] = region
    
    return region_ips[ip]

ip_regions = {}

def incrementCount(label, obj):
    if label in obj:
        obj[label] = obj[label] + 1
    else:
        obj[label] = 1
        
def getRegion(ip):
    if ip not in ip_regions:
        region = urllib.urlopen('http://ipinfo.io/%s/json' % ip).read()
        region = json.loads(region)

        if "country" in region:
            region = region["country"]
        else:
            region = "-"

        ip_regions[ip] = region

	return ip_regions[ip]

for user in users:
    code = user["code"]
    ip = user["ip"]
    acceptlanguage = user["acceptlanguage"]
    useragent = user["useragent"]
    questions = user["questions"]
    GENDER_VALUE = questions["GENDER_VALUE"]
    AGE_VALUE = int(questions["AGE_VALUE"])
    LATERALITY_VALUE = questions["LATERALITY_VALUE"]
    
    acceptlanguage = (acceptlanguage.lower().split(","))[0]

    print ip

    region = getRegion(ip)

    print region

    incrementCount(code, codes)
    incrementCount(region, regions)
    incrementCount(acceptlanguage, languages)
    incrementCount(useragent, useragents)
    incrementCount(GENDER_VALUE, genders)
    incrementCount(AGE_VALUE, ages)
    incrementCount(LATERALITY_VALUE, lateralities)
    
    if AGE_VALUE <= 20:
    	ages_int["<20"] = ages_int["<20"] + 1
    elif AGE_VALUE >= 21 and AGE_VALUE <= 30:
    	ages_int["21-30"] = ages_int["21-30"] + 1
    elif AGE_VALUE >= 31 and AGE_VALUE <= 40:
    	ages_int["31-40"] = ages_int["31-40"] + 1
    elif AGE_VALUE >= 41 and AGE_VALUE <= 50:
    	ages_int["41-50"] = ages_int["41-50"] + 1
    elif AGE_VALUE >= 51 and AGE_VALUE <= 60:
    	ages_int["51-60"] = ages_int["51-60"] + 1
    else:
    	ages_int["61>"] = ages_int["61>"] + 1

print codes
print regions
print languages
print useragents
print genders
print ages
print ages_int
print lateralities
