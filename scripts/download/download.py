#!/usr/bin/python

import pymysql
from pymongo import MongoClient

# MongoDB
mongo_client = MongoClient('localhost', 27017)
db = mongo_client['circo']

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
        maximum = minimum + 1000

        if maximum > mysql_max:
            maximum = mysql_max

        print "Downloading '%s' records from %i to %i out of %i" % (name, minimum, maximum, mysql_max)

        database_structure = download_database_records(cursor, name, database_structure, minimum, maximum)

        minimum = minimum + 1000

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

download_data()
