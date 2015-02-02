#!/usr/bin/python
from pymongo import MongoClient

# MongoDB
mongo_client = MongoClient('localhost', 27017)
db = mongo_client['circo']

# CSV
import csv

# JSON
import simplejson

def get_audit_tests(identifier):
    users = db.users.find({ "code" : identifier, "finished" : True }).sort("id", 1)

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

def compare_questions(questions_1, questions_2):
    if questions_1["GENDER_VALUE"] != questions_2["GENDER_VALUE"]:
        return False

    # They could have become 1 year older
    if questions_1["AGE_VALUE"] != questions_2["AGE_VALUE"] and int(questions_1["AGE_VALUE"]) +1 != int(questions_2["AGE_VALUE"]):
        return False

    if questions_1["LATERALITY_VALUE"] != questions_2["LATERALITY_VALUE"]:
        return False

    return True

def remove_repeated_users(users):
    checked_users = {}

    for user in users:
        info = user["info"]

        if info not in checked_users:
            checked_users[info] = {
                "valid": True,
                "user": user,
                "repeated": 0
            }
        else:
            questions_1 = user["questions"]
            questions_2 = checked_users[info]["user"]["questions"]
            check = compare_questions(questions_1, questions_2)

            checked_users[info]["valid"] = checked_users[info]["valid"] and check
            checked_users[info]["user"] = user
            checked_users[info]["repeated"] = checked_users[info]["repeated"] + 1

    not_repeated_users = []

    for info in checked_users:
        user = checked_users[info]

        if user["valid"]:
            not_repeated_users.append(user["user"])
        else:
            print "Repeated %s (%i times) valid: %s" % (info, user["repeated"], user["valid"])

    return not_repeated_users

def get_id_list(users):
    users = remove_repeated_users(users)

    id_list = {}

    for user in users:
        info = user["info"]

        if info not in id_list:
            id_list[info] = user

    return id_list

def get_intersection(users_first, users_second):
    id_list = {}

    for user in users_second:
        if user in users_first:
            id_list[user] = True

    return id_list

def check_answers(id_list, users_first, users_second):
    valid_users = []
    yes = 0
    no = 0
    men = 0
    women = 0

    for id in id_list:
        user_first_iteration = users_first[id]
        user_second_iteration = users_second[id]

        first_questions = user_first_iteration["questions"]
        second_questions = user_second_iteration["questions"]
        check = compare_questions(first_questions, second_questions)

        gender = first_questions["GENDER_VALUE"]

        if gender == "MAN":
            men = men + 1
        else:
            women = women + 1

        if check:
            yes = yes + 1
            valid_users.append({
                "first": users_first[id],
                "second": users_second[id]
            })
        else:
            no = no + 1
            print
            print first_questions
            print second_questions

    print "Users that answered the same in both iterations: %i" % yes
    print "Users that didn't answer the same in both iterations: %i" % no
    print "Men: %i" % men
    print "Women %i" % women

    return valid_users

def process_results(users, academic_results):
    identifiers = []
    headers = ["id_1", "id_2", "UO", "gender", "age_1", "age_2", "laterality", "T1", "T2", "T3", "Practicas", "Control1", "Control2", "Teoria", "Seminario", "Nota"]
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

    for user in users:
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
        
        # Academic results
        row["T1"] = academic_results_user["T1"]
        row["T2"] = academic_results_user["T2"]
        row["T3"] = academic_results_user["T3"]
        row["Practicas"] = academic_results_user["Practicas"]
        row["Control1"] = academic_results_user["Control1"]
        row["Control2"] = academic_results_user["Control2"]
        row["Teoria"] = academic_results_user["Teoria"]
        row["Seminario"] = academic_results_user["Seminario"]
        row["Nota"] = academic_results_user["Nota"]

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

# FIRST ITERATION
users_first = get_audit_tests("UO1")
# SECOND ITERATION
users_second = get_audit_tests("TUO5")
users_second.extend(get_audit_tests("TU05"))

print "First iteration %i users" % len(users_first)
print "Second iteration %i users" % len(users_second)

first_list = get_id_list(users_first)
second_list = get_id_list(users_second)

# List of users that completed both iterations
intersection = get_intersection(first_list, second_list)

print "Users that completed both iterations: %i" % len(intersection)

# Check answers
valid_users = check_answers(intersection, first_list, second_list)

academic_results = get_academic_results("evaluacion.json")

# Print results
identifiers = process_results(valid_users, academic_results)

# Print images
#print_images(valid_users, identifiers)
