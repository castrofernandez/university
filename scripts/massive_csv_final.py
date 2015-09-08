#!/usr/bin/python

import urllib
import json
import os.path

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

headers = ["id", "code", "first_language", "ip", "region", "gender", "age", "laterality", "numeros_errors", "topos_errors", "palabras_errors"]
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
ip_list = {}

if os.path.isfile('regions.json'):
	with open('regions.json') as data_file:
		ip_list = json.load(data_file)

es_length = len("cocodrilovelozperrokiwi")
en_length = len("crocodilequickdogkiwi")

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
    		
    # Errores
    numeros_clicks = user_results["numeros_clicks"] if "numeros_clicks" in user_results else float("inf")
    topos_hits = user_results["topos_hits"] if "topos_hits" in user_results else 0
    palabras_key_ups = user_results["palabras_key_ups"] if "palabras_key_ups" in user_results else float("inf")
    
    numeros_errors = numeros_clicks - 20 # 20 is the total (optimum)
    topos_errors = 12 - topos_hits # 12 times that moles go up
    
    str_length = es_length if first_language == "es" else en_length
    palabras_errors = palabras_key_ups - str_length
    
    row = {}
    rows.append(row)
    
    row["numeros_errors"] = numeros_errors
    row["topos_errors"] = topos_errors
    row["palabras_errors"] = palabras_errors
    
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
    
    if ip in ip_list:
    	region = ip_list[ip]
    else:
    	region = getRegion(ip)
    	ip_list[ip] = region
    
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

# Store regions

with open('regions.json', 'w') as outfile:
	json.dump(ip_list, outfile)