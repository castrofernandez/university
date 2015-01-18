#!/usr/bin/python
import json
import urllib2
import os
import sys
import time
import math
from pymongo import MongoClient
import pymysql

# Constants

DOWNLOAD_IN_A_ROW = 2000
PROCESS_IN_A_ROW = 10

MODEL_WIDTH = 600
MODEL_HEIGHT = 700

# Read settings
_json_data = open('settings.json')
_settings = json.load(_json_data)

_host = _settings["host"]

# MongoDB
mongo_client = MongoClient('localhost', 27017)
db = mongo_client['circo']

# MySQL
conn = pymysql.connect(host='juancastro.es', port=3306, user='juancast_circo', passwd='neuronal_org_1', db='juancast_circo')
cur = conn.cursor()

################################################################################
#                                   FUNCTIONS                                  #
################################################################################

################################################################################
#                              DOWNLOAD DATABASE
################################################################################

def download_database(cursor, name):
    # Min and max MySQL ids
    cursor.execute("SELECT MIN(id) AS min, MAX(id) AS max FROM %s" % name)

    mysql_min = 0
    mysql_max = 0

    for row in cursor:
       mysql_min = row[0]
       mysql_max = row[1]

    # Max MongoDB id
    mongodb_max = db[name].find_one(sort=[("id", -1)])

    if mongodb_max is None:
        mongodb_max = 0

    minimum = max(mongodb_max, mysql_min)

    database_structure = None

    while minimum < mysql_max:
        maximum = minimum + DOWNLOAD_IN_A_ROW

        if maximum > mysql_max:
            maximum = mysql_max

        print "Downloading '%s' records from %i to %i out of %i" % (name, minimum, maximum, mysql_max)

        database_structure = download_database_records(cursor, name, database_structure, minimum, maximum)

        minimum = minimum + DOWNLOAD_IN_A_ROW

################################################################################
#                              DOWNLOAD RECORDS
################################################################################

def download_database_records(cursor, name, structure, minimum, maximum):
    query = "SELECT * FROM %s WHERE id >= %i AND id <= %i" % (name, minimum, maximum)
    cursor.execute(query)

    if structure is None:
        structure = get_database_structure(cursor)

    for row in cursor:
        obj = {}

        for i, value in enumerate(structure):
            obj[value] = row[i]

        db[name].save(obj)

    return structure

################################################################################
#                              DATABASE STRUCTURE
################################################################################

def get_database_structure(cursor):
    description = cursor.description
    structure = []

    for i in description:
        structure.append(i[0])

    return structure

################################################################################
#                              DOWNLOAD ALL DATA
################################################################################

def download_data():
    # MySQL
    conn = pymysql.connect(host='juancastro.es', port=3306, user='juancast_circo', passwd='neuronal_org_1', db='juancast_circo')
    cursor = conn.cursor()

    download_database(cursor, "users")
    download_database(cursor, "audits")
    download_database(cursor, "observations")

    # Close MySQL connection
    cursor.close()
    conn.close()

################################################################################
#                              DECORATE USERS
################################################################################

def clear_user_results():
    db.users.update({}, { "$unset": { "questions" : 1 } }, upsert = False, multi = True)
    db.users.update({}, { "$unset": { "finished" : 1 } }, upsert = False, multi = True)
    db.users.update({}, { "$unset": { "results" : 1 } }, upsert = False, multi = True)

    db.users.update({}, { "$set": { "processed" : False } }, upsert = False, multi = True)

def set_finished_users():
    observations = db.observations.find({ "type": "answer" })

    # Set user questions

    for observation in observations:
        user_id = observation["user_id"]

        question = observation["element"]
        answer = observation["value"]

        user = db.users.find_one({ "id" : user_id })

        if user is None:
            continue

        questions = user["questions"] if "questions" in user else {}

        questions[question] = answer

        user["questions"] = questions

        db.users.update({ "id" : user_id }, { "$set": user }, upsert = False)

    # Set if user has finished the test

    number_of_questions = getNumberQuestions()

    users = db.users.find()

    for user in users:
        user_id = user["id"]
        questions = user["questions"] if "questions" in user else None

        if questions is None or len(questions) < number_of_questions:
            user["finished"] = False
        else:
            user["finished"] = True

        db.users.update({ "id" : user_id }, { "$set": user }, upsert = False)

def get_test_time_length(observations):
    return observations[-1]["instant"]

def get_test_distance(observations, width, height):
    distance = 0
    previous_x = -1
    previous_y = -1

    for observation in observations:
        type = observation["type"]

        if type != "onmousemove":
            continue

        x = int(observation["sx"])
        y = int(observation["sy"])

        # Translate point to model coordinates
        x = MODEL_WIDTH * x / width
        y = MODEL_HEIGHT * x / height

        if previous_x >= 0 and previous_y >= 0 and x >= 0 and y >= 0:
            d = math.sqrt( math.pow(x - previous_x, 2) + math.pow(y - previous_y, 2) )
            distance = distance + d

        previous_x = x
        previous_y = y

    print distance
    return round(distance)

