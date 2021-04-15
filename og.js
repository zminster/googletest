const path = require('path');
const {google} = require('googleapis');

const YOUR_ROOT_FOLDER = '1_Of_S3rzdZq9pmIcS4YoSdD3jCgkl0f-',
  PATH_TO_CREDENTIALS = path.resolve(`${__dirname}/key.json`);

const auth = new google.auth.GoogleAuth({
  keyFile: PATH_TO_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/documents'],
});

async function test() {
	const authClient = await auth.getClient();
	google.options({auth: authClient});

	const docs = google.docs('v1');
	const createResponse = await docs.documents.create({
		requestBody: {
			title: 'Your new document!',
		},
	});

	//console.log(createResponse.data);
	const gimme = await docs.documents.get({
		documentId: createResponse.data.documentId,
	});

	console.log("GIMME", gimme);
}

test();
