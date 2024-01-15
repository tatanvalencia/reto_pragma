const AWS = require("aws-sdk");
const s3 = new AWS.S3();

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const id = body.id;
  const object = await s3.getObject({
    Bucket: "active-employee-files",
    Key: id,
  });
  const params = {
    Bucket: "inactive-employee-files",
    Key: id,
    Body: object.Body,
    ContentType: "application/pdf",
  };
  await s3.putObject(params).promise();
  await s3.deleteObject({
    Bucket: "active-employee-files",
    Key: id,
  }).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "El empleado ha sido inactivado exitosamente.",
    })
  };
};