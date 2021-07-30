const express = require('express');
const pool = require('../modules/pool');
const router = express.Router();

/**
 * GET route template
 */
router.get('/', async (req, res) => {
  // GET route code here
  // console.log('got to provider GET 🧍‍♂️');
  // res.send('🧍‍♂️');

  const queryText = `
  SELECT "provider".*,
  "credential".*,
  "education".*,
  "insurance".*,
  "mission_experience".*,
  "work_experience".*
  FROM "provider"
  FULL JOIN "credential"
  ON "provider".user_id = "credential".user_id
  FULL JOIN "education"
  ON "education".user_id = "provider".user_id
  FULL JOIN "insurance"
  ON "insurance".user_id = "provider".user_id
  FULL JOIN "mission_experience"
  ON "mission_experience".user_id = "provider".user_id
  FULL JOIN "work_experience"
  ON "work_experience".user_id = "provider".user_id
  FULL JOIN "user"
  ON "user".id = "provider".user_id
  WHERE "user".authorization = 1;
  `;

  try {
    const result = await pool.query(queryText);
    console.log('provider get result: ', result.rows);
    res.send(result.rows);
  }
  catch (err) {
    console.log('Error getting provider info: ', err);
    res.sendStatus(500);
  }

});

/**
 * GET featured provider route template
 */
router.get('/:id', async (req, res) => {
  // console.log('got to selected provider GET 👨🏻‍⚕️');
  // res.send('👨🏻‍⚕️');

  console.log('selected provider req.params.id: ', req.params.id);


  const queryText = `
  SELECT "provider".*,
  "credential".*,
  "education".*,
  "insurance".*,
  "mission_experience".*,
  "work_experience".*
  FROM "provider"
  JOIN "credential"
  ON "provider".user_id = "credential".user_id
  JOIN "education"
  ON "education".user_id = "provider".user_id
  JOIN "insurance"
  ON "insurance".user_id = "provider".user_id
  JOIN "mission_experience"
  ON "mission_experience".user_id = "provider".user_id
  JOIN "work_experience"
  ON "work_experience".user_id = "provider".user_id
  JOIN "user"
  ON "user".id = "provider".user_id
  WHERE "user".id = $1;
  `;

  try {
    const result = await pool.query(queryText, [req.params.id]);
    console.log('selected provider get result: ', result.rows);
    res.send(result.rows);
  }
  catch (err) {
    console.error('Error getting selected provider info: ', err);
    res.sendStatus(500);
  }

});

/**
 * POST route for initial provider post from /generalinfo
 */
router.post('/', (req, res) => {
  
  console.log('Reached provider reg POST:', req.body);
  
  let provider = req.body

  const queryText = `INSERT INTO "provider" (
      "user_id",
      "firstName",
      "lastName",
      "DOB",
      "providerRole",
      "validPassport",
      "soloProvider",
      "emailAddress"

    
    ) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
    `
  pool.query(queryText, [
    req.user.id,
    provider.firstName,
    provider.lastName,
    provider.dob,
    provider.providerRole,
    provider.validPassport,
    provider.soleProvider,
    provider.providerEmail

  ])
  .then( result => {
    console.log('created new provider');
    res.sendStatus(200)
  })
  .catch (error => {
    console.log('Error in Provider POST', error);
    res.sendStatus(500)
  })
});

router.post('/workhistoryitem', (req, res) => {
  // POST route code here
  console.log('Reached provider reg POST /workhistoryitem', req.body);
  // res.sendStatus(200)
  // Tucker

  const workHistoryItem = req.body
  const queryText = `INSERT INTO "work_experience" 
  (
    "workplace",
    "jobTitle",
    "referenceName",
    "referencePhone",
    "referenceEmail",
    "startDate",
    "endDate",
    "user_id"
  )
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);
  `;

  pool.query(queryText, [
    workHistoryItem.workplace,
    workHistoryItem.jobTitle,
    workHistoryItem.referenceName,
    workHistoryItem.referencePhone,
    workHistoryItem.referenceEmailAddress,
    workHistoryItem.startDate,
    workHistoryItem.endDate,
    req.user.id
  ])
  .then(result => {
    console.log('POSTED new work history');
    res.sendStatus(200)
  })
  .catch (error => {
    console.log('Error in WorkHistory POST', error);
    res.sendStatus(500)
  })

});


/**
 * Takes a years of experience value from /workhistory and updates wthe relevant column in the provider table
 */
router.put('/workhistory', (req, res) => {
  console.log('Reached provider PUT /workhistory', req.body);

  const provider = req.body

  const queryText = `UPDATE "provider" SET "yearsExperience" = $1 WHERE "user_id" = $2; `;

  pool.query(queryText, [provider.yearsExperience, req.user.id])
  .then( result => {
    console.log('updated yearsExperience');
    res.sendStatus(200)
  })
  .catch (error => {
    console.log('Error in Provider PUT', error);
    res.sendStatus(500)
  })
})

// Put request to the database to update the address info of the provider
router.put('/address', (req, res) => {
  console.log('Reached provider reg PUT /address', req.body);

  console.log(req.user.id);

  let updatedAddress = req.body; 
  console.log('the updated address is', updatedAddress);

  let queryText = `UPDATE "provider" SET "streetAddress" = $1, "city" = $2, "state" = $3, "zipCode" = $4 WHERE "user_id" = $5;`;

  pool.query(queryText, [updatedAddress.streetAddress, updatedAddress.city, updatedAddress.state, updatedAddress.zipCode, req.user.id])
  .then(response => {
    console.log(response.rowCount);
    res.sendStatus(200)
  }).catch(err => {
    console.log('address put request error', err);
    res.sendStatus(500);
  })
}) // End PUT Route

