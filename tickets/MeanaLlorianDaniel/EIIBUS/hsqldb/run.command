#!/bin/bash
#!/bin/bash
DIR=$(dirname $0)
cd $DIR
java -cp lib/hsqldb.jar org.hsqldb.server.Server --database.0 file:db/eiibus --dbname.0 eiibus