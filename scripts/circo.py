#!/usr/bin/python
import json
import urllib2
import os
import sys
import time
from pymongo import MongoClient

# Read settings
_json_data = open('settings.json')
_settings = json.load(_json_data)

_host = _settings["host"]

# MongoDB
mongo_client = MongoClient('localhost', 27017)
db = mongo_client['circo']

################################################################################
#                                   FUNCTIONS                                  #
################################################################################

def downloadFile(path, name):
    print "Downloading '{0}' into 'data/{1}.json'".format(path, name)

    response = urllib2.urlopen(path)
    text = response.read()

    if not os.path.exists("data"):
        os.makedirs("data")

    file_ = open('data/{0}.json'.format(name), 'w')
    file_.write(text)
    file_.close()

    return json.loads(text)

def loopObservations(observations):
    for observation in observations:
        print observation

def downloadData():
    # Download audits
    _url_audits = _settings["url_audits"].format(_host)
    audits = downloadFile(_url_audits, "audits")

    # Download users
    _url_users = _settings["url_users"].format(_host)
    users = downloadFile(_url_users, "users")

    # Download observations
    #_url_all_observations = _settings["url_all_observations"].format(_host)
    #observations = downloadFile(_url_all_observations, "observations")

    # Download observations ids
    _url_observations_ids = _settings["url_observations_ids"].format(_host)
    ids = downloadFile(_url_observations_ids, "observation_ids")

    # Download observations
    print "Downloading {0} observations".format(len(ids))
    _url_observations_by_id = _settings["url_observations_by_id"]

    observations = []

    count = 0
    length = float(len(ids))
    start = time.time()

    for id in ids:
        url = _url_observations_by_id.format(_host, id)
        response = urllib2.urlopen(url)
        observation = response.read()

        observation = json.loads(observation)
        observations.append(observation[0])

        count = count + 1

        if count % 1000 == 0:
            _time = time.time()
            difference = _time - start
            time_per_item = difference / count
            remaind = length - count
            time_to_finish = round(remaind * time_per_item / 60)

            percent = round(count * 100 / length, 2)
            print "{0}% Time to finish {1} minutes".format(percent, time_to_finish)

    file_ = open('data/observations.json', 'w')
    file_.write(json.dumps(observations))
    file_.close()

def storeData():
    # Audits
    db.audits.drop()
    audits = json.load(open('data/audits.json'))
    db.audits.insert(audits)

    # Users
    db.users.drop()
    users = json.load(open('data/users.json'))
    db.users.insert(users)

    # Observations
    db.observations.drop()
    observations = json.load(open('data/observations.json'))
    db.observations.insert(observations)

def decorateUsers():
    observations = db.observations.find({ "type": "answer" })

    # Set user questions

    for observation in observations:
        user_id = observation["user_id"]

        question = observation["element"]
        answer = observation["value"]

        user = db.users.find_one({ "id" : user_id })

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
    print "  2. Insert data in MongoDB"
    print "  3. Decorate users with answers"
    print "  4. List audits"
    print "  5. List tests"
    print "  6. List elements"
    print "  7. List questions"
    print "  8. Get users that answered all questions"
    print "  9. Get users that answered all questions (filtered by 'info')"
    print " 10. Process data"
    print " x. Exit"
    print "________________________________________________________________________________"

    while True:
        print
        option = raw_input("Enter option: ")
        print

        if option == "1":
            downloadData()
        elif option == "2":
            storeData()
        elif option == "3":
            decorateUsers()
        elif option == "4":
            listAudits()
        elif option == "5":
            listTests()
        elif option == "6":
            listElements()
        elif option == "7":
            listQuestions()
        elif option == "8":
            listFullUsers()
        elif option == "9":
            listFullUsersFilteredByInfo()
        elif option == "10":
            processData()
        elif option == "x":
            print "¡Hasta luego amigo!"
            sys.exit([0])
