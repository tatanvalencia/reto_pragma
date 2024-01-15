const { S3 } = require("aws-sdk");

exports.handler = async (event, context) => {
  const body = JSON.parse(event.body);
  const id = body.id;
  const base64File = body.file;
  const fileBuffer = Buffer.from(base64File, "base64");
  const s3 = new S3();
  const params = {
    Bucket: "active-employee-files",
    Key: id,
    Body: fileBuffer,
    ContentType: "application/pdf",
  };
  await s3.putObject(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: "El archivo se cargó correctamente",
    }),
  };
};