# Prevenir los casos de solapamiento
def split_observations_into_tests(observations, identifier):
    if identifier != "botones4" and identifier != "puntuacion":
        return [ list(observations) ]

    group = []
    groups = [ group ]

    previous_instant = -1;

    for observation in observations:
        instant = observation["instant"]

        if (instant < previous_instant):
            group = []
            groups.append(group)

        group.append(observation)

        previous_instant = instant

    return groups

def split_user_results_into_tests(user_id, info, identifiers, index, count, width, height):
    print "\nUser %i - info: %s (%i/%i)" % (user_id, info, index, count)

    results = {}

    for identifier in identifiers:
        observations = db.observations.find({ "user_id" : user_id, "identifier": identifier }).sort([("id", 1), ("instant", 1)])

        groups = split_observations_into_tests(observations, identifier)
        count = 1

        for observations in groups:
            test_identifier = identifier

            if count > 1:
                test_identifier = "%s_%i" % (test_identifier, count)
                print "%s %i" % (user_id, count)

            if len(observations) > 0:
                print "\t test: %s" % test_identifier
                observation_list = list(observations)
                results[test_identifier] = {
                    "time_length": get_test_time_length(observation_list),
                    "distance": get_test_distance(observation_list, width, height)
                }

            count = count + 1

    return results

def process_user_results():
    users = db.users.find({ "finished" : True, "processed": False }).sort("id", 1).limit(PROCESS_IN_A_ROW)

    while users.count() > 0:
        print "COUNT %i" % users.count()

        identifiers = db.observations.find().distinct("identifier")

        index = 1
        count = users.count()

        for user in users:
            user_id = user["id"]
            info = user["info"]
            width = user["width"]
            height = user["height"]
            tests = split_user_results_into_tests(user_id, info, identifiers, index, count, width, height)
            user["results"] = tests
            user["processed"] = True

            db.users.update({ "id" : user_id }, { "$set": user }, upsert = False)

            index = index + 1

        users = db.users.find({ "finished" : True, "processed": False }).sort("id", 1).limit(PROCESS_IN_A_ROW)

def decorate_users():
    print "Cleaning previous user calculations"
    clear_user_results()
    print "Calculating finishing users"
    set_finished_users()
    print "Processing users"
    process_user_results()

def processData():
    return

def listAudits():
    audits = db.audits.find()

    for audit in audits:
        print "{0}: {1}".format(audit["id"], audit["code"])

def listTests():
    tests = db.observations.distinct("identifier")

    for test in sorted(tests):
        print test

def listElements():
    elements = db.observations.distinct("element")

    for element in sorted(elements):
        print element

def listQuestions():
    questions = db.observations.find({ "type": "answer" }).distinct("element")

    for question in questions:
        print question

def getNumberQuestions():
    questions = db.observations.find({ "type": "answer" }).distinct("element")

    return len(questions)

def listFullUsers():
    _listFullUsers(False)

def listFullUsersFilteredByInfo():
    _listFullUsers(True)

def _listFullUsers(distinct):
    audits = db.audits.find()
    questions = db.observations.find({ "type": "answer" }).distinct("element")

    for audit in audits:
        code = audit["code"]

        finished = db.users.find({ "$and" : [
            {
                "code": code
            },
            {
                "finished": True
            }
        ]}).count()

        unfinished = db.users.find({ "$and" : [
            {
                "code": code
            },
            {
                "finished": False
            }
        ]}).count()

        print "{0}: finished {1}, unfinished {2}".format(code, finished, unfinished)

        listUserStatsByAnswer(code, questions, distinct)

        print

def listUserStatsByAnswer(audit, questions, distinct):
    for question in questions:
        print "\t" + question

        question_name = "questions." + question
        answers = db.users.find({ "code" : audit }).distinct(question_name)

        for answer in answers:
            users = db.users.find({ "$and" : [
                {
                    "finished": True
                },
                {
                    "code": audit
                },
                {
                    question_name: answer
                }
            ] })

            count = users.count()

            if distinct:
                count = len(users.distinct("info"))


            print "\t\t{0}: {1}".format(answer, count)

################################################################################
#                                      MAIN                                    #
################################################################################

if __name__ == "__main__":
    print "________________________________________________________________________________"
    print "|                                      CIRCO                                   |"
    print "''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''"
    print "  1. Download data"
    print "  2. Decorate users with answers"
    print "  3. List audits"
    print "  4. List tests"
    print "  5. List elements"
    print "  6. List questions"
    print "  7. Get users that answered all questions"
    print "  8. Get users that answered all questions (filtered by 'info')"
    print "  9. Process data"
    print " x. Exit"
    print "________________________________________________________________________________"

    while True:
        print
        option = raw_input("Enter option: ")
        print

        if option == "1":
            download_data()
        elif option == "2":
            decorate_users()
        elif option == "3":
            listAudits()
        elif option == "4":
            listTests()
        elif option == "5":
            listElements()
        elif option == "6":
            listQuestions()
        elif option == "7":
            listFullUsers()
        elif option == "8":
            listFullUsersFilteredByInfo()
        elif option == "9":
            processData()
        elif option == "x":
            print "¡Hasta luego amigo!"
            sys.exit([0])
