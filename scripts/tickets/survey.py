#!/usr/bin/python

import urllib
import json
import csv
import sys

ips = {}

def getRegion(ip):
	if ip not in ips:
		region = urllib.urlopen('https://freegeoip.net/json/%s' % ip).read()
		region = json.loads(region)
	
		if "country_code" in region:
			region = region["country_code"]
		else:
			region = "-"
		
		ips[ip] = region
		
	return ips[ip]

# User data
user_data = {}

f = open("user_data.csv", 'rt')
try:
    reader = csv.reader(f)
    for row in reader:
    	email = row[0].lower()
    	
    	user_data[email] = {
			"email": email,
			"age": row[1],
			"document": row[2],
			"type": row[3],
			"gender": row[4],
			"lastname": row[5],
			"laterality": row[6],
			"name": row[7]
		}
finally:
    f.close()  
    
# Email - session (to complete some gaps)
email_session = {}

f = open("email_session.csv", 'rt')
try:
    reader = csv.reader(f)
    for row in reader:
    	email = row[0].lower()
    	
    	email_session[email] = {
			"email": email,
			"session": row[1]
		}
finally:
    f.close()   

# Users
users = {}

f = open("users.csv", 'rt')
try:
    reader = csv.reader(f)
    for row in reader:
    	session = row[7]
    	
    	users[session] = {
			"id": row[0],
			"ip": row[1],
			"user_agent": row[2],
			"accept_language": row[3],
			"width": row[4],
			"height": row[5],
			"info": row[6],
			"session": session,
			"creation": row[8]
		}
finally:
    f.close()   

# Surveys
data = []

f = open("surveys.csv", 'rt')
try:
    reader = csv.reader(f)
    for row in reader:
		# Start survey
		ss1 = row[0]
		ss2 = row[1]
		ss3 = row[2]
		ss4 = row[3]
		ss5 = row[4]
		ss6 = row[5]
		ss7 = row[6]
		ss8 = row[7]
		ss9 = row[8]
		ss10 = row[9]
		
		ss_time = row[10]
		
		# Final survey
		fs1 = row[11]
		fs2 = row[12]
		fs3 = row[13]
		fs4 = row[14]
		fs5 = row[15]
		fs6 = row[16]
		fs7 = row[17]
		fs8 = row[18]
		fs9 = row[19]
		fs10 = row[20]
		fs11 = row[21]
		fs12 = row[22]
		fs13 = row[23]
		fs14 = row[24]
		fs15 = row[25]
		fs16 = row[26]
		fs17 = row[27]
		fs18 = row[28]
		fs19 = row[29]
		fs20 = row[30]
		fs21 = row[31]
		fs22 = row[32]
		fs23 = row[33]
		fs24 = row[34]
		fs25 = row[35]
		fs26 = row[36]
		fs27 = row[37]
		fs28 = row[38]
		
		fs_time = row[39]
		
		email = row[40].lower()
		session = row[41]
		
		user_user_data = user_data[email]

		ip = ''
		region = ''
		
		if session in users:
			user = users[session]
			ip = user["ip"]
			region = getRegion(ip)
			
		print "%s %s" % (ip, region)
		
		age = user_user_data["age"]
		gender = user_user_data["gender"]
		laterality = user_user_data["laterality"]
		name = user_user_data["name"].strip()
		lastname = user_user_data["lastname"].strip()
		document = user_user_data["document"].strip()
		
		row.append(age)
		row.append(gender)
		row.append(laterality)
		row.append(name)
		row.append(lastname)
		row.append(document)
			
		row.append(ip)
		row.append(region)
		
		data.append(row)
finally:
    f.close()
    
# Generate file

with open('generated.csv', 'w') as fp:
	a = csv.writer(fp, delimiter=';', quotechar = '"', quoting=csv.QUOTE_NONNUMERIC)
	a.writerows(data)