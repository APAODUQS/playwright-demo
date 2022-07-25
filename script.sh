export JIRAUSERNAME=$1
export JIRAPASS=$2
export SUMMARY=$3
export TICKET=$4
export JIRA_URL="https://paoduq.atlassian.net"

echo 'Creating the Test Execution'
export TEST_EXECUTION=$(curl --request POST -u ${JIRAUSERNAME}:${JIRAPASS} ${JIRA_URL}/rest/api/2/issue \
--header 'Content-Type: application/json' \
--data-raw "{
   \"fields\": {
       \"project\":
       {
          \"key\": \"DESK\"
       },
       \"summary\": \"Automation Testing | Execute automated tests for ${SUMMARY}\",
       \"description\": \"Test Execution for running the automated tests\",
       \"issuetype\": {
          \"name\": \"Test Execution\"
       }
   }
}" | cut -d '"' -f 8)

echo 'Adding tests to Test Execution'
curl -X POST -H "Content-Type: application/json" -u ${JIRAUSERNAME}:${JIRAPASS} ${JIRA_URL}/rest/raven/1.0/api/testexec/${TEST_EXECUTION}/test \
--data-raw "{
   \"add\": [
        \"${TICKET}\"
    ]
}"

echo $TEST_EXECUTION


