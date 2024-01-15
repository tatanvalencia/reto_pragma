const AWS = require("aws-sdk");
const s3 = new AWS.S3();
const dynamodb = new AWS.DynamoDB();

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const id = body.id;
  const object = await s3.getObject({
    Bucket: "inactive-employee-files",
    Key: id,
  });
  const params = {
    Bucket: "active-employee-files",
    Key: id,
    Body: object.Body,
    ContentType: "application/pdf",
  };
  await s3.putObject(params).promise();
  await s3.deleteObject({
    Bucket: "inactive-employee-files",
    Key: id,
  }).promise();
  const paramsItem = {
    TableName: 'employee-restore-status',
    Item: {
      id: {
        S: id
      },
      status: {
        S: "IN PROGRESS"
      },
      ttl: {
        S: "1800"
      }
    }
  };
  await dynamodb.putItem(paramsItem).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "El archivo se recuperó correctamente",
    }),
  };
};