/**
 * Takes an object from /education and posts it to the education table
 */
router.post('/educationhistoryitem', (req, res) => {
  console.log('Reached provider reg POST: educationhistory', req.body);
  const educationhistoryItem = req.body

  const queryText = `INSERT INTO "education"
  (
    "institution",
    "degree",
    "startDate",
    "endDate",
    "user_id"
  )
  VALUES ($1, $2, $3, $4, $5);
  `;
    pool.query(queryText, [
      educationhistoryItem.school,
      educationhistoryItem.degree,
      educationhistoryItem.startDate,
      educationhistoryItem.endDate,
      req.user.id
    ])

    .then( result => {
      console.log('created new education history item');
      res.sendStatus(200)
    })
    .catch (error => {
      console.log('Error in Education Post', error);
      res.sendStatus(500)
    })
})

router.put('/lastmission', (req, res) => {
  console.log('reached provider reg PUT: lastmission', req.body);
  console.log(req);

  // variable for user ID
  const user_id = req.user.id;

  // variable for number of years since last mission
  const lastMission = req.body.lastMission + ' ' + 'years ago';

  const queryText = `
    UPDATE "provider" SET "lastMission" = $1
    WHERE "provider".user_id = $2;
  `

  pool.query(queryText, [lastMission, user_id])
    .then(result => {
      console.log('lastMission UPDATE success');
      res.sendStatus(200);
    })
    .catch(error => {
      console.log('UPDATE lastMission unsuccessful', error);
    })
})

router.post('/missionhistoryitem', async (req, res) => {
  console.log('Reached provider reg POST: missionHistory', req.body);

  // make connection to pool client 
  // to initiate transaction
  const client = await pool.connect();

  // variable for the user id
  const user_id = req.user.id;

  // variable for the organization name
  const organizationName = req.body.organization;

  // variable for mission location
  const location = req.body.location;

  // variable for the name of the reference
  const referenceName = req.body.referenceName;

  // variable for phone number of reference
  const referencePhone = req.body.referencePhone;

  // variable for mission start date
  const startDate = req.body.startDate;

  // variable for mission end date
  const endDate = req.body.endDate;

  // query text makes post of data from MissionHistoryMultiRow to mission_experience table
  const queryText = `
    INSERT INTO "mission_experience" ("organizationName", "location", "referenceName", "referencePhone", "startDate", "endDate", "user_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;

  try {

    await client.query('BEGIN;');

    await client.
      query(queryText, [organizationName, location, referenceName, referencePhone, startDate, endDate, user_id])
      await client.query('COMMIT;');

      res.sendStatus(200)

  } catch (error) {

    await client.query('ROLLBACK')
    console.error('Could not finish mission experience POST, /missionhistoryitem', error);
  } finally {

    client.release();

  }
})

router.post('/insuranceitem', (req, res) => {
  console.log('Reg.body in /insurance item is', req.body);
  console.log('user id is', req.user.id);
  let ins = req.body;
  //define the query text of where you want to post in the database
  const queryText = `INSERT INTO "insurance" ("insuranceType", "insuranceProvider", "policyNumber", 
  "state", "dateInitial", "dateRenewed", "dateExpiring", "user_id")
  VALUES ($1, $2, $3, $4, $5, $6, $7, $8);`;

  pool.query(queryText, [ins.insuranceType, ins.insuranceProvider, ins.policyNumber, ins.state, ins.dateInitial,
  ins.dateRenewed, ins.dateExpiring, req.user.id])
  .then( result => {
    res.sendStatus(201);
  })
  .catch (err => {
    console.log('error is', err);
    res.sendStatus(500);
  })

})


router.post('/credentialhistory', async (req, res) => {
  console.log('Credential History POST for provider', req.body);
  
  // make a connection to pool client for transaction
  const client = await pool.connect();

  // variable for user ID
  const user_id = req.user.id;

  // variable for licensingBoard
  const licensingBoard = req.body.licensingBoard;

  // variable for credentialName
  const credentialName = req.body.credentialTaxonomy;

  // variable for licenseNumber
  const licenseNumber = req.body.licenseNumber;

  // variable for dateInitial
  const dateInitial = req.body.dateReceived;

  // variable for dateRenewed
  const dateRenewed = req.body.dateRenewed;

  // variable for dateExpiring
  const dateExpiring = req.body.dateExpired;

  const credentialInsertStatement = `
    INSERT INTO "credential" ("licensingBoard", "credentialName", "licenseNumber", "dateInitial", "dateRenewed", "dateExpiring", "user_id")
    VALUES ($1, $2, $3, $4, $5, $6, $7);
  `;

  try {

    await client.query('BEGIN;');

    await client.query(credentialInsertStatement, [licensingBoard, credentialName, licenseNumber, dateInitial, dateRenewed, dateExpiring, user_id]);

    await client.query('COMMIT;');

    res.sendStatus(200);
    
  } catch (error) {
    
    console.error(`Error in Credential POST, changes rolledback ${error}`);

    await client.query('ROLLBACK;');

  } finally {
    console.log('End cred POST')

    await client.release();

  }

  // pesto/ben
})

module.exports = router;
