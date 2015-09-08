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

def incrementCount(label, obj):
    if label in obj:
        obj[label] = obj[label] + 1
    else:
        obj[label] = 1
        
# Headers

headers = ["id", "code", "first_language", "ip", "region", "gender", "age", "laterality"]
headers_tests = []
user_list = []

for user in users:
	user_list.append(user)
	results = user["results"]
	
	for test in results:
		for indicator in results[test]:
			header = "%s_%s" % (test, indicator)

			if header not in headers_tests:
				headers_tests.append(header)
				headers.append(header)

rows = []

for user in user_list:
    first_language = user["acceptlanguage"].split(",")[0]
    first_language = first_language.split("-")[0]
    
    results = user["results"]
    user_results = {}
    
    for test in results:
    	for indicator in results[test]:
    		header = "%s_%s" % (test, indicator)
    		value = results[test][indicator]
    		
    		user_results[header] = value
    
    row = {}
    rows.append(row)
    
    for header in headers_tests:
    	value = user_results[header] if header in user_results else "-"
    	row[header] = value
    
    id = user["id"]
    code = user["code"]
    ip = user["ip"]
    questions = user["questions"]
    GENDER_VALUE = questions["GENDER_VALUE"]
    AGE_VALUE = int(questions["AGE_VALUE"])
    LATERALITY_VALUE = questions["LATERALITY_VALUE"]

    region = "-"
    #region = getRegion(ip)
    
    row["id"] = id
    row["code"] = code
    row["first_language"] = first_language
    row["ip"] = ip
    row["region"] = region
    row["gender"] = GENDER_VALUE
    row["age"] = AGE_VALUE
    row["laterality"] = LATERALITY_VALUE

# Generate CSV file

with open('circo_errores.csv', 'w') as csvfile:
	writer = csv.DictWriter(csvfile, fieldnames = headers, delimiter=';')
	
	writer.writeheader()
	
	for row in rows:
		writer.writerow(row)
