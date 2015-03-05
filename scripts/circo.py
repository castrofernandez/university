#!/usr/bin/python
import json
import urllib2
import os
import sys
import time
import math
from pymongo import MongoClient
import pymysql

class Circo:
    def __init__(self, option = None):
        # Constants
        self.DOWNLOAD_IN_A_ROW = 2000
        self.PROCESS_IN_A_ROW = 10

        self.MODEL_WIDTH = 600
        self.MODEL_HEIGHT = 700

        # Read settings
        _json_data = open('settings.json')
        _settings = json.load(_json_data)

        _host = _settings["host"]

        # MongoDB
        mongo_client = MongoClient('localhost', 27017)
        self.db = mongo_client['circo']

        print "Objeto de la clase Circo creado, parámetro: '%s'" % str(option)

        if option is not None:
            self.processOption(option)

    ############################################################################
    #                              DOWNLOAD DATABASE
    ############################################################################

    def download_database(self, cursor, name):
        # Min and max MySQL ids
        cursor.execute("SELECT MIN(id) AS min, MAX(id) AS max, COUNT(1) AS number FROM %s" % name)

        mysql_min = 0
        mysql_max = 0
        mysql_number = 0

        for row in cursor:
           mysql_min = row[0]
           mysql_max = row[1]
           mysql_number = row[2]

        print "MySQL min id: %i, max id: %i, total: %i" % (mysql_min, mysql_max, mysql_number)

        # Max MongoDB id
        mongodb_max = self.db[name].find_one(sort=[("id", -1)])
        mongodb_number = self.db[name].count()

        if mongodb_max is None:
            mongodb_max = 0
        else:
            mongodb_max = mongodb_max["id"]

        print "MongoDB max id: %i, total: %i" % (mongodb_max, mongodb_number)

        minimum = max(mongodb_max, mysql_min)

        database_structure = None

        records_to_download = mysql_max - minimum

        while minimum < mysql_max:
            maximum = minimum + self.DOWNLOAD_IN_A_ROW

            if maximum > mysql_max:
                maximum = mysql_max

            print "Downloading '%s' records from %i to %i out of %i" % (name, minimum, maximum, mysql_max)

            database_structure = self.download_database_records(cursor, name, database_structure, minimum, maximum)

            minimum = minimum + self.DOWNLOAD_IN_A_ROW + 1

        return "Downloaded %i records" % records_to_download

    ############################################################################
    #                              DOWNLOAD RECORDS
    ############################################################################

    def download_database_records(self, cursor, name, structure, minimum, maximum):
        query = "SELECT * FROM %s WHERE id >= %i AND id <= %i" % (name, minimum, maximum)
        cursor.execute(query)

        if structure is None:
            structure = self.get_database_structure(cursor)

        for row in cursor:
            obj = {}

            for i, value in enumerate(structure):
                obj[value] = row[i]

            self.db[name].save(obj)

        return structure

    ############################################################################
    #                              DATABASE STRUCTURE
    ############################################################################

    def get_database_structure(self, cursor):
        description = cursor.description
        structure = []

        for i in description:
            structure.append(i[0])

        return structure

    ############################################################################
    #                              DOWNLOAD ALL DATA
    ############################################################################

    def download_data(self):
        # MySQL
        conn = pymysql.connect(host='juancastro.es', port=3306, user='juancast_circo', passwd='neuronal_org_1', db='juancast_circo')
        cursor = conn.cursor()

        self.download_database(cursor, "users")
        self.download_database(cursor, "audits")
        number = self.download_database(cursor, "observations")

        # Close MySQL connection
        cursor.close()
        conn.close()

        return number

    ############################################################################
    #                                DECORATE USERS
    ############################################################################

    def clear_user_results(self):
        self.db.users.update({}, { "$unset": { "questions" : 1 } }, upsert = False, multi = True)
        self.db.users.update({}, { "$unset": { "finished" : 1 } }, upsert = False, multi = True)
        self.db.users.update({}, { "$unset": { "results" : 1 } }, upsert = False, multi = True)

        self.db.users.update({}, { "$set": { "processed" : False } }, upsert = False, multi = True)

    def set_finished_users(self):
        observations = self.db.observations.find({ "type": "answer" })

        # Set user questions

        for observation in observations:
            user_id = observation["user_id"]

            question = observation["element"]
            answer = observation["value"]

            user = self.db.users.find_one({ "id" : user_id })

            if user is None:
                continue

            questions = user["questions"] if "questions" in user else {}

            questions[question] = answer

            user["questions"] = questions

            self.db.users.update({ "id" : user_id }, { "$set": user }, upsert = False)

        # Set if user has finished the test

        number_of_questions = self.getNumberQuestions()

        users = self.db.users.find()

        for user in users:
            user_id = user["id"]
            questions = user["questions"] if "questions" in user else None

            if questions is None or len(questions) < number_of_questions:
                user["finished"] = False
            else:
                user["finished"] = True

            self.db.users.update({ "id" : user_id }, { "$set": user }, upsert = False)

    def get_test_time_length(self, observations):
        return observations[-1]["instant"]

    def get_test_distance(self, observations, width, height):
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
            x = self.MODEL_WIDTH * x / width
            y = self.MODEL_HEIGHT * x / height

            if previous_x >= 0 and previous_y >= 0 and x >= 0 and y >= 0:
                d = math.sqrt( math.pow(x - previous_x, 2) + math.pow(y - previous_y, 2) )
                distance = distance + d

            previous_x = x
            previous_y = y

        print distance
        return round(distance)

    # Prevenir los casos de solapamiento
    def split_observations_into_tests(self, observations, identifier):
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

    def split_user_results_into_tests(self, user_id, info, identifiers, index, count, width, height):
        print "\nUser %i - info: %s (%i/%i)" % (user_id, info, index, count)

        results = {}

        for identifier in identifiers:
            observations = self.db.observations.find({ "user_id" : user_id, "identifier": identifier }).sort([("id", 1), ("instant", 1)])

            groups = self.split_observations_into_tests(observations, identifier)
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
                        "time_length": self.get_test_time_length(observation_list),
                        "distance": self.get_test_distance(observation_list, width, height)
                    }

                count = count + 1

        return results

    def process_user_results(self):
        users = self.db.users.find({ "finished" : True, "processed": False }).sort("id", 1).limit(self.PROCESS_IN_A_ROW)

        while users.count() > 0:
            print "COUNT %i" % users.count()

            identifiers = self.db.observations.find().distinct("identifier")

            index = 1
            count = users.count()

            for user in users:
                user_id = user["id"]
                info = user["info"]
                width = user["width"]
                height = user["height"]
                tests = self.split_user_results_into_tests(user_id, info, identifiers, index, count, width, height)
                user["results"] = tests
                user["processed"] = True

                self.db.users.update({ "id" : user_id }, { "$set": user }, upsert = False)

                index = index + 1

            users = self.db.users.find({ "finished" : True, "processed": False }).sort("id", 1).limit(self.PROCESS_IN_A_ROW)

    def decorate_users(self):
        print "Cleaning previous user calculations"
        self.clear_user_results()
        print "Calculating finishing users"
        self.set_finished_users()
        print "Processing users"
        self.process_user_results()

    def processData(self):
        return

    def listAudits(self):
        audits = self.db.audits.find()

        for audit in audits:
            print "{0}: {1}".format(audit["id"], audit["code"])

    def listTests(self):
        tests = self.db.observations.distinct("identifier")

        for test in sorted(tests):
            print test

    def listElements(self):
        elements = self.db.observations.distinct("element")

        for element in sorted(elements):
            print element

    def listQuestions(self):
        questions = self.db.observations.find({ "type": "answer" }).distinct("element")

        for question in questions:
            print question

    def getNumberQuestions(self):
        questions = self.db.observations.find({ "type": "answer" }).distinct("element")

        return len(questions)

    def listFullUsers(self):
        self._listFullUsers(False)

    def listFullUsersFilteredByInfo(self):
        self._listFullUsers(True)

    def _listFullUsers(self, distinct):
        audits = self.db.audits.find()
        questions = self.db.observations.find({ "type": "answer" }).distinct("element")

        for audit in audits:
            code = audit["code"]

            finished = self.db.users.find({ "$and" : [
                {
                    "code": code
                },
                {
                    "finished": True
                }
            ]}).count()

            unfinished = self.db.users.find({ "$and" : [
                {
                    "code": code
                },
                {
                    "finished": False
                }
            ]}).count()

            print "{0}: finished {1}, unfinished {2}".format(code, finished, unfinished)

            self.listUserStatsByAnswer(code, questions, distinct)

            print

    def listUserStatsByAnswer(self, audit, questions, distinct):
        for question in questions:
            print "\t" + question

            question_name = "questions." + question
            answers = self.db.users.find({ "code" : audit }).distinct(question_name)

            for answer in answers:
                users = self.db.users.find({ "$and" : [
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

    ############################################################################
    #                                PROCESS OPTION
    ############################################################################

    def processOption(self, option):
        if option == "1":
            print self.download_data()
        elif option == "2":
            self.decorate_users()
        elif option == "3":
            self.listAudits()
        elif option == "4":
            self.listTests()
        elif option == "5":
            self.listElements()
        elif option == "6":
            self.listQuestions()
        elif option == "7":
            self.listFullUsers()
        elif option == "8":
            self.listFullUsersFilteredByInfo()
        elif option == "9":
            self.processData()
        elif option == "x":
            print "¡Hasta luego amigo!"
            sys.exit([0])

################################################################################
#                                      MAIN                                    #
################################################################################

def printMenu():
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

if __name__ == "__main__":
    arguments = sys.argv

    circo = Circo()

    if len(arguments) > 1:
        argument = arguments[1]
        circo.processOption(argument)
    else:
        while True:
            printMenu()
            print
            option = raw_input("Enter option: ")
            print
            circo.processOption(option)
