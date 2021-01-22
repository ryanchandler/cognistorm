import sys
import logging
import pymysql
import json
import os
import boto3


rds_host = os.environ['rds_host']
name = os.environ['name']
password = os.environ['password']
db_name = os.environ['db_name']


# logging
logger = logging.getLogger()
logger.setLevel(logging.INFO)



# connect using creds from rds_config.py
try:
    conn = pymysql.connect(rds_host, user=name, passwd=password, db=db_name, connect_timeout=5)
except:
    logger.error("ERROR: Unexpected error: Could not connect to MySql instance.")
    sys.exit()

logger.info("SUCCESS: Connection to RDS mysql instance succeeded")







# executes upon API event
def lambda_handler(event, context):
    
    myUID =  event['params']['querystring']['uid']
    
    
    with conn.cursor() as cur:
        cur.execute("UPDATE BackchannelsDimensionsDegreesSubjects SET completedBySubjectUUID = %s WHERE completedBySubjectUUID LIKE 'unassigned' LIMIT 1;", (myUID,))
        conn.commit()
     
    with conn.cursor() as cur:
        cur.execute(" SELECT * FROM  BackchannelsDimensionsDegreesSubjects  WHERE completedBySubjectUUID  LIKE %s AND dateTimeStampCompleted IS NULL;", (myUID,) )
        conn.commit()
        
        result = cur.fetchall()
        trialID = result[0][0]
    with conn.cursor() as cur:
        cur.execute("UPDATE BackchannelsDimensionsDegreesSubjects SET dateTimeStampCompleted = NOW() WHERE completedBySubjectUUID  LIKE %s AND id  = %s ;", (myUID, trialID,) )
        conn.commit()
        
    return {
  
        'statusCode': 200,
        'headers': {
            'Access-Control-Allow-Headers': 'Content-Type',
            'Access-Control-Allow-Origin': 'https://www.cognistorm.com/',
            'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT',
            'Access-Control-Allow-Credentials': 'true'
            
            
        },
        
        'dimension':result[0][2],
        'backchannel':result[0][1],
        'selectedDegree':result[0][5],
        'degree1Label':result[0][3],
        'degree2Label':result[0][4],
        'uid': myUID,
        'trialID':result[0][0],
        'prompt': result[0][10],
        'selectedDegreeClause': result[0][8],
        
        
        
        
       
    }
