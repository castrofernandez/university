#!/usr/bin/python
from pymongo import MongoClient

# MongoDB
mongo_client = MongoClient('localhost', 27017)
db = mongo_client['circo']

# CSV
import csv

# JSON
import simplejson

def get_audit_tests():
    users = db.users.find({"finished" : True, "id": { "$gte": 491 } }).sort("id", 1)

    user_list = []

    for user in users:
        info = user["info"]

        if info is None:
            continue

        number = int(info)

        if number == 0:
            continue

        user_list.append(user)

    return user_list

def process_results(users):
    identifiers = []
    headers = ["id_1", "id_2", "UO", "gender", "age_1", "age_2", "laterality"]
    rows = []

    # Identifiers
    for user in users:
        first = user["first"]
        results = first["results"]

        for identifier in results:
            if identifier not in identifiers:
                identifiers.append(identifier)

    # Headers
    for identifier in identifiers:
        headers.append("%s_time_a" % identifier)
        headers.append("%s_time_b" % identifier)
        headers.append("%s_distance_a" % identifier)
        headers.append("%s_distance_b" % identifier)

    headers.append("numeros_clicks_a")
    headers.append("numeros_clicks_b")
    headers.append("topos_hits_a")
    headers.append("topos_hits_b")
    headers.append("palabras_key_ups_a")
    headers.append("palabras_key_ups_b")

    for user in users:
        print "User %s" % first["info"]
    	academic_results_user = academic_results["UO%s" % first["info"]]

        first = user["first"]
        second = user["second"]

        row = {}
        rows.append(row)

        row["id_1"] = first["id"]
        row["id_2"] = second["id"]
        row["UO"] = first["info"]

        first_questions = first["questions"]
        second_questions = second["questions"]
        first_results = first["results"]
        second_results = second["results"]

        row["gender"] = first_questions["GENDER_VALUE"]
        row["age_1"] = first_questions["AGE_VALUE"]
        row["age_2"] = second_questions["AGE_VALUE"]
        row["laterality"] = first_questions["LATERALITY_VALUE"]

        row["numeros_clicks_a"] = first_results["numeros"]["clicks"]
        row["numeros_clicks_b"] = second_results["numeros"]["clicks"]
        row["topos_hits_a"] = first_results["topos"]["hits"]
        row["topos_hits_b"] = second_results["topos"]["hits"]
        row["palabras_key_ups_a"] = first_results["palabras"]["key_ups"]
        row["palabras_key_ups_b"] = second_results["palabras"]["key_ups"]

        for identifier in identifiers:
            result_1 = {}
            result_2 = {}
            time_1 = ""
            time_2 = ""
            distance_1 = ""
            distance_2 = ""

            if identifier in first_results:
                result_1 = first_results[identifier]

            if identifier in second_results:
                result_2 = second_results[identifier]

            if "time_length" in result_1:
                time_1 = result_1["time_length"]

            if "time_length" in result_2:
                time_2 = result_2["time_length"]

            if "distance" in result_1:
                distance_1 = round(result_1["distance"])

            if "distance" in result_2:
                distance_2 = round(result_2["distance"])

            row["%s_time_a" % identifier] = time_1
            row["%s_time_b" % identifier] = time_2
            row["%s_distance_a" % identifier] = distance_1
            row["%s_distance_b" % identifier] = distance_2

    print_results(headers, rows)
    return identifiers

def print_results(headers, rows):
    with open('circo.csv', 'w') as csvfile:
        writer = csv.DictWriter(csvfile, fieldnames = headers, delimiter=';')

        writer.writeheader()

        for row in rows:
            writer.writerow(row)

def print_images(users, identifiers):
    length = len(users)
    count = 1

    for user in users:
        print "%i/%i" % (count, length)

        first = user["first"]
        second = user["second"]
        id_1 = first["id"]
        id_2 = second["id"]
        UO = first["info"]

        width_1 = first["width"]
        width_2 = second["width"]
        height_1 = first["height"]
        height_2 = second["height"]

        for identifier in identifiers:
            observations_1 = db.observations.find({"user_id": id_1, "identifier": identifier}).sort([("id", 1), ("instant", 1)])
            generate_image("%s_%s_a" % (UO, identifier), width_1, height_1, observations_1)
            observations_2 = db.observations.find({"user_id": id_2, "identifier": identifier}).sort([("id", 1), ("instant", 1)])
            generate_image("%s_%s_b" % (UO, identifier), width_2, height_2, observations_2)

        count = count + 1

def generate_image(name, width, height, observations):
    f = open("imgs/%s.svg" % name, 'w')

    points = ""

    for observation in observations:
        type = observation["type"]

        if type != "onmousemove":
            continue

        x = int(observation["sx"])
        y = int(observation["sy"])

        if x >= 0 and y >= 0:
            points = points + "%i,%i " % (x, y)

    f.write("<svg width='%s' height='%s' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'>\n" % (width, height))
    f.write("<g>\n")
    f.write("<polyline fill='none' stroke='red' points='%s' />" % points)
    f.write("</g>\n")
    f.write("</svg>\n")

    f.close()

def get_academic_results(file):
	json_data = open(file)
	data = simplejson.load(json_data)

	results = {}

	for student in data:
		UO = student["UO"]
		results[UO] = student

	json_data.close()

	return results

users = get_audit_tests("UO1")

# Print results
identifiers = process_results(users)

# Print images
#print_images(valid_users, identifiers)
